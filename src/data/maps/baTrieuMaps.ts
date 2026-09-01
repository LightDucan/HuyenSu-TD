import type { BattleMapDefinition } from './MapDefinition'

const prototypeFixedPath = [
  { x: 0, y: 580 }, { x: 220, y: 580 }, { x: 220, y: 350 },
  { x: 510, y: 350 }, { x: 510, y: 170 }, { x: 790, y: 170 },
  { x: 790, y: 510 }, { x: 1024, y: 510 },
] as const
const prototypePlacementTiles = [
  { column: 2, row: 7 }, { column: 3, row: 7 }, { column: 4, row: 6 },
  { column: 6, row: 6 }, { column: 7, row: 4 }, { column: 9, row: 4 },
] as const

const map = (id: string, title: string, theme: string): BattleMapDefinition => ({
  id, title, theme, width: 1024, height: 768, grid: { columns: 12, rows: 10 }, fixedPath: prototypeFixedPath, placementTiles: prototypePlacementTiles,
})

export const baTrieuStage01Map = {
  id: 'map-bt-nui-nua',
  title: 'Tụ Nghĩa Núi Nưa',
  theme: 'nui-nua',
  width: 1024,
  height: 768,
  grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 640 }, { x: 170, y: 640 }, { x: 170, y: 500 },
    { x: 360, y: 500 }, { x: 360, y: 260 }, { x: 560, y: 260 },
    { x: 560, y: 420 }, { x: 820, y: 420 }, { x: 820, y: 180 },
    { x: 1024, y: 180 },
  ],
  placementTiles: [
    { column: 1, row: 5 }, { column: 5, row: 6 },
    { column: 6, row: 2 }, { column: 8, row: 4 },
    { column: 5, row: 4 }, { column: 7, row: 6 },
    { column: 2, row: 3 }, { column: 9, row: 6 },
    { column: 0, row: 2 }, { column: 11, row: 8 },
  ],
  terrainDecorations: [
    { kind: 'forest', x: 0, y: 0, width: 280, height: 170 },
    { kind: 'hill', x: 300, y: 0, width: 260, height: 150 },
    { kind: 'forest', x: 610, y: 0, width: 190, height: 130 },
    { kind: 'rock', x: 865, y: 30, width: 135, height: 95 },
    { kind: 'earth', x: 250, y: 570, width: 280, height: 170 },
    { kind: 'camp', x: 600, y: 520, width: 180, height: 140 },
    { kind: 'barrier', x: 785, y: 500, width: 55, height: 150 },
    { kind: 'reed', x: 865, y: 560, width: 130, height: 120 },
  ],
} as const satisfies BattleMapDefinition

export const baTrieuMaps = [
  baTrieuStage01Map,
  map('map-bt-thanh-ap', 'Công Phá Thành Ấp', 'cuu-chan-settlement'),
  map('map-bt-song-ma', 'Bến Sông Mã', 'song-ma-riverbank'),
  map('map-bt-bo-dien-luy', 'Lập Lũy Bồ Điền', 'bo-dien-fort'),
  map('map-bt-bo-dien-battle', 'Đại Chiến Bồ Điền', 'bo-dien-field'),
  map('map-bt-nui-tung', 'Khúc Ca Núi Tùng', 'nui-tung-last-stand'),
] as const
