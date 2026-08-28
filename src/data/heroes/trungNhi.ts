import type { HeroCombatStats } from '../../domain/combat/types'

export const trungNhi = {
  id: 'trung-nhi', name: 'Trưng Nhị', faction: 'Lạc Việt', archetype: 'bow',
  baseStats: { hp: 950, atk: 33, range: 270, attackSpeed: 1.4, crit: 0.23, critDamage: 1.65 } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 7, activeSkillId: 'lien-hoan-lac-tien',
  presentation: { skinId: 'hbt-trung-nhi-placeholder', animationSetId: 'fallback-ranged' },
} as const
