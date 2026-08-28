import type { HiddenTabPolicy, RewardSourceConfig } from '../../domain/meta/RewardSources'
import { balanceV1 } from '../economy/balanceV1'

export type RewardBalanceDraft = Readonly<{
  enemyKillGold: Readonly<Record<string, number>>
  stageClear: RewardSourceConfig['stageClear']['rewardByStageId']
  activePlayTime: Readonly<{ intervalMs: number; knbPerInterval: number }>
}>

export const haiBaTrungRewardBalance: RewardBalanceDraft = {
  enemyKillGold: balanceV1.rewardSources.enemyKillGold,
  stageClear: { 'hbt-lang-bac-stage-01': balanceV1.rewardSources.stageClear.prototypeStage },
  activePlayTime: { intervalMs: balanceV1.activePlay.intervalMs, knbPerInterval: balanceV1.activePlay.knbPerInterval },
}

export function createHaiBaTrungRewardConfig(hiddenTabPolicy: HiddenTabPolicy): RewardSourceConfig {
  return {
    enemyKill: { goldByEnemyId: haiBaTrungRewardBalance.enemyKillGold },
    stageClear: { rewardByStageId: haiBaTrungRewardBalance.stageClear },
    activePlayTime: { ...haiBaTrungRewardBalance.activePlayTime, hiddenTabPolicy },
  }
}

export const prototypeRewardBalance = haiBaTrungRewardBalance
export const createPrototypeRewardConfig = createHaiBaTrungRewardConfig
export const haiBaTrungRewardConfig = createHaiBaTrungRewardConfig
