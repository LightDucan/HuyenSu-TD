import { describe, expect, it } from 'vitest'
import { canApplyEquipmentOperationForScreen } from '../../src/ui/MetaTabState'

describe('screen-aware equipment policy', () => {
  it('allows city operations regardless of stale battle status', () => {
    expect(canApplyEquipmentOperationForScreen('city', 'running', 'equip')).toBe(true)
    expect(canApplyEquipmentOperationForScreen('city', 'running', 'unequip')).toBe(true)
  })
  it('locks equip only during running battle and keeps merge allowed', () => {
    expect(canApplyEquipmentOperationForScreen('battle', 'running', 'equip')).toBe(false)
    expect(canApplyEquipmentOperationForScreen('battle', 'running', 'unequip')).toBe(false)
    expect(canApplyEquipmentOperationForScreen('battle', 'running', 'merge')).toBe(true)
  })
})
