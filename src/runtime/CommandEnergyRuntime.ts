import { COMMAND_ENERGY_WAVE_COST, selectCommandEnergyCap } from '../domain/meta/CommandEnergy'
import { LocalMetaRepository, type CommandEnergyCommit } from '../domain/meta/MetaRepository'
import type { MetaSaveV4 } from '../domain/meta/MetaState'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge, BattleSnapshot, WaveStartSource } from '../game/bridge/BattleBridge'
import { createRuntimeMetaRepository, ensureMetaRepositoryReady, publishCurrentMetaSnapshot } from './RewardRuntime'

const COMMAND_ENERGY_REFRESH_INTERVAL_MS = 15_000

export class CommandEnergyRuntimeController {
  private latestBattle?: BattleSnapshot
  private readonly approvedWaveKeys = new Set<string>()
  private unsubscribeSnapshot?: () => void
  private unsubscribeRequest?: () => void
  private unsubscribeAuto?: () => void

  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly bridge: BattleBridge,
    private readonly wallClockNow: () => number = Date.now,
  ) {}

  start(): void {
    if (this.unsubscribeSnapshot || this.unsubscribeRequest || this.unsubscribeAuto) return
    this.latestBattle = this.bridge.getLatestSnapshot()
    this.unsubscribeSnapshot = this.bridge.onSnapshot((snapshot) => {
      this.latestBattle = snapshot
      this.maybeStartAutoWave()
    })
    this.unsubscribeRequest = this.bridge.onWaveStartRequest((source) => this.attemptWaveStart(source))
    this.unsubscribeAuto = this.bridge.onAutoWaveChange(() => this.maybeStartAutoWave())
    this.refreshCommandEnergy(this.wallClockNow())
  }

  stop(): void {
    this.unsubscribeSnapshot?.()
    this.unsubscribeRequest?.()
    this.unsubscribeAuto?.()
    this.unsubscribeSnapshot = undefined
    this.unsubscribeRequest = undefined
    this.unsubscribeAuto = undefined
  }

  refreshCommandEnergy(nowMs: number = this.wallClockNow()): CommandEnergyCommit {
    const current = this.requireCurrentSave()
    const result = this.repository.resolveCommandEnergy(current.revision, nowMs)
    this.publishEnergy(result.save)
    if (result.status !== 'invalid-clock') this.maybeStartAutoWave(nowMs)
    return result
  }

  attemptWaveStart(source: WaveStartSource, nowMs: number = this.wallClockNow()): CommandEnergyCommit | undefined {
    const battle = this.latestBattle ?? this.bridge.getLatestSnapshot()
    if (!battle || battle.battleStatus !== 'running' || battle.waveStatus !== 'waiting') {
      this.reject(source, battle, 'battle-not-ready')
      return undefined
    }
    if (battle.placedHeroes.length === 0) {
      this.reject(source, battle, 'no-heroes')
      return undefined
    }

    const waveKey = this.waveKey(battle)
    if (this.approvedWaveKeys.has(waveKey)) {
      this.reject(source, battle, 'duplicate')
      return undefined
    }

    const current = this.requireCurrentSave()
    const result = this.repository.spendCommandEnergy(COMMAND_ENERGY_WAVE_COST, current.revision, nowMs)
    this.publishEnergy(result.save)
    if (result.status !== 'spent') {
      this.reject(source, battle, result.status === 'invalid-clock' ? 'invalid-clock' : 'insufficient-energy')
      return result
    }

    this.approvedWaveKeys.add(waveKey)
    this.bridge.reportWaveStartDecision({
      status: 'approved',
      source,
      runId: battle.runId,
      waveNumber: battle.wave,
    })
    return result
  }

  private maybeStartAutoWave(nowMs: number = this.wallClockNow()): void {
    if (!this.bridge.isAutoWaveEnabled()) return
    const battle = this.latestBattle ?? this.bridge.getLatestSnapshot()
    if (!battle || battle.battleStatus !== 'running' || battle.waveStatus !== 'waiting' || battle.placedHeroes.length === 0) return
    if (this.approvedWaveKeys.has(this.waveKey(battle))) return
    this.attemptWaveStart('auto', nowMs)
  }

  private requireCurrentSave(): MetaSaveV4 {
    const current = this.repository.load()
    if (current.status !== 'loaded') throw new Error('Command Energy runtime requires a current Meta V4 save')
    return current.save
  }

  private publishEnergy(save: MetaSaveV4): void {
    this.bridge.emitCommandEnergySnapshot({
      current: save.data.commandEnergy.current,
      cap: selectCommandEnergyCap(save.data.profile.playerLevel),
    })
  }

  private reject(source: WaveStartSource, battle: BattleSnapshot | undefined, reason: 'battle-not-ready' | 'no-heroes' | 'insufficient-energy' | 'invalid-clock' | 'duplicate'): void {
    this.bridge.reportWaveStartDecision({
      status: 'rejected',
      source,
      runId: battle?.runId ?? 'unavailable',
      waveNumber: battle?.wave ?? 0,
      reason,
    })
  }

  private waveKey(battle: BattleSnapshot): string {
    return `${battle.runId}:wave:${battle.wave}`
  }
}

export function startBrowserCommandEnergyRuntime(storage: StorageLike, bridge: BattleBridge): () => void {
  const repository = createRuntimeMetaRepository(storage, bridge)
  const nowMs = Date.now()
  ensureMetaRepositoryReady(repository, 'local-player', nowMs)
  publishCurrentMetaSnapshot(repository, bridge)
  const controller = new CommandEnergyRuntimeController(repository, bridge)
  controller.start()
  const intervalId = window.setInterval(() => controller.refreshCommandEnergy(Date.now()), COMMAND_ENERGY_REFRESH_INTERVAL_MS)
  return () => {
    window.clearInterval(intervalId)
    controller.refreshCommandEnergy(Date.now())
    controller.stop()
  }
}
