import { describe, expect, it } from 'vitest'
import { BA_TRIEU_HERO_IDS, BA_TRIEU_STAGE_IDS, baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { HAI_BA_TRUNG_STAGE06_ID } from '../../src/data/campaign/haiBaTrungCampaign'
import { balanceV1 } from '../../src/data/economy/balanceV1'
import { isChapterCompleted, selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import { productionEnemyVisualManifest, resolveEnemyVisual, wuEnemyVisualManifest } from '../../src/data/assets/enemyVisualAssets'

const stage = baTrieuChapter.stages[5]
const expectedComposition = [
  { 'wu-sword-infantry': 8 }, { 'wu-sword-infantry': 7, 'wu-crossbow-soldier': 4 },
  { 'wu-armored-guard': 4, 'wu-sword-infantry': 8 }, { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 7 },
  { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 5, 'wu-sword-infantry': 8 }, { 'wu-sword-infantry': 9, 'wu-crossbow-soldier': 7 },
  { 'wu-armored-guard': 6, 'wu-sword-infantry': 9 }, { 'wu-armored-guard': 6, 'wu-crossbow-soldier': 8 },
  { 'wu-armored-guard': 6, 'wu-crossbow-soldier': 8, 'wu-sword-infantry': 9 }, { 'wu-armored-guard': 7, 'wu-sword-infantry': 10 },
  { 'wu-armored-guard': 7, 'wu-crossbow-soldier': 9 }, { 'wu-armored-guard': 7, 'wu-crossbow-soldier': 9, 'wu-sword-infantry': 10 },
  { 'wu-armored-guard': 8, 'wu-sword-infantry': 11 }, { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 10 },
  { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 10, 'wu-sword-infantry': 11 }, { 'wu-armored-guard': 9, 'wu-sword-infantry': 12 },
  { 'wu-armored-guard': 9, 'wu-crossbow-soldier': 11 }, { 'wu-armored-guard': 9, 'wu-crossbow-soldier': 11, 'wu-sword-infantry': 12 },
  { 'wu-armored-guard': 10, 'wu-sword-infantry': 13 }, { 'wu-armored-guard': 10, 'wu-crossbow-soldier': 12 },
  { 'wu-armored-guard': 10, 'wu-crossbow-soldier': 12, 'wu-sword-infantry': 13 }, { 'wu-armored-guard': 11, 'wu-sword-infantry': 14 },
  { 'wu-armored-guard': 11, 'wu-crossbow-soldier': 13 }, { 'wu-armored-guard': 11, 'wu-crossbow-soldier': 13, 'wu-sword-infantry': 14 },
  { 'wu-armored-guard': 12, 'wu-sword-infantry': 15 }, { 'wu-armored-guard': 12, 'wu-crossbow-soldier': 14, 'wu-sword-infantry': 15 },
  { 'wu-armored-guard': 13, 'wu-crossbow-soldier': 15, 'wu-sword-infantry': 16 }, { 'wu-field-commander': 1, 'wu-armored-guard': 13, 'wu-crossbow-soldier': 16, 'wu-sword-infantry': 17 },
]

const intersects = (a: readonly [{ x: number; y: number }, { x: number; y: number }], b: readonly [{ x: number; y: number }, { x: number; y: number }]) => {
  const [a1, a2] = a; const [b1, b2] = b
  const between = (value: number, first: number, second: number) => value >= Math.min(first, second) && value <= Math.max(first, second)
  if (a1.y === a2.y && b1.x === b2.x) return between(b1.x, a1.x, a2.x) && between(a1.y, b1.y, b2.y)
  if (a1.x === a2.x && b1.y === b2.y) return between(a1.x, b1.x, b2.x) && between(b1.y, a1.y, a2.y)
  return false
}

describe('GAME-C13 Bà Triệu Stage 06 final chapter contract', () => {
  it('locks identity, roster and 28 unique waves', () => {
    expect(baTrieuChapter).toMatchObject({ id: 'chapter-ba-trieu-248', periodLabel: '248 CE', enemyFaction: 'Đông Ngô' })
    expect(stage).toMatchObject({ id: 'bt-06-khuc-ca-nui-tung', displayName: 'Khúc Ca Núi Tùng', historicalConfidence: 'LOCAL TRADITION / RECONSTRUCTION', map: { id: 'map-bt-nui-tung', theme: 'nui-tung-last-stand' } })
    expect(stage.allowedHeroIds).toEqual(BA_TRIEU_HERO_IDS)
    expect(stage.waves).toHaveLength(28)
    expect(stage.waves.map(({ id }) => id)).toEqual(Array.from({ length: 28 }, (_, index) => `bt-06-wave-${String(index + 1).padStart(2, '0')}`))
    expect(new Set(stage.waves.map(({ id }) => id)).size).toBe(28)
  })

  it('matches exact 653-enemy composition and commander only on W28', () => {
    expect(stage.waves.map(({ groups }) => Object.fromEntries(groups.map(({ enemyId, count }) => [enemyId, count])))).toEqual(expectedComposition)
    expect(stage.waves.flatMap(({ groups }) => groups).reduce((total, group) => total + group.count, 0)).toBe(653)
    expect(stage.waves.flatMap((wave, index) => wave.groups.filter(({ enemyId }) => enemyId === 'wu-field-commander').map(() => index + 1))).toEqual([28])
  })

  it('isolates Stage 06 timing and W28 order', () => {
    const groups = stage.waves.flatMap(({ groups }) => groups)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-sword-infantry').every(({ spawnIntervalMs }) => spawnIntervalMs === 750)).toBe(true)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-crossbow-soldier').every(({ spawnIntervalMs }) => spawnIntervalMs === 875)).toBe(true)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-armored-guard').every(({ spawnIntervalMs }) => spawnIntervalMs === 1075)).toBe(true)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-field-commander').every(({ spawnIntervalMs }) => spawnIntervalMs === 1450)).toBe(true)
    expect(groups.every(({ startDelayMs }) => [600, 1000, 1550, 2150].includes(startDelayMs))).toBe(true)
    expect(stage.waves[27].groups.map(({ enemyId, startDelayMs }) => [enemyId, startDelayMs])).toEqual([['wu-field-commander', 600], ['wu-armored-guard', 1000], ['wu-crossbow-soldier', 1550], ['wu-sword-infantry', 2150]])
  })

  it('uses a dedicated bounded mountain path and ten presentation-only placements', () => {
    const { map } = stage
    expect(map).toMatchObject({ width: 1024, height: 768, grid: { columns: 12, rows: 10 } })
    expect(map.fixedPath.length - 1).toBeGreaterThanOrEqual(9)
    expect(map.fixedPath.length - 1).toBeLessThanOrEqual(11)
    map.fixedPath.forEach(({ x, y }) => { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(1024); expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(768) })
    const segments = map.fixedPath.slice(0, -1).map((point, index) => [point, map.fixedPath[index + 1]] as const)
    expect(segments.every(([from, to]) => from.x === to.x || from.y === to.y)).toBe(true)
    for (let first = 0; first < segments.length; first += 1) for (let second = first + 2; second < segments.length; second += 1) expect(intersects(segments[first], segments[second])).toBe(false)
    expect(map.placementTiles).toHaveLength(10)
    expect(new Set(map.placementTiles.map(({ column, row }) => `${column}:${row}`)).size).toBe(10)
    map.placementTiles.forEach(({ column, row }) => { expect(column).toBeGreaterThanOrEqual(0); expect(column).toBeLessThan(12); expect(row).toBeGreaterThanOrEqual(0); expect(row).toBeLessThan(10) })
    expect(map.terrainDecorations?.every(({ kind }) => ['forest', 'hill', 'rock', 'earth', 'camp', 'barrier'].includes(kind))).toBe(true)
  })

  it('keeps source-layered historical ending and safe tactical defeat', () => {
    expect(stage.narrative?.preBattle).toMatch(/truyền thống địa phương|phục dựng gameplay/i)
    expect(stage.narrative?.preBattle).not.toMatch(/Tam Quốc Chí.*trận địa Núi Tùng/i)
    expect(stage.narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 10, 19, 28])
    expect(stage.narrative?.victory).toMatch(/khởi nghĩa.*dẹp.*248|Bà Triệu tử trận|truyền thống địa phương.*tuẫn tiết.*Núi Tùng|khí phách/i)
    expect(stage.narrative?.victory).not.toMatch(/Lục Dận.*(chết|bị giết|tử trận)|Đông Ngô.*(tiêu diệt|thắng lợi)|chiến thắng chiến dịch|độc lập vĩnh viễn/i)
    expect(stage.narrative?.defeat).toMatch(/tan vỡ|thử lại/i)
    expect(stage.narrative?.defeat).not.toMatch(/tử trận|tuẫn tiết/i)
  })

  it('preserves locked rewards and chapter completion semantics', () => {
    expect(balanceV1.rewardSources.stageClear.baTrieu?.['bt-06-khuc-ca-nui-tung']).toEqual({ gold: 35, knb: 2, anhHon: 20 })
    expect(balanceV1.rewardSources.stageClear.baTrieu?.['bt-04-lap-luy-bo-dien']).toEqual({ gold: 26, knb: 1, anhHon: 12 })
    expect(balanceV1.rewardSources.stageClear.baTrieu?.['bt-05-dai-chien-bo-dien']).toEqual({ gold: 30, knb: 2, anhHon: 15 })
    expect(stage.firstClearReward).toBeUndefined()
    const before = { completedStages: { [HAI_BA_TRUNG_STAGE06_ID]: { firstCompletedAtMs: 1 }, ...Object.fromEntries(BA_TRIEU_STAGE_IDS.slice(0, 5).map((id, index) => [id, { firstCompletedAtMs: index + 2 }])) } }
    expect(selectStageProgress(baTrieuChapter, { completedStages: { ...before.completedStages, [BA_TRIEU_STAGE_IDS[4]]: { firstCompletedAtMs: 5 } } }, stage.id)).toBe('available')
    expect(isChapterCompleted(baTrieuChapter, before)).toBe(false)
    const complete = { completedStages: { ...before.completedStages, [stage.id]: { firstCompletedAtMs: 10 } } }
    expect(selectStageProgress(baTrieuChapter, complete, stage.id)).toBe('completed')
    expect(isChapterCompleted(baTrieuChapter, complete)).toBe(true)
  })

  it('keeps C08-C12 regressions and fallback visual boundaries', () => {
    expect(baTrieuChapter.stages.slice(0, 6).map(({ waves }) => waves.length)).toEqual([18, 20, 22, 24, 26, 28])
    expect(baTrieuChapter.stages[0].waves[0].groups[0].startDelayMs).toBe(0)
    expect(baTrieuChapter.stages.slice(1).every(({ waves }) => waves[0].groups[0].startDelayMs === 600)).toBe(true)
    const total = (index: number) => baTrieuChapter.stages[index].waves.flatMap(({ groups }) => groups).reduce((sum, group) => sum + group.count, 0)
    expect(total(1)).toBe(268); expect(total(2)).toBe(355); expect(total(3)).toBe(419); expect(total(4)).toBe(539)
    expect(resolveEnemyVisual('han-sword-infantry')?.walkUrl).toBeTruthy()
    expect(resolveEnemyVisual('wu-sword-infantry')).toBeDefined()
    expect(Object.keys(wuEnemyVisualManifest)).toHaveLength(4)
    expect(Object.keys(productionEnemyVisualManifest)).toHaveLength(8)
  })
})
