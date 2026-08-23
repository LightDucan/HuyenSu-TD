import type { StatModifier } from '../progression/StatCalculator'

export type EquipmentSlot = 'weapon' | 'gem'

export type EquipmentDefinition = Readonly<{
  id: string
  slot: EquipmentSlot
  name: string
  modifiers: StatModifier
}>

export type HeroEquipment = Readonly<{
  weaponId?: string
  gemId?: string
}>

export function resolveEquipmentModifiers(
  equipment: HeroEquipment,
  definitions: Readonly<Record<string, EquipmentDefinition>>,
): Readonly<{ weapon: StatModifier; gem: StatModifier }> {
  const weapon = equipment.weaponId ? definitions[equipment.weaponId] : undefined
  const gem = equipment.gemId ? definitions[equipment.gemId] : undefined

  if (weapon && weapon.slot !== 'weapon') throw new Error('Weapon slot must use a weapon definition')
  if (gem && gem.slot !== 'gem') throw new Error('Gem slot must use a gem definition')

  return { weapon: weapon?.modifiers ?? {}, gem: gem?.modifiers ?? {} }
}
