import { describe, expect, it } from 'vitest'
import { productionCampaignCatalog, selectChapterStatus, selectStageProgress, validateCampaignCatalog } from '../../src/data/campaign/catalog'
import { HAI_BA_TRUNG_STAGE02_ID, HAI_BA_TRUNG_STAGE03_ID, HAI_BA_TRUNG_STAGE04_ID, HAI_BA_TRUNG_STAGE05_ID, HAI_BA_TRUNG_STAGE06_ID, HAI_BA_TRUNG_STAGE_ID, haiBaTrungChapter } from '../../src/data/campaign/haiBaTrungCampaign'
import { baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { completeStage } from '../../src/domain/campaign/CampaignProgression'
import type { CampaignProgressState } from '../../src/domain/meta/MetaState'

const totalEnemies = (stage: typeof haiBaTrungChapter.stages[number]) => stage.waves.flatMap(({ groups }) => groups).reduce((sum, group) => sum + group.count, 0)
const stage01 = haiBaTrungChapter.stages[0]
const stage02 = haiBaTrungChapter.stages[1]
const stage03 = haiBaTrungChapter.stages[2]
const stage04 = haiBaTrungChapter.stages[3]
const stage05 = haiBaTrungChapter.stages[4]
const stage06 = haiBaTrungChapter.stages[5]

describe('GAME-C20 Hai Bà Trưng production stage packs', () => {
  it('registers exactly six ordered stages with authoritative identity', () => {
    expect(haiBaTrungChapter.stages.map(({ id }) => id)).toEqual([HAI_BA_TRUNG_STAGE_ID, HAI_BA_TRUNG_STAGE02_ID, HAI_BA_TRUNG_STAGE03_ID, HAI_BA_TRUNG_STAGE04_ID, HAI_BA_TRUNG_STAGE05_ID, HAI_BA_TRUNG_STAGE06_ID])
    expect(haiBaTrungChapter.stages.map(({ map }) => map.id)).toEqual(['map-lang-bac-marsh', 'map-lang-bac-retreat-corridor', 'map-cam-khe-defensive-line', 'map-thuy-bo-crossing', 'map-cam-khe-last-line', 'map-hbt-closure-rampart'])
    expect(haiBaTrungChapter.stages.map(({ waves }) => waves.length)).toEqual([24, 22, 24, 22, 26, 28])
    expect(haiBaTrungChapter.stages.map(totalEnemies)).toEqual([292, 324, 385, 395, 494, 652])
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
    for (const stage of [stage02, stage03, stage04, stage05, stage06]) {
      expect(stage.enemyDefinitionIds).toEqual(['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard'])
      expect(stage.firstClearReward).toBeUndefined()
      expect(stage.waves.flatMap(({ groups }) => groups).every(({ enemyId }) => stage.enemyDefinitionIds.some((id) => id === enemyId))).toBe(true)
      expect(stage.waves.flatMap(({ groups }) => groups).some(({ enemyId }) => enemyId.startsWith('boss-'))).toBe(false)
    }
    expect(stage02.waves[0].groups[0]).toMatchObject({ spawnIntervalMs: 850, startDelayMs: 0 })
    expect(stage03.waves[0].groups[0]).toMatchObject({ spawnIntervalMs: 825, startDelayMs: 0 })
    expect(stage03.waves[3].groups.map(({ startDelayMs }) => startDelayMs)).toEqual([0, 1050])
    expect(stage03.waves[4].groups.map(({ startDelayMs }) => startDelayMs)).toEqual([0, 1050, 1650])
    expect(stage04.enemyDefinitionIds).toEqual(['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard'])
    expect(stage05.enemyDefinitionIds).toEqual(['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard'])
    const firstInterval = (stage: typeof stage04, enemyId: string) => stage.waves.flatMap(({ groups }) => groups).find((group) => group.enemyId === enemyId)?.spawnIntervalMs
    expect(firstInterval(stage04, 'han-sword-infantry')).toBe(800)
    expect(firstInterval(stage04, 'han-crossbow-soldier')).toBe(925)
    expect(firstInterval(stage04, 'han-armored-guard')).toBe(1200)
    expect(firstInterval(stage05, 'han-sword-infantry')).toBe(775)
    expect(firstInterval(stage05, 'han-crossbow-soldier')).toBe(900)
    expect(firstInterval(stage05, 'han-armored-guard')).toBe(1150)
    expect(stage04.waves[3].groups.map(({ startDelayMs }) => startDelayMs)).toEqual([0, 1000])
    expect(stage04.waves[4].groups.map(({ startDelayMs }) => startDelayMs)).toEqual([0, 1000, 1550])
    expect(stage05.waves[3].groups.map(({ startDelayMs }) => startDelayMs)).toEqual([0, 950])
    expect(stage05.waves[4].groups.map(({ startDelayMs }) => startDelayMs)).toEqual([0, 950, 1500])
    expect(stage06).toMatchObject({ id: HAI_BA_TRUNG_STAGE06_ID, displayName: 'Giữ Lửa Mê Linh', map: { id: 'map-hbt-closure-rampart' }, historicalConfidence: 'CLOSURE SYNTHESIS' })
    expect(stage06.waves).toHaveLength(28)
    expect(stage06.enemyDefinitionIds).toEqual(['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard'])
    expect(stage06.firstClearReward).toBeUndefined()
    expect(stage06.waves.flatMap(({ groups }) => groups).some(({ enemyId }) => enemyId.startsWith('boss-') || enemyId === 'han-field-commander')).toBe(false)
    expect(stage06.waves[0].groups[0]).toMatchObject({ enemyId: 'han-sword-infantry', spawnIntervalMs: 750, startDelayMs: 600 })
    expect(stage06.waves[4].groups.map(({ enemyId, startDelayMs }) => ({ enemyId, startDelayMs }))).toEqual([{ enemyId: 'han-armored-guard', startDelayMs: 600 }, { enemyId: 'han-crossbow-soldier', startDelayMs: 1000 }, { enemyId: 'han-sword-infantry', startDelayMs: 1550 }])
    expect(stage06.waves[27].groups.map(({ enemyId, startDelayMs }) => ({ enemyId, startDelayMs }))).toEqual([{ enemyId: 'han-armored-guard', startDelayMs: 600 }, { enemyId: 'han-crossbow-soldier', startDelayMs: 1550 }, { enemyId: 'han-sword-infantry', startDelayMs: 2150 }])
  })

  it('unlocks stages in order and gates Chapter II until Stage 06', () => {
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
    expect(selectStageProgress(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE04_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('LOCKED')
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE04_ID, 4)
    expect(selectStageProgress(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE05_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('LOCKED')
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE05_ID, 5)
    expect(selectStageProgress(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE06_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('LOCKED')
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE06_ID, 6)
    expect(selectChapterStatus(baTrieuChapter, progress)).toBe('AVAILABLE')
  })

  it('persists Stage 01-06 completion, preserves timestamps on replay, and gates Chapter II', () => {
    let progress: CampaignProgressState = { completedStages: {} }
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE_ID, 10)
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE02_ID, 20)
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE03_ID, 30)
    progress = completeStage(haiBaTrungChapter, progress, HAI_BA_TRUNG_STAGE04_ID, 40)
    const stage04FirstCompletedAtMs = progress.completedStages[HAI_BA_TRUNG_STAGE04_ID].firstCompletedAtMs
    const reloadedAfterStage04 = JSON.parse(JSON.stringify(progress)) as CampaignProgressState
    expect(selectStageProgress(haiBaTrungChapter, reloadedAfterStage04, HAI_BA_TRUNG_STAGE04_ID)).toBe('completed')
    expect(selectStageProgress(haiBaTrungChapter, reloadedAfterStage04, HAI_BA_TRUNG_STAGE05_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, reloadedAfterStage04)).toBe('LOCKED')
    const replayedStage04 = completeStage(haiBaTrungChapter, reloadedAfterStage04, HAI_BA_TRUNG_STAGE04_ID, 400)
    expect(replayedStage04).toEqual(reloadedAfterStage04)
    expect(replayedStage04.completedStages[HAI_BA_TRUNG_STAGE04_ID].firstCompletedAtMs).toBe(stage04FirstCompletedAtMs)
    expect(selectStageProgress(haiBaTrungChapter, replayedStage04, HAI_BA_TRUNG_STAGE05_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, replayedStage04)).toBe('LOCKED')

    const completedStage05 = completeStage(haiBaTrungChapter, reloadedAfterStage04, HAI_BA_TRUNG_STAGE05_ID, 50)
    const reloadedAfterStage05 = JSON.parse(JSON.stringify(completedStage05)) as CampaignProgressState
    expect(selectStageProgress(haiBaTrungChapter, reloadedAfterStage05, HAI_BA_TRUNG_STAGE06_ID)).toBe('available')
    expect(selectChapterStatus(baTrieuChapter, reloadedAfterStage05)).toBe('LOCKED')
    const completedStage06 = completeStage(haiBaTrungChapter, reloadedAfterStage05, HAI_BA_TRUNG_STAGE06_ID, 60)
    const reloadedAfterStage06 = JSON.parse(JSON.stringify(completedStage06)) as CampaignProgressState
    expect(selectStageProgress(haiBaTrungChapter, reloadedAfterStage06, HAI_BA_TRUNG_STAGE06_ID)).toBe('completed')
    expect(selectChapterStatus(baTrieuChapter, reloadedAfterStage06)).toBe('AVAILABLE')
    const replayedStage06 = completeStage(haiBaTrungChapter, reloadedAfterStage06, HAI_BA_TRUNG_STAGE06_ID, 500)
    expect(replayedStage06).toEqual(reloadedAfterStage06)
    expect(replayedStage06.completedStages[HAI_BA_TRUNG_STAGE06_ID].firstCompletedAtMs).toBe(60)
    expect(selectChapterStatus(baTrieuChapter, replayedStage06)).toBe('AVAILABLE')
    expect(stage02.firstClearReward).toBeUndefined()
    expect(stage03.firstClearReward).toBeUndefined()
    expect(stage04.firstClearReward).toBeUndefined()
    expect(stage05.firstClearReward).toBeUndefined()
    expect(stage06.firstClearReward).toBeUndefined()
  })
})
