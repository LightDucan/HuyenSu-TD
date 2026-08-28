import { describe, expect, it } from 'vitest'
import { balanceV1 } from '../../src/data/economy/balanceV1'
import { goldGachaExpectedReturn, simulateEconomy, simulateMatrix } from '../../src/simulation/EconomySimulation'

describe('Phase 18 Balance V1 simulation', () => {
  it('is deterministic for the same seed and scenario', () => expect(simulateEconomy('regular', 30, 42)).toEqual(simulateEconomy('regular', 30, 42)))
  it('uses the seed for stochastic reward and recruitment outcomes', () => expect(simulateEconomy('active', 30, 1)).not.toEqual(simulateEconomy('active', 30, 2)))
  it('keeps Gold Gacha EV below pull cost and Binh Phu rarest', () => {
    expect(goldGachaExpectedReturn()).toBeLessThan(balanceV1.gold.gachaPullCost)
    const weights = balanceV1.gacha.weights
    expect(weights.largeBinhPhu).toBeLessThan(weights.gold)
    expect(weights.mediumBinhPhu).toBeLessThan(weights.gold)
    expect(weights.smallBinhPhu).toBeLessThan(weights.gold)
  })
  it('locks costs, caps and no third currency', () => {
    expect(balanceV1.recruitment.pulls).toEqual({ one: 1, ten: 10 })
    expect(balanceV1.stars.max).toBe(5)
    expect(Object.keys({ gold: 0, knb: 0 })).toEqual(['gold', 'knb'])
    expect(balanceV1.commandEnergy).toMatchObject({ cap: 60, regenIntervalMs: 120_000, waveCost: 1 })
  })
  it('produces safe 30-day matrix with non-negative finite values', () => {
    expect(simulateMatrix()).toHaveLength(9)
    for (const result of simulateMatrix()) for (const value of Object.values(result)) if (typeof value === 'number') expect(Number.isSafeInteger(value) && value >= 0).toBe(true)
  })
  it('x1 and x3 do not alter real-time economy outputs', () => {
    const x1 = simulateEconomy('active', 30, 7, balanceV1, 1)
    const x3 = simulateEconomy('active', 30, 7, balanceV1, 3)
    expect({ ...x1, speed: undefined }).toEqual({ ...x3, speed: undefined })
  })
  it('responds to centralized balance configuration changes', () => {
    const changed = { ...balanceV1, rewardSources: { ...balanceV1.rewardSources, enemyKillGold: { 'han-sword-infantry': 9, 'han-crossbow-soldier': 9, 'han-armored-guard': 9, 'boss-ma-vien': 9 } } }
    expect(simulateEconomy('regular', 1, 4, changed).goldEarned).toBeGreaterThan(simulateEconomy('regular', 1, 4).goldEarned)
  })
  it('uses weighted gacha and recruitment configuration rather than fixed ratios', () => {
    const gachaOnlyGold = { ...balanceV1, gacha: { ...balanceV1.gacha, weights: { gold: 1, weapon: 0, gem: 0, smallBinhPhu: 0, mediumBinhPhu: 0, largeBinhPhu: 0 } } }
    expect(simulateEconomy('active', 1, 2, gachaOnlyGold).goldGachaOutcomes.gold).toBeGreaterThan(0)
    const recruitmentOnlyTrieu = { ...balanceV1, recruitment: { ...balanceV1.recruitment, weights: { 'trung-trac': 0, 'trung-nhi': 1, 'le-chan': 0 } } }
    expect(simulateEconomy('active', 1, 2, recruitmentOnlyTrieu).ownedHeroCount).toBe(1)
  })
  it('keeps Hero shards separate, stars sequential, and evolution independent of stars', () => {
    const config = { ...balanceV1, simulation: { ...balanceV1.simulation, startingHeroIds: ['trung-trac'] as readonly string[] }, recruitment: { ...balanceV1.recruitment, weights: { 'trung-trac': 1, 'trung-nhi': 0, 'le-chan': 0 } } }
    const result = simulateEconomy('active', 30, 3, config)
    expect(result.remainingHeroShards).toHaveProperty('shard_hero_trung-trac')
    expect(result.remainingHeroShards).not.toHaveProperty('hero-shards')
    expect(result.evolutionProgress).toMatch(/stage-|normal/)
    expect(result.fiveStarHeroes).toBeGreaterThanOrEqual(0)
  })
  it('does not count Binh Phu as equipment and merges weapons/gems independently', () => {
    const result = simulateEconomy('active', 30, 9)
    expect(result.weaponAcquired + result.gemAcquired).toBeLessThanOrEqual(result.gachaPulls)
    expect(result.highestWeaponLevel).toBeLessThanOrEqual(10)
    expect(result.highestGemLevel).toBeLessThanOrEqual(10)
    expect(result.equipmentInstancesRemaining).toBeGreaterThanOrEqual(0)
  })
  it('uses stage Anh Hồn only and spends sequential evolution costs', () => {
    const result = simulateEconomy('casual', 1, 1)
    expect(result.anhHonEarned).toBe(10)
    expect(result.anhHonSpent).toBe(0)
    const staged = { ...balanceV1, simulation: { ...balanceV1.simulation, level100Readiness: { daysPerStage: 5 } }, rewardSources: { ...balanceV1.rewardSources, stageClear: { prototypeStage: { ...balanceV1.rewardSources.stageClear.prototypeStage, anhHon: 1000 } } } }
    const evolved = simulateEconomy('active', 30, 1, staged)
    expect(evolved.anhHonSpent).toBe(850)
    expect(evolved.evolutionProgress).toBe('stage-3')
  })
  it('allows Gold return to fund another pull and stops below pull cost', () => {
    const config = { ...balanceV1, rewardSources: { ...balanceV1.rewardSources, enemyKillGold: { 'han-sword-infantry': 9, 'han-crossbow-soldier': 9, 'han-armored-guard': 9, 'boss-ma-vien': 9 } }, gacha: { ...balanceV1.gacha, weights: { gold: 1, weapon: 0, gem: 0, smallBinhPhu: 0, mediumBinhPhu: 0, largeBinhPhu: 0 } } }
    const result = simulateEconomy('regular', 1, 1, config)
    expect(result.gachaPulls).toBeGreaterThan(0)
    expect(result.goldRemaining).toBeLessThan(config.gold.gachaPullCost)
  })
  it('uses configured wave timing and keeps x1/x3 parity', () => {
    const config = { ...balanceV1, simulation: { ...balanceV1.simulation, wavesPerHour: 60 }, gacha: { ...balanceV1.gacha, weights: { smallBinhPhu: 1, gold: 0, weapon: 0, gem: 0, mediumBinhPhu: 0, largeBinhPhu: 0 } } }
    const x1 = simulateEconomy('active', 1, 2, config, 1); const x3 = simulateEconomy('active', 1, 2, config, 3)
    expect(x1.waves).toBe(120); expect({ ...x1, speed: undefined }).toEqual({ ...x3, speed: undefined })
  })
  it('continues after blocked scheduled waves and awards only started-wave Gold', () => {
    const config = { ...balanceV1, simulation: { ...balanceV1.simulation, wavesPerHour: 120 }, gacha: { ...balanceV1.gacha, weights: { gold: 0, weapon: 1, gem: 0, smallBinhPhu: 0, mediumBinhPhu: 0, largeBinhPhu: 0 } } }
    const result = simulateEconomy('active', 1, 1, config)
    expect(result.wavesBlockedByEnergy).toBeGreaterThan(0)
    expect(result.wavesStarted).toBeGreaterThan(0)
    expect(result.goldEarnedFromGameplay).toBeLessThan(result.waves * 10 + result.waves * config.rewardSources.stageClear.prototypeStage.gold)
  })
  it('limits default 30-day readiness to one evolution transition', () => {
    const result = simulateEconomy('active', 30, 1)
    expect(balanceV1.simulation.level100Readiness.daysPerStage).toBe(30)
    expect(result.anhHonSpent).toBe(100)
    expect(result.evolutionProgress).toBe('stage-1')
  })
  it('allows exactly three sequential transitions with five-day readiness', () => {
    const config = { ...balanceV1, simulation: { ...balanceV1.simulation, level100Readiness: { daysPerStage: 5 } }, rewardSources: { ...balanceV1.rewardSources, stageClear: { prototypeStage: { ...balanceV1.rewardSources.stageClear.prototypeStage, anhHon: 1000 } } } }
    const result = simulateEconomy('active', 30, 1, config)
    expect(result.anhHonSpent).toBe(850)
    expect(result.evolutionProgress).toBe('stage-3')
  })
})
