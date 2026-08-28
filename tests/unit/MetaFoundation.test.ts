import { describe, expect, it } from 'vitest'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import { applyRewardTransaction } from '../../src/domain/meta/RewardTransaction'
import { validateMetaState } from '../../src/domain/meta/MetaValidation'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'

function memoryStorage(initial?: string): { storage: StorageLike; values: Map<string, string> } {
  const values = new Map<string, string>()
  if (initial !== undefined) values.set(META_STORAGE_KEY, initial)
  return { values, storage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) } } }
}

function initializedRepository() {
  const memory = memoryStorage()
  const repository = new LocalMetaRepository(memory.storage)
  repository.save(createInitialMetaState('local-player', 1_000), 0, 1_000)
  return { ...memory, repository }
}

describe('P11-C01 Reward Transaction Core', () => {
  it('keeps Meta V2 locked to Gold, KNB, separate energy, and persistent receipts', () => {
    const state = createInitialMetaState('local-player', 1_000)
    expect(state).toMatchObject({ wallet: { balances: { gold: 0, knb: 0 } }, commandEnergy: { current: 60 }, rewardReceipts: {} })
    expect(validateMetaState({ ...state, wallet: { balances: { gold: 0, knb: 0, commandEnergy: 60 } } }).ok).toBe(false)
  })

  it('commits Gold, KNB and consumable grants atomically in one revision', () => {
    const { repository } = initializedRepository()
    const result = repository.transactReward({
      idempotencyKey: 'reward/chapter-1',
      operations: [
        { type: 'grant-currency', currency: 'gold', amount: 50 },
        { type: 'grant-currency', currency: 'knb', amount: 3 },
        { type: 'grant-consumable', itemId: 'tieu-binh-phu', quantity: 2 },
      ],
    }, 1, 2_000)
    expect(result).toMatchObject({ status: 'applied', save: { schemaVersion: 5, revision: 2 } })
    expect(result.save.data.wallet.balances).toEqual({ gold: 50, knb: 3 })
    expect(result.save.data.inventory.consumables).toEqual({ 'tieu-binh-phu': 2 })
    expect(result.save.data.rewardReceipts['reward/chapter-1']).toMatchObject({ committedAtMs: 2_000 })
  })

  it('spends Gold and KNB but rejects any spend that would become negative', () => {
    const { repository } = initializedRepository()
    const funded = repository.transactReward({ idempotencyKey: 'fund', operations: [{ type: 'grant-currency', currency: 'gold', amount: 10 }, { type: 'grant-currency', currency: 'knb', amount: 5 }] }, 1, 2_000)
    const spent = repository.transactReward({ idempotencyKey: 'spend', operations: [{ type: 'spend-currency', currency: 'gold', amount: 4 }, { type: 'spend-currency', currency: 'knb', amount: 2 }] }, funded.save.revision, 3_000)
    expect(spent.save.data.wallet.balances).toEqual({ gold: 6, knb: 3 })
    expect(() => repository.transactReward({ idempotencyKey: 'invalid-spend', operations: [{ type: 'spend-currency', currency: 'gold', amount: 7 }] }, spent.save.revision, 4_000)).toThrow('would become invalid')
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { revision: spent.save.revision, data: { wallet: { balances: { gold: 6, knb: 3 } } } } })
  })

  it('does not partially spend Gold when a later operation is invalid', () => {
    const { repository } = initializedRepository()
    const funded = repository.transactReward({ idempotencyKey: 'fund', operations: [{ type: 'grant-currency', currency: 'gold', amount: 10 }] }, 1, 2_000)
    expect(() => repository.transactReward({
      idempotencyKey: 'atomic-failure',
      operations: [{ type: 'spend-currency', currency: 'gold', amount: 5 }, { type: 'grant-consumable', itemId: '', quantity: 1 }],
    }, funded.save.revision, 3_000)).toThrow('Consumable item ID must not be empty')
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { revision: funded.save.revision, data: { wallet: { balances: { gold: 10, knb: 0 } }, rewardReceipts: { fund: expect.any(Object) } } } })
  })

  it('preserves optimistic revision checks for reward commits', () => {
    const { repository } = initializedRepository()
    expect(() => repository.transactReward({ idempotencyKey: 'stale', operations: [{ type: 'grant-currency', currency: 'gold', amount: 1 }] }, 0, 2_000)).toThrow('revision conflict')
  })

  it('persists idempotency across reload and does not increment revision on a duplicate retry', () => {
    const { storage } = initializedRepository()
    const firstRepository = new LocalMetaRepository(storage)
    const request = { idempotencyKey: 'reward/retry', operations: [{ type: 'grant-currency' as const, currency: 'gold' as const, amount: 7 }] }
    const first = firstRepository.transactReward(request, 1, 2_000)
    const reloadedRepository = new LocalMetaRepository(storage)
    const retry = reloadedRepository.transactReward(request, first.save.revision, 3_000)
    expect(retry).toMatchObject({ status: 'already-applied', save: { revision: first.save.revision, data: { wallet: { balances: { gold: 7, knb: 0 } } } } })
  })

  it('rejects reusing an idempotency key with a different payload', () => {
    const { repository } = initializedRepository()
    const first = repository.transactReward({ idempotencyKey: 'reward/same-key', operations: [{ type: 'grant-currency', currency: 'gold', amount: 1 }] }, 1, 2_000)
    expect(() => repository.transactReward({ idempotencyKey: 'reward/same-key', operations: [{ type: 'grant-currency', currency: 'gold', amount: 2 }] }, first.save.revision, 3_000)).toThrow('different transaction')
  })

  it('migrates valid V1 deterministically in the same key and keeps V1 raw data on migration failure', () => {
    const v4 = createInitialMetaState('local-player', 1_000)
    const legacyInventory = { consumables: v4.inventory.consumables, equipmentInstanceIds: ['legacy-placeholder'] }
    const validV1 = JSON.stringify({ schemaVersion: 1, revision: 4, updatedAtMs: 1_000, data: { profile: v4.profile, wallet: v4.wallet, inventory: legacyInventory, commandEnergy: v4.commandEnergy } })
    const valid = memoryStorage(validV1)
    const repository = new LocalMetaRepository(valid.storage)
    expect(repository.load()).toEqual({ status: 'migration-required', raw: validV1, sourceVersion: 1 })
    const migrated = repository.migrateV1(4)
    expect(migrated).toMatchObject({ schemaVersion: 5, revision: 4, updatedAtMs: 1_000, data: { inventory: { unresolvedLegacyEquipmentInstanceIds: ['legacy-placeholder'] }, rewardReceipts: {}, activePlayTime: { observedVisibleMs: 0, observedHiddenMs: 0, remainderEligibleMs: 0 }, heroCollection: expect.any(Object) } })
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { schemaVersion: 5, revision: 4 } })

    const invalidV1 = JSON.stringify({ schemaVersion: 1, revision: 1, updatedAtMs: 1_000, data: { wallet: { balances: { gold: 0, knb: 0 } } } })
    const invalid = memoryStorage(invalidV1)
    const invalidRepository = new LocalMetaRepository(invalid.storage)
    expect(() => invalidRepository.migrateV1(1)).toThrow('Invalid Meta V1 save')
    expect(invalid.values.get(META_STORAGE_KEY)).toBe(invalidV1)
  })

  it('migrates V2 through V3 to V4 deterministically and preserves raw V2 when validation fails', () => {
    const v4 = createInitialMetaState('local-player', 1_000)
    const legacyInventory = { consumables: v4.inventory.consumables, equipmentInstanceIds: [] }
    const v2Data = { profile: v4.profile, wallet: v4.wallet, inventory: legacyInventory, commandEnergy: v4.commandEnergy, rewardReceipts: v4.rewardReceipts }
    const validV2 = JSON.stringify({ schemaVersion: 2, revision: 7, updatedAtMs: 2_000, data: v2Data })
    const valid = memoryStorage(validV2)
    const migrated = new LocalMetaRepository(valid.storage).migrateV2(7)
    expect(migrated).toMatchObject({ schemaVersion: 5, revision: 7, updatedAtMs: 2_000, data: { inventory: { equipmentInstances: {}, equippedByHero: {} }, activePlayTime: { observedVisibleMs: 0, observedHiddenMs: 0, remainderEligibleMs: 0 }, heroCollection: expect.any(Object) } })

    const invalidV2 = JSON.stringify({ schemaVersion: 2, revision: 7, updatedAtMs: 2_000, data: { ...v2Data, rewardReceipts: null } })
    const invalid = memoryStorage(invalidV2)
    expect(() => new LocalMetaRepository(invalid.storage).migrateV2(7)).toThrow('Invalid Meta V2 save')
    expect(invalid.values.get(META_STORAGE_KEY)).toBe(invalidV2)
  })

  it('migrates V3 to V4 deterministically and preserves raw V3 on failure', () => {
    const v4 = createInitialMetaState('local-player', 1_000)
    const v3Data = {
      profile: v4.profile,
      wallet: v4.wallet,
      inventory: { consumables: {}, equipmentInstanceIds: ['unresolved-existing-id'] },
      commandEnergy: v4.commandEnergy,
      rewardReceipts: v4.rewardReceipts,
      activePlayTime: v4.activePlayTime,
    }
    const validV3 = JSON.stringify({ schemaVersion: 3, revision: 8, updatedAtMs: 2_000, data: v3Data })
    const valid = memoryStorage(validV3)
    expect(new LocalMetaRepository(valid.storage).migrateV3(8)).toMatchObject({
      schemaVersion: 5,
      revision: 8,
      data: { inventory: { unresolvedLegacyEquipmentInstanceIds: ['unresolved-existing-id'] } },
    })

    const invalidV3 = JSON.stringify({ schemaVersion: 3, revision: 8, updatedAtMs: 2_000, data: { ...v3Data, inventory: { consumables: {}, equipmentInstanceIds: [""] } } })
    const invalid = memoryStorage(invalidV3)
    expect(() => new LocalMetaRepository(invalid.storage).migrateV3(8)).toThrow('Invalid Meta V3 save')
    expect(invalid.values.get(META_STORAGE_KEY)).toBe(invalidV3)
  })

  it('keeps pure transaction input unchanged on failure', () => {
    const state = createInitialMetaState('local-player', 1_000)
    expect(() => applyRewardTransaction(state, { idempotencyKey: 'bad', operations: [{ type: 'spend-currency', currency: 'gold', amount: 1 }] }, 2_000)).toThrow()
    expect(state.wallet.balances.gold).toBe(0)
    expect(state.rewardReceipts).toEqual({})
  })

  it('does not allow checkpoint-only mode to bypass receipts without advancing active time', () => {
    const state = createInitialMetaState('local-player', 1_000)
    expect(() => applyRewardTransaction(state, {
      idempotencyKey: 'bypass', receiptPolicy: 'checkpoint-only', operations: [{ type: 'grant-currency', currency: 'knb', amount: 10 }],
    }, 2_000)).toThrow('exactly one active play-time checkpoint')
    expect(() => applyRewardTransaction(state, {
      idempotencyKey: 'replay', receiptPolicy: 'checkpoint-only', operations: [{ type: 'grant-currency', currency: 'knb', amount: 10 }, { type: 'set-active-play-time', progress: state.activePlayTime }],
    }, 2_000)).toThrow('must advance cumulative duration')
  })
})
