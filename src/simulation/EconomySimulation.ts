import { balanceV1, type BalanceV1 } from '../data/economy/balanceV1'

export type SimulationScenario = 'casual' | 'regular' | 'active'
export type SimulationPeriodDays = 1 | 7 | 30
export type SimulationResult = Readonly<{ scenario: SimulationScenario; days: SimulationPeriodDays; gold: number; knb: number; waves: number; gachaPulls: number; recruitmentPulls: number; duplicateShards: number; stars: number; anhHon: number; }>

const minutesPerDay: Record<SimulationScenario, number> = { casual: 30, regular: 60, active: 120 }

export function simulateEconomy(scenario: SimulationScenario, days: SimulationPeriodDays, seed = 1, config: BalanceV1 = balanceV1): SimulationResult {
  if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('Simulation seed must be a non-negative safe integer')
  const minutes = minutesPerDay[scenario] * days
  const waves = Math.floor(minutes / 2)
  const gold = waves * 10 + Math.floor(waves / 10) * config.gold.stageClearReward
  const knb = Math.floor(minutes * 60_000 / config.activePlay.intervalMs) * config.activePlay.knbPerInterval
  const gachaPulls = Math.floor(gold / config.gold.gachaPullCost)
  const recruitmentPulls = Math.floor(knb / config.knbShop.chieuHienLenh)
  const duplicateShards = Math.floor(recruitmentPulls * 0.6) * config.recruitment.duplicateShards
  const stars = Math.min(config.stars.max, 1 + Math.floor(duplicateShards / config.stars.shardCosts[2]))
  const anhHon = Math.floor(days / 7) * 100
  return { scenario, days, gold, knb, waves, gachaPulls, recruitmentPulls, duplicateShards, stars, anhHon }
}

export function simulateMatrix(seed = 1, config: BalanceV1 = balanceV1): readonly SimulationResult[] {
  return (['casual', 'regular', 'active'] as const).flatMap((scenario) => ([1, 7, 30] as const).map((days) => simulateEconomy(scenario, days, seed, config)))
}

export function goldGachaExpectedReturn(config: BalanceV1 = balanceV1): number {
  const weights = config.gacha.weights
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0)
  return config.gacha.goldReturn * weights.gold / total
}
