import { describe, expect, it } from 'vitest'
import { BA_TRIEU_CHAPTER_ID, BA_TRIEU_HERO_IDS, BA_TRIEU_STAGE_IDS, baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { formatChapterStatusVi, productionCampaignCatalog, selectChapterStatus, validateCampaignCatalog } from '../../src/data/campaign/catalog'
import { HAI_BA_TRUNG_STAGE06_ID, haiBaTrungChapter } from '../../src/data/campaign/haiBaTrungCampaign'
import { completeStage, selectSafeStage, selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import type { CampaignProgressState } from '../../src/domain/meta/MetaState'

describe('GAME-C05 Bà Triệu production chapter', () => {
  it('registers exactly HBT then Bà Triệu with globally unique production IDs', () => {
    expect(productionCampaignCatalog.chapters.map(({ id }) => id)).toEqual(['chapter-i-hai-ba-trung', BA_TRIEU_CHAPTER_ID])
    expect(baTrieuChapter.stages.map(({ id }) => id)).toEqual(BA_TRIEU_STAGE_IDS)
    expect(baTrieuChapter).toMatchObject({ historicalArcId: 'ARC-BT-01', periodLabel: '248 CE', enemyFaction: 'Đông Ngô' })
    expect(new Set(productionCampaignCatalog.chapters.flatMap(({ stages }) => stages.map(({ id }) => id))).size).toBe(12)
    expect(validateCampaignCatalog(productionCampaignCatalog)).toEqual([])
  })

  it('locks Bà Triệu until the final HBT production stage is completed', () => {
    const fresh = { completedStages: {} }
    expect(selectChapterStatus(haiBaTrungChapter, fresh)).toBe('AVAILABLE')
    expect(selectChapterStatus(baTrieuChapter, fresh)).toBe('LOCKED')
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], fresh, BA_TRIEU_HERO_IDS)).toBeUndefined()
    const unrelated = { completedStages: { 'hbt-non-final-test': { firstCompletedAtMs: 1 } } }
    expect(selectChapterStatus(baTrieuChapter, unrelated)).toBe('LOCKED')
    const unlocked = { completedStages: { [HAI_BA_TRUNG_STAGE06_ID]: { firstCompletedAtMs: 2 } } }
    expect(selectChapterStatus(baTrieuChapter, unlocked)).toBe('AVAILABLE')
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], unlocked, BA_TRIEU_HERO_IDS)?.id).toBe(BA_TRIEU_STAGE_IDS[0])
  })

  it('preserves ordered progression, completed replay and zero-playable safety', () => {
    let progress: CampaignProgressState = { completedStages: { [HAI_BA_TRUNG_STAGE06_ID]: { firstCompletedAtMs: 1 } } }
    BA_TRIEU_STAGE_IDS.forEach((stageId, index) => { progress = completeStage(baTrieuChapter, progress, stageId, index + 2) })
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('COMPLETED')
    expect(selectStageProgress(baTrieuChapter, progress, BA_TRIEU_STAGE_IDS[0])).toBe('completed')
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], progress, BA_TRIEU_HERO_IDS)?.id).toBe(BA_TRIEU_STAGE_IDS[0])
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], progress, [])).toBeUndefined()
  })

  it('maps every production chapter status to Vietnamese player-facing copy', () => {
    expect(formatChapterStatusVi('LOCKED')).toBe('Chưa mở')
    expect(formatChapterStatusVi('AVAILABLE')).toBe('Sẵn sàng')
    expect(formatChapterStatusVi('IN_PROGRESS')).toBe('Đang tiến hành')
    expect(formatChapterStatusVi('COMPLETED')).toBe('Đã hoàn thành')
  })
})
