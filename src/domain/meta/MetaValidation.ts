import {
  META_SAVE_SCHEMA_VERSION,
  PLAYER_PROFILE_SCHEMA_VERSION,
  type CommandEnergyState,
  type InventoryState,
  type MetaSaveV1,
  type MetaStateV1,
  type PlayerProfile,
  type WalletState,
} from './MetaState'

export type ValidationResult<T> =
  | Readonly<{ ok: true; value: T }>
  | Readonly<{ ok: false; issues: readonly string[] }>

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonNegativeSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
}

function validateExactKeys(value: UnknownRecord, expected: readonly string[], path: string, issues: string[]): void {
  const actual = Object.keys(value).sort()
  const sortedExpected = [...expected].sort()
  if (actual.length !== sortedExpected.length || actual.some((key, index) => key !== sortedExpected[index])) {
    issues.push(`${path} contains unknown or missing fields`)
  }
}

function validateProfile(value: unknown, issues: string[]): PlayerProfile | undefined {
  if (!isRecord(value)) { issues.push('profile must be an object'); return undefined }
  validateExactKeys(value, ['schemaVersion', 'playerId', 'playerLevel', 'playerExp', 'createdAtMs', 'updatedAtMs', 'summonOrderCount'], 'profile', issues)
  if (value.schemaVersion !== PLAYER_PROFILE_SCHEMA_VERSION) issues.push(`profile.schemaVersion must be ${PLAYER_PROFILE_SCHEMA_VERSION}`)
  if (typeof value.playerId !== 'string' || value.playerId.trim().length === 0) issues.push('profile.playerId must not be empty')
  if (!isNonNegativeSafeInteger(value.playerLevel) || value.playerLevel < 1) issues.push('profile.playerLevel must be at least 1')
  if (!isNonNegativeSafeInteger(value.playerExp)) issues.push('profile.playerExp must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.createdAtMs)) issues.push('profile.createdAtMs must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.updatedAtMs)) issues.push('profile.updatedAtMs must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.summonOrderCount)) issues.push('profile.summonOrderCount must be a non-negative safe integer')
  return value as PlayerProfile
}

function validateWallet(value: unknown, issues: string[]): WalletState | undefined {
  if (!isRecord(value) || !isRecord(value.balances)) { issues.push('wallet.balances must be an object'); return undefined }
  validateExactKeys(value, ['balances'], 'wallet', issues)
  const currencyIds = Object.keys(value.balances).sort()
  if (currencyIds.length !== 2 || currencyIds[0] !== 'gold' || currencyIds[1] !== 'knb') {
    issues.push('wallet must contain exactly gold and knb')
  }
  if (!isNonNegativeSafeInteger(value.balances.gold)) issues.push('wallet gold must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.balances.knb)) issues.push('wallet knb must be a non-negative safe integer')
  return value as WalletState
}

function validateInventory(value: unknown, issues: string[]): InventoryState | undefined {
  if (!isRecord(value)) { issues.push('inventory must be an object'); return undefined }
  validateExactKeys(value, ['consumables', 'equipmentInstanceIds'], 'inventory', issues)
  if (!isRecord(value.consumables)) issues.push('inventory.consumables must be an object')
  else {
    Object.entries(value.consumables).forEach(([itemId, quantity]) => {
      if (itemId.trim().length === 0 || !isNonNegativeSafeInteger(quantity)) issues.push(`invalid consumable stack: ${itemId}`)
    })
  }
  if (!Array.isArray(value.equipmentInstanceIds)) issues.push('inventory.equipmentInstanceIds must be an array')
  else {
    const ids = value.equipmentInstanceIds
    if (ids.some((id) => typeof id !== 'string' || id.trim().length === 0)) issues.push('equipment instance IDs must be non-empty strings')
    if (new Set(ids).size !== ids.length) issues.push('equipment instance IDs must be unique')
  }
  return value as InventoryState
}

function validateCommandEnergy(value: unknown, issues: string[]): CommandEnergyState | undefined {
  if (!isRecord(value)) { issues.push('commandEnergy must be an object'); return undefined }
  validateExactKeys(value, ['current', 'regenAnchorAtMs'], 'commandEnergy', issues)
  if (!isNonNegativeSafeInteger(value.current)) issues.push('commandEnergy.current must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.regenAnchorAtMs)) issues.push('commandEnergy.regenAnchorAtMs must be a non-negative safe integer')
  return value as CommandEnergyState
}

export function validateMetaState(value: unknown): ValidationResult<MetaStateV1> {
  if (!isRecord(value)) return { ok: false, issues: ['meta state must be an object'] }
  const issues: string[] = []
  validateExactKeys(value, ['profile', 'wallet', 'inventory', 'commandEnergy'], 'meta state', issues)
  validateProfile(value.profile, issues)
  validateWallet(value.wallet, issues)
  validateInventory(value.inventory, issues)
  validateCommandEnergy(value.commandEnergy, issues)
  return issues.length === 0
    ? { ok: true, value: value as MetaStateV1 }
    : { ok: false, issues }
}

export function validateMetaSave(value: unknown): ValidationResult<MetaSaveV1> {
  if (!isRecord(value)) return { ok: false, issues: ['meta save must be an object'] }
  const issues: string[] = []
  validateExactKeys(value, ['schemaVersion', 'revision', 'updatedAtMs', 'data'], 'meta save', issues)
  if (value.schemaVersion !== META_SAVE_SCHEMA_VERSION) issues.push(`schemaVersion must be ${META_SAVE_SCHEMA_VERSION}`)
  if (!isNonNegativeSafeInteger(value.revision) || value.revision < 1) issues.push('revision must be a positive safe integer')
  if (!isNonNegativeSafeInteger(value.updatedAtMs)) issues.push('updatedAtMs must be a non-negative safe integer')
  const stateResult = validateMetaState(value.data)
  if (!stateResult.ok) issues.push(...stateResult.issues)
  return issues.length === 0
    ? { ok: true, value: value as MetaSaveV1 }
    : { ok: false, issues }
}

export function readSchemaVersion(value: unknown): number | undefined {
  return isRecord(value) && typeof value.schemaVersion === 'number' ? value.schemaVersion : undefined
}
