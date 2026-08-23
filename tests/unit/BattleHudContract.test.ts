import { describe, expect, it } from 'vitest'
import { toBattleHudData } from '../../src/game/bridge/BattleHudContract'

describe('BattleHudContract', () => {
  it('maps only the discrete bridge snapshot fields needed by the HUD', () => {
    expect(toBattleHudData({
      speed: 3,
      wave: 4,
      totalWaves: 10,
      cityHp: 8,
      battleStatus: 'running',
      heroPlaced: true,
      enemiesSpawned: 11,
      enemiesDefeated: 7,
      enemiesEscaped: 1,
      remainingByCategory: { sword: 2, archer: 1, other: 0 },
    })).toEqual({
      speed: 3,
      wave: 4,
      totalWaves: 10,
      cityHp: 8,
      battleStatus: 'running',
      heroPlaced: true,
      enemiesDefeated: 7,
      enemiesEscaped: 1,
      remainingByCategory: { sword: 2, archer: 1, other: 0 },
    })
  })
})
