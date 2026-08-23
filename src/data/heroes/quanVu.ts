import type { HeroCombatStats } from '../../domain/combat/types'

export const quanVu = {
  id: 'quan-vu',
  name: 'Quan Vũ',
  faction: 'Thục',
  archetype: 'mid-melee',
  baseStats: {
    hp: 1200,
    atk: 34,
    range: 170,
    attackSpeed: 1.25,
    crit: 0.15,
    critDamage: 1.5,
  } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 5,
  activeSkillId: 'thanh-long-tram',
  presentation: {
    skinId: 'prototype-quan-vu',
    animationSetId: 'prototype-melee',
  },
} as const
