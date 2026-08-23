import type { HeroCombatStats } from '../../domain/combat/types'

export const trieuVan = {
  id: 'trieu-van',
  name: 'Triệu Vân',
  faction: 'Thục',
  archetype: 'near-melee',
  baseStats: {
    hp: 1100,
    atk: 28,
    range: 140,
    attackSpeed: 1.6,
    crit: 0.2,
    critDamage: 1.5,
  } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 4,
  activeSkillId: 'that-tien-that-xuat',
  presentation: {
    skinId: 'prototype-trieu-van',
    animationSetId: 'prototype-spear',
  },
} as const
