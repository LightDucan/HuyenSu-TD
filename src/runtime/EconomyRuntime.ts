import { haiBaTrungGoldGachaConfig, prototypeKnbShopConfig } from '../data/economy/prototypeEconomyConfig'
import { haiBaTrungEquipmentV2Definitions } from '../data/equipment/definitions'
import { commandEnergyItemValues, CONSUMABLE_ITEM_IDS } from '../data/items/definitions'
import { selectCommandEnergyCap } from '../domain/meta/CommandEnergy'
import { GoldGachaService } from '../domain/meta/GoldGacha'
import { KnbShopService } from '../domain/meta/KnbShop'
import { LocalMetaRepository, type EconomyTransactionCommit } from '../domain/meta/MetaRepository'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge } from '../game/bridge/BattleBridge'
import { DeploymentCapacityRuntimeController } from './DeploymentCapacityRuntime'
import { createRuntimeMetaRepository, ensureMetaRepositoryReady, publishCurrentMetaSnapshot } from './RewardRuntime'

export class ConsumableUseService {
  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly bridge: BattleBridge,
    private readonly capacityRuntime: DeploymentCapacityRuntimeController,
  ) {}

  useCommandEnergyItem(
    itemId: string,
    quantity: number,
    expectedRevision: number,
    idempotencyKey: string,
    nowMs: number,
  ): EconomyTransactionCommit {
    const energyPerItem = commandEnergyItemValues[itemId]
    if (energyPerItem === undefined) throw new Error('Unknown Command Energy consumable')
    if (!Number.isSafeInteger(quantity) || quantity <= 0) throw new Error('Consumable use quantity must be a positive safe integer')
    const energyAmount = energyPerItem * quantity
    if (!Number.isSafeInteger(energyAmount)) throw new Error('Command Energy item batch exceeds safe integer range')
    const result = this.repository.transactEconomy({
      idempotencyKey,
      operations: [
        { type: 'consume-consumable', itemId, quantity },
        { type: 'grant-command-energy', amount: energyAmount },
      ],
    }, haiBaTrungEquipmentV2Definitions, expectedRevision, nowMs)
    this.bridge.emitCommandEnergySnapshot({
      current: result.save.data.commandEnergy.current,
      cap: selectCommandEnergyCap(result.save.data.profile.playerLevel),
    })
    return result
  }

  useSummonOrder(
    quantity: number,
    expectedRevision: number,
    idempotencyKey: string,
    nowMs: number,
  ): EconomyTransactionCommit {
    const result = this.repository.transactEconomy({
      idempotencyKey,
      operations: [
        { type: 'consume-consumable', itemId: CONSUMABLE_ITEM_IDS.summonOrder, quantity },
        { type: 'increment-summon-orders', quantity },
      ],
    }, haiBaTrungEquipmentV2Definitions, expectedRevision, nowMs)
    this.capacityRuntime.refresh()
    return result
  }
}

export type BrowserEconomyRuntime = Readonly<{
  repository: LocalMetaRepository
  gacha: GoldGachaService
  shop: KnbShopService
  consumables: ConsumableUseService
  setMapTileCount: (count: number) => void
}>

let browserEconomyRuntime: BrowserEconomyRuntime | undefined

export function initializeBrowserEconomyRuntime(
  storage: StorageLike,
  bridge: BattleBridge,
  mapTileCount: number,
): BrowserEconomyRuntime {
  const repository = createRuntimeMetaRepository(storage, bridge)
  ensureMetaRepositoryReady(repository, 'local-player', Date.now())
  publishCurrentMetaSnapshot(repository, bridge)
  const capacityRuntime = new DeploymentCapacityRuntimeController(repository, bridge, mapTileCount)
  let sequence = 0
  const gacha = new GoldGachaService(
    repository,
    haiBaTrungEquipmentV2Definitions,
    haiBaTrungGoldGachaConfig,
    Math.random,
    () => `gacha-equipment:${Date.now()}:${sequence += 1}:${crypto.randomUUID()}`,
  )
  browserEconomyRuntime = {
    repository,
    gacha,
    shop: new KnbShopService(repository, haiBaTrungEquipmentV2Definitions, prototypeKnbShopConfig),
    consumables: new ConsumableUseService(repository, bridge, capacityRuntime),
    setMapTileCount: (count: number) => capacityRuntime.setMapTileCount(count),
  }
  return browserEconomyRuntime
}

export function getBrowserEconomyRuntime(): BrowserEconomyRuntime {
  if (!browserEconomyRuntime) throw new Error('Browser Economy runtime has not been initialized')
  return browserEconomyRuntime
}
