export type GameSpeed = 1 | 3

export class GameClock {
  private speed: GameSpeed = 1

  setSpeed(speed: GameSpeed): void {
    this.speed = speed
  }

  getSpeed(): GameSpeed {
    return this.speed
  }

  scale(deltaMs: number): number {
    if (!Number.isFinite(deltaMs) || deltaMs < 0) {
      throw new RangeError('deltaMs must be a finite, non-negative number')
    }

    return deltaMs * this.speed
  }
}
