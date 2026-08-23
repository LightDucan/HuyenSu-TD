import { describe, expect, it } from 'vitest'
import { advanceStage, canUpgrade, stageStatMultiplier, upgradeLevel } from '../../src/domain/progression/ProgressionSystem'
import { calculateHeroStats } from '../../src/domain/progression/StatCalculator'

describe('ProgressionSystem', () => {
  it('keeps upgrade cooldown independent from battle time', () => {
    const state = upgradeLevel({ stage: 'normal', level: 1 }, 1_000, 500)
    expect(canUpgrade(state, 1_499)).toBe(false)
    expect(canUpgrade(state, 1_500)).toBe(true)
  })

  it('advances stage only at level 100 and resets to level 1', () => {
    expect(advanceStage({ stage: 'rebirth', level: 100 })).toEqual({ stage: 'reincarnation', level: 1 })
    expect(() => advanceStage({ stage: 'normal', level: 99 })).toThrow()
  })

  it('has a shared multiplier for every stage', () => {
    expect(stageStatMultiplier('legendary')).toBeGreaterThan(stageStatMultiplier('reincarnation'))
  })

  it('calculates level, stage and future equipment modifiers without changing crit rules', () => {
    const stats = calculateHeroStats(
      { hp: 100, atk: 20, range: 100, attackSpeed: 1, crit: 0.1, critDamage: 1.5 },
      { stage: 'rebirth', level: 2 },
      { atk: 5, range: 10 },
      { attackSpeed: 0.2 },
    )
    expect(stats).toMatchObject({ hp: 138, atk: 33, range: 110, attackSpeed: 1.2, crit: 0.1, critDamage: 1.5 })
  })
})
