import type { BattleMapDefinition } from './MapDefinition'

export const haiBaTrungStage02Map = {
  id: 'map-lang-bac-retreat-corridor', title: 'Rút Tuyến Lãng Bạc', theme: 'lang-bac-retreat-corridor',
  width: 1024, height: 768, grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 170 }, { x: 150, y: 170 }, { x: 150, y: 540 }, { x: 330, y: 540 },
    { x: 330, y: 340 }, { x: 520, y: 340 }, { x: 520, y: 610 }, { x: 720, y: 610 },
    { x: 720, y: 420 }, { x: 880, y: 420 }, { x: 880, y: 210 }, { x: 1024, y: 210 },
  ],
  placementTiles: [
    { column: 0, row: 4 }, { column: 2, row: 7 }, { column: 4, row: 7 }, { column: 5, row: 3 },
    { column: 7, row: 6 }, { column: 8, row: 3 }, { column: 10, row: 6 }, { column: 11, row: 3 },
    { column: 3, row: 1 }, { column: 6, row: 1 },
  ],
  terrainDecorations: [
    { kind: 'earth', x: 0, y: 0, width: 250, height: 140 }, { kind: 'barrier', x: 205, y: 465, width: 160, height: 55 },
    { kind: 'reed', x: 20, y: 600, width: 150, height: 120 }, { kind: 'mud', x: 390, y: 490, width: 150, height: 110 },
    { kind: 'camp', x: 570, y: 500, width: 140, height: 100 }, { kind: 'barrier', x: 740, y: 340, width: 150, height: 55 },
    { kind: 'forest', x: 820, y: 0, width: 190, height: 150 }, { kind: 'shallow-water', x: 0, y: 675, width: 1024, height: 93 },
  ],
} as const satisfies BattleMapDefinition

export const haiBaTrungStage03Map = {
  id: 'map-cam-khe-defensive-line', title: 'Phòng Tuyến Cẩm Khê', theme: 'cam-khe-defensive-line',
  width: 1024, height: 768, grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 620 }, { x: 130, y: 620 }, { x: 130, y: 360 }, { x: 300, y: 360 },
    { x: 300, y: 170 }, { x: 500, y: 170 }, { x: 500, y: 460 }, { x: 680, y: 460 },
    { x: 680, y: 250 }, { x: 850, y: 250 }, { x: 850, y: 540 }, { x: 1024, y: 540 },
  ],
  placementTiles: [
    { column: 1, row: 1 }, { column: 4, row: 1 }, { column: 1, row: 6 }, { column: 3, row: 7 },
    { column: 5, row: 5 }, { column: 7, row: 2 }, { column: 8, row: 6 }, { column: 10, row: 1 },
    { column: 11, row: 7 }, { column: 6, row: 8 },
  ],
  terrainDecorations: [
    { kind: 'forest', x: 0, y: 0, width: 230, height: 150 }, { kind: 'hill', x: 280, y: 0, width: 230, height: 140 },
    { kind: 'earth', x: 200, y: 510, width: 180, height: 150 }, { kind: 'barrier', x: 340, y: 300, width: 180, height: 45 },
    { kind: 'camp', x: 540, y: 520, width: 130, height: 110 }, { kind: 'rock', x: 720, y: 20, width: 130, height: 100 },
    { kind: 'forest', x: 820, y: 350, width: 180, height: 150 }, { kind: 'barrier', x: 780, y: 480, width: 150, height: 45 },
  ],
} as const satisfies BattleMapDefinition

export const haiBaTrungStage04Map = {
  id: 'map-thuy-bo-crossing', title: 'Hành Lang Thủy Bộ', theme: 'thuy-bo-crossing',
  width: 1024, height: 768, grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 250 }, { x: 140, y: 250 }, { x: 140, y: 560 }, { x: 300, y: 560 },
    { x: 300, y: 390 }, { x: 470, y: 390 }, { x: 470, y: 180 }, { x: 650, y: 180 },
    { x: 650, y: 500 }, { x: 820, y: 500 }, { x: 820, y: 310 }, { x: 1024, y: 310 },
  ],
  placementTiles: [
    { column: 0, row: 5 }, { column: 2, row: 2 }, { column: 3, row: 7 }, { column: 4, row: 4 },
    { column: 6, row: 1 }, { column: 6, row: 7 }, { column: 8, row: 3 }, { column: 9, row: 7 },
    { column: 10, row: 2 }, { column: 11, row: 5 },
  ],
  terrainDecorations: [
    { kind: 'shallow-water', x: 0, y: 0, width: 1024, height: 105 }, { kind: 'reed', x: 20, y: 105, width: 170, height: 115 },
    { kind: 'mud', x: 0, y: 610, width: 220, height: 158 }, { kind: 'earth', x: 220, y: 245, width: 190, height: 95 },
    { kind: 'barrier', x: 330, y: 475, width: 150, height: 50 }, { kind: 'camp', x: 515, y: 545, width: 135, height: 100 },
    { kind: 'reed', x: 665, y: 580, width: 145, height: 120 }, { kind: 'forest', x: 835, y: 0, width: 175, height: 165 },
    { kind: 'barrier', x: 835, y: 410, width: 145, height: 50 },
  ],
} as const satisfies BattleMapDefinition

export const haiBaTrungStage05Map = {
  id: 'map-cam-khe-last-line', title: 'Tuyến Cuối Cẩm Khê', theme: 'cam-khe-last-line',
  width: 1024, height: 768, grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 110 }, { x: 170, y: 110 }, { x: 170, y: 330 }, { x: 340, y: 330 },
    { x: 340, y: 610 }, { x: 540, y: 610 }, { x: 540, y: 430 }, { x: 720, y: 430 },
    { x: 720, y: 180 }, { x: 880, y: 180 }, { x: 880, y: 520 }, { x: 1024, y: 520 },
  ],
  placementTiles: [
    { column: 1, row: 3 }, { column: 2, row: 6 }, { column: 4, row: 2 }, { column: 4, row: 7 },
    { column: 6, row: 3 }, { column: 7, row: 7 }, { column: 8, row: 1 }, { column: 9, row: 5 },
    { column: 10, row: 1 }, { column: 11, row: 7 },
  ],
  terrainDecorations: [
    { kind: 'hill', x: 0, y: 430, width: 220, height: 185 }, { kind: 'forest', x: 0, y: 620, width: 245, height: 148 },
    { kind: 'earth', x: 225, y: 0, width: 210, height: 145 }, { kind: 'barrier', x: 245, y: 435, width: 175, height: 50 },
    { kind: 'camp', x: 440, y: 175, width: 135, height: 105 }, { kind: 'rock', x: 590, y: 20, width: 130, height: 110 },
    { kind: 'barrier', x: 620, y: 535, width: 170, height: 50 }, { kind: 'forest', x: 810, y: 575, width: 200, height: 175 },
    { kind: 'earth', x: 845, y: 250, width: 165, height: 110 },
  ],
} as const satisfies BattleMapDefinition

export const haiBaTrungStage06Map = {
  id: 'map-hbt-closure-rampart', title: 'Giữ Lửa Mê Linh', theme: 'hbt-closure-rampart',
  width: 1024, height: 768, grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 620 }, { x: 120, y: 620 }, { x: 120, y: 300 }, { x: 280, y: 300 },
    { x: 280, y: 500 }, { x: 430, y: 500 }, { x: 430, y: 180 }, { x: 610, y: 180 },
    { x: 610, y: 380 }, { x: 780, y: 380 }, { x: 780, y: 120 }, { x: 1024, y: 120 },
  ],
  placementTiles: [
    { column: 1, row: 1 }, { column: 4, row: 1 }, { column: 1, row: 5 }, { column: 3, row: 7 },
    { column: 5, row: 3 }, { column: 7, row: 6 }, { column: 8, row: 1 }, { column: 10, row: 2 },
    { column: 9, row: 8 }, { column: 0, row: 8 },
  ],
  terrainDecorations: [
    { kind: 'forest', x: 0, y: 0, width: 260, height: 170 }, { kind: 'hill', x: 300, y: 0, width: 240, height: 155 },
    { kind: 'rock', x: 570, y: 20, width: 140, height: 120 }, { kind: 'forest', x: 800, y: 0, width: 220, height: 160 },
    { kind: 'earth', x: 210, y: 555, width: 220, height: 170 }, { kind: 'barrier', x: 445, y: 535, width: 170, height: 45 },
    { kind: 'camp', x: 640, y: 490, width: 145, height: 120 }, { kind: 'rock', x: 820, y: 520, width: 150, height: 120 },
  ],
} as const satisfies BattleMapDefinition
