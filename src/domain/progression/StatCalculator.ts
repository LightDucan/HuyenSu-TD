import type { HeroCombatStats } from '../combat/types'
import { MAX_HERO_LEVEL, stageStatMultiplier, type HeroProgression } from './ProgressionSystem'

export type HeroBaseStats = HeroCombatStats & { hp: number }
export type StatModifier = Partial<Pick<HeroCombatStats, 'atk' | 'range' | 'attackSpeed'>>

export function calculateHeroStats(base: HeroBaseStats, progression: HeroProgression, weapon: StatModifier = {}, gem: StatModifier = {}): HeroBaseStats {
  if (progression.level < 1 || progression.level > MAX_HERO_LEVEL) throw new RangeError('Hero level must be between 1 and 100')
  const growth = 1 + (progression.level - 1) * 0.02
  const multiplier = growth * stageStatMultiplier(progression.stage)
  return {
    hp: Math.round(base.hp * multiplier),
    atk: Math.round((base.atk * multiplier) + (weapon.atk ?? 0) + (gem.atk ?? 0)),
    range: base.range + (weapon.range ?? 0) + (gem.range ?? 0),
    attackSpeed: base.attackSpeed + (weapon.attackSpeed ?? 0) + (gem.attackSpeed ?? 0),
    crit: base.crit,
    critDamage: base.critDamage,
  }
}
