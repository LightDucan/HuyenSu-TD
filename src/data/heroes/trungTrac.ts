import type { HeroCombatStats } from '../../domain/combat/types'

export const trungTrac = {
  id: 'trung-trac', name: 'Trưng Trắc', faction: 'Lạc Việt', archetype: 'mid-melee',
  baseStats: { hp: 1250, atk: 36, range: 170, attackSpeed: 1.2, crit: 0.15, critDamage: 1.5 } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 5, activeSkillId: 'trong-dong-lenh-vuong',
  presentation: { skinId: 'hbt-trung-trac-placeholder', animationSetId: 'fallback-melee' },
} as const
