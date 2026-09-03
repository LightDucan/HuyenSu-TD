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
