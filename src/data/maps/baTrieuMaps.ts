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

export const baTrieuStage02Map = {
  id: 'map-bt-thanh-ap',
  title: 'Công Phá Thành Ấp',
  theme: 'cuu-chan-settlement',
  width: 1024,
  height: 768,
  grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 180 }, { x: 120, y: 180 }, { x: 120, y: 520 },
    { x: 300, y: 520 }, { x: 300, y: 320 }, { x: 500, y: 320 },
    { x: 500, y: 560 }, { x: 760, y: 560 }, { x: 760, y: 260 },
    { x: 900, y: 260 }, { x: 1024, y: 260 },
  ],
  placementTiles: [
    { column: 0, row: 5 }, { column: 2, row: 7 },
    { column: 4, row: 8 }, { column: 8, row: 7 },
    { column: 4, row: 2 }, { column: 6, row: 3 },
    { column: 2, row: 3 }, { column: 9, row: 3 },
    { column: 11, row: 0 }, { column: 0, row: 9 },
  ],
  terrainDecorations: [
    { kind: 'settlement', x: 350, y: 30, width: 260, height: 150 },
    { kind: 'earth', x: 230, y: 220, width: 110, height: 260 },
    { kind: 'barrier', x: 70, y: 460, width: 125, height: 65 },
    { kind: 'barrier', x: 680, y: 465, width: 180, height: 70 },
    { kind: 'camp', x: 390, y: 585, width: 170, height: 120 },
    { kind: 'forest', x: 0, y: 0, width: 105, height: 145 },
    { kind: 'forest', x: 865, y: 390, width: 150, height: 150 },
    { kind: 'rock', x: 40, y: 620, width: 150, height: 100 },
  ],
} as const satisfies BattleMapDefinition

export const baTrieuStage03Map = {
  id: 'map-bt-song-ma',
  title: 'Bến Sông Mã',
  theme: 'song-ma-riverbank',
  width: 1024,
  height: 768,
  grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 620 }, { x: 150, y: 620 }, { x: 150, y: 360 },
    { x: 330, y: 360 }, { x: 330, y: 520 }, { x: 520, y: 520 },
    { x: 520, y: 220 }, { x: 760, y: 220 }, { x: 760, y: 430 },
    { x: 900, y: 430 }, { x: 900, y: 140 }, { x: 1024, y: 140 },
  ],
  placementTiles: [
    { column: 2, row: 1 }, { column: 8, row: 1 },
    { column: 0, row: 4 }, { column: 4, row: 7 },
    { column: 5, row: 4 }, { column: 7, row: 6 },
    { column: 9, row: 6 }, { column: 10, row: 2 },
    { column: 11, row: 8 }, { column: 0, row: 9 },
  ],
  terrainDecorations: [
    { kind: 'shallow-water', x: 0, y: 0, width: 1024, height: 135 },
    { kind: 'reed', x: 35, y: 160, width: 180, height: 125 },
    { kind: 'mud', x: 120, y: 290, width: 220, height: 110 },
    { kind: 'earth', x: 270, y: 570, width: 260, height: 150 },
    { kind: 'forest', x: 545, y: 25, width: 180, height: 130 },
    { kind: 'rock', x: 780, y: 285, width: 150, height: 110 },
    { kind: 'camp', x: 620, y: 500, width: 140, height: 135 },
    { kind: 'reed', x: 900, y: 500, width: 115, height: 150 },
  ],
} as const satisfies BattleMapDefinition

export const baTrieuStage04Map = {
  id: 'map-bt-bo-dien-luy',
  title: 'Lập Lũy Bồ Điền',
  theme: 'bo-dien-fort',
  width: 1024,
  height: 768,
  grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 180 }, { x: 140, y: 180 }, { x: 140, y: 460 },
    { x: 300, y: 460 }, { x: 300, y: 240 }, { x: 500, y: 240 },
    { x: 500, y: 600 }, { x: 720, y: 600 }, { x: 720, y: 340 },
    { x: 870, y: 340 }, { x: 870, y: 120 }, { x: 1024, y: 120 },
  ],
  placementTiles: [
    { column: 1, row: 1 }, { column: 4, row: 1 },
    { column: 0, row: 6 }, { column: 3, row: 6 },
    { column: 5, row: 4 }, { column: 7, row: 4 },
    { column: 8, row: 8 }, { column: 10, row: 7 },
    { column: 11, row: 2 }, { column: 0, row: 9 },
  ],
  terrainDecorations: [
    { kind: 'earth', x: 0, y: 0, width: 260, height: 150 },
    { kind: 'barrier', x: 190, y: 380, width: 190, height: 55 },
    { kind: 'settlement', x: 350, y: 25, width: 240, height: 150 },
    { kind: 'camp', x: 560, y: 485, width: 155, height: 130 },
    { kind: 'barrier', x: 720, y: 290, width: 160, height: 55 },
    { kind: 'forest', x: 765, y: 0, width: 210, height: 105 },
    { kind: 'rock', x: 900, y: 460, width: 110, height: 100 },
    { kind: 'earth', x: 30, y: 600, width: 180, height: 125 },
  ],
} as const satisfies BattleMapDefinition

export const baTrieuStage05Map = {
  id: 'map-bt-bo-dien-battle',
  title: 'Đại Chiến Bồ Điền',
  theme: 'bo-dien-field',
  width: 1024,
  height: 768,
  grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 560 }, { x: 180, y: 560 }, { x: 180, y: 180 },
    { x: 420, y: 180 }, { x: 420, y: 460 }, { x: 620, y: 460 },
    { x: 620, y: 140 }, { x: 840, y: 140 }, { x: 840, y: 560 },
    { x: 960, y: 560 }, { x: 960, y: 300 }, { x: 1024, y: 300 },
  ],
  placementTiles: [
    { column: 1, row: 1 }, { column: 4, row: 1 },
    { column: 2, row: 4 }, { column: 5, row: 6 },
    { column: 7, row: 7 }, { column: 9, row: 7 },
    { column: 10, row: 1 }, { column: 11, row: 5 },
    { column: 0, row: 8 }, { column: 6, row: 2 },
  ],
  terrainDecorations: [
    { kind: 'earth', x: 0, y: 0, width: 210, height: 150 },
    { kind: 'forest', x: 260, y: 20, width: 170, height: 110 },
    { kind: 'rock', x: 470, y: 35, width: 125, height: 90 },
    { kind: 'camp', x: 700, y: 20, width: 135, height: 105 },
    { kind: 'barrier', x: 260, y: 600, width: 180, height: 45 },
    { kind: 'earth', x: 470, y: 530, width: 170, height: 150 },
    { kind: 'forest', x: 865, y: 20, width: 145, height: 115 },
    { kind: 'rock', x: 870, y: 600, width: 120, height: 100 },
  ],
} as const satisfies BattleMapDefinition

export const baTrieuStage06Map = {
  id: 'map-bt-nui-tung',
  title: 'Khúc Ca Núi Tùng',
  theme: 'nui-tung-last-stand',
  width: 1024,
  height: 768,
  grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 620 }, { x: 120, y: 620 }, { x: 120, y: 300 },
    { x: 280, y: 300 }, { x: 280, y: 500 }, { x: 430, y: 500 },
    { x: 430, y: 180 }, { x: 610, y: 180 }, { x: 610, y: 380 },
    { x: 780, y: 380 }, { x: 780, y: 120 }, { x: 1024, y: 120 },
  ],
  placementTiles: [
    { column: 1, row: 1 }, { column: 4, row: 1 },
    { column: 1, row: 5 }, { column: 3, row: 7 },
    { column: 5, row: 3 }, { column: 7, row: 6 },
    { column: 8, row: 1 }, { column: 10, row: 2 },
    { column: 9, row: 8 }, { column: 0, row: 8 },
  ],
  terrainDecorations: [
    { kind: 'forest', x: 0, y: 0, width: 260, height: 170 },
    { kind: 'hill', x: 300, y: 0, width: 240, height: 155 },
    { kind: 'rock', x: 570, y: 20, width: 140, height: 120 },
    { kind: 'forest', x: 800, y: 0, width: 220, height: 160 },
    { kind: 'earth', x: 210, y: 555, width: 220, height: 170 },
    { kind: 'barrier', x: 445, y: 535, width: 170, height: 45 },
    { kind: 'camp', x: 640, y: 490, width: 145, height: 120 },
    { kind: 'rock', x: 820, y: 520, width: 150, height: 120 },
  ],
} as const satisfies BattleMapDefinition

export const baTrieuMaps = [
  baTrieuStage01Map,
  baTrieuStage02Map,
  baTrieuStage03Map,
  baTrieuStage04Map,
  baTrieuStage05Map,
  baTrieuStage06Map,
] as const
