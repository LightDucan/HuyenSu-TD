import type { HeroCombatStats } from '../../domain/combat/types'

export const hoangTrung = {
  id: 'hoang-trung',
  name: 'Hoàng Trung',
  faction: 'Thục',
  archetype: 'bow',
  baseStats: {
    hp: 900,
    atk: 38,
    range: 280,
    attackSpeed: 1.1,
    crit: 0.25,
    critDamage: 1.75,
  } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 5,
  activeSkillId: 'bach-bo-xuyen-duong',
  presentation: {
    skinId: 'prototype-hoang-trung',
    animationSetId: 'prototype-bow',
  },
} as const
