import { describe, expect, it } from 'vitest'
import { productionCampaignCatalog, selectChapterStatus, selectStageProgress, validateCampaignCatalog } from '../../src/data/campaign/catalog'
import { HAI_BA_TRUNG_STAGE02_ID, HAI_BA_TRUNG_STAGE03_ID, HAI_BA_TRUNG_STAGE_ID, haiBaTrungChapter } from '../../src/data/campaign/haiBaTrungCampaign'
import { baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { completeStage } from '../../src/domain/campaign/CampaignProgression'
import type { CampaignProgressState } from '../../src/domain/meta/MetaState'

const totalEnemies = (stage: typeof haiBaTrungChapter.stages[number]) => stage.waves.flatMap(({ groups }) => groups).reduce((sum, group) => sum + group.count, 0)
const stage01 = haiBaTrungChapter.stages[0]
const stage02 = haiBaTrungChapter.stages[1]
const stage03 = haiBaTrungChapter.stages[2]

describe('GAME-C18 Hai Bà Trưng production stage packs', () => {
  it('registers exactly three ordered stages with authoritative identity', () => {
    expect(haiBaTrungChapter.stages.map(({ id }) => id)).toEqual([HAI_BA_TRUNG_STAGE_ID, HAI_BA_TRUNG_STAGE02_ID, HAI_BA_TRUNG_STAGE03_ID])
    expect(haiBaTrungChapter.stages.map(({ map }) => map.id)).toEqual(['map-lang-bac-marsh', 'map-lang-bac-retreat-corridor', 'map-cam-khe-defensive-line'])
    expect(haiBaTrungChapter.stages.map(({ waves }) => waves.length)).toEqual([24, 22, 24])
    expect(haiBaTrungChapter.stages.map(totalEnemies)).toEqual([292, 324, 385])
    expect(validateCampaignCatalog(productionCampaignCatalog)).toEqual([])
  })

  it('keeps Stage 01 regression and reserves its boss for W24', () => {
    expect(stage01.id).toBe(HAI_BA_TRUNG_STAGE_ID)
    expect(stage01.map.id).toBe('map-lang-bac-marsh')
    expect(stage01.waves).toHaveLength(24)
    expect(totalEnemies(stage01)).toBe(292)
    const bosses = stage01.waves.flatMap(({ groups }) => groups.filter(({ enemyId }) => enemyId === 'boss-ma-vien'))
    expect(bosses).toHaveLength(1)
    expect(stage01.waves[23].groups.some(({ enemyId }) => enemyId === 'boss-ma-vien')).toBe(true)
  })

  it('keeps Stage 02 and Stage 03 non-boss Han rosters and production timing', () => {
    for (const stage of [stage02, stage03]) {
      expect(stage.enemyDefinitionIds).toEqual(['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard'])
      expect(stage.firstClearReward).toBeUndefined()
      expect(stage.waves.flatMap(({ groups }) => groups).every(({ enemyId }) => stage.enemyDefinitionIds.some((id) => id === enemyId))).toBe(true)
      expect(stage.waves.flatMap(({ groups }) => groups).some(({ enemyId }) => enemyId.startsWith('boss-'))).toBe(false)
    }
    expect(stage02.waves[0].groups[0]).toMatchObject({ spawnIntervalMs: 850, startDelayMs: 0 })
    expect(stage03.waves[0].groups[0]).toMatchObject({ spawnIntervalMs: 825, startDelayMs: 0 })
    expect(stage03.waves[4].groups.map(({ startDelayMs }) => startDelayMs)).toEqual([0, 1050, 1650])
  })

  it('unlocks stages in order and gates Chapter II at the temporary C18 frontier', () => {
    let progress: CampaignProgressState = { completedStages: {} }
    expect(selectStageProgress(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE_ID)).toBe('available')
    expect(selectStageProgress(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE02_ID)).toBe('locked')
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE_ID, 1)
    expect(selectStageProgress(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE02_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('LOCKED')
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE02_ID, 2)
    expect(selectStageProgress(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE03_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('LOCKED')
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE03_ID, 3)
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('AVAILABLE')
  })

  it('persists completion, supports replay, and keeps Stage 02/03 reward-free', () => {
    const progress = completeStage(haiBaTrungChapter, { completedStages: {} }, HAI_BA_TRUNG_STAGE_ID, 10)
    const reloaded = JSON.parse(JSON.stringify(progress)) as CampaignProgressState
    expect(reloaded.completedStages[HAI_BA_TRUNG_STAGE_ID].firstCompletedAtMs).toBe(10)
    expect(completeStage(haiBaTrungChapter, reloaded, HAI_BA_TRUNG_STAGE_ID, 99)).toEqual(reloaded)
    expect(stage02.firstClearReward).toBeUndefined()
    expect(stage03.firstClearReward).toBeUndefined()
  })
})
