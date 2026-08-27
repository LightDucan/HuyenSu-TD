import type { EquipmentDefinition, EquipmentV2Definition } from '../../domain/equipment/EquipmentSystem'

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

// PROTOTYPE / NON-FINAL BALANCE CONFIG. Phase 18 owns final Lv1–10 values.
export const prototypeEquipmentV2Definitions: Readonly<Record<string, EquipmentV2Definition>> = {
  'green-dragon-blade': {
    id: 'green-dragon-blade',
    slot: 'weapon',
    name: 'Thanh Long Yển Nguyệt Đao',
    mergeable: true,
    levelModifiers: {
      1: { atk: 12, range: 8 }, 2: { atk: 15, range: 9 }, 3: { atk: 18, range: 10 },
      4: { atk: 21, range: 11 }, 5: { atk: 24, range: 12 }, 6: { atk: 27, range: 13 },
      7: { atk: 30, range: 14 }, 8: { atk: 33, range: 15 }, 9: { atk: 36, range: 16 },
      10: { atk: 40, range: 18 },
    },
  },
  'swift-jade': {
    id: 'swift-jade',
    slot: 'gem',
    name: 'Ngọc Tốc Chiến',
    mergeable: true,
    levelModifiers: {
      1: { attackSpeed: 0.15 }, 2: { attackSpeed: 0.18 }, 3: { attackSpeed: 0.21 },
      4: { attackSpeed: 0.24 }, 5: { attackSpeed: 0.27 }, 6: { attackSpeed: 0.3 },
      7: { attackSpeed: 0.33 }, 8: { attackSpeed: 0.36 }, 9: { attackSpeed: 0.39 },
      10: { attackSpeed: 0.45 },
    },
  },
}
