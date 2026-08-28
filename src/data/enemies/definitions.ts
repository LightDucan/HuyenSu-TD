export type EnemyCategory = 'sword' | 'archer' | 'other'

export type EnemyDefinition = {
  id: string
  name: string
  category: EnemyCategory
  maxHp: number
  moveSpeed: number
  cityDamage: number
  color: number
}

export const enemyDefinitions: Record<string, EnemyDefinition> = {
  'han-sword-infantry': { id: 'han-sword-infantry', name: 'Đông Hán Bộ Binh', category: 'sword', maxHp: 80, moveSpeed: 50, cityDamage: 1, color: 0xb91c1c },
  'han-crossbow-soldier': { id: 'han-crossbow-soldier', name: 'Đông Hán Nỏ Thủ', category: 'archer', maxHp: 55, moveSpeed: 64, cityDamage: 1, color: 0x6d28d9 },
  'han-armored-guard': { id: 'han-armored-guard', name: 'Đông Hán Thiết Giáp Binh', category: 'other', maxHp: 145, moveSpeed: 36, cityDamage: 2, color: 0x475569 },
  'boss-ma-vien': { id: 'boss-ma-vien', name: 'Mã Viện', category: 'other', maxHp: 1200, moveSpeed: 38, cityDamage: 10, color: 0x7f1d1d },
  'yellow-turban-sword': {
    id: 'yellow-turban-sword', name: 'Khăn Vàng Đao Binh', category: 'sword', maxHp: 78, moveSpeed: 48, cityDamage: 1, color: 0xdc2626,
  },
  'yellow-turban-archer': {
    id: 'yellow-turban-archer', name: 'Khăn Vàng Cung Binh', category: 'archer', maxHp: 52, moveSpeed: 64, cityDamage: 1, color: 0x7c3aed,
  },
  'yellow-turban-brute': {
    id: 'yellow-turban-brute', name: 'Khăn Vàng Lực Sĩ', category: 'other', maxHp: 130, moveSpeed: 38, cityDamage: 2, color: 0xf97316,
  },
}
