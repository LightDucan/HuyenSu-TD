import type { BattleMapDefinition, PathPoint } from './MapDefinition'
export type { PathPoint } from './MapDefinition'

export const haiBaTrungMap = {
  id: 'map-lang-bac-marsh',
  title: 'Chương I — Huyết Chiến Lãng Bạc',
  theme: 'lang-bac-marsh',
  width: 1024,
  height: 768,
  grid: { columns: 12, rows: 10 },
  fixedPath: [
    { x: 0, y: 590 },
    { x: 210, y: 590 },
    { x: 210, y: 390 },
    { x: 500, y: 390 },
    { x: 500, y: 180 },
    { x: 780, y: 180 },
    { x: 780, y: 520 },
    { x: 1024, y: 520 },
  ] satisfies PathPoint[],
  placementTiles: [
    { column: 2, row: 8 }, { column: 3, row: 8 }, { column: 4, row: 7 }, { column: 5, row: 7 },
    { column: 6, row: 6 }, { column: 7, row: 6 }, { column: 8, row: 5 }, { column: 9, row: 5 },
    { column: 4, row: 4 }, { column: 6, row: 3 },
  ],
  terrainDecorations: [
    { kind: 'shallow-water', x: 0, y: 0, width: 1024, height: 150 },
    { kind: 'marsh', x: 0, y: 620, width: 1024, height: 148 },
    { kind: 'mud', x: 180, y: 330, width: 220, height: 90 },
    { kind: 'reed', x: 40, y: 220, width: 150, height: 100 },
    { kind: 'reed', x: 820, y: 260, width: 160, height: 120 },
    { kind: 'earth', x: 420, y: 90, width: 180, height: 100 },
    { kind: 'settlement', x: 850, y: 560, width: 120, height: 90 },
  ],
} as const satisfies BattleMapDefinition

export const prototypeMap = haiBaTrungMap
