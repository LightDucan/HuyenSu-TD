export type Vector2 = Readonly<{ x: number; y: number }>

export type CombatEnemy = {
  id: string
  position: Vector2
  pathProgress: number
  hp: number
  maxHp: number
  alive: boolean
}

export type HeroCombatStats = Readonly<{
  atk: number
  range: number
  attackSpeed: number
  crit: number
  critDamage: number
}>

export type AttackResult = Readonly<{
  targetId: string
  damage: number
  critical: boolean
  killed: boolean
}>

export type CombatTickResult = Readonly<{ attack: AttackResult; skillTriggered: boolean }>
