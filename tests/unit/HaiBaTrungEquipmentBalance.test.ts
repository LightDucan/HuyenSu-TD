import { describe, expect, it } from 'vitest'
import { ACTIVE_HBT_EQUIPMENT_IDS, haiBaTrungEquipmentV2Definitions } from '../../src/data/equipment/definitions'
import { balanceV1, type BalanceV1 } from '../../src/data/economy/balanceV1'
import { simulateEconomy } from '../../src/simulation/EconomySimulation'
import { applyEquipmentV2Transaction } from '../../src/domain/equipment/EquipmentV2'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'

function withGachaWeights(weights: Readonly<Record<string, number>>): BalanceV1 {
  return { ...balanceV1, gacha: { ...balanceV1.gacha, weights } } as BalanceV1
}

function mergeState(definitionId: string, slot: 'weapon' | 'gem') {
  const state = createInitialMetaState('merge-test', 0)
  const instances = Object.fromEntries([1, 2, 3].map((index) => [`i${index}`, {
    instanceId: `i${index}`, definitionId, slot, level: 1,
  }]))
  return { ...state, inventory: { ...state.inventory, equipmentInstances: instances } }
}

describe('VS-HBT-C02 shared equipment balance aliases', () => {
  it('exposes active and legacy IDs over identical shared Lv1–10 tables', () => {
    const tables = balanceV1.equipment.tables
    expect(tables['lac-viet-bronze-sword']).toBeDefined()
    expect(tables['lac-viet-swift-jade']).toBeDefined()
    expect(tables['green-dragon-blade']).toBe(tables['lac-viet-bronze-sword'])
    expect(tables['swift-jade']).toBe(tables['lac-viet-swift-jade'])
    expect(haiBaTrungEquipmentV2Definitions['lac-viet-bronze-sword'].levelModifiers).toBe(tables['lac-viet-bronze-sword'].levels)
    expect(haiBaTrungEquipmentV2Definitions['lac-viet-swift-jade'].levelModifiers).toBe(tables['lac-viet-swift-jade'].levels)
  })

  it('accounts active equipment from weapon-heavy and gem-heavy simulations', () => {
    const weaponConfig = withGachaWeights({ gold: 0, weapon: 100, gem: 0, smallBinhPhu: 0, mediumBinhPhu: 0, largeBinhPhu: 0 })
    const gemConfig = withGachaWeights({ gold: 0, weapon: 0, gem: 100, smallBinhPhu: 0, mediumBinhPhu: 0, largeBinhPhu: 0 })
    const weapon = simulateEconomy('casual', 30, 1, weaponConfig)
    const gem = simulateEconomy('casual', 30, 1, gemConfig)
    expect(weapon.weaponAcquired).toBeGreaterThan(0)
    expect(weapon.highestWeaponLevel).toBeGreaterThanOrEqual(1)
    expect(weapon.equipmentInstancesRemaining).toBeGreaterThan(0)
    expect(gem.gemAcquired).toBeGreaterThan(0)
    expect(gem.highestGemLevel).toBeGreaterThanOrEqual(1)
    expect(gem.equipmentInstancesRemaining).toBeGreaterThan(0)
  })

  it('merges active weapon and gem identities without changing merge rules', () => {
    const weapon = applyEquipmentV2Transaction(mergeState(ACTIVE_HBT_EQUIPMENT_IDS[0], 'weapon'), {
      idempotencyKey: 'merge-weapon', operation: { type: 'merge', ingredientInstanceIds: ['i1', 'i2', 'i3'], resultInstanceId: 'weapon-lv2' },
    }, haiBaTrungEquipmentV2Definitions, 1)
    expect(weapon.state.inventory.equipmentInstances).toEqual({ 'weapon-lv2': { instanceId: 'weapon-lv2', definitionId: ACTIVE_HBT_EQUIPMENT_IDS[0], slot: 'weapon', level: 2 } })
    const gem = applyEquipmentV2Transaction(mergeState(ACTIVE_HBT_EQUIPMENT_IDS[1], 'gem'), {
      idempotencyKey: 'merge-gem', operation: { type: 'merge', ingredientInstanceIds: ['i1', 'i2', 'i3'], resultInstanceId: 'gem-lv2' },
    }, haiBaTrungEquipmentV2Definitions, 1)
    expect(gem.state.inventory.equipmentInstances['gem-lv2']?.level).toBe(2)
    expect(Object.keys(haiBaTrungEquipmentV2Definitions[ACTIVE_HBT_EQUIPMENT_IDS[0]].levelModifiers)).toHaveLength(10)
    expect(() => applyEquipmentV2Transaction({ ...mergeState(ACTIVE_HBT_EQUIPMENT_IDS[0], 'weapon'), inventory: { ...mergeState(ACTIVE_HBT_EQUIPMENT_IDS[0], 'weapon').inventory, equipmentInstances: { i1: { instanceId: 'i1', definitionId: ACTIVE_HBT_EQUIPMENT_IDS[0], slot: 'weapon', level: 10 }, i2: { instanceId: 'i2', definitionId: ACTIVE_HBT_EQUIPMENT_IDS[0], slot: 'weapon', level: 10 }, i3: { instanceId: 'i3', definitionId: ACTIVE_HBT_EQUIPMENT_IDS[0], slot: 'weapon', level: 10 } } } }, { idempotencyKey: 'merge-lv10', operation: { type: 'merge', ingredientInstanceIds: ['i1', 'i2', 'i3'], resultInstanceId: 'lv11' } }, haiBaTrungEquipmentV2Definitions, 1)).toThrow('Level 10')
  })

  it('keeps fresh Gacha equipment rewards free of legacy IDs', () => {
    const generated = haiBaTrungEquipmentV2Definitions
    expect(ACTIVE_HBT_EQUIPMENT_IDS).not.toContain('green-dragon-blade')
    expect(ACTIVE_HBT_EQUIPMENT_IDS).not.toContain('swift-jade')
    expect(generated['green-dragon-blade']).toBeDefined()
  })
})
