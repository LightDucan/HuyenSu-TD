import type { HeroCombatStats } from '../../domain/combat/types'
import type { HeroBaseStats } from '../../domain/progression/StatCalculator'

export type RefreshablePlacedHeroRuntime = {
  stats: HeroBaseStats
  combatController: { refreshStats(stats: HeroCombatStats): void }
  rangeVisual: { setRadius(radius: number): unknown }
}

export function refreshPlacedHeroRuntimeStats<TRuntime extends RefreshablePlacedHeroRuntime>(
  runtime: TRuntime | undefined,
  calculateStats: (runtime: TRuntime) => HeroBaseStats,
): boolean {
  if (!runtime) return false

  const stats = calculateStats(runtime)
  runtime.stats = stats
  runtime.combatController.refreshStats(stats)
  runtime.rangeVisual.setRadius(stats.range)
  return true
}
