export const META_SAVE_SCHEMA_VERSION = 1 as const
export const PLAYER_PROFILE_SCHEMA_VERSION = 1 as const
export const COMMAND_ENERGY_BASE_CAP = 60 as const
export const BASE_DEPLOYMENT_CAPACITY = 7 as const
export const CAPACITY_PER_SUMMON_ORDER = 1 as const

export type CurrencyId = 'gold' | 'knb'

export type PlayerProfile = Readonly<{
  schemaVersion: typeof PLAYER_PROFILE_SCHEMA_VERSION
  playerId: string
  playerLevel: number
  playerExp: number
  createdAtMs: number
  updatedAtMs: number
  summonOrderCount: number
}>

export type WalletState = Readonly<{
  balances: Readonly<Record<CurrencyId, number>>
}>

export type InventoryState = Readonly<{
  consumables: Readonly<Record<string, number>>
  equipmentInstanceIds: readonly string[]
}>

export type CommandEnergyState = Readonly<{
  current: number
  regenAnchorAtMs: number
}>

export type DeploymentEntitlementState = Readonly<{
  summonOrderCount: number
}>

export type MetaStateV1 = Readonly<{
  profile: PlayerProfile
  wallet: WalletState
  inventory: InventoryState
  commandEnergy: CommandEnergyState
}>

export type MetaSaveV1 = Readonly<{
  schemaVersion: typeof META_SAVE_SCHEMA_VERSION
  revision: number
  updatedAtMs: number
  data: MetaStateV1
}>

export function createInitialMetaState(playerId: string, nowMs: number): MetaStateV1 {
  if (playerId.trim().length === 0) throw new Error('Player ID must not be empty')
  if (!Number.isSafeInteger(nowMs) || nowMs < 0) throw new Error('Initial timestamp must be a non-negative safe integer')

  return {
    profile: {
      schemaVersion: PLAYER_PROFILE_SCHEMA_VERSION,
      playerId,
      playerLevel: 1,
      playerExp: 0,
      createdAtMs: nowMs,
      updatedAtMs: nowMs,
      summonOrderCount: 0,
    },
    wallet: { balances: { gold: 0, knb: 0 } },
    inventory: { consumables: {}, equipmentInstanceIds: [] },
    commandEnergy: { current: COMMAND_ENERGY_BASE_CAP, regenAnchorAtMs: nowMs },
  }
}

export function selectDeploymentEntitlement(profile: PlayerProfile): DeploymentEntitlementState {
  return { summonOrderCount: profile.summonOrderCount }
}
