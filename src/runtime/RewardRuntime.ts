import { createInitialMetaState } from '../domain/meta/MetaState'
import { LocalMetaRepository } from '../domain/meta/MetaRepository'
import { RewardSourceService, type RewardSourceConfig } from '../domain/meta/RewardSources'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge } from '../game/bridge/BattleBridge'
import { ensureActiveStarterHeroes } from '../domain/meta/HeroRecruitment'

export function createRuntimeMetaRepository(storage: StorageLike, bridge: BattleBridge): LocalMetaRepository {
  return new LocalMetaRepository(storage, (save) => bridge.emitMetaSnapshot(save))
}

export function publishCurrentMetaSnapshot(repository: LocalMetaRepository, bridge: BattleBridge): void {
  const current = repository.load()
  if (current.status !== 'loaded') throw new Error('Meta snapshot publication requires a current Meta V5 save')
  bridge.emitMetaSnapshot(current.save)
}

export function ensureMetaRepositoryReady(repository: LocalMetaRepository, playerId: string, nowMs: number): void {
  const current = repository.load()
  if (current.status === 'empty') {
    repository.save(createInitialMetaState(playerId, nowMs), 0, nowMs)
    return
  }
  if (current.status === 'loaded') {
    ensureRuntimeHeroContent(repository, current.save.revision, current.save.updatedAtMs, current.save.data, nowMs)
    return
  }
  if (current.status === 'invalid') throw new Error(`Invalid Meta save: ${current.issues.join('; ')}`)
  const expectedRevision = JSON.parse(current.raw).revision
  const migrated = current.sourceVersion === 1 ? repository.migrateV1(expectedRevision)
    : current.sourceVersion === 2 ? repository.migrateV2(expectedRevision)
      : current.sourceVersion === 3 ? repository.migrateV3(expectedRevision)
      : current.sourceVersion === 4 ? repository.migrateV4(expectedRevision)
        : current.sourceVersion === 5 ? repository.migrateV5(expectedRevision)
          : undefined
  if (!migrated) throw new Error(`Unsupported Meta save version: ${current.sourceVersion}`)
  ensureRuntimeHeroContent(repository, migrated.revision, migrated.updatedAtMs, migrated.data, nowMs)
}

function ensureRuntimeHeroContent(
  repository: LocalMetaRepository,
  revision: number,
  updatedAtMs: number,
  state: ReturnType<typeof createInitialMetaState>,
  nowMs: number,
): void {
  const heroCollection = ensureActiveStarterHeroes(state.heroCollection)
  if (heroCollection === state.heroCollection) return
  repository.save({ ...state, heroCollection }, revision, Math.max(updatedAtMs, nowMs))
}

export class RewardRuntimeController {
  private readonly source: RewardSourceService
  private unsubscribeEnemy?: () => void
  private unsubscribeVictory?: () => void

  constructor(repository: LocalMetaRepository, private readonly bridge: BattleBridge, config: RewardSourceConfig) {
    this.source = new RewardSourceService(repository, config)
  }

  start(): void {
    if (this.unsubscribeEnemy || this.unsubscribeVictory) return
    this.unsubscribeEnemy = this.bridge.onEnemyDefeated((event) => {
      this.source.enemyKill({ runId: event.runId, enemyInstanceId: event.enemyInstanceId, enemyId: event.enemyId, committedAtMs: event.occurredAtMs })
    })
    this.unsubscribeVictory = this.bridge.onStageVictory((event) => {
      this.source.stageClear({ runId: event.runId, stageId: event.stageId, committedAtMs: event.occurredAtMs })
      this.source.firstClear({ stageId: event.stageId, committedAtMs: event.occurredAtMs })
    })
  }

  stop(): void {
    this.unsubscribeEnemy?.(); this.unsubscribeVictory?.()
    this.unsubscribeEnemy = undefined; this.unsubscribeVictory = undefined
  }
}

export class ActivePlayTimeTracker {
  private lastWallClockMs: number
  private visible: boolean
  private cumulativeVisibleMs: number
  private cumulativeHiddenMs: number
  private claimSequence = 0

  constructor(private readonly source: RewardSourceService, initialWallClockMs: number, initialVisible: boolean, repository: LocalMetaRepository) {
    const current = repository.load()
    if (current.status !== 'loaded') throw new Error('Active play tracker requires a current Meta V5 save')
    this.lastWallClockMs = initialWallClockMs
    this.visible = initialVisible
    this.cumulativeVisibleMs = current.save.data.activePlayTime.observedVisibleMs
    this.cumulativeHiddenMs = current.save.data.activePlayTime.observedHiddenMs
  }

  flush(nowMs: number): void {
    if (!Number.isSafeInteger(nowMs) || nowMs < this.lastWallClockMs) throw new Error('Wall clock cannot go backward')
    const deltaMs = nowMs - this.lastWallClockMs
    if (this.visible) this.cumulativeVisibleMs += deltaMs
    else this.cumulativeHiddenMs += deltaMs
    this.lastWallClockMs = nowMs
    if (deltaMs === 0) return
    this.claimSequence += 1
    this.source.activePlayTime({
      sessionId: 'active-play-runtime',
      claimId: `flush-${this.claimSequence}`,
      cumulativeVisibleMs: this.cumulativeVisibleMs,
      cumulativeHiddenMs: this.cumulativeHiddenMs,
      committedAtMs: nowMs,
    })
  }

  setVisibility(visible: boolean, nowMs: number): void {
    this.flush(nowMs)
    this.visible = visible
  }
}

export function startBrowserRewardRuntime(storage: StorageLike, bridge: BattleBridge, config: RewardSourceConfig): () => void {
  const repository = createRuntimeMetaRepository(storage, bridge)
  const nowMs = Date.now()
  ensureMetaRepositoryReady(repository, 'local-player', nowMs)
  publishCurrentMetaSnapshot(repository, bridge)
  const source = new RewardSourceService(repository, config)
  const controller = new RewardRuntimeController(repository, bridge, config)
  const tracker = new ActivePlayTimeTracker(source, nowMs, document.visibilityState === 'visible', repository)
  controller.start()

  const intervalId = window.setInterval(() => tracker.flush(Date.now()), 15_000)
  const onVisibilityChange = () => tracker.setVisibility(document.visibilityState === 'visible', Date.now())
  const onPageHide = () => tracker.flush(Date.now())
  document.addEventListener('visibilitychange', onVisibilityChange)
  window.addEventListener('pagehide', onPageHide)

  return () => {
    window.clearInterval(intervalId)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    window.removeEventListener('pagehide', onPageHide)
    tracker.flush(Date.now())
    controller.stop()
  }
}
