import type { HiddenTabPolicy, RewardSourceConfig } from '../../domain/meta/RewardSources'

export type RewardBalanceDraft = Readonly<{
  enemyKillGold: Readonly<Record<string, number>>
  stageClear: RewardSourceConfig['stageClear']['rewardByStageId']
  activePlayTime: Readonly<{ intervalMs: number; knbPerInterval: number }>
}>

// Prototype tuning data only. These values are intentionally outside runtime/domain logic.
export const prototypeRewardBalance: RewardBalanceDraft = {
  enemyKillGold: {
    'yellow-turban-sword': 1,
    'yellow-turban-archer': 1,
    'yellow-turban-brute': 2,
  },
  stageClear: { 'prototype-stage-01': { gold: 20, knb: 1 } },
  activePlayTime: { intervalMs: 60_000, knbPerInterval: 1 },
}

export function createPrototypeRewardConfig(hiddenTabPolicy: HiddenTabPolicy): RewardSourceConfig {
  return {
    enemyKill: { goldByEnemyId: prototypeRewardBalance.enemyKillGold },
    stageClear: { rewardByStageId: prototypeRewardBalance.stageClear },
    activePlayTime: { ...prototypeRewardBalance.activePlayTime, hiddenTabPolicy },
  }
}
