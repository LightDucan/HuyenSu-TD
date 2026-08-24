import type { GameSpeed } from '../../domain/clock/GameClock'
import type { EnemyCategory } from '../../data/enemies/definitions'
import type { HeroPlacement } from '../../domain/placement/HeroPlacementRegistry'

export type BattleSnapshot = Readonly<{
  speed: GameSpeed
  enemiesSpawned: number
  enemiesEscaped: number
  enemiesDefeated: number
  placedHeroes: readonly HeroPlacement[]
  selectedHeroId: string
  wave: number
  totalWaves: number
  cityHp: number
  battleStatus: 'running' | 'won' | 'lost'
  remainingByCategory: Record<EnemyCategory, number>
}>

type SnapshotListener = (snapshot: BattleSnapshot) => void
type HeroStatsRefreshListener = (heroId: string) => void

export class BattleBridge {
  private speed: GameSpeed = 1
  private selectedHeroId = 'quan-vu'
  private snapshotListeners = new Set<SnapshotListener>()
  private speedListeners = new Set<(speed: GameSpeed) => void>()
  private heroSelectionListeners = new Set<(heroId: string) => void>()
  private heroStatsRefreshListeners = new Set<HeroStatsRefreshListener>()

  setSpeed(speed: GameSpeed): void {
    if (this.speed === speed) return
    this.speed = speed
    this.speedListeners.forEach((listener) => listener(speed))
  }

  getSpeed(): GameSpeed {
    return this.speed
  }

  onSpeedChange(listener: (speed: GameSpeed) => void): () => void {
    this.speedListeners.add(listener)
    return () => this.speedListeners.delete(listener)
  }

  setSelectedHeroId(heroId: string): void {
    if (this.selectedHeroId === heroId) return
    this.selectedHeroId = heroId
    this.heroSelectionListeners.forEach((listener) => listener(heroId))
  }

  getSelectedHeroId(): string {
    return this.selectedHeroId
  }

  onHeroSelectionChange(listener: (heroId: string) => void): () => void {
    this.heroSelectionListeners.add(listener)
    return () => this.heroSelectionListeners.delete(listener)
  }

  refreshPlacedHeroStats(heroId: string): void {
    this.heroStatsRefreshListeners.forEach((listener) => listener(heroId))
  }

  onPlacedHeroStatsRefresh(listener: HeroStatsRefreshListener): () => void {
    this.heroStatsRefreshListeners.add(listener)
    return () => this.heroStatsRefreshListeners.delete(listener)
  }

  emitSnapshot(snapshot: BattleSnapshot): void {
    this.snapshotListeners.forEach((listener) => listener(snapshot))
  }

  onSnapshot(listener: SnapshotListener): () => void {
    this.snapshotListeners.add(listener)
    return () => this.snapshotListeners.delete(listener)
  }
}

export const battleBridge = new BattleBridge()
