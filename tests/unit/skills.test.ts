import { describe, expect, it } from 'vitest'
import { AttackCounter } from '../../src/domain/skills/AttackCounter'
import { resolveSkill } from '../../src/domain/skills/SkillResolver'
import type { CombatEnemy } from '../../src/domain/combat/types'

describe('AttackCounter', () => {
  it('triggers and resets after the configured number of normal attacks', () => {
    const counter = new AttackCounter(3)
    expect(counter.registerHit()).toBe(false)
    expect(counter.getCurrentHits()).toBe(1)
    expect(counter.registerHit()).toBe(false)
    expect(counter.registerHit()).toBe(true)
    expect(counter.getCurrentHits()).toBe(0)
  })
})

describe('SkillResolver', () => {
  it('applies composable AoE + Damage without changing normal attack rules', () => {
    const enemies = [
      { id: 'near', position: { x: 20, y: 0 }, pathProgress: 0.6, hp: 50, maxHp: 50, alive: true },
      { id: 'far', position: { x: 200, y: 0 }, pathProgress: 0.8, hp: 50, maxHp: 50, alive: true },
    ]
    const result = resolveSkill({ id: 'slash', name: 'Slash', effects: [{ type: 'aoe', radius: 60 }, { type: 'damage', atkMultiplier: 2 }] }, { x: 0, y: 0 }, { atk: 30, range: 1, attackSpeed: 1, crit: 0, critDamage: 1 }, enemies)
    expect(result).toEqual({ affectedEnemyIds: ['near'], killedEnemyIds: ['near'] })
    expect(enemies[1].hp).toBe(50)
  })

  it('applies control and multi-hit through the same effect contract', () => {
    const enemy: CombatEnemy = { id: 'enemy', position: { x: 10, y: 0 }, pathProgress: 0, hp: 100, maxHp: 100, alive: true }
    resolveSkill({ id: 'control', name: 'Control', effects: [
      { type: 'damage', atkMultiplier: 1 }, { type: 'multiHit', hits: 2, intervalMs: 100 },
      { type: 'slow', ratio: 0.3, durationMs: 500 }, { type: 'stun', durationMs: 200 },
    ] }, { x: 0, y: 0 }, { atk: 20, range: 1, attackSpeed: 1, crit: 0, critDamage: 1 }, [enemy])
    expect(enemy.hp).toBe(60)
    expect(enemy.slow).toEqual({ ratio: 0.3, remainingMs: 500 })
    expect(enemy.immobilizedRemainingMs).toBe(200)
  })
})
