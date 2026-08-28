import type { HeroCombatStats } from '../../domain/combat/types'

export const leChan = {
  id: 'le-chan', name: 'Lê Chân', faction: 'Lạc Việt', archetype: 'near-melee',
  baseStats: { hp: 1450, atk: 40, range: 155, attackSpeed: 1.1, crit: 0.2, critDamage: 1.75 } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 5, activeSkillId: 'song-trao-hai-tan',
  presentation: { skinId: 'hbt-le-chan-placeholder', animationSetId: 'fallback-melee' },
} as const
