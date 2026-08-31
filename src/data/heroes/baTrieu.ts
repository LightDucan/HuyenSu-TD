import type { HeroCombatStats } from '../../domain/combat/types'

export const baTrieu = {
  id: 'ba-trieu', name: 'Bà Triệu', faction: 'Nghĩa quân Cửu Chân', archetype: 'mid-melee',
  baseStats: { hp: 1280, atk: 38, range: 175, attackSpeed: 1.2, crit: 0.18, critDamage: 1.6 } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 5, activeSkillId: 'gio-manh-nui-nua',
  presentation: { skinId: 'ba-trieu-placeholder', animationSetId: 'fallback-melee' },
} as const
