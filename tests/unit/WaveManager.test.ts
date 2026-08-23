import { describe, expect, it } from 'vitest'
import { WaveManager } from '../../src/domain/waves/WaveManager'

const waves = [
  { id: 'one', groups: [{ enemyId: 'sword', count: 2, startDelayMs: 0, spawnIntervalMs: 100 }] },
  { id: 'two', groups: [{ enemyId: 'archer', count: 1, startDelayMs: 50, spawnIntervalMs: 100 }] },
] as const

describe('WaveManager', () => {
  it('spawns groups in order and advances only after the wave is cleared', () => {
    const manager = new WaveManager(waves)
    expect(manager.update(0)).toEqual(['sword'])
    expect(manager.update(99)).toEqual([])
    expect(manager.update(1)).toEqual(['sword'])
    expect(manager.completeWhenNoEnemiesRemain(1)).toBe(false)
    expect(manager.completeWhenNoEnemiesRemain(0)).toBe(true)
    expect(manager.getCurrentWaveNumber()).toBe(2)
    expect(manager.update(49)).toEqual([])
    expect(manager.update(1)).toEqual(['archer'])
  })

  it('reports won after the final wave is cleared', () => {
    const manager = new WaveManager([{ id: 'one', groups: [{ enemyId: 'sword', count: 1, startDelayMs: 0, spawnIntervalMs: 100 }] }])
    manager.update(0)
    expect(manager.completeWhenNoEnemiesRemain(0)).toBe(true)
    expect(manager.getStatus()).toBe('won')
  })
})
