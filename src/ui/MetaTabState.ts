export type MetaTab = 'roster' | 'inventory'
export type EquipmentCombatOperation = 'equip' | 'unequip' | 'merge' | 'grant-instance' | 'import-legacy'

export function selectMetaTab(_current: MetaTab, requested: MetaTab): MetaTab {
  return requested
}

export function isEquipmentInteractionLocked(waveStatus: 'waiting' | 'running' | 'won'): boolean {
  return waveStatus === 'running'
}

export function canApplyEquipmentOperation(
  waveStatus: 'waiting' | 'running' | 'won',
  operation: EquipmentCombatOperation,
): boolean {
  return operation === 'merge' || !isEquipmentInteractionLocked(waveStatus)
}
