import type { GameSpeed } from '../../domain/clock/GameClock'

export type BattleSnapshot = Readonly<{
  speed: GameSpeed
  enemiesSpawned: number
  enemiesEscaped: number
}>

type SnapshotListener = (snapshot: BattleSnapshot) => void

export class BattleBridge {
  private speed: GameSpeed = 1
  private snapshotListeners = new Set<SnapshotListener>()
  private speedListeners = new Set<(speed: GameSpeed) => void>()

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

  emitSnapshot(snapshot: BattleSnapshot): void {
    this.snapshotListeners.forEach((listener) => listener(snapshot))
  }

  onSnapshot(listener: SnapshotListener): () => void {
    this.snapshotListeners.add(listener)
    return () => this.snapshotListeners.delete(listener)
  }
}

export const battleBridge = new BattleBridge()
