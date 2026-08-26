import { describe, expect, it } from 'vitest'
import {
  COMMAND_ENERGY_REGEN_INTERVAL_MS,
  COMMAND_ENERGY_WAVE_COST,
  grantCommandEnergy,
  resolveCommandEnergyRegen,
  selectCommandEnergyCap,
  spendCommandEnergy,
} from '../../src/domain/meta/CommandEnergy'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import { validateMetaState } from '../../src/domain/meta/MetaValidation'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'

function memoryStorage(): { storage: StorageLike; values: Map<string, string> } {
  const values = new Map<string, string>()
  return {
    values,
    storage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => { values.set(key, value) },
    },
  }
}

function initializedRepository(current: number, regenAnchorAtMs: number) {
  const memory = memoryStorage()
  const repository = new LocalMetaRepository(memory.storage)
  const initial = createInitialMetaState('command-energy-test', regenAnchorAtMs)
  repository.save({ ...initial, commandEnergy: { current, regenAnchorAtMs } }, 0, regenAnchorAtMs)
  return { ...memory, repository }
}

describe('P12-C01 Command Energy domain and persistence', () => {
  it('locks base cap 60, two-minute real-time regen and Wave cost 1', () => {
    expect(selectCommandEnergyCap(1)).toBe(60)
    expect(COMMAND_ENERGY_REGEN_INTERVAL_MS).toBe(120_000)
    expect(COMMAND_ENERGY_WAVE_COST).toBe(1)
  })

  it('does not regenerate or bank time at cap', () => {
    const state = { current: 60, regenAnchorAtMs: 1_000 }
    expect(resolveCommandEnergyRegen(state, 601_000)).toEqual({ status: 'resolved', state })
  })

  it('starts regen from zero when spending from cap to below cap', () => {
    const atCap = { current: 60, regenAnchorAtMs: 1_000 }
    const spent = spendCommandEnergy(atCap, 1, 50_000)
    expect(spent).toEqual({ status: 'spent', state: { current: 59, regenAnchorAtMs: 50_000 } })
    if (spent.status !== 'spent') throw new Error('Expected Command Energy spend to succeed')
    expect(resolveCommandEnergyRegen(spent.state, 169_999)).toEqual({ status: 'resolved', state: spent.state })
    expect(resolveCommandEnergyRegen(spent.state, 170_000)).toEqual({ status: 'resolved', state: { current: 60, regenAnchorAtMs: 170_000 } })
  })

  it('preserves partial elapsed time below cap and discards it on reaching cap', () => {
    const first = resolveCommandEnergyRegen({ current: 58, regenAnchorAtMs: 0 }, 150_000)
    expect(first).toEqual({ status: 'resolved', state: { current: 59, regenAnchorAtMs: 120_000 } })
    if (first.status !== 'resolved') throw new Error('Expected Command Energy resolution')
    expect(resolveCommandEnergyRegen(first.state, 240_000)).toEqual({ status: 'resolved', state: { current: 60, regenAnchorAtMs: 240_000 } })
  })

  it('caps a very long offline regeneration at 60', () => {
    expect(resolveCommandEnergyRegen({ current: 58, regenAnchorAtMs: 0 }, 86_400_000)).toEqual({
      status: 'resolved',
      state: { current: 60, regenAnchorAtMs: 86_400_000 },
    })
  })

  it('allows grants above cap and pauses natural regeneration while overflow remains', () => {
    const grant = grantCommandEnergy({ current: 60, regenAnchorAtMs: 1_000 }, 10, 2_000)
    expect(grant).toEqual({ status: 'granted', state: { current: 70, regenAnchorAtMs: 2_000 } })
    if (grant.status !== 'granted') throw new Error('Expected Command Energy grant')
    expect(resolveCommandEnergyRegen(grant.state, 86_402_000)).toEqual({ status: 'resolved', state: grant.state })
  })

  it('does not activate regen while spending overflow down to cap, then resets at 60 to 59', () => {
    let state = { current: 70, regenAnchorAtMs: 1_000 }
    for (let nowMs = 2_000; nowMs <= 11_000; nowMs += 1_000) {
      const spent = spendCommandEnergy(state, 1, nowMs)
      expect(spent.status).toBe('spent')
      if (spent.status !== 'spent') throw new Error('Expected overflow spend')
      state = spent.state
    }
    expect(state).toEqual({ current: 60, regenAnchorAtMs: 1_000 })
    const belowCap = spendCommandEnergy(state, 1, 20_000)
    expect(belowCap).toEqual({ status: 'spent', state: { current: 59, regenAnchorAtMs: 20_000 } })
  })

  it('rejects insufficient spend atomically without changing state', () => {
    const state = { current: 0, regenAnchorAtMs: 1_000 }
    expect(spendCommandEnergy(state, 1, 2_000)).toEqual({ status: 'insufficient', state })
    expect(state).toEqual({ current: 0, regenAnchorAtMs: 1_000 })
  })

  it('returns explicit invalid-clock results without changing state', () => {
    const state = { current: 10, regenAnchorAtMs: 2_000 }
    expect(resolveCommandEnergyRegen(state, 1_999)).toEqual({ status: 'invalid-clock', state })
    expect(spendCommandEnergy(state, 1, 1_999)).toEqual({ status: 'invalid-clock', state })
    expect(grantCommandEnergy(state, 1, 1_999)).toEqual({ status: 'invalid-clock', state })
  })

  it('validates all numeric inputs as safe integers', () => {
    expect(() => spendCommandEnergy({ current: 1, regenAnchorAtMs: 0 }, Number.MAX_SAFE_INTEGER + 1, 1)).toThrow('safe integer')
    expect(() => grantCommandEnergy({ current: Number.MAX_SAFE_INTEGER, regenAnchorAtMs: 0 }, 1, 1)).toThrow('safe integer range')
    expect(() => resolveCommandEnergyRegen({ current: 1.5, regenAnchorAtMs: 0 }, 1)).toThrow('safe integer')
  })

  it('persists deterministic remainder across save and repository reload', () => {
    const { storage, repository } = initializedRepository(58, 0)
    const first = repository.resolveCommandEnergy(1, 150_000)
    expect(first).toMatchObject({ status: 'resolved', save: { revision: 2, data: { commandEnergy: { current: 59, regenAnchorAtMs: 120_000 } } } })

    const reloaded = new LocalMetaRepository(storage)
    const second = reloaded.resolveCommandEnergy(first.save.revision, 240_000)
    expect(second).toMatchObject({ status: 'resolved', save: { revision: 3, data: { commandEnergy: { current: 60, regenAnchorAtMs: 240_000 } } } })
  })

  it('commits grants and spends through the repository in optimistic revisions', () => {
    const { repository } = initializedRepository(60, 1_000)
    const granted = repository.grantCommandEnergy(10, 1, 2_000)
    expect(granted).toMatchObject({ status: 'granted', save: { revision: 2, data: { commandEnergy: { current: 70, regenAnchorAtMs: 2_000 } } } })

    const downToCap = repository.spendCommandEnergy(10, granted.save.revision, 3_000)
    expect(downToCap).toMatchObject({ status: 'spent', save: { revision: 3, data: { commandEnergy: { current: 60, regenAnchorAtMs: 2_000 } } } })

    const belowCap = repository.spendCommandEnergy(1, downToCap.save.revision, 4_000)
    expect(belowCap).toMatchObject({ status: 'spent', save: { revision: 4, data: { commandEnergy: { current: 59, regenAnchorAtMs: 4_000 } } } })
  })

  it('protects optimistic revision and leaves persistence unchanged on rejected operations', () => {
    const { values, repository } = initializedRepository(0, 1_000)
    const before = values.get(META_STORAGE_KEY)
    expect(repository.spendCommandEnergy(1, 1, 2_000)).toMatchObject({ status: 'insufficient', save: { revision: 1 } })
    expect(values.get(META_STORAGE_KEY)).toBe(before)
    expect(repository.resolveCommandEnergy(1, 999)).toMatchObject({ status: 'invalid-clock', save: { revision: 1 } })
    expect(values.get(META_STORAGE_KEY)).toBe(before)
    expect(() => repository.grantCommandEnergy(1, 2, 2_000)).toThrow('revision conflict')
    expect(values.get(META_STORAGE_KEY)).toBe(before)
  })

  it('uses only wall-clock timestamps and keeps Command Energy outside the two-currency Wallet', () => {
    const oneMinute = resolveCommandEnergyRegen({ current: 59, regenAnchorAtMs: 0 }, 60_000)
    const twoMinutes = resolveCommandEnergyRegen({ current: 59, regenAnchorAtMs: 0 }, 120_000)
    expect(oneMinute).toMatchObject({ state: { current: 59 } })
    expect(twoMinutes).toMatchObject({ state: { current: 60 } })

    const state = createInitialMetaState('wallet-boundary', 0)
    expect(Object.keys(state.wallet.balances).sort()).toEqual(['gold', 'knb'])
    expect(validateMetaState({ ...state, wallet: { balances: { ...state.wallet.balances, commandEnergy: 60 } } }).ok).toBe(false)
  })
})
