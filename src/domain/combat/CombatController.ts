import { resolveNormalAttack } from './damage'
import { selectTarget } from './targeting'
import type { AttackResult, CombatEnemy, HeroCombatStats, Vector2 } from './types'

export class CombatController {
  private cooldownRemainingMs = 0

  constructor(
    private readonly heroPosition: Vector2,
    private readonly stats: HeroCombatStats,
    private readonly random: () => number = Math.random,
  ) {}

  update(deltaMs: number, enemies: readonly CombatEnemy[]): AttackResult | undefined {
    this.cooldownRemainingMs = Math.max(0, this.cooldownRemainingMs - deltaMs)
    if (this.cooldownRemainingMs > 0) return undefined

    const target = selectTarget(this.heroPosition, this.stats.range, enemies)
    if (!target) return undefined

    this.cooldownRemainingMs = 1000 / this.stats.attackSpeed
    return resolveNormalAttack(this.stats, target, this.random)
  }
}
