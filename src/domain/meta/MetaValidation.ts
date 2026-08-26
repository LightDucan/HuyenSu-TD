import {
  META_SAVE_SCHEMA_VERSION,
  META_SAVE_SCHEMA_VERSION_V1,
  META_SAVE_SCHEMA_VERSION_V2,
  PLAYER_PROFILE_SCHEMA_VERSION,
  type CommandEnergyState,
  type InventoryState,
  type MetaSaveV1,
  type MetaSaveV2,
  type MetaSaveV3,
  type MetaStateV1,
  type MetaStateV2,
  type MetaStateV3,
  type ActivePlayTimeProgress,
  type PlayerProfile,
  type RewardReceipt,
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
  if (actual.length !== sortedExpected.length || actual.some((key, index) => key !== sortedExpected[index])) issues.push(`${path} contains unknown or missing fields`)
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
  const ids = Object.keys(value.balances).sort()
  if (ids.length !== 2 || ids[0] !== 'gold' || ids[1] !== 'knb') issues.push('wallet must contain exactly gold and knb')
  if (!isNonNegativeSafeInteger(value.balances.gold)) issues.push('wallet gold must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.balances.knb)) issues.push('wallet knb must be a non-negative safe integer')
  return value as WalletState
}

function validateInventory(value: unknown, issues: string[]): InventoryState | undefined {
  if (!isRecord(value)) { issues.push('inventory must be an object'); return undefined }
  validateExactKeys(value, ['consumables', 'equipmentInstanceIds'], 'inventory', issues)
  if (!isRecord(value.consumables)) issues.push('inventory.consumables must be an object')
  else Object.entries(value.consumables).forEach(([itemId, quantity]) => {
    if (itemId.trim().length === 0 || !isNonNegativeSafeInteger(quantity)) issues.push(`invalid consumable stack: ${itemId}`)
  })
  if (!Array.isArray(value.equipmentInstanceIds)) issues.push('equipment instance IDs must be an array')
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

function validateRewardReceipts(value: unknown, issues: string[]): Readonly<Record<string, RewardReceipt>> | undefined {
  if (!isRecord(value)) { issues.push('rewardReceipts must be an object'); return undefined }
  Object.entries(value).forEach(([key, receipt]) => {
    if (key.trim().length === 0 || !isRecord(receipt)) { issues.push(`invalid reward receipt: ${key}`); return }
    validateExactKeys(receipt, ['transactionFingerprint', 'committedAtMs'], `rewardReceipts.${key}`, issues)
    if (typeof receipt.transactionFingerprint !== 'string' || receipt.transactionFingerprint.length === 0) issues.push(`invalid reward receipt fingerprint: ${key}`)
    if (!isNonNegativeSafeInteger(receipt.committedAtMs)) issues.push(`invalid reward receipt timestamp: ${key}`)
  })
  return value as Readonly<Record<string, RewardReceipt>>
}

function validateActivePlayTime(value: unknown, issues: string[]): ActivePlayTimeProgress | undefined {
  if (!isRecord(value)) { issues.push('activePlayTime must be an object'); return undefined }
  validateExactKeys(value, ['observedVisibleMs', 'observedHiddenMs', 'remainderEligibleMs'], 'activePlayTime', issues)
  if (!isNonNegativeSafeInteger(value.observedVisibleMs)) issues.push('activePlayTime.observedVisibleMs must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.observedHiddenMs)) issues.push('activePlayTime.observedHiddenMs must be a non-negative safe integer')
  if (!isNonNegativeSafeInteger(value.remainderEligibleMs)) issues.push('activePlayTime.remainderEligibleMs must be a non-negative safe integer')
  return value as ActivePlayTimeProgress
}

export function validateMetaStateV1(value: unknown): ValidationResult<MetaStateV1> {
  if (!isRecord(value)) return { ok: false, issues: ['meta state must be an object'] }
  const issues: string[] = []
  validateExactKeys(value, ['profile', 'wallet', 'inventory', 'commandEnergy'], 'meta state', issues)
  validateProfile(value.profile, issues); validateWallet(value.wallet, issues); validateInventory(value.inventory, issues); validateCommandEnergy(value.commandEnergy, issues)
  return issues.length === 0 ? { ok: true, value: value as MetaStateV1 } : { ok: false, issues }
}

export function validateMetaStateV2(value: unknown): ValidationResult<MetaStateV2> {
  if (!isRecord(value)) return { ok: false, issues: ['meta state must be an object'] }
  const issues: string[] = []
  validateExactKeys(value, ['profile', 'wallet', 'inventory', 'commandEnergy', 'rewardReceipts'], 'meta state', issues)
  validateProfile(value.profile, issues); validateWallet(value.wallet, issues); validateInventory(value.inventory, issues); validateCommandEnergy(value.commandEnergy, issues); validateRewardReceipts(value.rewardReceipts, issues)
  return issues.length === 0 ? { ok: true, value: value as MetaStateV2 } : { ok: false, issues }
}

export function validateMetaState(value: unknown): ValidationResult<MetaStateV3> {
  if (!isRecord(value)) return { ok: false, issues: ['meta state must be an object'] }
  const issues: string[] = []
  validateExactKeys(value, ['profile', 'wallet', 'inventory', 'commandEnergy', 'rewardReceipts', 'activePlayTime'], 'meta state', issues)
  validateProfile(value.profile, issues); validateWallet(value.wallet, issues); validateInventory(value.inventory, issues); validateCommandEnergy(value.commandEnergy, issues); validateRewardReceipts(value.rewardReceipts, issues); validateActivePlayTime(value.activePlayTime, issues)
  return issues.length === 0 ? { ok: true, value: value as MetaStateV3 } : { ok: false, issues }
}

function validateEnvelope(value: unknown, version: number, issues: string[]): value is UnknownRecord {
  if (!isRecord(value)) { issues.push('meta save must be an object'); return false }
  validateExactKeys(value, ['schemaVersion', 'revision', 'updatedAtMs', 'data'], 'meta save', issues)
  if (value.schemaVersion !== version) issues.push(`schemaVersion must be ${version}`)
  if (!isNonNegativeSafeInteger(value.revision) || value.revision < 1) issues.push('revision must be a positive safe integer')
  if (!isNonNegativeSafeInteger(value.updatedAtMs)) issues.push('updatedAtMs must be a non-negative safe integer')
  return true
}

export function validateMetaSaveV1(value: unknown): ValidationResult<MetaSaveV1> {
  const issues: string[] = []
  if (!validateEnvelope(value, META_SAVE_SCHEMA_VERSION_V1, issues)) return { ok: false, issues }
  const state = validateMetaStateV1(value.data)
  if (!state.ok) issues.push(...state.issues)
  return issues.length === 0 ? { ok: true, value: value as MetaSaveV1 } : { ok: false, issues }
}

export function validateMetaSaveV2(value: unknown): ValidationResult<MetaSaveV2> {
  const issues: string[] = []
  if (!validateEnvelope(value, META_SAVE_SCHEMA_VERSION_V2, issues)) return { ok: false, issues }
  const state = validateMetaStateV2(value.data)
  if (!state.ok) issues.push(...state.issues)
  return issues.length === 0 ? { ok: true, value: value as MetaSaveV2 } : { ok: false, issues }
}

export function validateMetaSave(value: unknown): ValidationResult<MetaSaveV3> {
  const issues: string[] = []
  if (!validateEnvelope(value, META_SAVE_SCHEMA_VERSION, issues)) return { ok: false, issues }
  const state = validateMetaState(value.data)
  if (!state.ok) issues.push(...state.issues)
  return issues.length === 0 ? { ok: true, value: value as MetaSaveV3 } : { ok: false, issues }
}

export function readSchemaVersion(value: unknown): number | undefined {
  return isRecord(value) && typeof value.schemaVersion === 'number' ? value.schemaVersion : undefined
}
