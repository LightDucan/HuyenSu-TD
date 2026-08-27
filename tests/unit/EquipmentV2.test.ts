import { describe, expect, it } from 'vitest'
import { prototypeEquipmentV2Definitions } from '../../src/data/equipment/definitions'
import { applyEquipmentV2Transaction, resolveHeroEquipmentV2, validateEquipmentV2Definition } from '../../src/domain/equipment/EquipmentV2'
import type { EquipmentV2Definition } from '../../src/domain/equipment/EquipmentSystem'
import { EQUIPMENT_STORAGE_KEY } from '../../src/domain/equipment/EquipmentStorage'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState, type EquipmentInstance, type MetaStateV4 } from '../../src/domain/meta/MetaState'
import { calculateHeroStats } from '../../src/domain/progression/StatCalculator'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { refreshPlacedHeroRuntimeStats } from '../../src/game/runtime/PlacedHeroRuntimeStats'
import { EquipmentV2RuntimeController } from '../../src/runtime/EquipmentV2Runtime'

const exclusiveDefinition: EquipmentV2Definition = {
  id: 'exclusive-spear', slot: 'weapon', name: 'Exclusive Spear', mergeable: false,
  exclusiveHeroId: 'hero-a', levelModifiers: { 1: { atk: 25 } },
}
const definitions = { ...prototypeEquipmentV2Definitions, [exclusiveDefinition.id]: exclusiveDefinition }

function instance(instanceId: string, definitionId = 'green-dragon-blade', level = 1, slot: 'weapon' | 'gem' = 'weapon'): EquipmentInstance {
  return { instanceId, definitionId, level, slot }
}

function memoryStorage(): { storage: StorageLike; values: Map<string, string> } {
  const values = new Map<string, string>()
  return { values, storage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) } } }
}

function setup(instances: readonly EquipmentInstance[] = []) {
  const memory = memoryStorage()
  const repository = new LocalMetaRepository(memory.storage)
  const initial = createInitialMetaState('equipment-v2-test', 1_000)
  const equipmentInstances = Object.fromEntries(instances.map((item) => [item.instanceId, item]))
  repository.save({ ...initial, inventory: { ...initial.inventory, equipmentInstances } }, 0, 1_000)
  const bridge = new BattleBridge()
  const runtime = new EquipmentV2RuntimeController(repository, bridge, definitions)
  return { ...memory, repository, bridge, runtime }
}

function current(repository: LocalMetaRepository) {
  const loaded = repository.load()
  if (loaded.status !== 'loaded') throw new Error('Expected loaded Meta V4')
  return loaded.save
}

function transact(
  repository: LocalMetaRepository,
  operation: Parameters<LocalMetaRepository['transactEquipment']>[0]['operation'],
  key = `equipment/${operation.type}`,
) {
  const save = current(repository)
  return repository.transactEquipment({ idempotencyKey: key, operation }, definitions, save.revision, save.updatedAtMs + 1)
}

describe('FAST-01 Equipment V2 domain', () => {
  it('uses data-driven Lv1–10 flat ATK/Range/AttackSpeed tables only', () => {
    Object.values(prototypeEquipmentV2Definitions).forEach((definition) => {
      expect(validateEquipmentV2Definition(definition)).toBe(definition)
      expect(Object.keys(definition.levelModifiers)).toHaveLength(10)
      Object.values(definition.levelModifiers).forEach((modifiers) => {
        expect(Object.keys(modifiers).every((key) => ['atk', 'range', 'attackSpeed'].includes(key))).toBe(true)
      })
    })
    expect(() => validateEquipmentV2Definition({
      ...prototypeEquipmentV2Definitions['swift-jade'],
      levelModifiers: { ...prototypeEquipmentV2Definitions['swift-jade'].levelModifiers, 1: { crit: 1 } as never },
    })).toThrow('invalid flat modifier')
    expect(validateEquipmentV2Definition(exclusiveDefinition)).toBe(exclusiveDefinition)
  })

  it('equips and unequips an instance through one authoritative Hero loadout', () => {
    const { repository } = setup([instance('weapon-a')])
    const equipped = transact(repository, { type: 'equip', heroId: 'hero-a', instanceId: 'weapon-a' })
    expect(equipped.save.data.inventory.equippedByHero).toEqual({ 'hero-a': { weaponInstanceId: 'weapon-a' } })
    const unequipped = repository.transactEquipment(
      { idempotencyKey: 'equipment/unequip', operation: { type: 'unequip', heroId: 'hero-a', slot: 'weapon' } },
      definitions, equipped.save.revision, 3_000,
    )
    expect(unequipped.save.data.inventory.equippedByHero['hero-a'].weaponInstanceId).toBeUndefined()
    expect(unequipped.save.data.inventory.equipmentInstances['weapon-a']).toBeDefined()
  })

  it('rejects wrong-slot instances and instances equipped by another Hero', () => {
    const wrong = setup([instance('wrong', 'green-dragon-blade', 1, 'gem')])
    expect(() => transact(wrong.repository, { type: 'equip', heroId: 'hero-a', instanceId: 'wrong' })).toThrow('slot does not match')

    const owned = setup([instance('owned')])
    const first = transact(owned.repository, { type: 'equip', heroId: 'hero-a', instanceId: 'owned' }, 'equipment/equip-a')
    expect(() => owned.repository.transactEquipment(
      { idempotencyKey: 'equipment/equip-b', operation: { type: 'equip', heroId: 'hero-b', instanceId: 'owned' } },
      definitions, first.save.revision, 3_000,
    )).toThrow('another Hero')
  })

  it('merges exactly three distinct same-definition/same-level instances into one next-level instance', () => {
    const { repository } = setup([instance('a'), instance('b'), instance('c')])
    const result = transact(repository, { type: 'merge', ingredientInstanceIds: ['a', 'b', 'c'], resultInstanceId: 'merged' })
    expect(Object.keys(result.save.data.inventory.equipmentInstances)).toEqual(['merged'])
    expect(result.save.data.inventory.equipmentInstances.merged).toEqual(instance('merged', 'green-dragon-blade', 2))
  })

  it('rejects duplicate IDs, mixed definitions, mixed levels, equipped ingredients, Lv10, and exclusive merge atomically', () => {
    const cases: Array<{ items: EquipmentInstance[]; ids: string[]; message: string; equip?: string }> = [
      { items: [instance('a'), instance('b'), instance('c')], ids: ['a', 'a', 'a'], message: 'distinct' },
      { items: [instance('a'), instance('b', 'swift-jade', 1, 'gem'), instance('c')], ids: ['a', 'b', 'c'], message: 'same definition' },
      { items: [instance('a'), instance('b', 'green-dragon-blade', 2), instance('c')], ids: ['a', 'b', 'c'], message: 'same level' },
      { items: [instance('a'), instance('b'), instance('c')], ids: ['a', 'b', 'c'], message: 'Equipped equipment', equip: 'a' },
      { items: [instance('a', 'green-dragon-blade', 10), instance('b', 'green-dragon-blade', 10), instance('c', 'green-dragon-blade', 10)], ids: ['a', 'b', 'c'], message: 'Level 10' },
      { items: [instance('a', 'exclusive-spear'), instance('b', 'exclusive-spear'), instance('c', 'exclusive-spear')], ids: ['a', 'b', 'c'], message: 'exclusive' },
    ]
    cases.forEach(({ items, ids, message, equip }) => {
      const { repository, values } = setup(items)
      if (equip) transact(repository, { type: 'equip', heroId: 'hero-a', instanceId: equip }, `equipment/equip/${message}`)
      const rawBefore = values.get(META_STORAGE_KEY)
      expect(() => transact(repository, { type: 'merge', ingredientInstanceIds: ids, resultInstanceId: `result-${message}` }, `equipment/merge/${message}`)).toThrow(message)
      expect(values.get(META_STORAGE_KEY)).toBe(rawBefore)
    })
  })

  it('persists merge through reload and protects optimistic revision plus idempotent retry', () => {
    const { repository, storage } = setup([instance('a'), instance('b'), instance('c')])
    const first = repository.transactEquipment(
      { idempotencyKey: 'equipment/retry', operation: { type: 'merge', ingredientInstanceIds: ['a', 'b', 'c'], resultInstanceId: 'merged' } },
      definitions, 1, 2_000,
    )
    const reloaded = new LocalMetaRepository(storage)
    expect(() => reloaded.transactEquipment(
      { idempotencyKey: 'equipment/stale', operation: { type: 'grant-instance', instance: instance('new') } },
      definitions, 1, 3_000,
    )).toThrow('revision conflict')
    const retry = reloaded.transactEquipment(
      { idempotencyKey: 'equipment/retry', operation: { type: 'merge', ingredientInstanceIds: ['a', 'b', 'c'], resultInstanceId: 'merged' } },
      definitions, first.save.revision, 3_000,
    )
    expect(retry.status).toBe('already-applied')
    expect(retry.save.revision).toBe(first.save.revision)
    expect(retry.save.data.inventory.equipmentInstances.merged.level).toBe(2)
  })

  it('refreshes placed Hero stats after equip/unequip without Hero-specific logic', () => {
    const { repository, bridge, runtime } = setup([instance('weapon-a')])
    const placed: {
      stats: ReturnType<typeof calculateHeroStats>
      combatController: { refreshStats: (stats: ReturnType<typeof calculateHeroStats>) => void }
      rangeVisual: { setRadius: (radius: number) => undefined }
    } = {
      stats: calculateHeroStats({ hp: 100, atk: 10, range: 100, attackSpeed: 1, crit: 0, critDamage: 1.5 }, { stage: 'normal' as const, level: 1 }),
      combatController: { refreshStats: (stats) => { placed.stats = { ...placed.stats, ...stats } } },
      rangeVisual: { setRadius: (_radius: number) => undefined },
    }
    bridge.onPlacedHeroStatsRefresh((heroId) => {
      refreshPlacedHeroRuntimeStats(placed, () => {
        const save = current(repository)
        const modifiers = resolveHeroEquipmentV2(save.data, heroId, definitions)
        return calculateHeroStats({ hp: 100, atk: 10, range: 100, attackSpeed: 1, crit: 0, critDamage: 1.5 }, { stage: 'normal', level: 1 }, modifiers.weapon, modifiers.gem)
      })
    })
    const equipped = runtime.transact({ type: 'equip', heroId: 'hero-a', instanceId: 'weapon-a' }, 1, 'equipment/runtime-equip', 2_000)
    expect(placed.stats.atk).toBe(22)
    expect(placed.stats.range).toBe(108)
    runtime.transact({ type: 'unequip', heroId: 'hero-a', slot: 'weapon' }, equipped.save.revision, 'equipment/runtime-unequip', 3_000)
    expect(placed.stats.atk).toBe(10)
  })
})

describe('FAST-01 legacy Equipment V1 import', () => {
  it('survives deterministic import and repeated startup does not duplicate instances', () => {
    const { repository, runtime, storage, values } = setup()
    values.set(EQUIPMENT_STORAGE_KEY, JSON.stringify({
      version: 1,
      heroes: { 'quan-vu': { weaponId: 'green-dragon-blade', gemId: 'swift-jade' } },
    }))
    const first = runtime.importLegacy(storage, 2_000)
    expect(first?.status).toBe('applied')
    expect(Object.keys(first!.save.data.inventory.equipmentInstances)).toHaveLength(2)
    expect(first!.save.data.inventory.equippedByHero['quan-vu']).toMatchObject({
      weaponInstanceId: expect.stringContaining('legacy-v1'),
      gemInstanceId: expect.stringContaining('legacy-v1'),
    })
    const retry = new EquipmentV2RuntimeController(new LocalMetaRepository(storage), new BattleBridge(), definitions).importLegacy(storage, 3_000)
    expect(retry?.status).toBe('already-applied')
    expect(retry?.save.revision).toBe(first?.save.revision)
    expect(Object.keys(current(repository).data.inventory.equipmentInstances)).toHaveLength(2)
  })

  it('preserves malformed legacy raw data and refuses a lossy import', () => {
    const { runtime, storage, values } = setup()
    const raw = '{not-json'
    values.set(EQUIPMENT_STORAGE_KEY, raw)
    expect(() => runtime.importLegacy(storage, 2_000)).toThrow('not valid JSON')
    expect(values.get(EQUIPMENT_STORAGE_KEY)).toBe(raw)
  })
})
