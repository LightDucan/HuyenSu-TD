import { balanceV1, type BalanceV1 } from '../data/economy/balanceV1'

export type SimulationScenario = 'casual' | 'regular' | 'active'
export type SimulationPeriodDays = 1 | 7 | 30
export type SimulationResult = Readonly<{ scenario: SimulationScenario; days: SimulationPeriodDays; gold: number; knb: number; goldEarned: number; goldSpent: number; goldRemaining: number; knbEarned: number; knbSpent: number; knbRemaining: number; waves: number; gachaPulls: number; recruitmentPulls: number; duplicateShards: number; stars: number; ownedHeroes: number; highestEquipmentLevel: number; equipmentInstancesRemaining: number; anhHon: number; evolutionProgress: string; speed: 1 | 3 }>

const minutesPerDay: Record<SimulationScenario, number> = { casual: 30, regular: 60, active: 120 }

export function simulateEconomy(scenario: SimulationScenario, days: SimulationPeriodDays, seed = 1, config: BalanceV1 = balanceV1, speed: 1 | 3 = 1): SimulationResult {
  if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('Simulation seed must be a non-negative safe integer')
  let randomState = seed >>> 0
  const random = () => { randomState = (randomState * 1664525 + 1013904223) >>> 0; return randomState / 0x1_0000_0000 }
  const minutes = minutesPerDay[scenario] * days
  const waves = Math.floor(minutes / 2)
  const goldEarned = waves * config.gold.killReward + Math.floor(waves / 10) * config.gold.stageClearReward
  const knbEarned = Math.floor(minutes * 60_000 / config.activePlay.intervalMs) * config.activePlay.knbPerInterval
  const gachaPulls = Math.floor(goldEarned / config.gold.gachaPullCost)
  let goldFromGacha = 0; let small = 0; let medium = 0; let large = 0
  let equipmentInstances = 0
  const rewardWeights = config.gacha.weights; const totalWeight = Object.values(rewardWeights).reduce((sum, value) => sum + value, 0)
  for (let i = 0; i < gachaPulls; i += 1) {
    let roll = random() * totalWeight
    if ((roll -= rewardWeights.gold) < 0) goldFromGacha += config.gacha.goldReturn
    else if ((roll -= rewardWeights.weapon) < 0 || (roll -= rewardWeights.gem) < 0) equipmentInstances += 1
    else if ((roll -= rewardWeights.smallBinhPhu) < 0) small += 1
    else if ((roll -= rewardWeights.mediumBinhPhu) < 0) medium += 1
    else large += 1
  }
  const goldSpent = gachaPulls * config.gold.gachaPullCost
  const recruitmentPulls = Math.floor(knbEarned / config.knbShop.chieuHienLenh)
  const pool = Object.keys(config.recruitment.weights); const owned = new Set<string>(); let duplicateShards = 0
  for (let i = 0; i < recruitmentPulls; i += 1) { const hero = pool[Math.floor(random() * pool.length)]; if (owned.has(hero)) duplicateShards += config.recruitment.duplicateShards; else owned.add(hero) }
  let stars = 1; let remainingShards = duplicateShards
  while (stars < config.stars.max) { const required = config.stars.shardCosts[(stars + 1) as 2 | 3 | 4 | 5]; if (remainingShards < required) break; remainingShards -= required; stars += 1 }
  const mergeable = equipmentInstances + small + medium + large
  let highestEquipmentLevel = mergeable > 0 ? 1 : 0; let equipmentInstancesRemaining = mergeable
  while (equipmentInstancesRemaining >= config.equipment.mergeInputs && highestEquipmentLevel < config.equipment.levelCount) { equipmentInstancesRemaining = Math.floor(equipmentInstancesRemaining / config.equipment.mergeInputs); highestEquipmentLevel += 1 }
  const anhHon = Math.floor(days * minutesPerDay[scenario] / 60 * config.evolution.anhHonPerEligibleHour)
  const goldRemaining = goldEarned + goldFromGacha - goldSpent
  const knbSpent = recruitmentPulls * config.knbShop.chieuHienLenh
  return { scenario, days, gold: goldRemaining, knb: knbEarned - knbSpent, goldEarned: goldEarned + goldFromGacha, goldSpent, goldRemaining, knbEarned, knbSpent, knbRemaining: knbEarned - knbSpent, waves, gachaPulls, recruitmentPulls, duplicateShards, stars, ownedHeroes: owned.size, highestEquipmentLevel, equipmentInstancesRemaining, anhHon, evolutionProgress: stars >= 5 && anhHon >= config.evolution.anhHonCosts.rebirth ? 'rebirth-ready' : 'normal', speed }
}

export function simulateMatrix(seed = 1, config: BalanceV1 = balanceV1): readonly SimulationResult[] {
  return (['casual', 'regular', 'active'] as const).flatMap((scenario) => ([1, 7, 30] as const).map((days) => simulateEconomy(scenario, days, seed, config)))
}

export function goldGachaExpectedReturn(config: BalanceV1 = balanceV1): number {
  const weights = config.gacha.weights
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0)
  return config.gacha.goldReturn * weights.gold / total
}
