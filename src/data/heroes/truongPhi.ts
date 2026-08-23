import type { HeroCombatStats } from '../../domain/combat/types'

export const truongPhi = {
  id: 'truong-phi',
  name: 'Trương Phi',
  faction: 'Thục',
  archetype: 'mid-melee',
  baseStats: {
    hp: 1400,
    atk: 42,
    range: 160,
    attackSpeed: 0.95,
    crit: 0.1,
    critDamage: 1.6,
  } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 6,
  activeSkillId: 'ba-xa-gam-vang',
  presentation: {
    skinId: 'prototype-truong-phi',
    animationSetId: 'prototype-heavy-spear',
  },
} as const
