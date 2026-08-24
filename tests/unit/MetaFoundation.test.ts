import { describe, expect, it } from 'vitest'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import {
  BASE_DEPLOYMENT_CAPACITY,
  CAPACITY_PER_SUMMON_ORDER,
  COMMAND_ENERGY_BASE_CAP,
  createInitialMetaState,
  selectDeploymentEntitlement,
} from '../../src/domain/meta/MetaState'
import { validateMetaState } from '../../src/domain/meta/MetaValidation'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'

function memoryStorage(initial?: string): { storage: StorageLike; values: Map<string, string> } {
  const values = new Map<string, string>()
  if (initial !== undefined) values.set(META_STORAGE_KEY, initial)
  return {
    values,
    storage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => { values.set(key, value) },
    },
  }
}

describe('Meta Foundation', () => {
  it('creates the locked initial profile, wallet, energy and entitlement boundaries', () => {
    const state = createInitialMetaState('local-player', 1_000)

    expect(state.profile).toMatchObject({ schemaVersion: 1, playerLevel: 1, playerExp: 0, summonOrderCount: 0 })
    expect(state.wallet.balances).toEqual({ gold: 0, knb: 0 })
    expect(state.commandEnergy).toEqual({ current: 60, regenAnchorAtMs: 1_000 })
    expect(state.inventory).toEqual({ consumables: {}, equipmentInstanceIds: [] })
    expect(selectDeploymentEntitlement(state.profile)).toEqual({ summonOrderCount: 0 })
    expect({ COMMAND_ENERGY_BASE_CAP, BASE_DEPLOYMENT_CAPACITY, CAPACITY_PER_SUMMON_ORDER }).toEqual({
      COMMAND_ENERGY_BASE_CAP: 60,
      BASE_DEPLOYMENT_CAPACITY: 7,
      CAPACITY_PER_SUMMON_ORDER: 1,
    })
  })

  it('validates exactly Gold and KNB and rejects a third wallet currency', () => {
    const state = createInitialMetaState('local-player', 1_000)
    expect(validateMetaState(state).ok).toBe(true)
    expect(validateMetaState({
      ...state,
      wallet: { balances: { ...state.wallet.balances, commandEnergy: 60 } },
    })).toMatchObject({ ok: false, issues: expect.arrayContaining(['wallet must contain exactly gold and knb']) })
  })

  it('rejects invalid profile, inventory, wallet and command energy values', () => {
    const state = createInitialMetaState('local-player', 1_000)
    const result = validateMetaState({
      ...state,
      profile: { ...state.profile, playerLevel: 0, summonOrderCount: -1 },
      wallet: { balances: { gold: -1, knb: 0 } },
      inventory: { consumables: { bad: -2 }, equipmentInstanceIds: ['same', 'same'] },
      commandEnergy: { current: -1, regenAnchorAtMs: -1 },
    })
    expect(result).toMatchObject({ ok: false })
    if (!result.ok) expect(result.issues.length).toBeGreaterThanOrEqual(7)
  })

  it('rejects unknown V1 fields so schema changes require a version bump', () => {
    const state = createInitialMetaState('local-player', 1_000)
    expect(validateMetaState({ ...state, futureField: true })).toMatchObject({
      ok: false,
      issues: expect.arrayContaining(['meta state contains unknown or missing fields']),
    })
  })

  it('saves a versioned envelope and increments revision with optimistic checks', () => {
    const { storage, values } = memoryStorage()
    const repository = new LocalMetaRepository(storage)
    const initial = createInitialMetaState('local-player', 1_000)

    expect(repository.load()).toEqual({ status: 'empty' })
    expect(values.has(META_STORAGE_KEY)).toBe(false)
    expect(repository.save(initial, 0, 1_000)).toMatchObject({ schemaVersion: 1, revision: 1, data: initial })
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { schemaVersion: 1, revision: 1 } })
    expect(() => repository.save(initial, 0, 2_000)).toThrow('revision conflict')
    expect(repository.save(initial, 1, 2_000).revision).toBe(2)
  })

  it('keeps malformed saves untouched and refuses to overwrite them', () => {
    const raw = '{bad-json'
    const { storage, values } = memoryStorage(raw)
    const repository = new LocalMetaRepository(storage)

    expect(repository.load()).toEqual({ status: 'invalid', raw, issues: ['meta save is not valid JSON'] })
    expect(() => repository.save(createInitialMetaState('local-player', 1_000), 0, 1_000)).toThrow('Refusing to overwrite invalid')
    expect(values.get(META_STORAGE_KEY)).toBe(raw)
  })

  it('keeps structurally invalid V1 saves untouched', () => {
    const raw = JSON.stringify({ schemaVersion: 1, revision: 1, updatedAtMs: 1_000, data: { wallet: { balances: { gold: 0, knb: 0 } } } })
    const { storage, values } = memoryStorage(raw)
    const repository = new LocalMetaRepository(storage)

    expect(repository.load()).toMatchObject({ status: 'invalid', raw })
    expect(() => repository.save(createInitialMetaState('local-player', 1_000), 1, 1_000)).toThrow('Refusing to overwrite invalid')
    expect(values.get(META_STORAGE_KEY)).toBe(raw)
  })

  it('returns a migration boundary for unsupported versions without changing raw data', () => {
    const raw = JSON.stringify({ schemaVersion: 2, revision: 1, updatedAtMs: 1_000, data: {} })
    const { storage, values } = memoryStorage(raw)
    const repository = new LocalMetaRepository(storage)

    expect(repository.load()).toEqual({ status: 'migration-required', raw, sourceVersion: 2 })
    expect(() => repository.save(createInitialMetaState('local-player', 1_000), 0, 1_000)).toThrow('requires migration')
    expect(values.get(META_STORAGE_KEY)).toBe(raw)
  })
})
