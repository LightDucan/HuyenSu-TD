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
