import { describe, expect, it } from 'vitest'
import { findChapterForStage, findStageById, validateCampaignCatalog, type CampaignCatalogDefinition, selectSafeChapter, selectChapterStatus } from '../../src/data/campaign/catalog'
import { completeStage, selectSafeStage } from '../../src/domain/campaign/CampaignProgression'
import { defaultBattleStage } from '../../src/data/campaign/haiBaTrungCampaign'

const stage = (id: string, hero = 'trung-trac') => ({ ...defaultBattleStage, id, allowedHeroIds: [hero] as const })
const alpha = { id: 'alpha', displayName: 'Alpha', stages: [stage('a1'), stage('a2'), stage('a3')] } as const
const beta = { id: 'beta', displayName: 'Beta', stages: [stage('b1', 'le-chan'), stage('b2', 'le-chan')] } as const
const catalog: CampaignCatalogDefinition = { chapters: [alpha, beta] }
describe('campaign catalog', () => {
  it('resolves chapters/stages and rejects duplicate global IDs', () => {
    expect(findStageById(catalog, 'b1')?.id).toBe('b1')
    expect(findChapterForStage(catalog, 'a1')?.id).toBe('alpha')
    expect(validateCampaignCatalog(catalog)).toEqual([])
    expect(validateCampaignCatalog({ chapters: [alpha, { ...beta, id: 'alpha' }] })).toContain('duplicate/empty chapter: alpha')
  })
  it('selects playable chapter/stage safely and keeps progress independent', () => {
    expect(selectSafeChapter(catalog, 'missing', { completedStages: {} }, ['trung-trac'])?.id).toBe('alpha')
    const progress = completeStage(alpha, { completedStages: {} }, 'a1', 1)
    expect(selectSafeChapter(catalog, 'alpha', progress, ['trung-trac'])?.id).toBe('alpha')
    expect(selectSafeChapter(catalog, 'beta', progress, ['le-chan'])?.id).toBe('beta')
    expect(selectSafeChapter(catalog, 'missing', progress, ['trung-trac'])?.id).toBe('alpha')
  })
  it('prefers an available playable stage over an earlier completed stage', () => {
    const progress = completeStage(alpha, { completedStages: {} }, 'a1', 1)
    expect(selectSafeStage([alpha], 'missing', progress, ['trung-trac'])?.id).toBe('a2')
    expect(selectSafeStage([beta], 'missing', progress, ['trung-trac'])).toBeUndefined()
  })
  it('rejects duplicate stage ids across chapters', () => {
    expect(validateCampaignCatalog({ chapters: [alpha, { ...beta, stages: [stage('a1', 'le-chan')] }] })).toContain('duplicate/empty stage: a1')
  })
  it('derives available, in-progress and completed chapter status', () => {
    expect(selectChapterStatus(alpha, { completedStages: {} })).toBe('AVAILABLE')
    const one = completeStage(alpha, { completedStages: {} }, 'a1', 1)
    expect(selectChapterStatus(alpha, one)).toBe('IN_PROGRESS')
    const done = ['a1', 'a2', 'a3'].reduce((state, id, index) => completeStage(alpha, state, id, index + 1), { completedStages: {} } as { completedStages: Record<string, { firstCompletedAtMs: number }> })
    expect(selectChapterStatus(alpha, done)).toBe('COMPLETED')
  })
})
