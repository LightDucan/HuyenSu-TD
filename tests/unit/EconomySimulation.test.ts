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
    const changed = { ...balanceV1, gold: { ...balanceV1.gold, killReward: 9 } }
    expect(simulateEconomy('regular', 1, 4, changed).goldEarned).toBeGreaterThan(simulateEconomy('regular', 1, 4).goldEarned)
  })
})
