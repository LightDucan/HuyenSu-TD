import { describe, expect, it } from 'vitest'
import { WaveManager } from '../../src/domain/waves/WaveManager'
import { prototypeWaves } from '../../src/data/waves/prototypeWaves'

const waves = [
  { id: 'one', groups: [{ enemyId: 'sword', count: 2, startDelayMs: 0, spawnIntervalMs: 100 }] },
  { id: 'two', groups: [{ enemyId: 'archer', count: 1, startDelayMs: 50, spawnIntervalMs: 100 }] },
] as const

describe('WaveManager', () => {
  it('waits for an explicit start, spawns groups in order, then leaves the next wave waiting', () => {
    const manager = new WaveManager(waves)
    expect(manager.getStatus()).toBe('waiting')
    expect(manager.update(10_000)).toEqual([])
    expect(manager.beginCurrentWave()).toBe(true)
    expect(manager.beginCurrentWave()).toBe(false)
    expect(manager.update(0)).toEqual(['sword'])
    expect(manager.update(99)).toEqual([])
    expect(manager.update(1)).toEqual(['sword'])
    expect(manager.completeWhenNoEnemiesRemain(1)).toBe(false)
    expect(manager.completeWhenNoEnemiesRemain(0)).toBe(true)
    expect(manager.getCurrentWaveNumber()).toBe(2)
    expect(manager.getStatus()).toBe('waiting')
    expect(manager.update(1_000)).toEqual([])
    expect(manager.beginCurrentWave()).toBe(true)
    expect(manager.update(49)).toEqual([])
    expect(manager.update(1)).toEqual(['archer'])
  })

  it('reports won after the final wave is cleared', () => {
    const manager = new WaveManager([{ id: 'one', groups: [{ enemyId: 'sword', count: 1, startDelayMs: 0, spawnIntervalMs: 100 }] }])
    manager.beginCurrentWave()
    manager.update(0)
    expect(manager.completeWhenNoEnemiesRemain(0)).toBe(true)
    expect(manager.getStatus()).toBe('won')
  })

  it('can complete all ten prototype waves without skipping a wave', () => {
    const manager = new WaveManager(prototypeWaves)
    let spawned = 0
    let guard = 0

    while (manager.getStatus() !== 'won' && guard < 200) {
      if (manager.getStatus() === 'waiting') manager.beginCurrentWave()
      spawned += manager.update(10_000).length
      manager.completeWhenNoEnemiesRemain(0)
      guard += 1
    }

    expect(manager.getStatus()).toBe('won')
    expect(manager.getCurrentWaveNumber()).toBe(10)
    expect(spawned).toBe(prototypeWaves.flatMap((wave) => wave.groups).reduce((total, group) => total + group.count, 0))
  })

  it('rejects invalid wave definitions', () => {
    expect(() => new WaveManager([{ id: 'bad', groups: [{ enemyId: 'x', count: 0, startDelayMs: 0, spawnIntervalMs: 100 }] }])).toThrow(RangeError)
    expect(() => new WaveManager([{ id: 'bad', groups: [{ enemyId: 'x', count: 1, startDelayMs: 0, spawnIntervalMs: 0 }] }])).toThrow(RangeError)
  })
})
