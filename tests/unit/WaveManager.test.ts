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

  it('can complete all twenty-four prototype waves without skipping a wave', () => {
    const manager = new WaveManager(prototypeWaves)
    expect(manager.getTotalWaves()).toBe(24)
    expect(prototypeWaves.every((wave) => wave.groups.length > 0)).toBe(true)
    expect(prototypeWaves.flatMap((wave) => wave.groups).reduce((total, group) => total + group.count, 0)).toBeGreaterThan(0)
  })

  it('rejects invalid wave definitions', () => {
    expect(() => new WaveManager([{ id: 'bad', groups: [{ enemyId: 'x', count: 0, startDelayMs: 0, spawnIntervalMs: 100 }] }])).toThrow(RangeError)
    expect(() => new WaveManager([{ id: 'bad', groups: [{ enemyId: 'x', count: 1, startDelayMs: 0, spawnIntervalMs: 0 }] }])).toThrow(RangeError)
  })
})
