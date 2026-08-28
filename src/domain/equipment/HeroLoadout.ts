import { resolveEquipmentModifiers, type EquipmentDefinition, type HeroEquipment } from './EquipmentSystem'
import { calculateHeroStats, type HeroBaseStats } from '../progression/StatCalculator'
import type { HeroProgression } from '../progression/ProgressionSystem'
import { resolveHeroEquipmentV2 } from './EquipmentV2'
import type { EquipmentV2Definition } from './EquipmentSystem'
import type { MetaState } from '../meta/MetaState'
import { prototypeHeroRecruitmentConfig, resolveLegendaryPassive, type RecruitmentConfig } from '../meta/HeroRecruitment'

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
  state: MetaState,
  heroId: string,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
  recruitmentConfig: RecruitmentConfig = prototypeHeroRecruitmentConfig,
): HeroBaseStats {
  const { weapon, gem } = resolveHeroEquipmentV2(state, heroId, definitions)
  const owned = state.heroCollection[heroId]
  const star = owned?.stars ?? 1
  const passive = resolveLegendaryPassive(heroId, progression.stage, recruitmentConfig)
  return calculateHeroStats(baseStats, progression, weapon, gem, star, recruitmentConfig.starGrowth, passive)
}
