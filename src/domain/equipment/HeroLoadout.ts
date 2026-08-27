import { resolveEquipmentModifiers, type EquipmentDefinition, type HeroEquipment } from './EquipmentSystem'
import { calculateHeroStats, type HeroBaseStats } from '../progression/StatCalculator'
import type { HeroProgression } from '../progression/ProgressionSystem'
import { resolveHeroEquipmentV2 } from './EquipmentV2'
import type { EquipmentV2Definition } from './EquipmentSystem'
import type { MetaStateV4 } from '../meta/MetaState'

export function calculateHeroLoadoutStats(
  baseStats: HeroBaseStats,
  progression: HeroProgression,
  equipment: HeroEquipment,
  definitions: Readonly<Record<string, EquipmentDefinition>>,
): HeroBaseStats {
  const { weapon, gem } = resolveEquipmentModifiers(equipment, definitions)
  return calculateHeroStats(baseStats, progression, weapon, gem)
}

export function calculateHeroLoadoutStatsV2(
  baseStats: HeroBaseStats,
  progression: HeroProgression,
  state: MetaStateV4,
  heroId: string,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
): HeroBaseStats {
  const { weapon, gem } = resolveHeroEquipmentV2(state, heroId, definitions)
  return calculateHeroStats(baseStats, progression, weapon, gem)
}
