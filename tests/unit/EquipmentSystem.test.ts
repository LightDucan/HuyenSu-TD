import { describe, expect, it } from 'vitest'
import { equipmentDefinitions } from '../../src/data/equipment/definitions'
import { resolveEquipmentModifiers } from '../../src/domain/equipment/EquipmentSystem'
import { EQUIPMENT_STORAGE_KEY, loadEquipment, saveHeroEquipment } from '../../src/domain/equipment/EquipmentStorage'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'

describe('EquipmentSystem', () => {
  it('resolves only one weapon and one gem modifier set', () => {
    expect(resolveEquipmentModifiers({ weaponId: 'green-dragon-blade', gemId: 'swift-jade' }, equipmentDefinitions))
      .toEqual({ weapon: { atk: 12, range: 8 }, gem: { attackSpeed: 0.15 } })
  })

  it('rejects equipment placed in the wrong slot', () => {
    expect(() => resolveEquipmentModifiers({ weaponId: 'swift-jade' }, equipmentDefinitions)).toThrow('Weapon slot')
  })

  it('persists locally and recovers from invalid saves', () => {
    const values = new Map<string, string>()
    const storage: StorageLike = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) } }
    saveHeroEquipment(storage, 'quan-vu', { weaponId: 'green-dragon-blade' })
    expect(loadEquipment(storage).heroes['quan-vu']).toEqual({ weaponId: 'green-dragon-blade' })
    values.set(EQUIPMENT_STORAGE_KEY, '{bad-json')
    expect(loadEquipment(storage)).toEqual({ version: 1, heroes: {} })
  })
})
