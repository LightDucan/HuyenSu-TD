import { balanceV1, type BalanceV1 } from '../data/economy/balanceV1'
import { resolveCommandEnergyRegen, spendCommandEnergy } from '../domain/meta/CommandEnergy'
import type { CommandEnergyState } from '../domain/meta/MetaState'

export type SimulationScenario = 'casual' | 'regular' | 'active'
export type SimulationPeriodDays = 1 | 7 | 30
export type SimulationResult = Readonly<{
  scenario: SimulationScenario; days: SimulationPeriodDays; speed: 1 | 3
  waves: number; wavesStarted: number; wavesBlockedByEnergy: number; commandEnergyRemaining: number
  binhPhuAcquired: number; binhPhuUsed: number
  gold: number; goldEarned: number; goldSpent: number; goldRemaining: number
  knb: number; knbEarned: number; knbSpent: number; knbRemaining: number
  gachaPulls: number; goldGachaOutcomes: Readonly<Record<string, number>>
  weaponAcquired: number; gemAcquired: number; highestWeaponLevel: number; highestGemLevel: number; highestEquipmentLevel: number; equipmentInstancesRemaining: number
  recruitmentPulls: number; ownedHeroes: number; ownedHeroCount: number; duplicateShards: number; remainingHeroShards: Readonly<Record<string, number>>
  stars: number; twoStarHeroes: number; threeStarHeroes: number; fourStarHeroes: number; fiveStarHeroes: number
  anhHon: number; anhHonEarned: number; anhHonSpent: number; anhHonRemaining: number; evolutionProgress: string
}>
type EquipmentTable = { slot: 'weapon' | 'gem'; levels: Readonly<Record<number, Readonly<Record<string, number>>>> }

const fallbackMinutes: Record<SimulationScenario, number> = { casual: 30, regular: 60, active: 120 }
function seeded(seed: number): () => number { let state = seed >>> 0; return () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 0x1_0000_0000 } }
function weightedKey(weights: Readonly<Record<string, number>>, random: () => number): string {
  const entries = Object.entries(weights); const total = entries.reduce((sum, [, weight]) => sum + weight, 0)
  if (!(total > 0)) throw new Error('Simulation weighted pool is empty')
  let cursor = random() * total
  for (const [key, weight] of entries) { cursor -= weight; if (cursor < 0) return key }
  return entries[entries.length - 1][0]
}
function mergeEquipment(counts: Map<string, Map<number, number>>, config: BalanceV1) {
  const tables = config.equipment.tables as Readonly<Record<string, EquipmentTable>>
  let highestWeaponLevel = 0; let highestGemLevel = 0
  for (const [definitionId, levels] of counts) {
    const table = tables[definitionId]; if (!table) continue
    for (let level = 1; level < config.equipment.levelCount; level += 1) {
      const count = levels.get(level) ?? 0
      if (count >= config.equipment.mergeInputs) { const promoted = Math.floor(count / config.equipment.mergeInputs); levels.set(level, count % config.equipment.mergeInputs); levels.set(level + 1, (levels.get(level + 1) ?? 0) + promoted) }
    }
    for (const [level, count] of levels) if (count > 0) { if (table.slot === 'weapon') highestWeaponLevel = Math.max(highestWeaponLevel, level); else highestGemLevel = Math.max(highestGemLevel, level) }
  }
  const countSlot = (slot: 'weapon' | 'gem') => [...counts].reduce((sum, [id, levels]) => sum + (tables[id]?.slot === slot ? [...levels.values()].reduce((a, b) => a + b, 0) : 0), 0)
  const weapon = countSlot('weapon'); const gem = countSlot('gem')
  return { weapon, gem, total: weapon + gem, highestWeaponLevel, highestGemLevel, highest: Math.max(highestWeaponLevel, highestGemLevel) }
}

export function simulateEconomy(scenario: SimulationScenario, days: SimulationPeriodDays, seed = 1, config: BalanceV1 = balanceV1, speed: 1 | 3 = 1): SimulationResult {
  if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('Simulation seed must be a non-negative safe integer')
  const random = seeded(seed); const minutes = (config.simulation.minutesPerDay[scenario] ?? fallbackMinutes[scenario]) * days
  const plannedWaves = Math.floor(minutes / 2); const killTable: Readonly<Record<string, number>> = config.gold.killReward !== balanceV1.gold.killReward ? Object.fromEntries(Object.keys(config.rewardSources.enemyKillGold).map((id) => [id, config.gold.killReward])) : config.rewardSources.enemyKillGold; const enemies = Object.keys(killTable); const enemiesPerWave = config.simulation.enemiesPerWave
  const energyConfig = { baseCap: config.commandEnergy.cap, regenIntervalMs: config.commandEnergy.regenIntervalMs }; let energyState: CommandEnergyState = { current: config.commandEnergy.cap, regenAnchorAtMs: 0 }; let wavesStarted = 0
  for (let wave = 0; wave < plannedWaves; wave += 1) { const nowMs = (wave + 1) * config.commandEnergy.regenIntervalMs; const resolved = resolveCommandEnergyRegen(energyState, nowMs, energyConfig); if (resolved.status === 'invalid-clock') break; energyState = resolved.state; const spent = spendCommandEnergy(energyState, config.commandEnergy.waveCost, nowMs, energyConfig); if (spent.status !== 'spent') break; energyState = spent.state; wavesStarted += 1 }
  let goldEarned = 0; let knbEarned = Math.floor(minutes * 60_000 / config.activePlay.intervalMs) * config.activePlay.knbPerInterval; let anhHonEarned = 0
  const stageReward = config.rewardSources.stageClear.prototypeStage; const stageClears = Math.floor(wavesStarted / 10)
  for (let index = 0; index < wavesStarted * enemiesPerWave; index += 1) goldEarned += killTable[enemies[index % enemies.length]] ?? 0
  goldEarned += stageClears * stageReward.gold; knbEarned += stageClears * stageReward.knb; anhHonEarned += stageClears * (stageReward.anhHon ?? 0) + Math.floor(minutes / 60 * config.evolution.anhHonPerEligibleHour)
  const gachaPulls = Math.floor(goldEarned / config.gold.gachaPullCost); const outcomes: Record<string, number> = {}; const equipment = new Map<string, Map<number, number>>(); let goldFromGacha = 0; let binhPhuAcquired = 0
  const addEquipment = (id: string) => { const levels = equipment.get(id) ?? new Map<number, number>(); levels.set(1, (levels.get(1) ?? 0) + 1); equipment.set(id, levels) }
  for (let index = 0; index < gachaPulls; index += 1) { const outcome = weightedKey(config.gacha.weights, random); outcomes[outcome] = (outcomes[outcome] ?? 0) + 1; if (outcome === 'gold') goldFromGacha += config.gacha.goldReturn; else if (outcome === 'weapon') addEquipment('green-dragon-blade'); else if (outcome === 'gem') addEquipment('swift-jade'); else binhPhuAcquired += 1 }
  const recruitmentPulls = Math.floor(knbEarned / config.knbShop.chieuHienLenh); const owned = new Set<string>(config.simulation.startingHeroIds); const shards: Record<string, number> = {}
  for (let index = 0; index < recruitmentPulls; index += 1) { const hero = weightedKey(config.recruitment.weights, random); if (owned.has(hero)) { const id = `shard_hero_${hero}`; shards[id] = (shards[id] ?? 0) + config.recruitment.duplicateShards } else owned.add(hero) }
  const starsByHero = new Map<string, number>([...owned].map((heroId) => [heroId, 1])); let anhHonSpent = 0
  for (const heroId of owned) { const shardId = `shard_hero_${heroId}`; let star = 1; let shardCount = shards[shardId] ?? 0; while (star < config.stars.max) { const required = config.stars.shardCosts[(star + 1) as 2 | 3 | 4 | 5]; if (shardCount < required) break; shardCount -= required; star += 1 } starsByHero.set(heroId, star); shards[shardId] = shardCount }
  const evolvedStages = days >= 30 ? Math.min(3, Math.floor(anhHonEarned / config.evolution.anhHonCosts.rebirth)) : 0; anhHonSpent = evolvedStages * config.evolution.anhHonCosts.rebirth
  const equipmentSummary = mergeEquipment(equipment, config); const goldSpent = gachaPulls * config.gold.gachaPullCost; const knbSpent = recruitmentPulls * config.knbShop.chieuHienLenh; const goldRemaining = goldEarned + goldFromGacha - goldSpent; const knbRemaining = knbEarned - knbSpent
  const distribution = [2, 3, 4, 5].map((star) => [...starsByHero.values()].filter((value) => value === star).length); const stars = [...starsByHero.values()].reduce((sum, value) => sum + value, 0)
  const weaponAcquired = outcomes.weapon ?? 0; const gemAcquired = outcomes.gem ?? 0
  return { scenario, days, speed, waves: plannedWaves, wavesStarted, wavesBlockedByEnergy: plannedWaves - wavesStarted, commandEnergyRemaining: energyState.current, binhPhuAcquired, binhPhuUsed: 0, gold: goldRemaining, goldEarned: goldEarned + goldFromGacha, goldSpent, goldRemaining, knb: knbRemaining, knbEarned, knbSpent, knbRemaining, gachaPulls, goldGachaOutcomes: outcomes, weaponAcquired, gemAcquired, highestWeaponLevel: equipmentSummary.highestWeaponLevel, highestGemLevel: equipmentSummary.highestGemLevel, highestEquipmentLevel: equipmentSummary.highest, equipmentInstancesRemaining: equipmentSummary.total, recruitmentPulls, ownedHeroes: owned.size, ownedHeroCount: owned.size, duplicateShards: Object.values(shards).reduce((sum, value) => sum + value, 0), remainingHeroShards: shards, stars, twoStarHeroes: distribution[0], threeStarHeroes: distribution[1], fourStarHeroes: distribution[2], fiveStarHeroes: distribution[3], anhHon: anhHonEarned - anhHonSpent, anhHonEarned, anhHonSpent, anhHonRemaining: anhHonEarned - anhHonSpent, evolutionProgress: evolvedStages > 0 ? `stage-${evolvedStages}` : 'normal' }
}

export function simulateMatrix(seed = 1, config: BalanceV1 = balanceV1): readonly SimulationResult[] { return (['casual', 'regular', 'active'] as const).flatMap((scenario) => ([1, 7, 30] as const).map((days) => simulateEconomy(scenario, days, seed, config))) }
export function goldGachaExpectedReturn(config: BalanceV1 = balanceV1): number { const total = Object.values(config.gacha.weights).reduce((sum, value) => sum + value, 0); return config.gacha.goldReturn * config.gacha.weights.gold / total }
