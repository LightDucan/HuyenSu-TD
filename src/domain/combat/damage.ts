import type { AttackResult, CombatEnemy, HeroCombatStats } from './types'

export function resolveNormalAttack(
  stats: HeroCombatStats,
  target: CombatEnemy,
  random: () => number = Math.random,
): AttackResult {
  const critical = random() < stats.crit
  const damage = stats.atk * (critical ? stats.critDamage : 1)
  target.hp = Math.max(0, target.hp - damage)
  target.alive = target.hp > 0

  return {
    targetId: target.id,
    damage,
    critical,
    killed: !target.alive,
  }
}
