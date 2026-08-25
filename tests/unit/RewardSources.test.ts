import { describe, expect, it } from 'vitest'
import { LocalMetaRepository } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import { calculateEligibleWallClockMs, RewardSourceService, type RewardSourceConfig } from '../../src/domain/meta/RewardSources'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'

function repository(): LocalMetaRepository {
  const values = new Map<string, string>()
  const storage: StorageLike = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const repo = new LocalMetaRepository(storage)
  repo.save(createInitialMetaState('reward-source-test', 1_000), 0, 1_000)
  return repo
}

const config = (hiddenTabPolicy: RewardSourceConfig['activePlayTime']['hiddenTabPolicy']): RewardSourceConfig => ({
  enemyKill: { goldByEnemyId: { infantry: 5 } },
  stageClear: { rewardByStageId: { chapter1: { gold: 50, knb: 3 } } },
  activePlayTime: { knbPerInterval: 2, intervalMs: 120_000, hiddenTabPolicy },
})

describe('P11-C02 Reward Sources', () => {
  it('creates unique kill keys and duplicate death events do not grant twice', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    const first = service.enemyKill({ runId: 'run-1', enemyInstanceId: 'enemy-7', enemyId: 'infantry', committedAtMs: 2_000 })
    const retry = service.enemyKill({ runId: 'run-1', enemyInstanceId: 'enemy-7', enemyId: 'infantry', committedAtMs: 3_000 })
    expect(first.status).toBe('applied'); expect(retry.status).toBe('already-applied')
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { revision: 2, data: { wallet: { balances: { gold: 5, knb: 0 } } } } })
  })

  it('does not collapse different enemy instances into one reward', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    service.enemyKill({ runId: 'run-1', enemyInstanceId: 'enemy-7', enemyId: 'infantry', committedAtMs: 2_000 })
    service.enemyKill({ runId: 'run-1', enemyInstanceId: 'enemy-8', enemyId: 'infantry', committedAtMs: 3_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { gold: 10 } } } } })
  })

  it('grants Stage Clear Gold and KNB once per run', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    const first = service.stageClear({ runId: 'run-1', stageId: 'chapter1', committedAtMs: 2_000 })
    const retry = service.stageClear({ runId: 'run-1', stageId: 'chapter1', committedAtMs: 3_000 })
    expect(first.status).toBe('applied'); expect(retry.status).toBe('already-applied')
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { gold: 50, knb: 3 } } } } })
  })

  it('uses real wall-clock duration and is independent of Battle GameClock speed', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    service.activePlayTime({ sessionId: 'session-1', claimId: 'window-1', visibleMs: 360_000, hiddenMs: 0, committedAtMs: 2_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 6 } } } } })
  })

  it('proves both hidden-tab policies at the boundary', () => {
    expect(calculateEligibleWallClockMs('visible-only', 60_000, 180_000)).toBe(60_000)
    expect(calculateEligibleWallClockMs('count-hidden', 60_000, 180_000)).toBe(240_000)
    const visibleOnlyRepo = repository()
    new RewardSourceService(visibleOnlyRepo, config('visible-only')).activePlayTime({ sessionId: 's', claimId: 'v', visibleMs: 60_000, hiddenMs: 180_000, committedAtMs: 2_000 })
    expect(visibleOnlyRepo.load()).toMatchObject({ status: 'loaded', save: { revision: 1, data: { wallet: { balances: { knb: 0 } } } } })
    const countHiddenRepo = repository()
    new RewardSourceService(countHiddenRepo, config('count-hidden')).activePlayTime({ sessionId: 's', claimId: 'h', visibleMs: 60_000, hiddenMs: 180_000, committedAtMs: 2_000 })
    expect(countHiddenRepo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 4 } } } } })
  })

  it('does not issue a transaction when a source is not configured or not eligible', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    expect(service.enemyKill({ runId: 'r', enemyInstanceId: 'e', enemyId: 'unknown', committedAtMs: 2_000 }).status).toBe('not-eligible')
    expect(service.stageClear({ runId: 'r', stageId: 'unknown', committedAtMs: 2_000 }).status).toBe('not-eligible')
    expect(service.activePlayTime({ sessionId: 's', claimId: 'empty', visibleMs: 119_999, hiddenMs: 0, committedAtMs: 2_000 }).status).toBe('not-eligible')
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { revision: 1 } })
  })
})
