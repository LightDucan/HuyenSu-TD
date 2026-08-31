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
  'wu-sword-infantry': { id: 'wu-sword-infantry', name: 'Đông Ngô Đao Binh', category: 'sword', maxHp: 92, moveSpeed: 49, cityDamage: 1, color: 0xb45309 },
  'wu-crossbow-soldier': { id: 'wu-crossbow-soldier', name: 'Đông Ngô Nỏ Thủ', category: 'archer', maxHp: 66, moveSpeed: 61, cityDamage: 1, color: 0x7c2d12 },
  'wu-armored-guard': { id: 'wu-armored-guard', name: 'Đông Ngô Giáp Binh', category: 'other', maxHp: 165, moveSpeed: 35, cityDamage: 2, color: 0x57534e },
  'wu-field-commander': { id: 'wu-field-commander', name: 'Đông Ngô Đốc Chiến Quan', category: 'other', maxHp: 950, moveSpeed: 37, cityDamage: 8, color: 0x78350f },
}
