import type { CombatEnemy, HeroCombatStats, Vector2 } from '../combat/types'

export type SkillEffect =
  | { type: 'damage'; atkMultiplier: number }
  | { type: 'aoe'; radius: number; maxTargets?: number }
  | { type: 'slow'; ratio: number; durationMs: number }
  | { type: 'stun'; durationMs: number }
  | { type: 'root'; durationMs: number }
  | { type: 'multiHit'; hits: number; intervalMs: number }

export type SkillDefinition = Readonly<{ id: string; name: string; effects: readonly SkillEffect[] }>
export type SkillResult = Readonly<{ affectedEnemyIds: string[]; killedEnemyIds: string[] }>

export function resolveSkill(skill: SkillDefinition, origin: Vector2, stats: HeroCombatStats, enemies: readonly CombatEnemy[]): SkillResult {
  const aoe = skill.effects.find((effect): effect is Extract<SkillEffect, { type: 'aoe' }> => effect.type === 'aoe')
  const damage = skill.effects.find((effect): effect is Extract<SkillEffect, { type: 'damage' }> => effect.type === 'damage')
  if (!damage) return { affectedEnemyIds: [], killedEnemyIds: [] }
  const candidates = enemies.filter((enemy) => enemy.alive).filter((enemy) => !aoe || Math.hypot(enemy.position.x - origin.x, enemy.position.y - origin.y) <= aoe.radius)
  const targets = (aoe ? candidates.sort((a, b) => b.pathProgress - a.pathProgress).slice(0, aoe.maxTargets) : candidates.slice(0, 1))
  const killedEnemyIds: string[] = []
  targets.forEach((enemy) => {
    enemy.hp = Math.max(0, enemy.hp - stats.atk * damage.atkMultiplier)
    enemy.alive = enemy.hp > 0
    if (!enemy.alive) killedEnemyIds.push(enemy.id)
  })
  return { affectedEnemyIds: targets.map((enemy) => enemy.id), killedEnemyIds }
}
