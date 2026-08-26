import type { StorageLike } from '../progression/ProgressionStorage'
import { migrateMetaSaveV1ToV2, migrateMetaSaveV2ToV3 } from './MetaMigration'
import { META_SAVE_SCHEMA_VERSION, META_SAVE_SCHEMA_VERSION_V1, META_SAVE_SCHEMA_VERSION_V2, type MetaSaveV3, type MetaStateV3 } from './MetaState'
import { readSchemaVersion, validateMetaSave, validateMetaState } from './MetaValidation'
import { applyRewardTransaction, type RewardTransactionRequest } from './RewardTransaction'
import { grantCommandEnergy, resolveCommandEnergyRegen, spendCommandEnergy } from './CommandEnergy'

export const META_STORAGE_KEY = 'huyen-su-td/meta-v1'

export type MetaLoadResult =
  | Readonly<{ status: 'empty' }>
  | Readonly<{ status: 'loaded'; save: MetaSaveV3 }>
  | Readonly<{ status: 'invalid'; raw: string; issues: readonly string[] }>
  | Readonly<{ status: 'migration-required'; raw: string; sourceVersion: number }>

export type RewardTransactionCommit =
  | Readonly<{ status: 'applied'; save: MetaSaveV3 }>
  | Readonly<{ status: 'already-applied'; save: MetaSaveV3 }>

export type CommandEnergyCommit =
  | Readonly<{ status: 'resolved' | 'spent' | 'granted'; save: MetaSaveV3 }>
  | Readonly<{ status: 'unchanged' | 'insufficient' | 'invalid-clock'; save: MetaSaveV3 }>

export class LocalMetaRepository {
  constructor(private readonly storage: StorageLike) {}

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

  migrateV1(expectedRevision: number): MetaSaveV3 {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V1) throw new Error('Meta save does not require V1 migration')
    let parsed: unknown
    try { parsed = JSON.parse(current.raw) } catch { throw new Error('Meta V1 save is not valid JSON') }
    const v2 = migrateMetaSaveV1ToV2(parsed)
    if (!v2.ok) throw new Error(`Invalid Meta V1 save: ${v2.issues.join('; ')}`)
    const migrated = migrateMetaSaveV2ToV3(v2.value)
    if (!migrated.ok) throw new Error(`Invalid intermediate Meta V2 save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(migrated.value))
    return migrated.value
  }

  migrateV2(expectedRevision: number): MetaSaveV3 {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V2) throw new Error('Meta save does not require V2 migration')
    let parsed: unknown
    try { parsed = JSON.parse(current.raw) } catch { throw new Error('Meta V2 save is not valid JSON') }
    const migrated = migrateMetaSaveV2ToV3(parsed)
    if (!migrated.ok) throw new Error(`Invalid Meta V2 save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(migrated.value))
    return migrated.value
  }

  save(state: MetaStateV3, expectedRevision: number, updatedAtMs: number): MetaSaveV3 {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) throw new Error('Expected revision must be a non-negative safe integer')
    if (!Number.isSafeInteger(updatedAtMs) || updatedAtMs < 0) throw new Error('Save timestamp must be a non-negative safe integer')
    const stateValidation = validateMetaState(state)
    if (!stateValidation.ok) throw new Error(`Invalid meta state: ${stateValidation.issues.join('; ')}`)
    const current = this.load()
    if (current.status === 'invalid') throw new Error('Refusing to overwrite invalid meta save')
    if (current.status === 'migration-required') throw new Error('Refusing to overwrite meta save that requires migration')
    const actualRevision = current.status === 'loaded' ? current.save.revision : 0
    if (actualRevision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${actualRevision}`)
    const save: MetaSaveV3 = { schemaVersion: META_SAVE_SCHEMA_VERSION, revision: actualRevision + 1, updatedAtMs, data: stateValidation.value }
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(save))
    return save
  }

  transactReward(request: RewardTransactionRequest, expectedRevision: number, committedAtMs: number): RewardTransactionCommit {
    const current = this.load()
    if (current.status !== 'loaded') throw new Error('Reward transaction requires a current Meta V3 save')
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

  private requireCurrentSave(expectedRevision: number, operation: string): MetaSaveV3 {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'loaded') throw new Error(`${operation} requires a current Meta V3 save`)
    if (current.save.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${current.save.revision}`)
    return current.save
  }
}
