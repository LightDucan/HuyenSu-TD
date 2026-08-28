import type { LocalMetaRepository, RewardTransactionCommit } from './MetaRepository'
import type { RewardOperation } from './RewardTransaction'

export type HiddenTabPolicy = 'visible-only' | 'count-hidden'

export type EnemyKillRewardConfig = Readonly<{
  goldByEnemyId: Readonly<Record<string, number>>
}>

export type StageClearReward = Readonly<{ gold: number; knb: number; anhHon?: number }>
export type StageClearRewardConfig = Readonly<{
  rewardByStageId: Readonly<Record<string, StageClearReward>>
}>

export type ActivePlayTimeRewardConfig = Readonly<{
  knbPerInterval: number
  intervalMs: number
  hiddenTabPolicy: HiddenTabPolicy
}>

export type RewardSourceConfig = Readonly<{
  enemyKill: EnemyKillRewardConfig
  stageClear: StageClearRewardConfig
  activePlayTime: ActivePlayTimeRewardConfig
}>

export type RewardSourceResult =
  | (RewardTransactionCommit & Readonly<{ source: 'enemy-kill' | 'stage-clear' | 'active-play-time'; rewardKey: string }>)
  | Readonly<{ status: 'not-eligible'; source: 'enemy-kill' | 'stage-clear' | 'active-play-time'; rewardKey: string }>

function assertId(value: string, label: string): void {
  if (value.trim().length === 0) throw new Error(`${label} must not be empty`)
}

function assertPositiveSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${label} must be a positive safe integer`)
}

function assertNonNegativeSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`)
}

function currencyOperations(reward: Readonly<{ gold?: number; knb?: number }>): RewardOperation[] {
  const operations: RewardOperation[] = []
  if (reward.gold !== undefined && reward.gold > 0) operations.push({ type: 'grant-currency', currency: 'gold', amount: reward.gold })
  if (reward.knb !== undefined && reward.knb > 0) operations.push({ type: 'grant-currency', currency: 'knb', amount: reward.knb })
  return operations
}

function rewardOperations(reward: StageClearReward): RewardOperation[] {
  const operations = currencyOperations(reward)
  if (reward.anhHon !== undefined && reward.anhHon > 0) operations.push({ type: 'grant-consumable', itemId: 'anh-hon', quantity: reward.anhHon })
  return operations
}

export function calculateEligibleWallClockMs(policy: HiddenTabPolicy, visibleMs: number, hiddenMs: number): number {
  assertNonNegativeSafeInteger(visibleMs, 'Visible wall-clock duration')
  assertNonNegativeSafeInteger(hiddenMs, 'Hidden wall-clock duration')
  return policy === 'visible-only' ? visibleMs : visibleMs + hiddenMs
}

function commit(repository: LocalMetaRepository, source: RewardSourceResult['source'], rewardKey: string, operations: RewardOperation[], committedAtMs: number, receiptPolicy: 'persist' | 'checkpoint-only' = 'persist'): RewardSourceResult {
  if (operations.length === 0) return { status: 'not-eligible', source, rewardKey }
  assertNonNegativeSafeInteger(committedAtMs, 'Reward commit timestamp')
  const current = repository.load()
  if (current.status !== 'loaded') throw new Error('Reward source requires a current Meta V5 save')
  const result = repository.transactReward({ idempotencyKey: rewardKey, operations, receiptPolicy }, current.save.revision, committedAtMs)
  return { ...result, source, rewardKey }
}

export class RewardSourceService {
  constructor(private readonly repository: LocalMetaRepository, private readonly config: RewardSourceConfig) {
    for (const [enemyId, amount] of Object.entries(config.enemyKill.goldByEnemyId)) {
      assertId(enemyId, 'Enemy ID')
      assertPositiveSafeInteger(amount, `Enemy kill Gold for ${enemyId}`)
    }
    for (const [stageId, reward] of Object.entries(config.stageClear.rewardByStageId)) {
      assertId(stageId, 'Stage ID')
      assertNonNegativeSafeInteger(reward.gold, `Stage clear Gold for ${stageId}`)
      assertNonNegativeSafeInteger(reward.knb, `Stage clear KNB for ${stageId}`)
      if (reward.anhHon !== undefined) assertNonNegativeSafeInteger(reward.anhHon, `Stage clear Anh Hồn for ${stageId}`)
      if (reward.gold === 0 && reward.knb === 0 && (reward.anhHon ?? 0) === 0) throw new Error(`Stage clear reward for ${stageId} must not be empty`)
    }
    assertPositiveSafeInteger(config.activePlayTime.knbPerInterval, 'Active play-time KNB per interval')
    assertPositiveSafeInteger(config.activePlayTime.intervalMs, 'Active play-time interval')
  }

  enemyKill(input: Readonly<{ runId: string; enemyInstanceId: string; enemyId: string; committedAtMs: number }>): RewardSourceResult {
    assertId(input.runId, 'Run ID')
    assertId(input.enemyInstanceId, 'Enemy instance ID')
    assertId(input.enemyId, 'Enemy ID')
    const rewardKey = `reward/kill/${input.runId}/${input.enemyInstanceId}`
    const amount = this.config.enemyKill.goldByEnemyId[input.enemyId]
    return commit(this.repository, 'enemy-kill', rewardKey, currencyOperations({ gold: amount }), input.committedAtMs)
  }

  stageClear(input: Readonly<{ runId: string; stageId: string; committedAtMs: number }>): RewardSourceResult {
    assertId(input.runId, 'Run ID')
    assertId(input.stageId, 'Stage ID')
    const rewardKey = `reward/stage-clear/${input.runId}`
    const reward = this.config.stageClear.rewardByStageId[input.stageId]
    if (reward === undefined) return { status: 'not-eligible', source: 'stage-clear', rewardKey }
    return commit(this.repository, 'stage-clear', rewardKey, rewardOperations(reward), input.committedAtMs)
  }

  activePlayTime(input: Readonly<{ sessionId: string; claimId: string; cumulativeVisibleMs: number; cumulativeHiddenMs: number; committedAtMs: number }>): RewardSourceResult {
    assertId(input.sessionId, 'Session ID')
    assertId(input.claimId, 'Active play-time claim ID')
    assertNonNegativeSafeInteger(input.cumulativeVisibleMs, 'Cumulative visible wall-clock duration')
    assertNonNegativeSafeInteger(input.cumulativeHiddenMs, 'Cumulative hidden wall-clock duration')
    const current = this.repository.load()
    if (current.status !== 'loaded') throw new Error('Active play-time reward requires a current Meta V5 save')
    const progress = current.save.data.activePlayTime
    if (input.cumulativeVisibleMs < progress.observedVisibleMs || input.cumulativeHiddenMs < progress.observedHiddenMs) {
      throw new Error('Active play-time cumulative duration cannot go backward')
    }
    if (input.cumulativeVisibleMs === progress.observedVisibleMs && input.cumulativeHiddenMs === progress.observedHiddenMs) {
      return { status: 'already-applied', source: 'active-play-time', rewardKey: `reward/active-time/${input.cumulativeVisibleMs}/${input.cumulativeHiddenMs}`, save: current.save }
    }
    const deltaVisibleMs = input.cumulativeVisibleMs - progress.observedVisibleMs
    const deltaHiddenMs = input.cumulativeHiddenMs - progress.observedHiddenMs
    const newlyEligibleMs = calculateEligibleWallClockMs(this.config.activePlayTime.hiddenTabPolicy, deltaVisibleMs, deltaHiddenMs)
    const totalEligibleMs = progress.remainderEligibleMs + newlyEligibleMs
    const intervals = Math.floor(totalEligibleMs / this.config.activePlayTime.intervalMs)
    const nextProgress = {
      observedVisibleMs: input.cumulativeVisibleMs,
      observedHiddenMs: input.cumulativeHiddenMs,
      remainderEligibleMs: totalEligibleMs % this.config.activePlayTime.intervalMs,
    }
    const rewardKey = `reward/active-time/${input.cumulativeVisibleMs}/${input.cumulativeHiddenMs}`
    const operations = currencyOperations({ knb: intervals * this.config.activePlayTime.knbPerInterval })
    operations.push({ type: 'set-active-play-time', progress: nextProgress })
    return commit(this.repository, 'active-play-time', rewardKey, operations, input.committedAtMs, 'checkpoint-only')
  }
}
