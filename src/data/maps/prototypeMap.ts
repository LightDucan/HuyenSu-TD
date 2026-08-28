export type PathPoint = Readonly<{ x: number; y: number }>

export const prototypeMap = {
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
    { column: 3, row: 7 },
    { column: 4, row: 7 },
    { column: 5, row: 6 },
    { column: 6, row: 6 },
    { column: 7, row: 5 },
    { column: 8, row: 4 },
  ],
} as const
