import { describe, expect, it, vi } from 'vitest'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { refreshPlacedHeroRuntimeStats } from '../../src/game/runtime/PlacedHeroRuntimeStats'
import { saveEquipmentAndRefresh, saveProgressionAndRefresh } from '../../src/ui/HeroRuntimeRefreshActions'
import { loadEquipment } from '../../src/domain/equipment/EquipmentStorage'
import { loadProgression, type StorageLike } from '../../src/domain/progression/ProgressionStorage'
import type { HeroBaseStats } from '../../src/domain/progression/StatCalculator'

const initialStats: HeroBaseStats = {
  hp: 100,
  atk: 40,
  range: 100,
  attackSpeed: 1,
  crit: 0.1,
  critDamage: 1.5,
}

function memoryStorage(): StorageLike {
  const values = new Map<string, string>()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
  }
}

describe('placed Hero runtime stats refresh', () => {
  it('is a safe no-op when the Hero is not placed', () => {
    const calculateStats = vi.fn(() => initialStats)

    expect(refreshPlacedHeroRuntimeStats(undefined, calculateStats)).toBe(false)
    expect(calculateStats).not.toHaveBeenCalled()
  })

  it('updates shared stats and range without replacing the runtime', () => {
    const refreshStats = vi.fn()
    const setRadius = vi.fn()
    const runtime = {
      stats: initialStats,
      combatController: { refreshStats },
      rangeVisual: { setRadius },
    }
    const nextStats = { ...initialStats, atk: 75, range: 140, attackSpeed: 1.4 }

    expect(refreshPlacedHeroRuntimeStats(runtime, () => nextStats)).toBe(true)
    expect(runtime.stats).toBe(nextStats)
    expect(refreshStats).toHaveBeenCalledWith(nextStats)
    expect(setRadius).toHaveBeenCalledWith(140)
  })
})

describe('Hero persistence refresh commands', () => {
  it('dispatches the exact Hero ID through BattleBridge and supports unsubscribe', () => {
    const bridge = new BattleBridge()
    const listener = vi.fn()
    const unsubscribe = bridge.onPlacedHeroStatsRefresh(listener)

    bridge.refreshPlacedHeroStats('quan-vu')
    unsubscribe()
    bridge.refreshPlacedHeroStats('trieu-van')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith('quan-vu')
  })

  it('upgrade and advance saves dispatch refresh for the correct Hero', () => {
    const storage = memoryStorage()
    const refreshPlacedHeroStats = vi.fn()
    const port = { refreshPlacedHeroStats }

    saveProgressionAndRefresh(storage, port, 'quan-vu', { stage: 'normal', level: 2 })
    saveProgressionAndRefresh(storage, port, 'trieu-van', { stage: 'rebirth', level: 1 })

    expect(loadProgression(storage).heroes).toMatchObject({
      'quan-vu': { stage: 'normal', level: 2 },
      'trieu-van': { stage: 'rebirth', level: 1 },
    })
    expect(refreshPlacedHeroStats.mock.calls).toEqual([['quan-vu'], ['trieu-van']])
  })

  it('equip and unequip saves dispatch refresh for the correct Hero', () => {
    const storage = memoryStorage()
    const refreshPlacedHeroStats = vi.fn()
    const port = { refreshPlacedHeroStats }

    saveEquipmentAndRefresh(storage, port, 'quan-vu', { weaponId: 'weapon-bronze' })
    saveEquipmentAndRefresh(storage, port, 'quan-vu', { weaponId: undefined })

    expect(loadEquipment(storage).heroes['quan-vu']).toEqual({})
    expect(refreshPlacedHeroStats.mock.calls).toEqual([['quan-vu'], ['quan-vu']])
  })
})
