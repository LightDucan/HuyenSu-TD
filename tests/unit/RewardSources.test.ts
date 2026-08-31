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

  it('grants first-clear once, survives replay/reload, and validates configuration', () => {
    const repo = repository(); const service = new RewardSourceService(repo, { ...config('visible-only'), firstClearByStageId: { chapter1: { gold: 100, knb: 50, anhHon: 100 } } })
    expect(service.firstClear({ stageId: 'chapter1', committedAtMs: 2_000 }).status).toBe('applied')
    expect(service.firstClear({ stageId: 'chapter1', committedAtMs: 2_001 }).status).toBe('already-applied')
    expect(service.firstClear({ stageId: 'unknown', committedAtMs: 2_002 }).status).toBe('not-eligible')
    expect(() => new RewardSourceService(repo, { ...config('visible-only'), firstClearByStageId: { bad: { gold: 0, knb: 0, anhHon: 0 } } })).toThrow()
  })

  it('repeats ordinary rewards on a new run but never repeats first-clear or grants it to Bà Triệu', () => {
    const repo = repository(); const service = new RewardSourceService(repo, { ...config('visible-only'), stageClear: { rewardByStageId: { chapter1: { gold: 20, knb: 1, anhHon: 10 }, 'ba-trieu-01': { gold: 30, knb: 2 } } }, firstClearByStageId: { chapter1: { gold: 100, knb: 50, anhHon: 100 } } })
    service.stageClear({ runId: 'r1', stageId: 'chapter1', committedAtMs: 2_000 }); service.firstClear({ stageId: 'chapter1', committedAtMs: 2_001 })
    service.stageClear({ runId: 'r2', stageId: 'chapter1', committedAtMs: 2_002 })
    expect(service.firstClear({ stageId: 'chapter1', committedAtMs: 2_003 }).status).toBe('already-applied')
    expect(service.firstClear({ stageId: 'ba-trieu-01', committedAtMs: 2_004 }).status).toBe('not-eligible')
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { gold: 140, knb: 52 } } } } })
  })

  it('uses real wall-clock duration and is independent of Battle GameClock speed', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    service.activePlayTime({ sessionId: 'session-1', claimId: 'window-1', cumulativeVisibleMs: 360_000, cumulativeHiddenMs: 0, committedAtMs: 2_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 6 } } } } })
  })

  it('proves both hidden-tab policies at the boundary', () => {
    expect(calculateEligibleWallClockMs('visible-only', 60_000, 180_000)).toBe(60_000)
    expect(calculateEligibleWallClockMs('count-hidden', 60_000, 180_000)).toBe(240_000)
    const visibleOnlyRepo = repository()
    new RewardSourceService(visibleOnlyRepo, config('visible-only')).activePlayTime({ sessionId: 's', claimId: 'v', cumulativeVisibleMs: 60_000, cumulativeHiddenMs: 180_000, committedAtMs: 2_000 })
    expect(visibleOnlyRepo.load()).toMatchObject({ status: 'loaded', save: { revision: 2, data: { wallet: { balances: { knb: 0 } } } } })
    const countHiddenRepo = repository()
    new RewardSourceService(countHiddenRepo, config('count-hidden')).activePlayTime({ sessionId: 's', claimId: 'h', cumulativeVisibleMs: 60_000, cumulativeHiddenMs: 180_000, committedAtMs: 2_000 })
    expect(countHiddenRepo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 4 } } } } })
  })

  it('does not issue a transaction when a source is not configured or not eligible', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    expect(service.enemyKill({ runId: 'r', enemyInstanceId: 'e', enemyId: 'unknown', committedAtMs: 2_000 }).status).toBe('not-eligible')
    expect(service.stageClear({ runId: 'r', stageId: 'unknown', committedAtMs: 2_000 }).status).toBe('not-eligible')
    expect(service.activePlayTime({ sessionId: 's', claimId: 'empty', cumulativeVisibleMs: 119_999, cumulativeHiddenMs: 0, committedAtMs: 2_000 }).status).toBe('applied')
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { revision: 2, data: { activePlayTime: { remainderEligibleMs: 119_999 } } } })
  })

  it('does not reward the same elapsed time again when claimId changes', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    service.activePlayTime({ sessionId: 's', claimId: 'first', cumulativeVisibleMs: 120_000, cumulativeHiddenMs: 0, committedAtMs: 2_000 })
    const retry = service.activePlayTime({ sessionId: 's', claimId: 'different', cumulativeVisibleMs: 120_000, cumulativeHiddenMs: 0, committedAtMs: 3_000 })
    expect(retry.status).toBe('already-applied')
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { revision: 2, data: { wallet: { balances: { knb: 2 } } } } })
  })

  it('rewards only newly completed intervals from six to eight cumulative minutes', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    service.activePlayTime({ sessionId: 's', claimId: 'six', cumulativeVisibleMs: 360_000, cumulativeHiddenMs: 0, committedAtMs: 2_000 })
    service.activePlayTime({ sessionId: 's', claimId: 'eight', cumulativeVisibleMs: 480_000, cumulativeHiddenMs: 0, committedAtMs: 3_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 8 } } } } })
  })

  it('persists anti-replay progress across repository reload', () => {
    const values = new Map<string, string>()
    const storage: StorageLike = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
    const firstRepo = new LocalMetaRepository(storage)
    firstRepo.save(createInitialMetaState('reload-test', 1_000), 0, 1_000)
    new RewardSourceService(firstRepo, config('visible-only')).activePlayTime({ sessionId: 's1', claimId: 'one', cumulativeVisibleMs: 240_000, cumulativeHiddenMs: 0, committedAtMs: 2_000 })
    const reloaded = new LocalMetaRepository(storage)
    const retry = new RewardSourceService(reloaded, config('visible-only')).activePlayTime({ sessionId: 's2', claimId: 'two', cumulativeVisibleMs: 240_000, cumulativeHiddenMs: 0, committedAtMs: 3_000 })
    expect(retry.status).toBe('already-applied')
    expect(reloaded.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 4 } } } } })
  })

  it('carries remainder into the next cumulative claim', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    service.activePlayTime({ sessionId: 's', claimId: 'partial', cumulativeVisibleMs: 90_000, cumulativeHiddenMs: 0, committedAtMs: 2_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { activePlayTime: { remainderEligibleMs: 90_000 }, wallet: { balances: { knb: 0 } } } } })
    service.activePlayTime({ sessionId: 's', claimId: 'complete', cumulativeVisibleMs: 150_000, cumulativeHiddenMs: 0, committedAtMs: 3_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { activePlayTime: { remainderEligibleMs: 30_000 }, wallet: { balances: { knb: 2 } }, rewardReceipts: {} } } })
  })

  it('rejects cumulative time going backward', () => {
    const repo = repository(); const service = new RewardSourceService(repo, config('visible-only'))
    service.activePlayTime({ sessionId: 's', claimId: 'forward', cumulativeVisibleMs: 120_000, cumulativeHiddenMs: 60_000, committedAtMs: 2_000 })
    expect(() => service.activePlayTime({ sessionId: 's', claimId: 'backward', cumulativeVisibleMs: 119_999, cumulativeHiddenMs: 60_000, committedAtMs: 3_000 })).toThrow('cannot go backward')
  })

  it('does not grant past hidden time retroactively when policy changes', () => {
    const repo = repository()
    new RewardSourceService(repo, config('visible-only')).activePlayTime({ sessionId: 's', claimId: 'visible', cumulativeVisibleMs: 120_000, cumulativeHiddenMs: 240_000, committedAtMs: 2_000 })
    new RewardSourceService(repo, config('count-hidden')).activePlayTime({ sessionId: 's', claimId: 'policy-change', cumulativeVisibleMs: 120_000, cumulativeHiddenMs: 240_000, committedAtMs: 3_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 2 } } } } })
    new RewardSourceService(repo, config('count-hidden')).activePlayTime({ sessionId: 's', claimId: 'new-hidden', cumulativeVisibleMs: 120_000, cumulativeHiddenMs: 360_000, committedAtMs: 4_000 })
    expect(repo.load()).toMatchObject({ status: 'loaded', save: { data: { wallet: { balances: { knb: 4 } } } } })
  })
})
