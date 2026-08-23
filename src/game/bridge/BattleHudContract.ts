import type { EnemyCategory } from '../../data/enemies/definitions'
import type { GameSpeed } from '../../domain/clock/GameClock'
import type { BattleSnapshot } from './BattleBridge'

export type BattleHudData = Readonly<{
  speed: GameSpeed
  wave: number
  totalWaves: number
  cityHp: number
  battleStatus: 'running' | 'won' | 'lost'
  heroPlaced: boolean
  enemiesDefeated: number
  enemiesEscaped: number
  remainingByCategory: Readonly<Record<EnemyCategory, number>>
}>

export function toBattleHudData(snapshot: BattleSnapshot): BattleHudData {
  return {
    speed: snapshot.speed,
    wave: snapshot.wave,
    totalWaves: snapshot.totalWaves,
    cityHp: snapshot.cityHp,
    battleStatus: snapshot.battleStatus,
    heroPlaced: snapshot.heroPlaced,
    enemiesDefeated: snapshot.enemiesDefeated,
    enemiesEscaped: snapshot.enemiesEscaped,
    remainingByCategory: snapshot.remainingByCategory,
  }
}
