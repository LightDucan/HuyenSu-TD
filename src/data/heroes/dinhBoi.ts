import type { HeroCombatStats } from '../../domain/combat/types'

export const dinhBoi = {
  id: 'dinh-boi', name: 'Đinh Bôi', faction: 'Nghĩa quân Cửu Chân', archetype: 'bow',
  baseStats: { hp: 980, atk: 32, range: 260, attackSpeed: 1.35, crit: 0.2, critDamage: 1.6 } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 7, activeSkillId: 'giu-luy-bo-dien',
  presentation: { skinId: 'dinh-boi-placeholder', animationSetId: 'fallback-ranged' },
} as const
