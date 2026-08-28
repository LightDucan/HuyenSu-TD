import type { HeroCombatStats } from '../combat/types'
import { MAX_HERO_LEVEL, stageStatMultiplier, type HeroProgression } from './ProgressionSystem'
import type { HeroStar } from '../meta/HeroRecruitment'

export type HeroBaseStats = HeroCombatStats & { hp: number }
export type StatModifier = Partial<Pick<HeroCombatStats, 'atk' | 'range' | 'attackSpeed'>>
export type LegendaryPassiveStatModifier = Readonly<{ atkPercent?: number; attackSpeedPercent?: number }>

export function calculateHeroStats(base: HeroBaseStats, progression: HeroProgression, weapon: StatModifier = {}, gem: StatModifier = {}, star: HeroStar = 1, starGrowth: Partial<Record<HeroStar, Partial<HeroBaseStats>>> = {}, passive?: LegendaryPassiveStatModifier): HeroBaseStats {
  if (progression.level < 1 || progression.level > MAX_HERO_LEVEL) throw new RangeError('Hero level must be between 1 and 100')
  const growth = 1 + (progression.level - 1) * 0.02
  const multiplier = growth * stageStatMultiplier(progression.stage)
  const growthStats = starGrowth[star] ?? {}
  const atk = Math.round((base.atk * multiplier) + (weapon.atk ?? 0) + (gem.atk ?? 0)) + (growthStats.atk ?? 0)
  const attackSpeed = base.attackSpeed + (weapon.attackSpeed ?? 0) + (gem.attackSpeed ?? 0) + (growthStats.attackSpeed ?? 0)
  return {
    hp: Math.round(base.hp * multiplier) + (growthStats.hp ?? 0),
    atk: Math.round(atk * (1 + (passive?.atkPercent ?? 0))),
    range: base.range + (weapon.range ?? 0) + (gem.range ?? 0) + (growthStats.range ?? 0),
    attackSpeed: attackSpeed * (1 + (passive?.attackSpeedPercent ?? 0)),
    crit: base.crit + (growthStats.crit ?? 0),
    critDamage: base.critDamage + (growthStats.critDamage ?? 0),
  }
}
