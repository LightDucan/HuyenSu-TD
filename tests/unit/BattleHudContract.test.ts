import { describe, expect, it } from 'vitest'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { toBattleHudData } from '../../src/game/bridge/BattleHudContract'

describe('BattleHudContract', () => {
  it('maps only the discrete bridge snapshot fields needed by the HUD', () => {
    expect(toBattleHudData({
      runId: 'battle-test',
      speed: 3,
      wave: 4,
      totalWaves: 10,
      waveStatus: 'running',
      cityHp: 8,
      battleStatus: 'running',
      placedHeroes: [
        { heroId: 'quan-vu', slotId: 'slot-3-7' },
        { heroId: 'trieu-van', slotId: 'slot-4-7' },
      ],
      selectedHeroId: 'trieu-van',
      enemiesSpawned: 11,
      enemiesDefeated: 7,
      enemiesEscaped: 1,
      remainingByCategory: { sword: 2, archer: 1, other: 0 },
    })).toEqual({
      speed: 3,
      wave: 4,
      totalWaves: 10,
      waveStatus: 'running',
      cityHp: 8,
      battleStatus: 'running',
      placedHeroes: [
        { heroId: 'quan-vu', slotId: 'slot-3-7' },
        { heroId: 'trieu-van', slotId: 'slot-4-7' },
      ],
      selectedHeroId: 'trieu-van',
      enemiesDefeated: 7,
      enemiesEscaped: 1,
      remainingByCategory: { sword: 2, archer: 1, other: 0 },
    })
  })

  it('publishes a selected Hero change once and keeps it available to the Scene', () => {
    const bridge = new BattleBridge()
    const selections: string[] = []
    const unsubscribe = bridge.onHeroSelectionChange((heroId) => selections.push(heroId))

    bridge.setSelectedHeroId('trieu-van')
    bridge.setSelectedHeroId('trieu-van')

    expect(bridge.getSelectedHeroId()).toBe('trieu-van')
    expect(selections).toEqual(['trieu-van'])
    unsubscribe()
  })
})
