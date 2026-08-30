import { describe, expect, it } from 'vitest'
import { completeStage, isChapterCompleted, selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import { CampaignProgressionRuntime } from '../../src/runtime/CampaignProgressionRuntime'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { validateMetaSave, validateMetaSaveV5 } from '../../src/domain/meta/MetaValidation'

const storage = (raw?: string) => { const values = new Map<string, string>(); if (raw) values.set(META_STORAGE_KEY, raw); return { values, getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) } }
const map = { id: 'm', title: 'm', theme: 'm', width: 100, height: 100, grid: { columns: 2, rows: 2 }, fixedPath: [{ x: 0, y: 50 }, { x: 100, y: 50 }], placementTiles: [{ column: 0, row: 0 }] } as const
const stage = (id: string) => ({ id, displayName: id, map, waves: [], allowedHeroIds: ['trung-trac'] as const, enemyDefinitionIds: [] })
const chapter = { id: 'test', displayName: 'Test', stages: [stage('a'), stage('b'), stage('c')] } as const

describe('campaign progression', () => {
  it('keeps V6 canonical validation strict and validates V5 only through its boundary', () => {
    const initial = createInitialMetaState('strict', 0)
    const { campaignProgress: _ignored, ...v5Data } = initial
    const v5 = { schemaVersion: 5, revision: 1, updatedAtMs: 0, data: v5Data }
    expect(validateMetaSave(v5).ok).toBe(false)
    expect(validateMetaSaveV5(v5).ok).toBe(true)
    expect(validateMetaSave({ schemaVersion: 6, revision: 1, updatedAtMs: 0, data: { ...initial, campaignProgress: { completedStages: { bad: { firstCompletedAtMs: -1 } } } } }).ok).toBe(false)
  })
  it('derives unlocks and chapter completion from ordered completions', () => {
    let progress = { completedStages: {} }
    expect(selectStageProgress(chapter, progress, 'a')).toBe('available')
    expect(selectStageProgress(chapter, progress, 'b')).toBe('locked')
    progress = completeStage(chapter, progress, 'a', 10)
    expect(selectStageProgress(chapter, progress, 'a')).toBe('completed')
    expect(selectStageProgress(chapter, progress, 'b')).toBe('available')
    progress = completeStage(chapter, progress, 'b', 20)
    progress = completeStage(chapter, progress, 'c', 30)
    expect(isChapterCompleted(chapter, progress)).toBe(true)
    expect(completeStage(chapter, progress, 'a', 99).completedStages.a.firstCompletedAtMs).toBe(10)
  })

  it('migrates V5 to V6 with empty campaign progress and records victory once', () => {
    const initial = createInitialMetaState('p', 0)
    const { campaignProgress: _ignored, ...v5Data } = initial
    const s = storage(JSON.stringify({ schemaVersion: 5, revision: 1, updatedAtMs: 0, data: v5Data }))
    const repo = new LocalMetaRepository(s)
    const migrated = repo.migrateV5(1)
    expect(migrated.schemaVersion).toBe(6)
    expect(migrated.data.campaignProgress.completedStages).toEqual({})
    const bridge = new BattleBridge()
    const runtime = new CampaignProgressionRuntime(s, bridge, [chapter])
    runtime.handleStageVictory({ runId: 'r1', stageId: 'a', occurredAtMs: 100 })
    runtime.handleStageVictory({ runId: 'r2', stageId: 'a', occurredAtMs: 200 })
    const after = repo.load()
    expect(after.status === 'loaded' && after.save.data.campaignProgress.completedStages.a.firstCompletedAtMs).toBe(100)
  })
})
