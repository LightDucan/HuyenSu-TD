import type { HiddenTabPolicy, RewardSourceConfig } from '../../domain/meta/RewardSources'
import { balanceV1 } from '../economy/balanceV1'

export type RewardBalanceDraft = Readonly<{
  enemyKillGold: Readonly<Record<string, number>>
  stageClear: RewardSourceConfig['stageClear']['rewardByStageId']
  activePlayTime: Readonly<{ intervalMs: number; knbPerInterval: number }>
}>

export const prototypeRewardBalance: RewardBalanceDraft = {
  enemyKillGold: balanceV1.rewardSources.enemyKillGold,
  stageClear: { 'prototype-stage-01': balanceV1.rewardSources.stageClear.prototypeStage },
  activePlayTime: { intervalMs: balanceV1.activePlay.intervalMs, knbPerInterval: balanceV1.activePlay.knbPerInterval },
}

export function createPrototypeRewardConfig(hiddenTabPolicy: HiddenTabPolicy): RewardSourceConfig {
  return {
    enemyKill: { goldByEnemyId: prototypeRewardBalance.enemyKillGold },
    stageClear: { rewardByStageId: prototypeRewardBalance.stageClear },
    activePlayTime: { ...prototypeRewardBalance.activePlayTime, hiddenTabPolicy },
  }
}
