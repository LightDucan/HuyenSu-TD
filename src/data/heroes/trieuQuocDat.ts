import type { HeroCombatStats } from '../../domain/combat/types'

export const trieuQuocDat = {
  id: 'trieu-quoc-dat', name: 'Triệu Quốc Đạt', faction: 'Nghĩa quân Cửu Chân', archetype: 'near-melee',
  baseStats: { hp: 1380, atk: 35, range: 155, attackSpeed: 1.15, crit: 0.15, critDamage: 1.5 } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 5, activeSkillId: 'hieu-trieu-quan-yen',
  presentation: { skinId: 'trieu-quoc-dat-placeholder', animationSetId: 'fallback-melee' },
} as const
