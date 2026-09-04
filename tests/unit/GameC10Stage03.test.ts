import { describe, expect, it } from 'vitest'
import { productionEnemyVisualManifest, resolveEnemyVisual, wuEnemyVisualManifest } from '../../src/data/assets/enemyVisualAssets'
import { BA_TRIEU_HERO_IDS } from '../../src/data/heroes/definitions'
import { BA_TRIEU_STAGE_IDS, baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { HAI_BA_TRUNG_STAGE05_ID } from '../../src/data/campaign/haiBaTrungCampaign'
import { selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import { balanceV1 } from '../../src/data/economy/balanceV1'

const stage = baTrieuChapter.stages[2]
const expectedComposition = [
  { 'wu-sword-infantry': 6 }, { 'wu-sword-infantry': 5, 'wu-crossbow-soldier': 3 },
  { 'wu-armored-guard': 2, 'wu-sword-infantry': 6 }, { 'wu-crossbow-soldier': 5, 'wu-sword-infantry': 6 },
  { 'wu-armored-guard': 2, 'wu-crossbow-soldier': 4, 'wu-sword-infantry': 6 }, { 'wu-sword-infantry': 8, 'wu-crossbow-soldier': 4 },
  { 'wu-armored-guard': 3, 'wu-sword-infantry': 7 }, { 'wu-armored-guard': 3, 'wu-crossbow-soldier': 7 },
  { 'wu-armored-guard': 4, 'wu-sword-infantry': 8 }, { 'wu-armored-guard': 4, 'wu-crossbow-soldier': 6, 'wu-sword-infantry': 7 },
  { 'wu-sword-infantry': 10, 'wu-crossbow-soldier': 6 }, { 'wu-armored-guard': 5, 'wu-sword-infantry': 8 },
  { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 8 }, { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 8, 'wu-sword-infantry': 8 },
  { 'wu-sword-infantry': 11, 'wu-crossbow-soldier': 8 }, { 'wu-armored-guard': 6, 'wu-sword-infantry': 9 },
  { 'wu-armored-guard': 6, 'wu-crossbow-soldier': 10 }, { 'wu-armored-guard': 7, 'wu-sword-infantry': 10, 'wu-crossbow-soldier': 6 },
  { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 10, 'wu-sword-infantry': 9 }, { 'wu-armored-guard': 8, 'wu-sword-infantry': 11, 'wu-crossbow-soldier': 7 },
  { 'wu-armored-guard': 9, 'wu-crossbow-soldier': 10, 'wu-sword-infantry': 10 }, { 'wu-field-commander': 1, 'wu-armored-guard': 8, 'wu-crossbow-soldier': 10, 'wu-sword-infantry': 12 },
]

const intersects = (a: readonly [{ x: number; y: number }, { x: number; y: number }], b: readonly [{ x: number; y: number }, { x: number; y: number }]): boolean => {
  const [a1, a2] = a; const [b1, b2] = b
  const min = (x: number, y: number) => Math.min(x, y); const max = (x: number, y: number) => Math.max(x, y)
  if (a1.y === a2.y && b1.x === b2.x) return b1.x >= min(a1.x, a2.x) && b1.x <= max(a1.x, a2.x) && a1.y >= min(b1.y, b2.y) && a1.y <= max(b1.y, b2.y)
  if (a1.x === a2.x && b1.y === b2.y) return a1.x >= min(b1.x, b2.x) && a1.x <= max(b1.x, b2.x) && b1.y >= min(a1.y, a2.y) && b1.y <= max(a1.y, a2.y)
  return false
}

describe('GAME-C10 Bà Triệu Stage 03 production contract', () => {
  it('locks identity, Chapter context, roster and 22 unique waves', () => {
    expect(baTrieuChapter).toMatchObject({ id: 'chapter-ba-trieu-248', periodLabel: '248 CE', enemyFaction: 'Đông Ngô' })
    expect(stage).toMatchObject({ id: 'bt-03-ben-song-ma', displayName: 'Bến Sông Mã', map: { id: 'map-bt-song-ma', theme: 'song-ma-riverbank', width: 1024, height: 768, grid: { columns: 12, rows: 10 } }, historicalConfidence: 'COMPOSITE RECONSTRUCTION' })
    expect(stage.allowedHeroIds).toEqual(BA_TRIEU_HERO_IDS)
    expect(stage.waves).toHaveLength(22)
    expect(stage.waves.map(({ id }) => id)).toEqual(Array.from({ length: 22 }, (_, index) => `bt-03-wave-${String(index + 1).padStart(2, '0')}`))
    expect(new Set(stage.waves.map(({ id }) => id)).size).toBe(22)
  })

  it('matches the exact 355-enemy composition and commander-only final wave', () => {
    expect(stage.waves.map(({ groups }) => Object.fromEntries(groups.map(({ enemyId, count }) => [enemyId, count])))).toEqual(expectedComposition)
    expect(stage.waves.flatMap(({ groups }) => groups).reduce((total, group) => total + group.count, 0)).toBe(355)
    expect(stage.waves.flatMap((wave, index) => wave.groups.filter(({ enemyId }) => enemyId === 'wu-field-commander').map(() => index + 1))).toEqual([22])
  })

  it('keeps Stage 03 timing isolated and bounded', () => {
    const all = stage.waves.flatMap(({ groups }) => groups)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-sword-infantry').every(({ spawnIntervalMs }) => spawnIntervalMs === 825)).toBe(true)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-crossbow-soldier').every(({ spawnIntervalMs }) => spawnIntervalMs === 950)).toBe(true)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-armored-guard').every(({ spawnIntervalMs }) => spawnIntervalMs === 1250)).toBe(true)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-field-commander').every(({ spawnIntervalMs }) => spawnIntervalMs === 1600)).toBe(true)
    expect(all.every(({ startDelayMs }) => startDelayMs === 600 || startDelayMs === 1100 || startDelayMs === 1700 || startDelayMs === 2300)).toBe(true)
    expect(all.every(({ startDelayMs }) => startDelayMs <= 2300)).toBe(true)
    expect(stage.waves[0].groups[0].startDelayMs).toBe(600)
  })

  it('uses a dedicated fixed path and exactly ten bounded placement tiles', () => {
    const { map } = stage
    expect(map.fixedPath.length - 1).toBeGreaterThanOrEqual(9)
    expect(map.fixedPath.length - 1).toBeLessThanOrEqual(11)
    map.fixedPath.forEach(({ x, y }) => { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(1024); expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(768) })
    const segments = map.fixedPath.slice(0, -1).map((point, index) => [point, map.fixedPath[index + 1]] as const)
    expect(segments.every(([from, to]) => from.x === to.x || from.y === to.y)).toBe(true)
    for (let first = 0; first < segments.length; first += 1) for (let second = first + 2; second < segments.length; second += 1) expect(intersects(segments[first], segments[second])).toBe(false)
    expect(map.placementTiles).toHaveLength(10)
    expect(new Set(map.placementTiles.map(({ column, row }) => `${column}:${row}`)).size).toBe(10)
    map.placementTiles.forEach(({ column, row }) => { expect(column).toBeGreaterThanOrEqual(0); expect(column).toBeLessThan(12); expect(row).toBeGreaterThanOrEqual(0); expect(row).toBeLessThan(10) })
    map.terrainDecorations?.forEach((decoration) => expect(Object.keys(decoration).sort()).toEqual(['height', 'kind', 'width', 'x', 'y']))
  })

  it('keeps reconstruction-safe narrative and exact wave beats', () => {
    expect(stage.narrative?.preBattle).toMatch(/phục dựng tổng hợp/i)
    expect(stage.narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 8, 15, 22])
    expect(stage.narrative?.victory).toMatch(/hành lang sông|tạm thời/i)
    expect(stage.narrative?.victory).not.toMatch(/toàn bộ|Lục Dận|cơ chế thuyền|hải quân/i)
    expect(stage.narrative?.defeat).toBeTruthy()
    expect(stage.narrativeOutcome).toBe('Ngăn lực lượng tiếp ứng đường sông.')
  })

  it('preserves the ordinary reward and no first-clear package', () => {
    expect(balanceV1.rewardSources.stageClear.baTrieu?.['bt-03-ben-song-ma']).toEqual({ gold: 24, knb: 1, anhHon: 10 })
    expect(stage.firstClearReward).toBeUndefined()
  })

  it('enforces HBT -> Stage 01 -> Stage 02 -> Stage 03 -> Stage 04 progression', () => {
    const withHbt = { completedStages: { [HAI_BA_TRUNG_STAGE05_ID]: { firstCompletedAtMs: 1 } } }
    expect(selectStageProgress(baTrieuChapter, withHbt, BA_TRIEU_STAGE_IDS[2])).toBe('locked')
    const stage01 = { completedStages: { ...withHbt.completedStages, [BA_TRIEU_STAGE_IDS[0]]: { firstCompletedAtMs: 2 } } }
    expect(selectStageProgress(baTrieuChapter, stage01, BA_TRIEU_STAGE_IDS[1])).toBe('available')
    expect(selectStageProgress(baTrieuChapter, stage01, BA_TRIEU_STAGE_IDS[2])).toBe('locked')
    const stage02 = { completedStages: { ...stage01.completedStages, [BA_TRIEU_STAGE_IDS[1]]: { firstCompletedAtMs: 3 } } }
    expect(selectStageProgress(baTrieuChapter, stage02, BA_TRIEU_STAGE_IDS[2])).toBe('available')
    const stage03 = { completedStages: { ...stage02.completedStages, [BA_TRIEU_STAGE_IDS[2]]: { firstCompletedAtMs: 4 } } }
    expect(selectStageProgress(baTrieuChapter, stage03, BA_TRIEU_STAGE_IDS[3])).toBe('available')
  })

  it('regresses Stage 01–03 contracts while preserving the final Stage 06 contract', () => {
    expect(baTrieuChapter.stages[0].waves).toHaveLength(18)
    expect(baTrieuChapter.stages[1].waves).toHaveLength(20)
    expect(baTrieuChapter.stages.slice(5).map(({ waves }) => waves.length)).toEqual([28])
    expect(baTrieuChapter.stages.slice(0, 2).map(({ map }) => map.id)).toEqual(['map-bt-nui-nua', 'map-bt-thanh-ap'])
    expect(baTrieuChapter.stages[0].narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 6, 12, 18])
    expect(baTrieuChapter.stages[1].narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 7, 14, 20])
    expect(baTrieuChapter.stages[0].waves[0].groups[0].startDelayMs).toBe(0)
    expect(baTrieuChapter.stages[0].waves[17].groups[0].startDelayMs).toBe(0)
    expect(baTrieuChapter.stages[1].waves[0].groups[0].startDelayMs).toBe(600)
    expect(baTrieuChapter.stages[1].waves[19].groups[0].startDelayMs).toBe(600)
  })

  it('keeps the existing HBT/Wu visual fallback boundary with production walk assets', () => {
    expect(Object.keys(productionEnemyVisualManifest)).toHaveLength(8)
    ;['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'].forEach((id) => expect(resolveEnemyVisual(id)?.walkUrl).toBeTruthy())
    expect(Object.keys(wuEnemyVisualManifest)).toEqual(['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'])
    Object.values(wuEnemyVisualManifest).forEach((visual) => {
      expect(visual).toMatchObject({ frameWidth: 128, frameHeight: 128, frameCount: 8, facing: 'right', fallback: 'primitive' })
      expect(visual.walkUrl).toBeTruthy()
    })
  })
})
