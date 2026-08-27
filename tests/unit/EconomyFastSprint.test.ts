import { describe, expect, it } from 'vitest'
import { featureFlags } from '../../src/config/features'
import { prototypeGoldGachaConfig, prototypeKnbShopConfig } from '../../src/data/economy/prototypeEconomyConfig'
import { prototypeEquipmentV2Definitions } from '../../src/data/equipment/definitions'
import { CONSUMABLE_ITEM_IDS } from '../../src/data/items/definitions'
import { GoldGachaService } from '../../src/domain/meta/GoldGacha'
import { KnbShopService } from '../../src/domain/meta/KnbShop'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { DeploymentCapacityRuntimeController } from '../../src/runtime/DeploymentCapacityRuntime'
import { ConsumableUseService } from '../../src/runtime/EconomyRuntime'

function memoryStorage(): { storage: StorageLike; values: Map<string, string> } {
  const values = new Map<string, string>()
  return { values, storage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) } } }
}

function setup(input: Readonly<{ gold?: number; knb?: number; energy?: number; consumables?: Record<string, number> }> = {}) {
  const memory = memoryStorage()
  const repository = new LocalMetaRepository(memory.storage)
  const initial = createInitialMetaState('fast-economy-test', 1_000)
  repository.save({
    ...initial,
    wallet: { balances: { gold: input.gold ?? 0, knb: input.knb ?? 0 } },
    commandEnergy: { ...initial.commandEnergy, current: input.energy ?? initial.commandEnergy.current },
    inventory: { ...initial.inventory, consumables: input.consumables ?? {} },
  }, 0, 1_000)
  const bridge = new BattleBridge()
  return { ...memory, repository, bridge }
}

function current(repository: LocalMetaRepository) {
  const loaded = repository.load()
  if (loaded.status !== 'loaded') throw new Error('Expected current Meta V4 save')
  return loaded.save
}

function gacha(repository: LocalMetaRepository, values: number[]) {
  let randomIndex = 0
  return new GoldGachaService(
    repository,
    prototypeEquipmentV2Definitions,
    prototypeGoldGachaConfig,
    () => values[randomIndex++] ?? values[values.length - 1] ?? 0,
    (pullIndex, reward) => `gacha-test:${pullIndex}:${reward.definitionId}`,
  )
}

describe('FAST-02 Gold Gacha', () => {
  it('rejects insufficient Gold atomically', () => {
    const { repository, values } = setup({ gold: prototypeGoldGachaConfig.pullCostGold - 1 })
    const rawBefore = values.get(META_STORAGE_KEY)
    expect(() => gacha(repository, [0]).pull(1, 1, 'gacha/insufficient', 2_000)).toThrow('would become invalid')
    expect(values.get(META_STORAGE_KEY)).toBe(rawBefore)
  })

  it('selects a deterministic 1x reward and creates a unique Level 1 Equipment instance', () => {
    const { repository } = setup({ gold: 500 })
    const result = gacha(repository, [0.5]).pull(1, 1, 'gacha/weapon', 2_000)
    expect(result.rewards.map((reward) => reward.id)).toEqual(['weapon-lv1'])
    expect(result.transaction.save.data.wallet.balances.gold).toBe(400)
    expect(result.transaction.save.data.inventory.equipmentInstances['gacha-test:0:green-dragon-blade']).toMatchObject({
      definitionId: 'green-dragon-blade', level: 1, slot: 'weapon',
    })
  })

  it('runs a deterministic 10x sequence as one batch without hidden guarantee', () => {
    const { repository } = setup({ gold: 2_000 })
    const sequence = [0, 0.5, 0.8, 0.94, 0.97, 0.99, 0, 0.5, 0.8, 0.94]
    const result = gacha(repository, sequence).pull(10, 1, 'gacha/ten-sequence', 2_000)
    expect(result.rewards.map((reward) => reward.id)).toEqual([
      'gold-return', 'weapon-lv1', 'gem-lv1', 'small-energy-token', 'medium-energy-token',
      'large-energy-token', 'gold-return', 'weapon-lv1', 'gem-lv1', 'small-energy-token',
    ])
    expect(result.transaction.save.revision).toBe(2)
    expect(result.transaction.save.data.inventory.consumables).toMatchObject({
      [CONSUMABLE_ITEM_IDS.smallEnergyToken]: 2,
      [CONSUMABLE_ITEM_IDS.mediumEnergyToken]: 1,
      [CONSUMABLE_ITEM_IDS.largeEnergyToken]: 1,
    })

    const noGuaranteeSetup = setup({ gold: 2_000 })
    const noGuarantee = gacha(noGuaranteeSetup.repository, Array(10).fill(0)).pull(10, 1, 'gacha/no-guarantee', 2_000)
    expect(noGuarantee.rewards.every((reward) => reward.type === 'gold')).toBe(true)
  })

  it('persists Binh Phu in Inventory without auto-converting it to Command Energy', () => {
    const { repository } = setup({ gold: 500, energy: 17 })
    const result = gacha(repository, [0.99]).pull(1, 1, 'gacha/bin-phu', 2_000)
    expect(result.transaction.save.data.inventory.consumables[CONSUMABLE_ITEM_IDS.largeEnergyToken]).toBe(1)
    expect(result.transaction.save.data.commandEnergy.current).toBe(17)
  })

  it('prevents duplicate grant across reload and rejects same key with a different pull payload', () => {
    const { repository, storage } = setup({ gold: 2_000 })
    const first = gacha(repository, [0.5]).pull(1, 1, 'gacha/retry', 2_000)
    const reloaded = new LocalMetaRepository(storage)
    const retry = gacha(reloaded, [0.8]).pull(1, first.transaction.save.revision, 'gacha/retry', 3_000)
    expect(retry.transaction.status).toBe('already-applied')
    expect(Object.keys(retry.transaction.save.data.inventory.equipmentInstances)).toHaveLength(1)
    expect(() => gacha(reloaded, Array(10).fill(0)).pull(10, retry.transaction.save.revision, 'gacha/retry', 4_000)).toThrow('different transaction')
  })

  it('keeps all production-open values replaceable and Binh Phu categories rarest', () => {
    const binhWeights = prototypeGoldGachaConfig.rewards.filter((reward) => reward.type === 'consumable').map((reward) => reward.weight)
    const otherWeights = prototypeGoldGachaConfig.rewards.filter((reward) => reward.type !== 'consumable').map((reward) => reward.weight)
    expect(Math.max(...binhWeights)).toBeLessThan(Math.min(...otherWeights))
    const goldReturn = prototypeGoldGachaConfig.rewards.find((reward) => reward.type === 'gold')
    expect(goldReturn?.type === 'gold' ? goldReturn.amount : Infinity).toBeLessThan(prototypeGoldGachaConfig.pullCostGold)
    expect(prototypeGoldGachaConfig.pity.enabled).toBe(false)
  })
})

describe('FAST-02 KNB Shop and consumable use', () => {
  it('buys Chiêu Hiền Lệnh as an item only and does not recruit a Hero', () => {
    const { repository } = setup({ knb: 100 })
    const shop = new KnbShopService(repository, prototypeEquipmentV2Definitions, prototypeKnbShopConfig)
    const result = shop.buy(CONSUMABLE_ITEM_IDS.recruitmentDecree, 1, 1, 'shop/recruitment-decree', 2_000)
    expect(result.save.data.wallet.balances.knb).toBe(90)
    expect(result.save.data.inventory.consumables[CONSUMABLE_ITEM_IDS.recruitmentDecree]).toBe(1)
    expect(result.save.data.profile.summonOrderCount).toBe(0)
  })

  it('rejects insufficient KNB without any mutation', () => {
    const { repository, values } = setup({ knb: 0 })
    const rawBefore = values.get(META_STORAGE_KEY)
    const shop = new KnbShopService(repository, prototypeEquipmentV2Definitions, prototypeKnbShopConfig)
    expect(() => shop.buy(CONSUMABLE_ITEM_IDS.summonOrder, 1, 1, 'shop/insufficient', 2_000)).toThrow('would become invalid')
    expect(values.get(META_STORAGE_KEY)).toBe(rawBefore)
  })

  it('uses Binh Phu atomically in batch and preserves overflow above cap', () => {
    const { repository, bridge } = setup({ energy: 58, consumables: { [CONSUMABLE_ITEM_IDS.largeEnergyToken]: 2 } })
    const service = new ConsumableUseService(repository, bridge, new DeploymentCapacityRuntimeController(repository, bridge, 6))
    const result = service.useCommandEnergyItem(CONSUMABLE_ITEM_IDS.largeEnergyToken, 2, 1, 'use/large-batch', 2_000)
    expect(result.save.data.inventory.consumables[CONSUMABLE_ITEM_IDS.largeEnergyToken]).toBe(0)
    expect(result.save.data.commandEnergy.current).toBe(78)
    expect(bridge.getCommandEnergySnapshot()).toEqual({ current: 78, cap: 60 })
  })

  it('uses Lệnh Hiệu Triệu atomically and refreshes account/map capacity projection', () => {
    const { repository, bridge } = setup({ consumables: { [CONSUMABLE_ITEM_IDS.summonOrder]: 1 } })
    const capacityRuntime = new DeploymentCapacityRuntimeController(repository, bridge, 12)
    const service = new ConsumableUseService(repository, bridge, capacityRuntime)
    expect(capacityRuntime.refresh()).toMatchObject({ totalUnlockedCapacity: 7, effectiveLimit: 7 })
    const result = service.useSummonOrder(1, 1, 'use/summon-order', 2_000)
    expect(result.save.data.inventory.consumables[CONSUMABLE_ITEM_IDS.summonOrder]).toBe(0)
    expect(result.save.data.profile.summonOrderCount).toBe(1)
    expect(bridge.getDeploymentCapacitySnapshot()).toMatchObject({ totalUnlockedCapacity: 8, effectiveLimit: 8 })
  })

  it('keeps wallet exactly Gold + KNB, survives reload, and x1/x3 does not affect economy', () => {
    const { repository, storage, bridge } = setup({ knb: 100 })
    bridge.setSpeed(3)
    const shop = new KnbShopService(repository, prototypeEquipmentV2Definitions, prototypeKnbShopConfig)
    const result = shop.buy(CONSUMABLE_ITEM_IDS.summonOrder, 1, 1, 'shop/speed-independent', 2_000)
    bridge.setSpeed(1)
    const reloaded = current(new LocalMetaRepository(storage))
    expect(reloaded).toEqual(result.save)
    expect(Object.keys(reloaded.data.wallet.balances).sort()).toEqual(['gold', 'knb'])
    expect(bridge.getSpeed()).toBe(1)
    expect(featureFlags.upgradeCooldownEnabled).toBe(false)
  })

  it('protects optimistic revision and idempotent retry for item use', () => {
    const { repository, bridge, storage } = setup({ consumables: { [CONSUMABLE_ITEM_IDS.smallEnergyToken]: 2 } })
    const service = new ConsumableUseService(repository, bridge, new DeploymentCapacityRuntimeController(repository, bridge, 6))
    expect(() => service.useCommandEnergyItem(CONSUMABLE_ITEM_IDS.smallEnergyToken, 1, 2, 'use/stale', 2_000)).toThrow('revision conflict')
    const first = service.useCommandEnergyItem(CONSUMABLE_ITEM_IDS.smallEnergyToken, 1, 1, 'use/retry', 2_000)
    const reloaded = new LocalMetaRepository(storage)
    const retryService = new ConsumableUseService(reloaded, bridge, new DeploymentCapacityRuntimeController(reloaded, bridge, 6))
    const retry = retryService.useCommandEnergyItem(CONSUMABLE_ITEM_IDS.smallEnergyToken, 1, first.save.revision, 'use/retry', 3_000)
    expect(retry.status).toBe('already-applied')
    expect(retry.save.data.commandEnergy.current).toBe(61)
    expect(retry.save.data.inventory.consumables[CONSUMABLE_ITEM_IDS.smallEnergyToken]).toBe(1)
  })
})
