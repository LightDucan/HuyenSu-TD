import type { EquipmentDefinition } from '../../domain/equipment/EquipmentSystem'

export const equipmentDefinitions: Record<string, EquipmentDefinition> = {
  'green-dragon-blade': {
    id: 'green-dragon-blade',
    slot: 'weapon',
    name: 'Thanh Long Yển Nguyệt Đao',
    modifiers: { atk: 12, range: 8 },
  },
  'swift-jade': {
    id: 'swift-jade',
    slot: 'gem',
    name: 'Ngọc Tốc Chiến',
    modifiers: { attackSpeed: 0.15 },
  },
}
