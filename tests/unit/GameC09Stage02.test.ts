import { describe, expect, it } from 'vitest'
import { productionEnemyVisualManifest, resolveEnemyVisual, wuEnemyVisualManifest } from '../../src/data/assets/enemyVisualAssets'
import { BA_TRIEU_HERO_IDS } from '../../src/data/heroes/definitions'
import { BA_TRIEU_STAGE_IDS, baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { HAI_BA_TRUNG_STAGE05_ID } from '../../src/data/campaign/haiBaTrungCampaign'
import { selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import { balanceV1 } from '../../src/data/economy/balanceV1'
import { formatEnemyCategoryTitle } from '../../src/ui/TopCityBar'

const stage = baTrieuChapter.stages[1]
const stage01 = baTrieuChapter.stages[0]
const expectedComposition = [
  { 'wu-sword-infantry': 5 }, { 'wu-sword-infantry': 4, 'wu-crossbow-soldier': 2 },
  { 'wu-armored-guard': 2, 'wu-sword-infantry': 5 }, { 'wu-crossbow-soldier': 4, 'wu-sword-infantry': 5 },
  { 'wu-armored-guard': 2, 'wu-crossbow-soldier': 3, 'wu-sword-infantry': 5 }, { 'wu-sword-infantry': 7, 'wu-crossbow-soldier': 4 },
  { 'wu-armored-guard': 3, 'wu-sword-infantry': 6 }, { 'wu-armored-guard': 3, 'wu-crossbow-soldier': 6 },
  { 'wu-armored-guard': 4, 'wu-sword-infantry': 7 }, { 'wu-armored-guard': 4, 'wu-crossbow-soldier': 5, 'wu-sword-infantry': 6 },
  { 'wu-sword-infantry': 9, 'wu-crossbow-soldier': 5 }, { 'wu-armored-guard': 5, 'wu-sword-infantry': 7 },
  { 'wu-armored-guard': 4, 'wu-crossbow-soldier': 8 }, { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 7, 'wu-sword-infantry': 7 },
  { 'wu-sword-infantry': 10, 'wu-crossbow-soldier': 7 }, { 'wu-armored-guard': 6, 'wu-sword-infantry': 8 },
  { 'wu-armored-guard': 6, 'wu-crossbow-soldier': 9 }, { 'wu-armored-guard': 7, 'wu-crossbow-soldier': 5, 'wu-sword-infantry': 9 },
  { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 9, 'wu-sword-infantry': 8 },
  { 'wu-field-commander': 1, 'wu-armored-guard': 7, 'wu-crossbow-soldier': 9, 'wu-sword-infantry': 10 },
]

const intersects = (a: readonly [{ x: number; y: number }, { x: number; y: number }], b: readonly [{ x: number; y: number }, { x: number; y: number }]): boolean => {
  const [a1, a2] = a; const [b1, b2] = b
  const min = (x: number, y: number) => Math.min(x, y); const max = (x: number, y: number) => Math.max(x, y)
  if (a1.y === a2.y && b1.x === b2.x) return b1.x >= min(a1.x, a2.x) && b1.x <= max(a1.x, a2.x) && a1.y >= min(b1.y, b2.y) && a1.y <= max(b1.y, b2.y)
  if (a1.x === a2.x && b1.y === b2.y) return a1.x >= min(b1.x, b2.x) && a1.x <= max(b1.x, b2.x) && b1.y >= min(a1.y, a2.y) && b1.y <= max(a1.y, a2.y)
  return false
}

describe('GAME-C09 Bà Triệu Stage 02 production contract', () => {
  it('keeps stable identity and exactly 18 exact, unique wave IDs', () => {
    expect(stage.id).toBe('bt-02-cong-pha-thanh-ap')
    expect(stage.waves).toHaveLength(20)
    expect(stage.waves.map(({ id }) => id)).toEqual(Array.from({ length: 20 }, (_, index) => `bt-02-wave-${String(index + 1).padStart(2, '0')}`))
    expect(new Set(stage.waves.map(({ id }) => id)).size).toBe(20)
  })

  it('matches the locked composition and reserves the generic field commander for Wave 18', () => {
    const actual = stage.waves.map((wave) => Object.fromEntries(wave.groups.map(({ enemyId, count }) => [enemyId, count])))
    expect(actual).toEqual(expectedComposition)
    expect(stage.waves.flatMap((wave, index) => wave.groups.filter(({ enemyId }) => enemyId === 'wu-field-commander').map(() => index + 1))).toEqual([20])
    expect(stage.waves.flatMap(({ groups }) => groups).reduce((total, group) => total + group.count, 0)).toBe(268)
  })

  it('keeps production spawn timing bounded without long empty tails', () => {
    stage.waves.flatMap(({ groups }) => groups).forEach(({ enemyId, startDelayMs, spawnIntervalMs }) => {
      expect(startDelayMs).toBeGreaterThanOrEqual(0)
      expect(startDelayMs).toBeLessThanOrEqual(2400)
      const range = enemyId === 'wu-sword-infantry' ? [800, 950] : enemyId === 'wu-crossbow-soldier' ? [900, 1100] : enemyId === 'wu-armored-guard' ? [1150, 1450] : [1500, 1800]
      expect(spawnIntervalMs).toBeGreaterThanOrEqual(range[0]); expect(spawnIntervalMs).toBeLessThanOrEqual(range[1])
    })
  })

  it('uses a dedicated bounded 1024x768 map with readable path and ten placements', () => {
    expect(stage.map).toMatchObject({ id: 'map-bt-thanh-ap', width: 1024, height: 768, grid: { columns: 12, rows: 10 }, theme: 'cuu-chan-settlement' })
    expect(stage.map.fixedPath.length - 1).toBeGreaterThanOrEqual(8)
    expect(stage.map.fixedPath.length - 1).toBeLessThanOrEqual(10)
    stage.map.fixedPath.forEach(({ x, y }) => { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(1024); expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(768) })
    expect(stage.map.placementTiles).toHaveLength(10)
    expect(new Set(stage.map.placementTiles.map(({ column, row }) => `${column}:${row}`)).size).toBe(10)
    stage.map.placementTiles.forEach(({ column, row }) => { expect(column).toBeGreaterThanOrEqual(0); expect(column).toBeLessThan(12); expect(row).toBeGreaterThanOrEqual(0); expect(row).toBeLessThan(10) })
    expect(stage.map.terrainDecorations?.length).toBeGreaterThan(0)
    stage.map.terrainDecorations?.forEach((decoration) => expect(Object.keys(decoration).sort()).toEqual(['height', 'kind', 'width', 'x', 'y']))
    const segments = stage.map.fixedPath.slice(0, -1).map((point, index) => [point, stage.map.fixedPath[index + 1]] as const)
    expect(segments.every(([from, to]) => from.x === to.x || from.y === to.y)).toBe(true)
    for (let first = 0; first < segments.length; first += 1) for (let second = first + 2; second < segments.length; second += 1) expect(intersects(segments[first], segments[second])).toBe(false)
  })

  it('provides reconstruction-safe narrative with exact lightweight beats', () => {
    expect(stage.historicalConfidence).toBe('GENERAL CITY ATTACK SUPPORTED; SPECIFIC TƯ PHỐ BATTLE RECONSTRUCTED')
    expect(stage.narrative?.preBattle).toMatch(/phục dựng gameplay|thành ấp tại Cửu Chân/i)
    expect(stage.narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 7, 14, 20])
    expect(stage.narrative?.victory).toMatch(/vị trí thành ấp|Cửu Chân/i)
    expect(stage.narrative?.victory).not.toMatch(/toàn bộ Cửu Chân|Đông Ngô.*bị đánh bại|Lục Dận/i)
    expect(stage.narrative?.defeat).toBeTruthy()
  })

  it('resolves HBT and Wu visual contracts with production walk assets and primitive fallback', () => {
    expect(Object.keys(productionEnemyVisualManifest)).toHaveLength(8)
    ;['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'].forEach((id) => expect(resolveEnemyVisual(id)?.walkUrl).toBeTruthy())
    expect(Object.keys(wuEnemyVisualManifest)).toEqual(['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'])
    Object.values(wuEnemyVisualManifest).forEach((visual) => {
      expect(visual).toMatchObject({ frameWidth: 128, frameHeight: 128, frameCount: 8, facing: 'right', fallback: 'primitive' })
      expect(visual.walkUrl).toBeTruthy()
    })
  })

  it('preserves the HBT prerequisite, Bà Triệu roster and ordered Stage 02 progression', () => {
    expect(baTrieuChapter.prerequisiteStageId).toBe(HAI_BA_TRUNG_STAGE05_ID)
    expect(stage.allowedHeroIds).toEqual(BA_TRIEU_HERO_IDS)
    const unlocked = { completedStages: { [HAI_BA_TRUNG_STAGE05_ID]: { firstCompletedAtMs: 1 } } }
    expect(selectStageProgress(baTrieuChapter, unlocked, BA_TRIEU_STAGE_IDS[0])).toBe('available')
    expect(selectStageProgress(baTrieuChapter, unlocked, BA_TRIEU_STAGE_IDS[1])).toBe('locked')
    const stage01Complete = { completedStages: { ...unlocked.completedStages, [BA_TRIEU_STAGE_IDS[0]]: { firstCompletedAtMs: 2 } } }
    expect(selectStageProgress(baTrieuChapter, stage01Complete, BA_TRIEU_STAGE_IDS[1])).toBe('available')
    const stage02Complete = { completedStages: { ...stage01Complete.completedStages, [BA_TRIEU_STAGE_IDS[1]]: { firstCompletedAtMs: 3 } } }
    expect(selectStageProgress(baTrieuChapter, stage02Complete, BA_TRIEU_STAGE_IDS[2])).toBe('available')
  })

  it('keeps ordinary Stage 01 rewards and preserves the final Stage 06 contract', () => {
    expect(balanceV1.rewardSources.stageClear.baTrieu['bt-01-tu-nghia-nui-nua']).toEqual({ gold: 20, knb: 1, anhHon: 10 })
    expect(balanceV1.rewardSources.stageClear.baTrieu['bt-02-cong-pha-thanh-ap']).toEqual({ gold: 22, knb: 1, anhHon: 10 })
    expect(stage.firstClearReward).toBeUndefined()
    expect(stage01.id).toBe('bt-01-tu-nghia-nui-nua')
    expect(stage01.waves).toHaveLength(18)
    expect(stage01.map.id).toBe('map-bt-nui-nua')
    expect(stage01.narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 6, 12, 18])
    expect(baTrieuChapter.stages.slice(5).map(({ waves }) => waves.length)).toEqual([28])
  })

  it('uses the active chapter faction in player-facing enemy counter labels', () => {
    expect(formatEnemyCategoryTitle('Đông Ngô', 'sword')).toBe('Đông Ngô Bộ Binh')
    expect(formatEnemyCategoryTitle('Đông Ngô', 'archer')).toBe('Đông Ngô Nỏ Thủ')
    expect(formatEnemyCategoryTitle('Đông Ngô', 'other')).toBe('Đông Ngô Giáp Binh / Chỉ huy')
  })
})
