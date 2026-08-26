import type { EnemyCategory } from '../../data/enemies/definitions'
import type { GameSpeed } from '../../domain/clock/GameClock'
import type { HeroPlacement } from '../../domain/placement/HeroPlacementRegistry'
import type { WaveStatus } from '../../domain/waves/WaveManager'
import type { BattleSnapshot } from './BattleBridge'

export type BattleHudData = Readonly<{
  speed: GameSpeed
  wave: number
  totalWaves: number
  waveStatus: WaveStatus
  cityHp: number
  battleStatus: 'running' | 'won' | 'lost'
  placedHeroes: readonly HeroPlacement[]
  selectedHeroId: string
  enemiesDefeated: number
  enemiesEscaped: number
  remainingByCategory: Readonly<Record<EnemyCategory, number>>
}>

export function toBattleHudData(snapshot: BattleSnapshot): BattleHudData {
  return {
    speed: snapshot.speed,
    wave: snapshot.wave,
    totalWaves: snapshot.totalWaves,
    waveStatus: snapshot.waveStatus,
    cityHp: snapshot.cityHp,
    battleStatus: snapshot.battleStatus,
    placedHeroes: snapshot.placedHeroes,
    selectedHeroId: snapshot.selectedHeroId,
    enemiesDefeated: snapshot.enemiesDefeated,
    enemiesEscaped: snapshot.enemiesEscaped,
    remainingByCategory: snapshot.remainingByCategory,
  }
}
