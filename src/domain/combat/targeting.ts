import type { CombatEnemy, Vector2 } from './types'

function distanceSquared(a: Vector2, b: Vector2): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return dx * dx + dy * dy
}

export function selectTarget(
  heroPosition: Vector2,
  range: number,
  enemies: readonly CombatEnemy[],
): CombatEnemy | undefined {
  const rangeSquared = range * range

  return enemies
    .filter((enemy) => enemy.alive && distanceSquared(heroPosition, enemy.position) <= rangeSquared)
    .sort((a, b) => b.pathProgress - a.pathProgress)[0]
}
