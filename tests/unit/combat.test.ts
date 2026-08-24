import { describe, expect, it } from 'vitest'
import { CombatController } from '../../src/domain/combat/CombatController'
import { resolveNormalAttack } from '../../src/domain/combat/damage'
import { selectTarget } from '../../src/domain/combat/targeting'
import type { CombatEnemy, HeroCombatStats } from '../../src/domain/combat/types'

const stats: HeroCombatStats = {
  atk: 40,
  range: 100,
  attackSpeed: 2,
  crit: 0.25,
  critDamage: 1.5,
}

function enemy(overrides: Partial<CombatEnemy> = {}): CombatEnemy {
  return {
    id: 'enemy',
    position: { x: 20, y: 0 },
    pathProgress: 0.2,
    hp: 100,
    maxHp: 100,
    alive: true,
    ...overrides,
  }
}

describe('targeting', () => {
  it('selects the alive enemy furthest along the path within range', () => {
    const early = enemy({ id: 'early', pathProgress: 0.2 })
    const leading = enemy({ id: 'leading', pathProgress: 0.7 })
    const outside = enemy({ id: 'outside', position: { x: 101, y: 0 }, pathProgress: 0.9 })

    expect(selectTarget({ x: 0, y: 0 }, 100, [early, outside, leading])?.id).toBe('leading')
  })
})

describe('normal attack', () => {
  it('applies a critical hit without adding special effects', () => {
    const target = enemy()
    const result = resolveNormalAttack(stats, target, () => 0.1)

    expect(result).toMatchObject({ damage: 60, critical: true, killed: false })
    expect(target.hp).toBe(40)
  })

  it('marks the enemy dead when hp reaches zero', () => {
    const target = enemy({ hp: 30 })
    const result = resolveNormalAttack(stats, target, () => 0.9)

    expect(result.killed).toBe(true)
    expect(target).toMatchObject({ hp: 0, alive: false })
  })
})

describe('CombatController', () => {
  it('uses attack speed as a shared battle-clock cooldown', () => {
    const target = enemy({ hp: 200, maxHp: 200 })
    const controller = new CombatController({ x: 0, y: 0 }, stats, () => 0.9)

    expect(controller.update(0, [target])).toBeDefined()
    expect(controller.update(499, [target])).toBeUndefined()
    expect(controller.update(1, [target])).toBeDefined()
  })

  it('preserves attack cooldown and skill charge when repositioned', () => {
    const target = enemy({ position: { x: 20, y: 0 }, hp: 500, maxHp: 500 })
    const controller = new CombatController({ x: 0, y: 0 }, stats, () => 0.9, 3)

    expect(controller.update(0, [target])?.skillTriggered).toBe(false)
    expect(controller.getSkillCharge()).toBe(1)

    controller.reposition({ x: 100, y: 0 })
    target.position = { x: 120, y: 0 }

    expect(controller.update(499, [target])).toBeUndefined()
    expect(controller.getSkillCharge()).toBe(1)
    expect(controller.update(1, [target])?.skillTriggered).toBe(false)
    expect(controller.update(500, [target])?.skillTriggered).toBe(true)
    expect(controller.getSkillCharge()).toBe(0)
  })

  it('uses refreshed ATK for the next attack', () => {
    const target = enemy({ hp: 500, maxHp: 500 })
    const controller = new CombatController({ x: 0, y: 0 }, stats, () => 0.9)

    expect(controller.update(0, [target])?.attack.damage).toBe(40)
    controller.refreshStats({ ...stats, atk: 75 })

    expect(controller.update(500, [target])?.attack.damage).toBe(75)
  })

  it('uses refreshed range when selecting the next target', () => {
    const target = enemy({ position: { x: 150, y: 0 }, hp: 500, maxHp: 500 })
    const controller = new CombatController({ x: 0, y: 0 }, stats, () => 0.9)

    expect(controller.update(0, [target])).toBeUndefined()
    controller.refreshStats({ ...stats, range: 160 })

    expect(controller.update(0, [target])).toBeDefined()
  })

  it('preserves the active cooldown and uses refreshed attack speed for the following cycle', () => {
    const target = enemy({ hp: 500, maxHp: 500 })
    const initialStats = { ...stats, attackSpeed: 1 }
    const controller = new CombatController({ x: 0, y: 0 }, initialStats, () => 0.9)

    expect(controller.update(0, [target])).toBeDefined()
    controller.refreshStats({ ...initialStats, attackSpeed: 2 })

    expect(controller.update(999, [target])).toBeUndefined()
    expect(controller.update(1, [target])).toBeDefined()
    expect(controller.update(499, [target])).toBeUndefined()
    expect(controller.update(1, [target])).toBeDefined()
  })

  it('preserves skill charge when stats refresh', () => {
    const target = enemy({ hp: 500, maxHp: 500 })
    const controller = new CombatController({ x: 0, y: 0 }, stats, () => 0.9, 3)

    expect(controller.update(0, [target])?.skillTriggered).toBe(false)
    expect(controller.getSkillCharge()).toBe(1)
    controller.refreshStats({ ...stats, atk: 80 })

    expect(controller.getSkillCharge()).toBe(1)
    expect(controller.update(500, [target])?.skillTriggered).toBe(false)
    expect(controller.update(500, [target])?.skillTriggered).toBe(true)
  })
})
