import type { StorageLike } from '../progression/ProgressionStorage'
import { migrateMetaSaveV1ToV2, migrateMetaSaveV2ToV3, migrateMetaSaveV3ToV4, migrateMetaSaveV4ToV5, migrateMetaSaveV5ToV6 } from './MetaMigration'
import { META_SAVE_SCHEMA_VERSION, META_SAVE_SCHEMA_VERSION_V1, META_SAVE_SCHEMA_VERSION_V2, META_SAVE_SCHEMA_VERSION_V3, META_SAVE_SCHEMA_VERSION_V4, META_SAVE_SCHEMA_VERSION_V5, type MetaSave, type MetaState } from './MetaState'
import { readSchemaVersion, validateMetaSave, validateMetaState } from './MetaValidation'
import { applyRewardTransaction, type RewardTransactionRequest } from './RewardTransaction'
import { grantCommandEnergy, resolveCommandEnergyRegen, spendCommandEnergy } from './CommandEnergy'
import { applyEquipmentV2Transaction, type EquipmentV2TransactionRequest } from '../equipment/EquipmentV2'
import type { EquipmentV2Definition } from '../equipment/EquipmentSystem'
import { applyEconomyTransaction, type EconomyTransactionRequest } from './EconomyTransaction'
import { applyHeroMetaTransaction, type HeroMetaCommit, type HeroMetaOperation } from './HeroMetaTransaction'
import type { RecruitmentConfig } from './HeroRecruitment'

export const META_STORAGE_KEY = 'huyen-su-td/meta-v1'

export type MetaLoadResult =
  | Readonly<{ status: 'empty' }>
  | Readonly<{ status: 'loaded'; save: MetaSave }>
  | Readonly<{ status: 'invalid'; raw: string; issues: readonly string[] }>
  | Readonly<{ status: 'migration-required'; raw: string; sourceVersion: number }>

export type RewardTransactionCommit =
  | Readonly<{ status: 'applied'; save: MetaSave }>
  | Readonly<{ status: 'already-applied'; save: MetaSave }>

export type CommandEnergyCommit =
  | Readonly<{ status: 'resolved' | 'spent' | 'granted'; save: MetaSave }>
  | Readonly<{ status: 'unchanged' | 'insufficient' | 'invalid-clock'; save: MetaSave }>

export type EquipmentV2TransactionCommit =
  | Readonly<{ status: 'applied'; save: MetaSave; affectedHeroIds: readonly string[] }>
  | Readonly<{ status: 'already-applied'; save: MetaSave; affectedHeroIds: readonly string[] }>

export type EconomyTransactionCommit =
  | Readonly<{ status: 'applied'; save: MetaSave }>
  | Readonly<{ status: 'already-applied'; save: MetaSave }>

export class LocalMetaRepository {
  constructor(
    private readonly storage: StorageLike,
    private readonly onPersist?: (save: MetaSave) => void,
  ) {}

  load(): MetaLoadResult {
    const raw = this.storage.getItem(META_STORAGE_KEY)
    if (raw === null) return { status: 'empty' }
    let parsed: unknown
    try { parsed = JSON.parse(raw) } catch { return { status: 'invalid', raw, issues: ['meta save is not valid JSON'] } }
    const sourceVersion = readSchemaVersion(parsed)
    if (sourceVersion !== META_SAVE_SCHEMA_VERSION) return { status: 'migration-required', raw, sourceVersion: sourceVersion ?? -1 }
    const validation = validateMetaSave(parsed)
    return validation.ok ? { status: 'loaded', save: validation.value } : { status: 'invalid', raw, issues: validation.issues }
  }

  migrateV1(expectedRevision: number): MetaSave {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V1) throw new Error('Meta save does not require V1 migration')
    let parsed: unknown
    try { parsed = JSON.parse(current.raw) } catch { throw new Error('Meta V1 save is not valid JSON') }
    const v2 = migrateMetaSaveV1ToV2(parsed)
    if (!v2.ok) throw new Error(`Invalid Meta V1 save: ${v2.issues.join('; ')}`)
    const v3 = migrateMetaSaveV2ToV3(v2.value)
    if (!v3.ok) throw new Error(`Invalid intermediate Meta V2 save: ${v3.issues.join('; ')}`)
    const v4 = migrateMetaSaveV3ToV4(v3.value)
    if (!v4.ok) throw new Error(`Invalid intermediate Meta V3 save: ${v4.issues.join('; ')}`)
    const migratedV5 = migrateMetaSaveV4ToV5(v4.value, this.storage)
    const migrated = migratedV5.ok ? migrateMetaSaveV5ToV6(migratedV5.value) : migratedV5
    if (!migrated.ok) throw new Error(`Invalid Meta V4 or legacy progression save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.persist(migrated.value)
    return migrated.value
  }

  migrateV2(expectedRevision: number): MetaSave {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V2) throw new Error('Meta save does not require V2 migration')
    let parsed: unknown
    try { parsed = JSON.parse(current.raw) } catch { throw new Error('Meta V2 save is not valid JSON') }
    const v3 = migrateMetaSaveV2ToV3(parsed)
    if (!v3.ok) throw new Error(`Invalid Meta V2 save: ${v3.issues.join('; ')}`)
    const v4 = migrateMetaSaveV3ToV4(v3.value)
    if (!v4.ok) throw new Error(`Invalid intermediate Meta V3 save: ${v4.issues.join('; ')}`)
    const migratedV5 = migrateMetaSaveV4ToV5(v4.value, this.storage)
    const migrated = migratedV5.ok ? migrateMetaSaveV5ToV6(migratedV5.value) : migratedV5
    if (!migrated.ok) throw new Error(`Invalid Meta V4 or legacy progression save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.persist(migrated.value)
    return migrated.value
  }

  migrateV3(expectedRevision: number): MetaSave {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V3) throw new Error('Meta save does not require V3 migration')
    let parsed: unknown
    try { parsed = JSON.parse(current.raw) } catch { throw new Error('Meta V3 save is not valid JSON') }
    const v4 = migrateMetaSaveV3ToV4(parsed)
    if (!v4.ok) throw new Error(`Invalid Meta V3 save: ${v4.issues.join('; ')}`)
    const migratedV5 = migrateMetaSaveV4ToV5(v4.value, this.storage)
    const migrated = migratedV5.ok ? migrateMetaSaveV5ToV6(migratedV5.value) : migratedV5
    if (!migrated.ok) throw new Error(`Invalid Meta V4 or legacy progression save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.persist(migrated.value)
    return migrated.value
  }

  migrateV4(expectedRevision: number): MetaSave {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V4) throw new Error('Meta save does not require V4 migration')
    let parsed: unknown
    try { parsed = JSON.parse(current.raw) } catch { throw new Error('Meta V4 save is not valid JSON') }
    const migratedV5 = migrateMetaSaveV4ToV5(parsed, this.storage)
    const migrated = migratedV5.ok ? migrateMetaSaveV5ToV6(migratedV5.value) : migratedV5
    if (!migrated.ok) throw new Error(`Invalid Meta V4 or legacy progression save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.persist(migrated.value)
    return migrated.value
  }

  migrateV5(expectedRevision: number): MetaSave {
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V5) throw new Error('Meta save does not require V5 migration')
    const migrated = migrateMetaSaveV5ToV6(JSON.parse(current.raw))
    if (!migrated.ok) throw new Error(`Invalid Meta V5 save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.persist(migrated.value)
    return migrated.value
  }

  save(state: MetaState, expectedRevision: number, updatedAtMs: number): MetaSave {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) throw new Error('Expected revision must be a non-negative safe integer')
    if (!Number.isSafeInteger(updatedAtMs) || updatedAtMs < 0) throw new Error('Save timestamp must be a non-negative safe integer')
    const stateValidation = validateMetaState(state)
    if (!stateValidation.ok) throw new Error(`Invalid meta state: ${stateValidation.issues.join('; ')}`)
    const current = this.load()
    if (current.status === 'invalid') throw new Error('Refusing to overwrite invalid meta save')
    if (current.status === 'migration-required') throw new Error('Refusing to overwrite meta save that requires migration')
    const actualRevision = current.status === 'loaded' ? current.save.revision : 0
    if (actualRevision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${actualRevision}`)
    const save: MetaSave = { schemaVersion: META_SAVE_SCHEMA_VERSION, revision: actualRevision + 1, updatedAtMs, data: stateValidation.value }
    this.persist(save)
    return save
  }

  transactReward(request: RewardTransactionRequest, expectedRevision: number, committedAtMs: number): RewardTransactionCommit {
    const current = this.load()
    if (current.status !== 'loaded') throw new Error('Reward transaction requires a current Meta V5 save')
    if (current.save.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${current.save.revision}`)
    const result = applyRewardTransaction(current.save.data, request, committedAtMs)
    if (result.status === 'already-applied') return { status: 'already-applied', save: current.save }
    return { status: 'applied', save: this.save(result.state, expectedRevision, committedAtMs) }
  }

  resolveCommandEnergy(expectedRevision: number, nowMs: number): CommandEnergyCommit {
    const current = this.requireCurrentSave(expectedRevision, 'Command Energy resolution')
    const result = resolveCommandEnergyRegen(current.data.commandEnergy, nowMs)
    if (result.status === 'invalid-clock') return { status: 'invalid-clock', save: current }
    if (result.state === current.data.commandEnergy) return { status: 'unchanged', save: current }
    const state = { ...current.data, commandEnergy: result.state }
    return { status: 'resolved', save: this.save(state, expectedRevision, nowMs) }
  }

  spendCommandEnergy(cost: number, expectedRevision: number, nowMs: number): CommandEnergyCommit {
    const current = this.requireCurrentSave(expectedRevision, 'Command Energy spend')
    const result = spendCommandEnergy(current.data.commandEnergy, cost, nowMs)
    if (result.status !== 'spent') return { status: result.status, save: current }
    const state = { ...current.data, commandEnergy: result.state }
    return { status: 'spent', save: this.save(state, expectedRevision, nowMs) }
  }

  grantCommandEnergy(amount: number, expectedRevision: number, nowMs: number): CommandEnergyCommit {
    const current = this.requireCurrentSave(expectedRevision, 'Command Energy grant')
    const result = grantCommandEnergy(current.data.commandEnergy, amount, nowMs)
    if (result.status === 'invalid-clock') return { status: 'invalid-clock', save: current }
    const state = { ...current.data, commandEnergy: result.state }
    return { status: 'granted', save: this.save(state, expectedRevision, nowMs) }
  }

  transactEquipment(
    request: EquipmentV2TransactionRequest,
    definitions: Readonly<Record<string, EquipmentV2Definition>>,
    expectedRevision: number,
    committedAtMs: number,
  ): EquipmentV2TransactionCommit {
    const current = this.requireCurrentSave(expectedRevision, 'Equipment V2 transaction')
    const result = applyEquipmentV2Transaction(current.data, request, definitions, committedAtMs)
    if (result.status === 'already-applied') return { status: result.status, save: current, affectedHeroIds: result.affectedHeroIds }
    return {
      status: result.status,
      save: this.save(result.state, expectedRevision, committedAtMs),
      affectedHeroIds: result.affectedHeroIds,
    }
  }

  transactEconomy(
    request: EconomyTransactionRequest,
    definitions: Readonly<Record<string, EquipmentV2Definition>>,
    expectedRevision: number,
    committedAtMs: number,
  ): EconomyTransactionCommit {
    const current = this.requireCurrentSave(expectedRevision, 'Economy transaction')
    const result = applyEconomyTransaction(current.data, request, definitions, committedAtMs)
    if (result.status === 'already-applied') return { status: result.status, save: current }
    return { status: result.status, save: this.save(result.state, expectedRevision, committedAtMs) }
  }

  transactHero(request: Readonly<{
    idempotencyKey: string
    operation: HeroMetaOperation
    expectedRevision: number
    committedAtMs: number
    config?: RecruitmentConfig
  }>): HeroMetaCommit {
    const current = this.requireCurrentSave(request.expectedRevision, 'Hero Meta transaction')
    const result = applyHeroMetaTransaction(current, request.idempotencyKey, request.operation, request.config, request.committedAtMs)
    if (result.save === current) return result
    this.persist(result.save)
    return result
  }

  private requireCurrentSave(expectedRevision: number, operation: string): MetaSave {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'loaded') throw new Error(`${operation} requires a current Meta V5 save`)
    if (current.save.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${current.save.revision}`)
    return current.save
  }

  private persist(save: MetaSave): void {
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(save))
    this.onPersist?.(save)
  }
}