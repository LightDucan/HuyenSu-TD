import type { WaveDefinition } from '../../data/waves/prototypeWaves'

export type WaveStatus = 'running' | 'won'

type GroupRuntime = { spawned: number; nextSpawnAtMs: number }

export class WaveManager {
  private elapsedMs = 0
  private waveIndex = 0
  private groups: GroupRuntime[]
  private status: WaveStatus = 'running'

  constructor(private readonly waves: readonly WaveDefinition[]) {
    if (waves.length === 0) throw new Error('At least one wave is required')
    this.groups = this.createGroups()
  }

  update(deltaMs: number): string[] {
    if (this.status === 'won') return []
    this.elapsedMs += deltaMs
    const due: string[] = []
    const wave = this.waves[this.waveIndex]

    wave.groups.forEach((group, index) => {
      const runtime = this.groups[index]
      while (runtime.spawned < group.count && runtime.nextSpawnAtMs <= this.elapsedMs) {
        due.push(group.enemyId)
        runtime.spawned += 1
        runtime.nextSpawnAtMs += group.spawnIntervalMs
      }
    })
    return due
  }

  completeWhenNoEnemiesRemain(activeEnemyCount: number): boolean {
    if (this.status === 'won' || activeEnemyCount > 0 || !this.finishedSpawning()) return false
    if (this.waveIndex === this.waves.length - 1) {
      this.status = 'won'
      return true
    }
    this.waveIndex += 1
    this.elapsedMs = 0
    this.groups = this.createGroups()
    return true
  }

  getCurrentWaveNumber(): number { return this.waveIndex + 1 }
  getTotalWaves(): number { return this.waves.length }
  getStatus(): WaveStatus { return this.status }
  isFinishedSpawning(): boolean { return this.finishedSpawning() }

  private finishedSpawning(): boolean {
    return this.waves[this.waveIndex].groups.every((group, index) => this.groups[index].spawned === group.count)
  }

  private createGroups(): GroupRuntime[] {
    return this.waves[this.waveIndex].groups.map((group) => ({ spawned: 0, nextSpawnAtMs: group.startDelayMs }))
  }
}
