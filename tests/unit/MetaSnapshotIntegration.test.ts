import { describe, expect, it } from 'vitest'
import { prototypeGoldGachaConfig, prototypeKnbShopConfig } from '../../src/data/economy/prototypeEconomyConfig'
import { prototypeEquipmentV2Definitions } from '../../src/data/equipment/definitions'
import { CONSUMABLE_ITEM_IDS } from '../../src/data/items/definitions'
import { GoldGachaService } from '../../src/domain/meta/GoldGacha'
import { KnbShopService } from '../../src/domain/meta/KnbShop'
import { RewardSourceService, type RewardSourceConfig } from '../../src/domain/meta/RewardSources'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { ActivePlayTimeTracker, createRuntimeMetaRepository, RewardRuntimeController } from '../../src/runtime/RewardRuntime'

const rewardConfig: RewardSourceConfig = {
  enemyKill: { goldByEnemyId: { sword: 2 } },
  stageClear: { rewardByStageId: { stage: { gold: 10, knb: 3 } } },
  activePlayTime: { intervalMs: 60_000, knbPerInterval: 1, hiddenTabPolicy: 'visible-only' },
}

function setup(input: Readonly<{ gold?: number; knb?: number }> = {}) {
  const values = new Map<string, string>()
  const storage: StorageLike = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) } }
  const bridge = new BattleBridge()
  const repository = createRuntimeMetaRepository(storage, bridge)
  const initial = createInitialMetaState('meta-snapshot-test', 0)
  repository.save({ ...initial, wallet: { balances: { gold: input.gold ?? 0, knb: input.knb ?? 0 } } }, 0, 0)
  return { storage, bridge, repository }
}

describe('FAST-02A live read-only Meta snapshots', () => {
  it('publishes Enemy Kill Gold and duplicate/UI refresh does not grant twice', () => {
    const { bridge, repository } = setup()
    const revisions: number[] = []
    bridge.onMetaSnapshot((snapshot) => revisions.push(snapshot.revision))
    const runtime = new RewardRuntimeController(repository, bridge, rewardConfig)
    runtime.start()
    const event = { runId: 'run', enemyInstanceId: 'enemy-1', enemyId: 'sword', occurredAtMs: 1_000 }
    bridge.reportEnemyDefeated(event)
    const afterReward = bridge.getMetaSnapshot()!
    expect(afterReward.data.wallet.balances.gold).toBe(2)
    bridge.emitMetaSnapshot(afterReward)
    bridge.reportEnemyDefeated({ ...event, occurredAtMs: 2_000 })
    expect(bridge.getMetaSnapshot()!.data.wallet.balances.gold).toBe(2)
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { revision: 2 } })
    expect(revisions).toEqual([2, 2])
    runtime.stop()
  })

  it('publishes Stage Clear Gold and KNB', () => {
    const { bridge, repository } = setup()
    const runtime = new RewardRuntimeController(repository, bridge, rewardConfig)
    runtime.start()
    bridge.reportStageVictory({ runId: 'stage-run', stageId: 'stage', occurredAtMs: 1_000 })
    expect(bridge.getMetaSnapshot()!.data.wallet.balances).toEqual({ gold: 10, knb: 3 })
    runtime.stop()
  })

  it('publishes 60-second Active Play KNB', () => {
    const { bridge, repository } = setup()
    const tracker = new ActivePlayTimeTracker(new RewardSourceService(repository, rewardConfig), 0, true, repository)
    tracker.flush(60_000)
    expect(bridge.getMetaSnapshot()!.data.wallet.balances.knb).toBe(1)
  })

  it('publishes KNB Shop wallet changes without React polling storage', () => {
    const { bridge, repository } = setup({ knb: 100 })
    const shop = new KnbShopService(repository, prototypeEquipmentV2Definitions, prototypeKnbShopConfig)
    shop.buy(CONSUMABLE_ITEM_IDS.recruitmentDecree, 1, 1, 'snapshot/shop', 1_000)
    expect(bridge.getMetaSnapshot()!.data.wallet.balances).toEqual({ gold: 0, knb: 90 })
    expect(bridge.getMetaSnapshot()!.data.inventory.consumables[CONSUMABLE_ITEM_IDS.recruitmentDecree]).toBe(1)
  })

  it('publishes Gold Gacha wallet changes', () => {
    const { bridge, repository } = setup({ gold: 500 })
    const gacha = new GoldGachaService(
      repository,
      prototypeEquipmentV2Definitions,
      prototypeGoldGachaConfig,
      () => 0,
      (index) => `snapshot-gacha-${index}`,
    )
    gacha.pull(1, 1, 'snapshot/gacha', 1_000)
    expect(bridge.getMetaSnapshot()!.data.wallet.balances.gold).toBe(420)
  })
})

