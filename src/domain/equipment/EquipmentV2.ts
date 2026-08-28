import type { EquipmentInstance, HeroEquipmentLoadoutV2, MetaState } from '../meta/MetaState'
import type { StatModifier } from '../progression/StatCalculator'
import type { EquipmentSlot, EquipmentV2Definition } from './EquipmentSystem'

export const EQUIPMENT_MAX_LEVEL = 10
const ALLOWED_MODIFIER_KEYS = new Set(['atk', 'range', 'attackSpeed'])

export type EquipmentV2Operation =
  | Readonly<{ type: 'grant-instance'; instance: EquipmentInstance }>
  | Readonly<{ type: 'equip'; heroId: string; instanceId: string }>
  | Readonly<{ type: 'unequip'; heroId: string; slot: EquipmentSlot }>
  | Readonly<{ type: 'merge'; ingredientInstanceIds: readonly string[]; resultInstanceId: string }>
  | Readonly<{
      type: 'import-legacy'
      instances: readonly EquipmentInstance[]
      equippedByHero: Readonly<Record<string, HeroEquipmentLoadoutV2>>
    }>

export type EquipmentV2TransactionRequest = Readonly<{
  idempotencyKey: string
  operation: EquipmentV2Operation
}>

export type EquipmentV2TransactionResult =
  | Readonly<{ status: 'applied'; state: MetaState; affectedHeroIds: readonly string[] }>
  | Readonly<{ status: 'already-applied'; state: MetaState; affectedHeroIds: readonly string[] }>

function assertId(value: string, label: string): void {
  if (value.trim().length === 0) throw new Error(`${label} must not be empty`)
}

function validateModifiers(modifiers: StatModifier, label: string): void {
  const entries = Object.entries(modifiers)
  if (entries.length === 0) throw new Error(`${label} must provide at least one flat modifier`)
  for (const [stat, value] of entries) {
    if (!ALLOWED_MODIFIER_KEYS.has(stat) || typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
      throw new Error(`${label} has invalid flat modifier: ${stat}`)
    }
  }
}

export function validateEquipmentV2Definition(definition: EquipmentV2Definition): EquipmentV2Definition {
  assertId(definition.id, 'Equipment definition ID')
  assertId(definition.name, 'Equipment name')
  if (definition.slot !== 'weapon' && definition.slot !== 'gem') throw new Error('Equipment slot must be weapon or gem')
  if (definition.exclusiveHeroId !== undefined) {
    assertId(definition.exclusiveHeroId, 'Exclusive Hero ID')
    if (definition.slot !== 'weapon') throw new Error('Hero-exclusive equipment must be a weapon')
    if (definition.mergeable) throw new Error('Hero-exclusive weapon must not be mergeable')
    if (Object.keys(definition.levelModifiers).length !== 1 || definition.levelModifiers[1] === undefined) {
      throw new Error('Hero-exclusive weapon must have fixed Level 1 modifiers only')
    }
  } else {
    if (!definition.mergeable) throw new Error('Normal equipment must be mergeable')
    for (let level = 1; level <= EQUIPMENT_MAX_LEVEL; level += 1) {
      if (definition.levelModifiers[level] === undefined) throw new Error(`Normal equipment is missing Level ${level} modifiers`)
    }
  }
  Object.entries(definition.levelModifiers).forEach(([level, modifiers]) => {
    const numericLevel = Number(level)
    if (!Number.isSafeInteger(numericLevel) || numericLevel < 1 || numericLevel > EQUIPMENT_MAX_LEVEL) throw new Error(`Invalid equipment balance level: ${level}`)
    validateModifiers(modifiers, `${definition.id} Level ${level}`)
  })
  return definition
}

export function validateEquipmentInstance(
  instance: EquipmentInstance,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
): EquipmentInstance {
  assertId(instance.instanceId, 'Equipment instance ID')
  const definition = definitions[instance.definitionId]
  if (!definition) throw new Error(`Unknown equipment definition: ${instance.definitionId}`)
  validateEquipmentV2Definition(definition)
  if (instance.slot !== definition.slot) throw new Error('Equipment instance slot does not match its definition')
  if (!Number.isSafeInteger(instance.level) || instance.level < 1 || instance.level > EQUIPMENT_MAX_LEVEL) throw new Error('Equipment instance level must be 1–10')
  if (definition.exclusiveHeroId && instance.level !== 1) throw new Error('Hero-exclusive weapon cannot be leveled')
  if (definition.levelModifiers[instance.level] === undefined) throw new Error('Equipment instance level has no configured modifiers')
  return instance
}

export function resolveEquipmentInstanceModifiers(
  instance: EquipmentInstance | undefined,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
): StatModifier {
  if (!instance) return {}
  const valid = validateEquipmentInstance(instance, definitions)
  return { ...definitions[valid.definitionId].levelModifiers[valid.level] }
}

export function resolveHeroEquipmentV2(
  state: MetaState,
  heroId: string,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
): Readonly<{ loadout: HeroEquipmentLoadoutV2; weapon: StatModifier; gem: StatModifier }> {
  const loadout = state.inventory.equippedByHero[heroId] ?? {}
  const weapon = loadout.weaponInstanceId ? state.inventory.equipmentInstances[loadout.weaponInstanceId] : undefined
  const gem = loadout.gemInstanceId ? state.inventory.equipmentInstances[loadout.gemInstanceId] : undefined
  if (loadout.weaponInstanceId && (!weapon || weapon.slot !== 'weapon')) throw new Error('Equipped weapon instance is missing or invalid')
  if (loadout.gemInstanceId && (!gem || gem.slot !== 'gem')) throw new Error('Equipped gem instance is missing or invalid')
  return {
    loadout,
    weapon: resolveEquipmentInstanceModifiers(weapon, definitions),
    gem: resolveEquipmentInstanceModifiers(gem, definitions),
  }
}

function findEquippedHero(equippedByHero: Readonly<Record<string, HeroEquipmentLoadoutV2>>, instanceId: string): string | undefined {
  return Object.entries(equippedByHero).find(([, loadout]) => loadout.weaponInstanceId === instanceId || loadout.gemInstanceId === instanceId)?.[0]
}

function affectedHeroes(operation: EquipmentV2Operation): readonly string[] {
  if (operation.type === 'equip' || operation.type === 'unequip') return [operation.heroId]
  if (operation.type === 'import-legacy') return Object.keys(operation.equippedByHero).sort()
  return []
}

export function applyEquipmentV2Transaction(
  state: MetaState,
  request: EquipmentV2TransactionRequest,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
  committedAtMs: number,
): EquipmentV2TransactionResult {
  assertId(request.idempotencyKey, 'Idempotency key')
  if (!Number.isSafeInteger(committedAtMs) || committedAtMs < 0) throw new Error('Commit timestamp must be a non-negative safe integer')
  const fingerprint = JSON.stringify(request.operation)
  const priorReceipt = state.rewardReceipts[request.idempotencyKey]
  if (priorReceipt) {
    if (priorReceipt.transactionFingerprint !== fingerprint) throw new Error('Idempotency key was already used for a different transaction')
    return { status: 'already-applied', state, affectedHeroIds: affectedHeroes(request.operation) }
  }

  const equipmentInstances = { ...state.inventory.equipmentInstances }
  const equippedByHero: Record<string, HeroEquipmentLoadoutV2> = { ...state.inventory.equippedByHero }
  const operation = request.operation

  if (operation.type === 'grant-instance') {
    validateEquipmentInstance(operation.instance, definitions)
    if (equipmentInstances[operation.instance.instanceId]) throw new Error('Equipment instance ID already exists')
    equipmentInstances[operation.instance.instanceId] = operation.instance
  } else if (operation.type === 'equip') {
    assertId(operation.heroId, 'Hero ID')
    const instance = equipmentInstances[operation.instanceId]
    if (!instance) throw new Error('Unknown equipment instance')
    validateEquipmentInstance(instance, definitions)
    const definition = definitions[instance.definitionId]
    if (definition.exclusiveHeroId && definition.exclusiveHeroId !== operation.heroId) throw new Error('Hero-exclusive weapon cannot be equipped by this Hero')
    const owner = findEquippedHero(equippedByHero, instance.instanceId)
    if (owner && owner !== operation.heroId) throw new Error('Equipment instance is equipped by another Hero')
    const current = equippedByHero[operation.heroId] ?? {}
    equippedByHero[operation.heroId] = instance.slot === 'weapon'
      ? { ...current, weaponInstanceId: instance.instanceId }
      : { ...current, gemInstanceId: instance.instanceId }
  } else if (operation.type === 'unequip') {
    assertId(operation.heroId, 'Hero ID')
    const current = equippedByHero[operation.heroId] ?? {}
    const next = operation.slot === 'weapon'
      ? { ...current, weaponInstanceId: undefined }
      : { ...current, gemInstanceId: undefined }
    equippedByHero[operation.heroId] = next
  } else if (operation.type === 'merge') {
    if (operation.ingredientInstanceIds.length !== 3) throw new Error('Equipment merge requires exactly three instances')
    if (new Set(operation.ingredientInstanceIds).size !== 3) throw new Error('Equipment merge requires three distinct instance IDs')
    assertId(operation.resultInstanceId, 'Merged equipment instance ID')
    if (equipmentInstances[operation.resultInstanceId]) throw new Error('Merged equipment instance ID already exists')
    const ingredients = operation.ingredientInstanceIds.map((instanceId) => {
      const instance = equipmentInstances[instanceId]
      if (!instance) throw new Error(`Unknown merge ingredient: ${instanceId}`)
      validateEquipmentInstance(instance, definitions)
      if (findEquippedHero(equippedByHero, instanceId)) throw new Error('Equipped equipment cannot be consumed by merge')
      return instance
    })
    const [first] = ingredients
    if (ingredients.some((instance) => instance.definitionId !== first.definitionId)) throw new Error('Merge ingredients must share the same definition')
    if (ingredients.some((instance) => instance.level !== first.level)) throw new Error('Merge ingredients must share the same level')
    const definition = definitions[first.definitionId]
    if (!definition.mergeable || definition.exclusiveHeroId) throw new Error('Hero-exclusive equipment cannot be merged')
    if (first.level >= EQUIPMENT_MAX_LEVEL) throw new Error('Level 10 equipment cannot be merged higher')
    operation.ingredientInstanceIds.forEach((instanceId) => { delete equipmentInstances[instanceId] })
    equipmentInstances[operation.resultInstanceId] = {
      instanceId: operation.resultInstanceId,
      definitionId: first.definitionId,
      slot: first.slot,
      level: first.level + 1,
    }
  } else if (operation.type === 'import-legacy') {
    operation.instances.forEach((instance) => {
      validateEquipmentInstance(instance, definitions)
      const existing = equipmentInstances[instance.instanceId]
      if (existing && JSON.stringify(existing) !== JSON.stringify(instance)) throw new Error('Legacy equipment instance collides with existing data')
      equipmentInstances[instance.instanceId] = instance
    })
    Object.entries(operation.equippedByHero).forEach(([heroId, loadout]) => {
      assertId(heroId, 'Legacy equipment Hero ID')
      for (const instanceId of [loadout.weaponInstanceId, loadout.gemInstanceId]) {
        if (instanceId && !equipmentInstances[instanceId]) throw new Error('Legacy loadout references an unknown imported instance')
      }
      equippedByHero[heroId] = { ...loadout }
    })
  } else {
    const unsupported: never = operation
    throw new Error(`Unsupported Equipment V2 operation: ${String(unsupported)}`)
  }

  return {
    status: 'applied',
    affectedHeroIds: affectedHeroes(operation),
    state: {
      ...state,
      profile: { ...state.profile, updatedAtMs: committedAtMs },
      inventory: { ...state.inventory, equipmentInstances, equippedByHero },
      rewardReceipts: {
        ...state.rewardReceipts,
        [request.idempotencyKey]: { transactionFingerprint: fingerprint, committedAtMs },
      },
    },
  }
}

