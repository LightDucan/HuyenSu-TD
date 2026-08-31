import type { HiddenTabPolicy, RewardSourceConfig } from '../../domain/meta/RewardSources'
import { balanceV1 } from '../economy/balanceV1'

export type RewardBalanceDraft = Readonly<{
  enemyKillGold: Readonly<Record<string, number>>
  stageClear: RewardSourceConfig['stageClear']['rewardByStageId']
  activePlayTime: Readonly<{ intervalMs: number; knbPerInterval: number }>
}>

export const haiBaTrungRewardBalance: RewardBalanceDraft = {
  enemyKillGold: Object.fromEntries(Object.entries(balanceV1.rewardSources.enemyKillGold).filter(([id]) => id.startsWith('han-') || id === 'boss-ma-vien')),
  stageClear: { 'hbt-lang-bac-stage-01': balanceV1.rewardSources.stageClear.prototypeStage },
  activePlayTime: { intervalMs: balanceV1.activePlay.intervalMs, knbPerInterval: balanceV1.activePlay.knbPerInterval },
}

export const productionRewardBalance: RewardBalanceDraft = {
  enemyKillGold: balanceV1.rewardSources.enemyKillGold,
  stageClear: { ...haiBaTrungRewardBalance.stageClear, ...balanceV1.rewardSources.stageClear.baTrieu },
  activePlayTime: haiBaTrungRewardBalance.activePlayTime,
}

export function createProductionRewardConfig(hiddenTabPolicy: HiddenTabPolicy): RewardSourceConfig {
  return {
    enemyKill: { goldByEnemyId: productionRewardBalance.enemyKillGold },
    stageClear: { rewardByStageId: productionRewardBalance.stageClear },
    firstClearByStageId: { 'hbt-lang-bac-stage-01': { gold: 100, knb: 50, anhHon: 100 } },
    activePlayTime: { ...productionRewardBalance.activePlayTime, hiddenTabPolicy },
  }
}

export function createHaiBaTrungRewardConfig(hiddenTabPolicy: HiddenTabPolicy): RewardSourceConfig {
  return {
    enemyKill: { goldByEnemyId: haiBaTrungRewardBalance.enemyKillGold },
    stageClear: { rewardByStageId: haiBaTrungRewardBalance.stageClear },
    activePlayTime: { ...haiBaTrungRewardBalance.activePlayTime, hiddenTabPolicy },
  }
}

export const prototypeRewardBalance = haiBaTrungRewardBalance
export const createPrototypeRewardConfig = createProductionRewardConfig
export const haiBaTrungRewardConfig = createHaiBaTrungRewardConfig
