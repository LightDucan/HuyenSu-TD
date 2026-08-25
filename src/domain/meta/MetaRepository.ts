import type { StorageLike } from '../progression/ProgressionStorage'
import { migrateMetaSaveV1ToV2 } from './MetaMigration'
import { META_SAVE_SCHEMA_VERSION, META_SAVE_SCHEMA_VERSION_V1, type MetaSaveV2, type MetaStateV2 } from './MetaState'
import { readSchemaVersion, validateMetaSave, validateMetaState } from './MetaValidation'
import { applyRewardTransaction, type RewardTransactionRequest } from './RewardTransaction'

export const META_STORAGE_KEY = 'huyen-su-td/meta-v1'

export type MetaLoadResult =
  | Readonly<{ status: 'empty' }>
  | Readonly<{ status: 'loaded'; save: MetaSaveV2 }>
  | Readonly<{ status: 'invalid'; raw: string; issues: readonly string[] }>
  | Readonly<{ status: 'migration-required'; raw: string; sourceVersion: number }>

export type RewardTransactionCommit =
  | Readonly<{ status: 'applied'; save: MetaSaveV2 }>
  | Readonly<{ status: 'already-applied'; save: MetaSaveV2 }>

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

  migrateV1(expectedRevision: number): MetaSaveV2 {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 1) throw new Error('Expected revision must be a positive safe integer')
    const current = this.load()
    if (current.status !== 'migration-required' || current.sourceVersion !== META_SAVE_SCHEMA_VERSION_V1) throw new Error('Meta save does not require V1 migration')
    let parsed: unknown
    try { parsed = JSON.parse(current.raw) } catch { throw new Error('Meta V1 save is not valid JSON') }
    const migrated = migrateMetaSaveV1ToV2(parsed)
    if (!migrated.ok) throw new Error(`Invalid Meta V1 save: ${migrated.issues.join('; ')}`)
    if (migrated.value.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${migrated.value.revision}`)
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(migrated.value))
    return migrated.value
  }

  save(state: MetaStateV2, expectedRevision: number, updatedAtMs: number): MetaSaveV2 {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) throw new Error('Expected revision must be a non-negative safe integer')
    if (!Number.isSafeInteger(updatedAtMs) || updatedAtMs < 0) throw new Error('Save timestamp must be a non-negative safe integer')
    const stateValidation = validateMetaState(state)
    if (!stateValidation.ok) throw new Error(`Invalid meta state: ${stateValidation.issues.join('; ')}`)
    const current = this.load()
    if (current.status === 'invalid') throw new Error('Refusing to overwrite invalid meta save')
    if (current.status === 'migration-required') throw new Error('Refusing to overwrite meta save that requires migration')
    const actualRevision = current.status === 'loaded' ? current.save.revision : 0
    if (actualRevision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${actualRevision}`)
    const save: MetaSaveV2 = { schemaVersion: META_SAVE_SCHEMA_VERSION, revision: actualRevision + 1, updatedAtMs, data: stateValidation.value }
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(save))
    return save
  }

  transactReward(request: RewardTransactionRequest, expectedRevision: number, committedAtMs: number): RewardTransactionCommit {
    const current = this.load()
    if (current.status !== 'loaded') throw new Error('Reward transaction requires a current Meta V2 save')
    if (current.save.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${current.save.revision}`)
    const result = applyRewardTransaction(current.save.data, request, committedAtMs)
    if (result.status === 'already-applied') return { status: 'already-applied', save: current.save }
    return { status: 'applied', save: this.save(result.state, expectedRevision, committedAtMs) }
  }
}
