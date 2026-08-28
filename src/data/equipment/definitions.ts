import type { EquipmentDefinition, EquipmentV2Definition } from '../../domain/equipment/EquipmentSystem'
import { balanceV1 } from '../economy/balanceV1'

const equipmentTable = balanceV1.equipment.tables

export const equipmentDefinitions: Record<string, EquipmentDefinition> = {
  'lac-viet-bronze-sword': { id: 'lac-viet-bronze-sword', slot: 'weapon', name: 'Gươm Đồng Lạc Việt', modifiers: equipmentTable['lac-viet-bronze-sword'].levels[1] },
  'lac-viet-swift-jade': { id: 'lac-viet-swift-jade', slot: 'gem', name: 'Ngọc Tốc Chiến', modifiers: equipmentTable['lac-viet-swift-jade'].levels[1] },
  'green-dragon-blade': {
    id: 'green-dragon-blade',
    slot: 'weapon',
    name: 'Thanh Long Yển Nguyệt Đao',
    modifiers: equipmentTable['green-dragon-blade'].levels[1],
  },
  'swift-jade': {
    id: 'swift-jade',
    slot: 'gem',
    name: 'Ngọc Tốc Chiến',
    modifiers: equipmentTable['swift-jade'].levels[1],
  },
}

export const haiBaTrungEquipmentV2Definitions: Readonly<Record<string, EquipmentV2Definition>> = {
  'lac-viet-bronze-sword': { id: 'lac-viet-bronze-sword', slot: 'weapon', name: 'Gươm Đồng Lạc Việt', mergeable: true, levelModifiers: equipmentTable['green-dragon-blade'].levels },
  'lac-viet-swift-jade': { id: 'lac-viet-swift-jade', slot: 'gem', name: 'Ngọc Tốc Chiến', mergeable: true, levelModifiers: equipmentTable['swift-jade'].levels },
  'green-dragon-blade': {
    id: 'green-dragon-blade',
    slot: 'weapon',
    name: 'Thanh Long Yển Nguyệt Đao',
    mergeable: true,
    levelModifiers: equipmentTable['lac-viet-bronze-sword'].levels,
  },
  'swift-jade': {
    id: 'swift-jade',
    slot: 'gem',
    name: 'Ngọc Tốc Chiến',
    mergeable: true,
    levelModifiers: equipmentTable['lac-viet-swift-jade'].levels,
  },
}

export const ACTIVE_HBT_EQUIPMENT_IDS = ['lac-viet-bronze-sword', 'lac-viet-swift-jade'] as const
export const prototypeEquipmentV2Definitions = haiBaTrungEquipmentV2Definitions
