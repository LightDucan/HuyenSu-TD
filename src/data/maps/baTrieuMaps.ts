import type { BattleMapDefinition } from './MapDefinition'

const fixedPath = [
  { x: 0, y: 580 }, { x: 220, y: 580 }, { x: 220, y: 350 },
  { x: 510, y: 350 }, { x: 510, y: 170 }, { x: 790, y: 170 },
  { x: 790, y: 510 }, { x: 1024, y: 510 },
] as const
const placementTiles = [
  { column: 2, row: 7 }, { column: 3, row: 7 }, { column: 4, row: 6 },
  { column: 6, row: 6 }, { column: 7, row: 4 }, { column: 9, row: 4 },
] as const

const map = (id: string, title: string, theme: string): BattleMapDefinition => ({
  id, title, theme, width: 1024, height: 768, grid: { columns: 12, rows: 10 }, fixedPath, placementTiles,
})

export const baTrieuMaps = [
  map('map-bt-nui-nua', 'Tụ Nghĩa Núi Nưa', 'nui-nua'),
  map('map-bt-thanh-ap', 'Công Phá Thành Ấp', 'cuu-chan-settlement'),
  map('map-bt-song-ma', 'Bến Sông Mã', 'song-ma-riverbank'),
  map('map-bt-bo-dien-luy', 'Lập Lũy Bồ Điền', 'bo-dien-fort'),
  map('map-bt-bo-dien-battle', 'Đại Chiến Bồ Điền', 'bo-dien-field'),
  map('map-bt-nui-tung', 'Khúc Ca Núi Tùng', 'nui-tung-last-stand'),
] as const
