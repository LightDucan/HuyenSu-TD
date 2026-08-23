import { resolveEquipmentModifiers, type EquipmentDefinition, type HeroEquipment } from './EquipmentSystem'
import { calculateHeroStats, type HeroBaseStats } from '../progression/StatCalculator'
import type { HeroProgression } from '../progression/ProgressionSystem'

export function calculateHeroLoadoutStats(
  baseStats: HeroBaseStats,
  progression: HeroProgression,
  equipment: HeroEquipment,
  definitions: Readonly<Record<string, EquipmentDefinition>>,
): HeroBaseStats {
  const { weapon, gem } = resolveEquipmentModifiers(equipment, definitions)
  return calculateHeroStats(baseStats, progression, weapon, gem)
}
