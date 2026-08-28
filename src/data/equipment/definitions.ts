import type { EquipmentDefinition, EquipmentV2Definition } from '../../domain/equipment/EquipmentSystem'
import { balanceV1 } from '../economy/balanceV1'

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

const equipmentTable = balanceV1.equipment.tables
export const prototypeEquipmentV2Definitions: Readonly<Record<string, EquipmentV2Definition>> = {
  'green-dragon-blade': {
    id: 'green-dragon-blade',
    slot: 'weapon',
    name: 'Thanh Long Yển Nguyệt Đao',
    mergeable: true,
    levelModifiers: equipmentTable['green-dragon-blade'].levels,
  },
  'swift-jade': {
    id: 'swift-jade',
    slot: 'gem',
    name: 'Ngọc Tốc Chiến',
    mergeable: true,
    levelModifiers: equipmentTable['swift-jade'].levels,
  },
}
