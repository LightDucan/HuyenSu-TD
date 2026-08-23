import { resolveNormalAttack } from './damage'
import { selectTarget } from './targeting'
import type { AttackResult, CombatEnemy, HeroCombatStats, Vector2 } from './types'
import { AttackCounter } from '../skills/AttackCounter'
import type { CombatTickResult } from './types'

export class CombatController {
  private cooldownRemainingMs = 0
  private readonly attackCounter: AttackCounter

  constructor(
    private readonly heroPosition: Vector2,
    private readonly stats: HeroCombatStats,
    private readonly random: () => number = Math.random,
    skillTriggerHits = 999_999,
  ) { this.attackCounter = new AttackCounter(skillTriggerHits) }

  update(deltaMs: number, enemies: readonly CombatEnemy[]): CombatTickResult | undefined {
    this.cooldownRemainingMs = Math.max(0, this.cooldownRemainingMs - deltaMs)
    if (this.cooldownRemainingMs > 0) return undefined

    const target = selectTarget(this.heroPosition, this.stats.range, enemies)
    if (!target) return undefined

    this.cooldownRemainingMs = 1000 / this.stats.attackSpeed
    const attack = resolveNormalAttack(this.stats, target, this.random)
    return { attack, skillTriggered: this.attackCounter.registerHit() }
  }
}
