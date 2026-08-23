export type PathPoint = Readonly<{ x: number; y: number }>

export const prototypeMap = {
  id: 'prototype-city-gate',
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
} as const
