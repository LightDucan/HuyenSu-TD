import { describe, expect, it } from 'vitest'
import { productionEnemyVisualManifest, resolveEnemyVisual, wuEnemyVisualManifest } from '../../src/data/assets/enemyVisualAssets'
import { BA_TRIEU_HERO_IDS } from '../../src/data/heroes/definitions'
import { BA_TRIEU_STAGE_IDS, baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { HAI_BA_TRUNG_STAGE05_ID } from '../../src/data/campaign/haiBaTrungCampaign'
import { selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import { balanceV1 } from '../../src/data/economy/balanceV1'

const stage = baTrieuChapter.stages[3]
const expectedComposition = [
  { 'wu-sword-infantry': 6 }, { 'wu-sword-infantry': 5, 'wu-crossbow-soldier': 3 },
  { 'wu-armored-guard': 3, 'wu-sword-infantry': 6 }, { 'wu-armored-guard': 4, 'wu-sword-infantry': 5 },
  { 'wu-armored-guard': 3, 'wu-crossbow-soldier': 4, 'wu-sword-infantry': 6 }, { 'wu-armored-guard': 5, 'wu-sword-infantry': 5 },
  { 'wu-armored-guard': 4, 'wu-crossbow-soldier': 6 }, { 'wu-armored-guard': 5, 'wu-sword-infantry': 7 },
  { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 6, 'wu-sword-infantry': 6 }, { 'wu-armored-guard': 6, 'wu-sword-infantry': 8 },
  { 'wu-armored-guard': 6, 'wu-crossbow-soldier': 7 }, { 'wu-armored-guard': 6, 'wu-crossbow-soldier': 7, 'wu-sword-infantry': 7 },
  { 'wu-armored-guard': 7, 'wu-sword-infantry': 9 }, { 'wu-armored-guard': 7, 'wu-crossbow-soldier': 8 },
  { 'wu-armored-guard': 7, 'wu-crossbow-soldier': 8, 'wu-sword-infantry': 8 }, { 'wu-armored-guard': 8, 'wu-sword-infantry': 10 },
  { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 9 }, { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 9, 'wu-sword-infantry': 9 },
  { 'wu-armored-guard': 9, 'wu-sword-infantry': 11 }, { 'wu-armored-guard': 9, 'wu-crossbow-soldier': 10 },
  { 'wu-armored-guard': 9, 'wu-crossbow-soldier': 10, 'wu-sword-infantry': 10 }, { 'wu-armored-guard': 10, 'wu-sword-infantry': 11, 'wu-crossbow-soldier': 8 },
  { 'wu-armored-guard': 10, 'wu-crossbow-soldier': 11, 'wu-sword-infantry': 10 }, { 'wu-field-commander': 1, 'wu-armored-guard': 10, 'wu-crossbow-soldier': 12, 'wu-sword-infantry': 12 },
]

const intersects = (a: readonly [{ x: number; y: number }, { x: number; y: number }], b: readonly [{ x: number; y: number }, { x: number; y: number }]): boolean => {
  const [a1, a2] = a; const [b1, b2] = b
  const min = (x: number, y: number) => Math.min(x, y); const max = (x: number, y: number) => Math.max(x, y)
  if (a1.y === a2.y && b1.x === b2.x) return b1.x >= min(a1.x, a2.x) && b1.x <= max(a1.x, a2.x) && a1.y >= min(b1.y, b2.y) && a1.y <= max(b1.y, b2.y)
  if (a1.x === a2.x && b1.y === b2.y) return a1.x >= min(b1.x, b2.x) && a1.x <= max(b1.x, b2.x) && b1.y >= min(a1.y, a2.y) && b1.y <= max(a1.y, a2.y)
  return false
}

describe('GAME-C11 Bà Triệu Stage 04 production contract', () => {
  it('locks identity, chapter context, roster and 24 unique waves', () => {
    expect(baTrieuChapter).toMatchObject({ id: 'chapter-ba-trieu-248', periodLabel: '248 CE', enemyFaction: 'Đông Ngô' })
    expect(stage).toMatchObject({ id: 'bt-04-lap-luy-bo-dien', displayName: 'Lập Lũy Bồ Điền', map: { id: 'map-bt-bo-dien-luy', theme: 'bo-dien-fort', width: 1024, height: 768, grid: { columns: 12, rows: 10 } }, historicalConfidence: 'LOCAL TRADITION / RECONSTRUCTION' })
    expect(stage.allowedHeroIds).toEqual(BA_TRIEU_HERO_IDS)
    expect(stage.waves).toHaveLength(24)
    expect(stage.waves.map(({ id }) => id)).toEqual(Array.from({ length: 24 }, (_, index) => `bt-04-wave-${String(index + 1).padStart(2, '0')}`))
    expect(new Set(stage.waves.map(({ id }) => id)).size).toBe(24)
  })

  it('matches the locked 419-enemy composition and commander only on Wave 24', () => {
    expect(stage.waves.map(({ groups }) => Object.fromEntries(groups.map(({ enemyId, count }) => [enemyId, count])))).toEqual(expectedComposition)
    expect(stage.waves.flatMap(({ groups }) => groups).reduce((total, group) => total + group.count, 0)).toBe(419)
    expect(stage.waves.flatMap((wave, index) => wave.groups.filter(({ enemyId }) => enemyId === 'wu-field-commander').map(() => index + 1))).toEqual([24])
  })

  it('keeps Stage 04 timing isolated and bounded', () => {
    const all = stage.waves.flatMap(({ groups }) => groups)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-sword-infantry').every(({ spawnIntervalMs }) => spawnIntervalMs === 800)).toBe(true)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-crossbow-soldier').every(({ spawnIntervalMs }) => spawnIntervalMs === 950)).toBe(true)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-armored-guard').every(({ spawnIntervalMs }) => spawnIntervalMs === 1200)).toBe(true)
    expect(all.filter(({ enemyId }) => enemyId === 'wu-field-commander').every(({ spawnIntervalMs }) => spawnIntervalMs === 1550)).toBe(true)
    expect(all.every(({ startDelayMs }) => startDelayMs === 600 || startDelayMs === 1100 || startDelayMs === 1700 || startDelayMs === 2300)).toBe(true)
    expect(all.every(({ startDelayMs }) => startDelayMs <= 2300)).toBe(true)
    expect(stage.waves[0].groups[0].startDelayMs).toBe(600)
  })

  it('uses a dedicated bounded fixed path and ten presentation-only placements', () => {
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
    expect(map.terrainDecorations?.length).toBeGreaterThan(0)
    map.terrainDecorations?.forEach((decoration) => expect(Object.keys(decoration).sort()).toEqual(['height', 'kind', 'width', 'x', 'y']))
  })

  it('frames Bồ Điền as local-tradition reconstruction with tactical outcomes', () => {
    expect(stage.narrative?.preBattle).toMatch(/phục dựng theo truyền thống địa phương|lũy đất mới/i)
    expect(stage.narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 8, 16, 24])
    expect(stage.narrative?.victory).toMatch(/tuyến lũy|chỗ đứng|Bồ Điền/i)
    expect(stage.narrative?.victory).not.toMatch(/toàn bộ|chiến dịch kết thúc|vĩnh viễn|Đông Ngô.*bại/i)
    expect(stage.narrative?.defeat).toMatch(/sụp đổ|thử giữ lũy/i)
  })

  it('preserves the existing Stage 04 reward without a first-clear package', () => {
    expect(balanceV1.rewardSources.stageClear.baTrieu?.['bt-04-lap-luy-bo-dien']).toEqual({ gold: 26, knb: 1, anhHon: 12 })
    expect(stage.firstClearReward).toBeUndefined()
  })

  it('unlocks Stage 04 after BT03 and Stage 05 after BT04 only', () => {
    const withHbt = { completedStages: { [HAI_BA_TRUNG_STAGE05_ID]: { firstCompletedAtMs: 1 } } }
    const throughBt02 = { completedStages: { ...withHbt.completedStages, [BA_TRIEU_STAGE_IDS[0]]: { firstCompletedAtMs: 2 }, [BA_TRIEU_STAGE_IDS[1]]: { firstCompletedAtMs: 3 } } }
    expect(selectStageProgress(baTrieuChapter, throughBt02, BA_TRIEU_STAGE_IDS[3])).toBe('locked')
    const throughBt03 = { completedStages: { ...throughBt02.completedStages, [BA_TRIEU_STAGE_IDS[2]]: { firstCompletedAtMs: 4 } } }
    expect(selectStageProgress(baTrieuChapter, throughBt03, BA_TRIEU_STAGE_IDS[3])).toBe('available')
    expect(selectStageProgress(baTrieuChapter, throughBt03, BA_TRIEU_STAGE_IDS[4])).toBe('locked')
    const throughBt04 = { completedStages: { ...throughBt03.completedStages, [BA_TRIEU_STAGE_IDS[3]]: { firstCompletedAtMs: 5 } } }
    expect(selectStageProgress(baTrieuChapter, throughBt04, BA_TRIEU_STAGE_IDS[4])).toBe('available')
  })

  it('regresses locked Stage 01–04 contracts and preserves the final Stage 06 contract', () => {
    expect(baTrieuChapter.stages[0].waves).toHaveLength(18)
    expect(baTrieuChapter.stages[1].waves).toHaveLength(20)
    expect(baTrieuChapter.stages[2].waves).toHaveLength(22)
    expect(baTrieuChapter.stages.slice(5).map(({ waves }) => waves.length)).toEqual([28])
    expect(baTrieuChapter.stages[0].waves[0].groups[0].startDelayMs).toBe(0)
    expect(baTrieuChapter.stages[1].waves[0].groups[0].startDelayMs).toBe(600)
    expect(baTrieuChapter.stages[2].waves[0].groups[0].startDelayMs).toBe(600)
    expect(baTrieuChapter.stages[2].waves[0].groups[0].spawnIntervalMs).toBe(825)
    expect(baTrieuChapter.stages[2].waves).toHaveLength(22)
  })

  it('keeps the HBT/Wu visual fallback boundary intact with production walk assets', () => {
    expect(Object.keys(productionEnemyVisualManifest)).toHaveLength(8)
    ;['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'].forEach((id) => expect(resolveEnemyVisual(id)?.walkUrl).toBeTruthy())
    expect(Object.keys(wuEnemyVisualManifest)).toEqual(['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'])
    Object.values(wuEnemyVisualManifest).forEach((visual) => {
      expect(visual).toMatchObject({ frameWidth: 128, frameHeight: 128, frameCount: 8, facing: 'right', fallback: 'primitive' })
      expect(visual.walkUrl).toBeTruthy()
    })
  })
})
