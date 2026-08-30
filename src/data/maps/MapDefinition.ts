export type PathPoint = Readonly<{ x: number; y: number }>

export type BattleMapDefinition = Readonly<{
  id: string
  title: string
  theme: string
  width: number
  height: number
  grid: Readonly<{ columns: number; rows: number }>
  fixedPath: readonly PathPoint[]
  placementTiles: readonly Readonly<{ column: number; row: number }>[]
}>
