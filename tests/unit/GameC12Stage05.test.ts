import { describe, expect, it } from 'vitest'
import { BA_TRIEU_HERO_IDS, BA_TRIEU_STAGE_IDS, baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { HAI_BA_TRUNG_STAGE03_ID } from '../../src/data/campaign/haiBaTrungCampaign'
import { balanceV1 } from '../../src/data/economy/balanceV1'
import { selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import { productionEnemyVisualManifest, resolveEnemyVisual, wuEnemyVisualManifest } from '../../src/data/assets/enemyVisualAssets'

const stage = baTrieuChapter.stages[4]
const expectedComposition = [
  { 'wu-sword-infantry': 7 }, { 'wu-sword-infantry': 6, 'wu-crossbow-soldier': 4 },
  { 'wu-armored-guard': 4, 'wu-sword-infantry': 7 }, { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 6 },
  { 'wu-armored-guard': 4, 'wu-crossbow-soldier': 5, 'wu-sword-infantry': 7 }, { 'wu-sword-infantry': 8, 'wu-crossbow-soldier': 6 },
  { 'wu-armored-guard': 5, 'wu-sword-infantry': 8 }, { 'wu-armored-guard': 5, 'wu-crossbow-soldier': 8 },
  { 'wu-armored-guard': 6, 'wu-sword-infantry': 8, 'wu-crossbow-soldier': 6 }, { 'wu-armored-guard': 7, 'wu-sword-infantry': 9 },
  { 'wu-armored-guard': 7, 'wu-crossbow-soldier': 8 }, { 'wu-armored-guard': 7, 'wu-crossbow-soldier': 8, 'wu-sword-infantry': 9 },
  { 'wu-armored-guard': 8, 'wu-sword-infantry': 10 }, { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 9 },
  { 'wu-armored-guard': 8, 'wu-crossbow-soldier': 9, 'wu-sword-infantry': 10 }, { 'wu-armored-guard': 9, 'wu-sword-infantry': 11 },
  { 'wu-armored-guard': 9, 'wu-crossbow-soldier': 10 }, { 'wu-armored-guard': 9, 'wu-crossbow-soldier': 10, 'wu-sword-infantry': 11 },
  { 'wu-armored-guard': 10, 'wu-sword-infantry': 12 }, { 'wu-armored-guard': 10, 'wu-crossbow-soldier': 11 },
  { 'wu-armored-guard': 10, 'wu-crossbow-soldier': 11, 'wu-sword-infantry': 12 }, { 'wu-armored-guard': 11, 'wu-sword-infantry': 13 },
  { 'wu-armored-guard': 11, 'wu-crossbow-soldier': 12 }, { 'wu-armored-guard': 11, 'wu-crossbow-soldier': 12, 'wu-sword-infantry': 13 },
  { 'wu-armored-guard': 12, 'wu-crossbow-soldier': 13, 'wu-sword-infantry': 13 }, { 'wu-field-commander': 1, 'wu-armored-guard': 12, 'wu-crossbow-soldier': 14, 'wu-sword-infantry': 14 },
]

const intersects = (a: readonly [{ x: number; y: number }, { x: number; y: number }], b: readonly [{ x: number; y: number }, { x: number; y: number }]) => {
  const [a1, a2] = a; const [b1, b2] = b
  const between = (value: number, first: number, second: number) => value >= Math.min(first, second) && value <= Math.max(first, second)
  if (a1.y === a2.y && b1.x === b2.x) return between(b1.x, a1.x, a2.x) && between(a1.y, b1.y, b2.y)
  if (a1.x === a2.x && b1.y === b2.y) return between(a1.x, b1.x, b2.x) && between(b1.y, a1.y, a2.y)
  return false
}

describe('GAME-C12 Bà Triệu Stage 05 production contract', () => {
  it('locks identity, roster and 26 unique wave IDs', () => {
    expect(baTrieuChapter.id).toBe('chapter-ba-trieu-248')
    expect(stage).toMatchObject({ id: 'bt-05-dai-chien-bo-dien', displayName: 'Đại Chiến Bồ Điền', historicalConfidence: 'COMPOSITE RECONSTRUCTION' })
    expect(stage.allowedHeroIds).toEqual(BA_TRIEU_HERO_IDS)
    expect(stage.waves).toHaveLength(26)
    expect(stage.waves.map(({ id }) => id)).toEqual(Array.from({ length: 26 }, (_, index) => `bt-05-wave-${String(index + 1).padStart(2, '0')}`))
    expect(new Set(stage.waves.map(({ id }) => id)).size).toBe(26)
  })

  it('matches exact 539-enemy composition and commander only on W26', () => {
    expect(stage.waves.map(({ groups }) => Object.fromEntries(groups.map(({ enemyId, count }) => [enemyId, count])))).toEqual(expectedComposition)
    expect(stage.waves.flatMap(({ groups }) => groups).reduce((total, group) => total + group.count, 0)).toBe(539)
    expect(stage.waves.flatMap((wave, index) => wave.groups.filter(({ enemyId }) => enemyId === 'wu-field-commander').map(() => index + 1))).toEqual([26])
  })

  it('isolates Stage 05 timing and deterministic offsets', () => {
    const groups = stage.waves.flatMap(({ groups }) => groups)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-sword-infantry').every(({ spawnIntervalMs }) => spawnIntervalMs === 775)).toBe(true)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-crossbow-soldier').every(({ spawnIntervalMs }) => spawnIntervalMs === 900)).toBe(true)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-armored-guard').every(({ spawnIntervalMs }) => spawnIntervalMs === 1125)).toBe(true)
    expect(groups.filter(({ enemyId }) => enemyId === 'wu-field-commander').every(({ spawnIntervalMs }) => spawnIntervalMs === 1500)).toBe(true)
    expect(groups.every(({ startDelayMs }) => [600, 1050, 1650, 2250].includes(startDelayMs))).toBe(true)
    expect(stage.waves[25].groups.map(({ enemyId, startDelayMs }) => [enemyId, startDelayMs])).toEqual([['wu-field-commander', 600], ['wu-armored-guard', 1050], ['wu-crossbow-soldier', 1650], ['wu-sword-infantry', 2250]])
  })

  it('uses a distinct bounded open-field path and ten presentation-only placements', () => {
    const { map } = stage
    expect(map).toMatchObject({ id: 'map-bt-bo-dien-battle', title: 'Đại Chiến Bồ Điền', theme: 'bo-dien-field', width: 1024, height: 768, grid: { columns: 12, rows: 10 } })
    expect(map.fixedPath.length - 1).toBeGreaterThanOrEqual(9)
    expect(map.fixedPath.length - 1).toBeLessThanOrEqual(11)
    map.fixedPath.forEach(({ x, y }) => { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThanOrEqual(1024); expect(y).toBeGreaterThanOrEqual(0); expect(y).toBeLessThanOrEqual(768) })
    const segments = map.fixedPath.slice(0, -1).map((point, index) => [point, map.fixedPath[index + 1]] as const)
    expect(segments.every(([from, to]) => from.x === to.x || from.y === to.y)).toBe(true)
    for (let first = 0; first < segments.length; first += 1) for (let second = first + 2; second < segments.length; second += 1) expect(intersects(segments[first], segments[second])).toBe(false)
    expect(map.placementTiles).toHaveLength(10)
    expect(new Set(map.placementTiles.map(({ column, row }) => `${column}:${row}`)).size).toBe(10)
    map.placementTiles.forEach(({ column, row }) => { expect(column).toBeGreaterThanOrEqual(0); expect(column).toBeLessThan(12); expect(row).toBeGreaterThanOrEqual(0); expect(row).toBeLessThan(10) })
    expect(map.terrainDecorations?.every(({ kind }) => ['earth', 'forest', 'rock', 'camp', 'barrier'].includes(kind))).toBe(true)
  })

  it('keeps the historical reconstruction and tactical narrative boundary', () => {
    expect(stage.narrative?.preBattle).toMatch(/Lục Dận.*chỉ huy|phục dựng tổng hợp/i)
    expect(stage.narrative?.preBattle).not.toMatch(/8[,\s]?000|trực tiếp dẫn quân/i)
    expect(stage.narrative?.waveBeats.map(({ wave }) => wave)).toEqual([1, 9, 18, 26])
    expect(stage.narrative?.victory).toMatch(/trước mắt|còn nguyên vẹn|tiếp diễn/i)
    expect(stage.narrative?.victory).not.toMatch(/Lục Dận.*(chết|bại vĩnh viễn)|Đông Ngô.*(bị tiêu diệt|thất bại hoàn toàn)|kết thúc/i)
    expect(stage.narrative?.defeat).toMatch(/sụp đổ|rút về|thử lại/i)
  })

  it('preserves the exact reward without first-clear bonus', () => {
    expect(balanceV1.rewardSources.stageClear.baTrieu?.['bt-05-dai-chien-bo-dien']).toEqual({ gold: 30, knb: 2, anhHon: 15 })
    expect(stage.firstClearReward).toBeUndefined()
  })

  it('unlocks BT05 after BT04 and BT06 after BT05 while preserving Stage 06 progression', () => {
    const withHbt = { completedStages: { [HAI_BA_TRUNG_STAGE03_ID]: { firstCompletedAtMs: 1 } } }
    const throughBt04 = { completedStages: { ...withHbt.completedStages, ...Object.fromEntries(BA_TRIEU_STAGE_IDS.slice(0, 4).map((id, index) => [id, { firstCompletedAtMs: index + 2 }])) } }
    expect(selectStageProgress(baTrieuChapter, withHbt, stage.id)).toBe('locked')
    expect(selectStageProgress(baTrieuChapter, throughBt04, stage.id)).toBe('available')
    expect(selectStageProgress(baTrieuChapter, throughBt04, BA_TRIEU_STAGE_IDS[5])).toBe('locked')
    expect(selectStageProgress(baTrieuChapter, { completedStages: { ...throughBt04.completedStages, [stage.id]: { firstCompletedAtMs: 9 } } }, BA_TRIEU_STAGE_IDS[5])).toBe('available')
    expect(baTrieuChapter.stages[5].waves).toHaveLength(28)
  })

  it('keeps C08-C11 production contracts and visual fallback boundaries', () => {
    expect(baTrieuChapter.stages.slice(0, 4).map(({ waves }) => waves.length)).toEqual([18, 20, 22, 24])
    expect(baTrieuChapter.stages[0].waves[0].groups[0].startDelayMs).toBe(0)
    expect(baTrieuChapter.stages.slice(1, 4).every(({ waves }) => waves[0].groups[0].startDelayMs === 600)).toBe(true)
    expect(balanceV1.rewardSources.stageClear.baTrieu?.['bt-04-lap-luy-bo-dien']).toEqual({ gold: 26, knb: 1, anhHon: 12 })
    expect(resolveEnemyVisual('wu-sword-infantry')).toBeDefined()
    expect(Object.keys(wuEnemyVisualManifest)).toEqual(['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'])
    expect(Object.keys(productionEnemyVisualManifest)).toHaveLength(8)
  })
})
