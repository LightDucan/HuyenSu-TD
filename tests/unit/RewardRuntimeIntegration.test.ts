import { describe, expect, it } from 'vitest'
import { prototypeWaves } from '../../src/data/waves/prototypeWaves'
import { LocalMetaRepository } from '../../src/domain/meta/MetaRepository'
import { RewardSourceService, type RewardSourceConfig } from '../../src/domain/meta/RewardSources'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { WaveManager } from '../../src/domain/waves/WaveManager'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { createBattleRunId } from '../../src/game/runtime/BattleRunIdentity'
import { ActivePlayTimeTracker, ensureMetaRepositoryReady, RewardRuntimeController } from '../../src/runtime/RewardRuntime'

const config = (policy: 'visible-only' | 'count-hidden' = 'visible-only'): RewardSourceConfig => ({
  enemyKill: { goldByEnemyId: { sword: 2 } },
  stageClear: { rewardByStageId: { stage: { gold: 10, knb: 3 } } },
  activePlayTime: { intervalMs: 60_000, knbPerInterval: 1, hiddenTabPolicy: policy },
})

function setup() {
  const values = new Map<string, string>()
  const storage: StorageLike = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const repository = new LocalMetaRepository(storage)
  ensureMetaRepositoryReady(repository, 'runtime-test', 1_000)
  return { storage, repository, bridge: new BattleBridge() }
}

describe('P11-C03 Reward Runtime Integration', () => {
  it('routes duplicate enemy death events through the transaction once', () => {
    const { repository, bridge } = setup()
    const runtime = new RewardRuntimeController(repository, bridge, config()); runtime.start()
    const event = { runId: 'run', enemyInstanceId: 'enemy-1', enemyId: 'sword', occurredAtMs: 2_000 }
    bridge.reportEnemyDefeated(event); bridge.reportEnemyDefeated({ ...event, occurredAtMs: 3_000 })
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { revision: 2, data: { wallet: { balances: { gold: 2, knb: 0 } } } } })
    runtime.stop()
  })

  it('routes duplicate stage victory events through the transaction once', () => {
    const { repository, bridge } = setup()
    const runtime = new RewardRuntimeController(repository, bridge, config()); runtime.start()
    const event = { runId: 'run', stageId: 'stage', occurredAtMs: 2_000 }
    bridge.reportStageVictory(event); bridge.reportStageVictory({ ...event, occurredAtMs: 3_000 })
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { revision: 2, data: { wallet: { balances: { gold: 10, knb: 3 } } } } })
    runtime.stop()
  })

  it('tracks real wall-clock time independently of x1/x3 Battle speed', () => {
    const { repository, bridge } = setup()
    const source = new RewardSourceService(repository, config())
    const tracker = new ActivePlayTimeTracker(source, 1_000, true, repository)
    bridge.setSpeed(3)
    tracker.flush(121_000)
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 2 } } } } })
  })

  it('supports hidden wall time only when configured', () => {
    const visibleOnly = setup()
    const visibleTracker = new ActivePlayTimeTracker(new RewardSourceService(visibleOnly.repository, config('visible-only')), 1_000, false, visibleOnly.repository)
    visibleTracker.flush(121_000)
    expect(visibleOnly.repository.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 0 } } } } })

    const countHidden = setup()
    const hiddenTracker = new ActivePlayTimeTracker(new RewardSourceService(countHidden.repository, config('count-hidden')), 1_000, false, countHidden.repository)
    hiddenTracker.flush(121_000)
    expect(countHidden.repository.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 2 } } } } })
  })

  it('continues a new tracker from the persisted checkpoint after repository reload', () => {
    const { storage, repository } = setup()
    const first = new ActivePlayTimeTracker(new RewardSourceService(repository, config()), 1_000, true, repository)
    first.flush(91_000)

    const reloaded = new LocalMetaRepository(storage)
    const second = new ActivePlayTimeTracker(new RewardSourceService(reloaded, config()), 200_000, true, reloaded)
    second.flush(230_000)

    expect(reloaded.load()).toMatchObject({
      status: 'loaded',
      save: { data: { activePlayTime: { observedVisibleMs: 120_000, remainderEligibleMs: 0 }, wallet: { balances: { knb: 2 } } } },
    })
  })

  it('attributes visible-hidden-visible elapsed time to the correct counters', () => {
    const { repository } = setup()
    const tracker = new ActivePlayTimeTracker(new RewardSourceService(repository, config('visible-only')), 1_000, true, repository)

    tracker.setVisibility(false, 31_000)
    tracker.setVisibility(true, 91_000)
    tracker.flush(121_000)

    expect(repository.load()).toMatchObject({
      status: 'loaded',
      save: { data: { activePlayTime: { observedVisibleMs: 60_000, observedHiddenMs: 60_000, remainderEligibleMs: 0 }, wallet: { balances: { knb: 1 } } } },
    })
  })

  it('does not reclaim elapsed time after save and reload', () => {
    const { storage, repository } = setup()
    const first = new ActivePlayTimeTracker(new RewardSourceService(repository, config()), 1_000, true, repository)
    first.flush(61_000)

    const reloaded = new LocalMetaRepository(storage)
    const second = new ActivePlayTimeTracker(new RewardSourceService(reloaded, config()), 100_000, true, reloaded)
    second.flush(100_000)
    expect(reloaded.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 1 } } } } })

    second.flush(160_000)
    expect(reloaded.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 2 } } } } })
  })

  it('keeps optimistic revision conflicts protected', () => {
    const { repository } = setup()
    const initial = repository.load()
    if (initial.status !== 'loaded') throw new Error('Expected loaded Meta save')
    repository.save(initial.save.data, initial.save.revision, 2_000)

    expect(() => repository.transactReward(
      { idempotencyKey: 'stale-runtime-reward', operations: [{ type: 'grant-currency', currency: 'knb', amount: 1 }] },
      initial.save.revision,
      3_000,
    )).toThrow('revision conflict')
  })

  it('creates a fresh run ID for every Battle run or replay', () => {
    const uuids = ['first-run', 'second-run']
    const createUuid = () => uuids.shift() ?? ''
    expect(createBattleRunId(createUuid)).toBe('battle-first-run')
    expect(createBattleRunId(createUuid)).toBe('battle-second-run')
  })

  it('smoke-tests all ten waves through kill and victory reward events', () => {
    const { repository, bridge } = setup()
    const allEnemyIds = [...new Set(prototypeWaves.flatMap((wave) => wave.groups.map((group) => group.enemyId)))]
    const smokeConfig: RewardSourceConfig = {
      enemyKill: { goldByEnemyId: Object.fromEntries(allEnemyIds.map((id) => [id, 1])) },
      stageClear: { rewardByStageId: { 'prototype-stage-01': { gold: 10, knb: 1 } } },
      activePlayTime: { intervalMs: 60_000, knbPerInterval: 1, hiddenTabPolicy: 'visible-only' },
    }
    const runtime = new RewardRuntimeController(repository, bridge, smokeConfig); runtime.start()
    const waves = new WaveManager(prototypeWaves)
    let sequence = 0
    while (waves.getStatus() !== 'won') {
      const spawned = waves.update(1_000_000)
      spawned.forEach((enemyId) => {
        bridge.reportEnemyDefeated({ runId: 'smoke-run', enemyInstanceId: `enemy-${sequence}`, enemyId, occurredAtMs: 2_000 + sequence })
        sequence += 1
      })
      waves.completeWhenNoEnemiesRemain(0)
    }
    bridge.reportStageVictory({ runId: 'smoke-run', stageId: 'prototype-stage-01', occurredAtMs: 10_000 })
    expect(sequence).toBe(prototypeWaves.flatMap((wave) => wave.groups).reduce((sum, group) => sum + group.count, 0))
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { gold: sequence + 10, knb: 1 } } } } })
    runtime.stop()
  })
})
