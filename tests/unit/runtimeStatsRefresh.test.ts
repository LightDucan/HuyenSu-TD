import { describe, expect, it, vi } from 'vitest'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { refreshPlacedHeroRuntimeStats } from '../../src/game/runtime/PlacedHeroRuntimeStats'
import type { HeroBaseStats } from '../../src/domain/progression/StatCalculator'

const initialStats: HeroBaseStats = {
  hp: 100,
  atk: 40,
  range: 100,
  attackSpeed: 1,
  crit: 0.1,
  critDamage: 1.5,
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
})
