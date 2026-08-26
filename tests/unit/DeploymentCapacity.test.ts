import { describe, expect, it } from 'vitest'
import {
  canDeployHero,
  selectDeploymentCapacity,
  selectEffectiveDeploymentCapacity,
} from '../../src/domain/meta/DeploymentCapacity'
import { LocalMetaRepository } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState, META_SAVE_SCHEMA_VERSION, type PlayerProfile } from '../../src/domain/meta/MetaState'
import { HeroPlacementRegistry } from '../../src/domain/placement/HeroPlacementRegistry'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { DeploymentCapacityRuntimeController } from '../../src/runtime/DeploymentCapacityRuntime'

function profile(overrides: Partial<PlayerProfile> = {}): PlayerProfile {
  return { ...createInitialMetaState('capacity-test', 1_000).profile, ...overrides }
}

function memoryRepository(state = createInitialMetaState('capacity-test', 1_000)) {
  const values = new Map<string, string>()
  const storage: StorageLike = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
  }
  const repository = new LocalMetaRepository(storage)
  repository.save(state, 0, 1_000)
  return repository
}

describe('P13-C01 Deployment Capacity domain', () => {
  it('locks base 7 and adds one permanent capacity per Summon Order', () => {
    expect(selectDeploymentCapacity(profile({ summonOrderCount: 0 }))).toEqual({
      baseCapacity: 7,
      bonusFromLevel: 0,
      summonOrderCount: 0,
      totalUnlockedCapacity: 7,
    })
    expect(selectDeploymentCapacity(profile({ summonOrderCount: 3 })).totalUnlockedCapacity).toBe(10)
  })

  it('keeps Player Level bonus zero while its formula remains open', () => {
    expect(selectDeploymentCapacity(profile({ playerLevel: 1 })).totalUnlockedCapacity).toBe(7)
    expect(selectDeploymentCapacity(profile({ playerLevel: 99 })).totalUnlockedCapacity).toBe(7)
  })

  it('caps effective deployment by map placement tile count', () => {
    expect(selectEffectiveDeploymentCapacity(profile(), 6)).toMatchObject({ mapTileCount: 6, totalUnlockedCapacity: 7, effectiveLimit: 6 })
    expect(selectEffectiveDeploymentCapacity(profile(), 12)).toMatchObject({ mapTileCount: 12, totalUnlockedCapacity: 7, effectiveLimit: 7 })
    expect(selectEffectiveDeploymentCapacity(profile({ summonOrderCount: 2 }), 12)).toMatchObject({ totalUnlockedCapacity: 9, effectiveLimit: 9 })
    expect(selectEffectiveDeploymentCapacity(profile({ summonOrderCount: 100 }), 6).effectiveLimit).toBe(6)
  })

  it('validates safe integers and protects capacity overflow', () => {
    expect(() => selectDeploymentCapacity(profile({ playerLevel: 0 }))).toThrow('positive safe integer')
    expect(() => selectDeploymentCapacity(profile({ summonOrderCount: -1 }))).toThrow('non-negative safe integer')
    expect(() => selectDeploymentCapacity(profile({ summonOrderCount: Number.MAX_SAFE_INTEGER }))).toThrow('safe integer range')
    expect(() => selectEffectiveDeploymentCapacity(profile(), -1)).toThrow('non-negative safe integer')
    expect(() => selectEffectiveDeploymentCapacity(profile(), 1.5)).toThrow('non-negative safe integer')
  })

  it('publishes a read-only Meta profile + map projection without changing save revision or schema', () => {
    const initial = createInitialMetaState('capacity-test', 1_000)
    const repository = memoryRepository({ ...initial, profile: { ...initial.profile, summonOrderCount: 2 } })
    const bridge = new BattleBridge()
    const runtime = new DeploymentCapacityRuntimeController(repository, bridge, 6)
    const before = repository.load()
    const projection = runtime.refresh()
    const after = repository.load()

    expect(projection).toEqual({
      baseCapacity: 7,
      bonusFromLevel: 0,
      summonOrderCount: 2,
      totalUnlockedCapacity: 9,
      mapTileCount: 6,
      effectiveLimit: 6,
    })
    expect(bridge.getDeploymentCapacitySnapshot()).toEqual(projection)
    expect(after).toEqual(before)
    expect(META_SAVE_SCHEMA_VERSION).toBe(3)
  })
})

describe('P13-C01 capacity-aware Hero placement', () => {
  it('allows a new Hero below capacity', () => {
    const registry = new HeroPlacementRegistry(['a', 'b', 'c'])
    expect(registry.placeWithinCapacity('hero-a', 'a', 2)).toMatchObject({ status: 'placed' })
    expect(registry.getPlacements()).toEqual([{ heroId: 'hero-a', slotId: 'a' }])
  })

  it('rejects a new Hero to either empty or occupied slots at capacity without mutation', () => {
    const registry = new HeroPlacementRegistry(['a', 'b', 'c'])
    registry.placeWithinCapacity('hero-a', 'a', 2)
    registry.placeWithinCapacity('hero-b', 'b', 2)
    const before = registry.getPlacements()

    expect(registry.placeWithinCapacity('hero-c', 'c', 2)).toEqual({ status: 'rejected', reason: 'capacity-reached' })
    expect(registry.getPlacements()).toEqual(before)
    expect(registry.placeWithinCapacity('hero-c', 'b', 2)).toEqual({ status: 'rejected', reason: 'capacity-reached' })
    expect(registry.getPlacements()).toEqual(before)
  })

  it('allows an existing Hero to reposition to an empty slot at capacity', () => {
    const registry = new HeroPlacementRegistry(['a', 'b', 'c'])
    registry.placeWithinCapacity('hero-a', 'a', 2)
    registry.placeWithinCapacity('hero-b', 'b', 2)
    expect(registry.placeWithinCapacity('hero-a', 'c', 2)).toMatchObject({
      status: 'placed',
      result: { placement: { heroId: 'hero-a', slotId: 'c' }, previousSlotId: 'a' },
    })
    expect(registry.getPlacements()).toHaveLength(2)
  })

  it('preserves occupied-slot recall when an existing Hero repositions at capacity', () => {
    const registry = new HeroPlacementRegistry(['a', 'b'])
    registry.placeWithinCapacity('hero-a', 'a', 2)
    registry.placeWithinCapacity('hero-b', 'b', 2)
    expect(registry.placeWithinCapacity('hero-a', 'b', 2)).toMatchObject({
      status: 'placed',
      result: { recalledHeroId: 'hero-b' },
    })
    expect(registry.getPlacements()).toEqual([{ heroId: 'hero-a', slotId: 'b' }])
  })

  it('does not touch Command Energy for rejection, reposition, or x1/x3-independent capacity checks', () => {
    const repository = memoryRepository()
    const registry = new HeroPlacementRegistry(['a', 'b'])
    registry.placeWithinCapacity('hero-a', 'a', 1)
    const before = repository.load()
    registry.placeWithinCapacity('hero-b', 'b', 1)
    registry.placeWithinCapacity('hero-a', 'b', 1)
    expect(repository.load()).toEqual(before)
    expect(canDeployHero('hero-c', registry.getPlacements(), 1)).toEqual({ status: 'rejected', reason: 'capacity-reached' })
    const speedBridge = new BattleBridge()
    const atX1 = selectEffectiveDeploymentCapacity(profile(), 6)
    speedBridge.setSpeed(3)
    const atX3 = selectEffectiveDeploymentCapacity(profile(), 6)
    expect(speedBridge.getSpeed()).toBe(3)
    expect(atX3).toEqual(atX1)
  })
})
