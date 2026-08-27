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

export type EquipmentV2Definition = Readonly<{
  id: string
  slot: EquipmentSlot
  name: string
  levelModifiers: Readonly<Record<number, StatModifier>>
  mergeable: boolean
  exclusiveHeroId?: string
}>

const EQUIPMENT_MODIFIER_KEYS = new Set(['atk', 'range', 'attackSpeed'])

export function validateEquipmentDefinition(definition: EquipmentDefinition): EquipmentDefinition {
  const entries = Object.entries(definition.modifiers)
  if (entries.length === 0) throw new Error('Equipment must provide at least one modifier')
  for (const [stat, value] of entries) {
    if (!EQUIPMENT_MODIFIER_KEYS.has(stat) || typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
      throw new Error(`Invalid equipment modifier: ${stat}`)
    }
  }
  return definition
}

export function resolveEquipmentModifiers(
  equipment: HeroEquipment,
  definitions: Readonly<Record<string, EquipmentDefinition>>,
): Readonly<{ weapon: StatModifier; gem: StatModifier }> {
  const weapon = equipment.weaponId ? definitions[equipment.weaponId] : undefined
  const gem = equipment.gemId ? definitions[equipment.gemId] : undefined

  if (equipment.weaponId && !weapon) throw new Error('Unknown weapon definition')
  if (equipment.gemId && !gem) throw new Error('Unknown gem definition')
  if (weapon && weapon.slot !== 'weapon') throw new Error('Weapon slot must use a weapon definition')
  if (gem && gem.slot !== 'gem') throw new Error('Gem slot must use a gem definition')

  if (weapon) validateEquipmentDefinition(weapon)
  if (gem) validateEquipmentDefinition(gem)

  return { weapon: weapon?.modifiers ?? {}, gem: gem?.modifiers ?? {} }
}
