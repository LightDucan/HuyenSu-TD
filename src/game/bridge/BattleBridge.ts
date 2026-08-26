import type { GameSpeed } from '../../domain/clock/GameClock'
import type { EnemyCategory } from '../../data/enemies/definitions'
import type { HeroPlacement } from '../../domain/placement/HeroPlacementRegistry'
import type { WaveStatus } from '../../domain/waves/WaveManager'

export type BattleSnapshot = Readonly<{
  runId: string
  speed: GameSpeed
  enemiesSpawned: number
  enemiesEscaped: number
  enemiesDefeated: number
  placedHeroes: readonly HeroPlacement[]
  selectedHeroId: string
  wave: number
  totalWaves: number
  waveStatus: WaveStatus
  cityHp: number
  battleStatus: 'running' | 'won' | 'lost'
  remainingByCategory: Record<EnemyCategory, number>
}>

type SnapshotListener = (snapshot: BattleSnapshot) => void
type HeroStatsRefreshListener = (heroId: string) => void
export type EnemyDefeatedEvent = Readonly<{ runId: string; enemyInstanceId: string; enemyId: string; occurredAtMs: number }>
export type StageVictoryEvent = Readonly<{ runId: string; stageId: string; occurredAtMs: number }>
export type WaveStartSource = 'manual' | 'auto'
export type WaveStartDecision = Readonly<{
  status: 'approved' | 'rejected'
  source: WaveStartSource
  runId: string
  waveNumber: number
  reason?: 'battle-not-ready' | 'no-heroes' | 'insufficient-energy' | 'invalid-clock' | 'duplicate'
}>
export type CommandEnergySnapshot = Readonly<{ current: number; cap: number }>

export class BattleBridge {
  private speed: GameSpeed = 1
  private selectedHeroId = 'quan-vu'
  private autoWaveEnabled = false
  private latestSnapshot?: BattleSnapshot
  private commandEnergySnapshot: CommandEnergySnapshot = { current: 0, cap: 60 }
  private snapshotListeners = new Set<SnapshotListener>()
  private speedListeners = new Set<(speed: GameSpeed) => void>()
  private heroSelectionListeners = new Set<(heroId: string) => void>()
  private heroStatsRefreshListeners = new Set<HeroStatsRefreshListener>()
  private enemyDefeatedListeners = new Set<(event: EnemyDefeatedEvent) => void>()
  private stageVictoryListeners = new Set<(event: StageVictoryEvent) => void>()
  private waveStartRequestListeners = new Set<(source: WaveStartSource) => void>()
  private waveStartDecisionListeners = new Set<(decision: WaveStartDecision) => void>()
  private autoWaveListeners = new Set<(enabled: boolean) => void>()
  private commandEnergyListeners = new Set<(snapshot: CommandEnergySnapshot) => void>()

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

  reportEnemyDefeated(event: EnemyDefeatedEvent): void {
    this.enemyDefeatedListeners.forEach((listener) => listener(event))
  }

  onEnemyDefeated(listener: (event: EnemyDefeatedEvent) => void): () => void {
    this.enemyDefeatedListeners.add(listener)
    return () => this.enemyDefeatedListeners.delete(listener)
  }

  reportStageVictory(event: StageVictoryEvent): void {
    this.stageVictoryListeners.forEach((listener) => listener(event))
  }

  onStageVictory(listener: (event: StageVictoryEvent) => void): () => void {
    this.stageVictoryListeners.add(listener)
    return () => this.stageVictoryListeners.delete(listener)
  }

  requestWaveStart(source: WaveStartSource = 'manual'): void {
    this.waveStartRequestListeners.forEach((listener) => listener(source))
  }

  onWaveStartRequest(listener: (source: WaveStartSource) => void): () => void {
    this.waveStartRequestListeners.add(listener)
    return () => this.waveStartRequestListeners.delete(listener)
  }

  reportWaveStartDecision(decision: WaveStartDecision): void {
    this.waveStartDecisionListeners.forEach((listener) => listener(decision))
  }

  onWaveStartDecision(listener: (decision: WaveStartDecision) => void): () => void {
    this.waveStartDecisionListeners.add(listener)
    return () => this.waveStartDecisionListeners.delete(listener)
  }

  setAutoWaveEnabled(enabled: boolean): void {
    if (this.autoWaveEnabled === enabled) return
    this.autoWaveEnabled = enabled
    this.autoWaveListeners.forEach((listener) => listener(enabled))
  }

  isAutoWaveEnabled(): boolean { return this.autoWaveEnabled }

  onAutoWaveChange(listener: (enabled: boolean) => void): () => void {
    this.autoWaveListeners.add(listener)
    return () => this.autoWaveListeners.delete(listener)
  }

  emitCommandEnergySnapshot(snapshot: CommandEnergySnapshot): void {
    this.commandEnergySnapshot = snapshot
    this.commandEnergyListeners.forEach((listener) => listener(snapshot))
  }

  getCommandEnergySnapshot(): CommandEnergySnapshot { return this.commandEnergySnapshot }

  onCommandEnergySnapshot(listener: (snapshot: CommandEnergySnapshot) => void): () => void {
    this.commandEnergyListeners.add(listener)
    return () => this.commandEnergyListeners.delete(listener)
  }

  emitSnapshot(snapshot: BattleSnapshot): void {
    this.latestSnapshot = snapshot
    this.snapshotListeners.forEach((listener) => listener(snapshot))
  }

  getLatestSnapshot(): BattleSnapshot | undefined { return this.latestSnapshot }

  onSnapshot(listener: SnapshotListener): () => void {
    this.snapshotListeners.add(listener)
    return () => this.snapshotListeners.delete(listener)
  }
}

export const battleBridge = new BattleBridge()
