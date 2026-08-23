import type { HeroCombatStats } from '../../domain/combat/types'

export const giaCatLuong = {
  id: 'gia-cat-luong',
  name: 'Gia Cát Lượng',
  faction: 'Thục',
  archetype: 'magic',
  baseStats: {
    hp: 850,
    atk: 32,
    range: 240,
    attackSpeed: 1.0,
    crit: 0.15,
    critDamage: 1.5,
  } satisfies HeroCombatStats & { hp: number },
  skillTriggerHits: 4,
  activeSkillId: 'dong-phong-hoa-tran',
  presentation: {
    skinId: 'prototype-gia-cat-luong',
    animationSetId: 'prototype-magic',
  },
} as const
