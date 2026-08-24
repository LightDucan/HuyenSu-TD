import type { StorageLike } from '../progression/ProgressionStorage'
import { META_SAVE_SCHEMA_VERSION, type MetaSaveV1, type MetaStateV1 } from './MetaState'
import { readSchemaVersion, validateMetaSave, validateMetaState } from './MetaValidation'

export const META_STORAGE_KEY = 'huyen-su-td/meta-v1'

export type MetaLoadResult =
  | Readonly<{ status: 'empty' }>
  | Readonly<{ status: 'loaded'; save: MetaSaveV1 }>
  | Readonly<{ status: 'invalid'; raw: string; issues: readonly string[] }>
  | Readonly<{ status: 'migration-required'; raw: string; sourceVersion: number }>

export class LocalMetaRepository {
  constructor(private readonly storage: StorageLike) {}

  load(): MetaLoadResult {
    const raw = this.storage.getItem(META_STORAGE_KEY)
    if (raw === null) return { status: 'empty' }

    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      return { status: 'invalid', raw, issues: ['meta save is not valid JSON'] }
    }

    const sourceVersion = readSchemaVersion(parsed)
    if (sourceVersion !== undefined && sourceVersion !== META_SAVE_SCHEMA_VERSION) {
      return { status: 'migration-required', raw, sourceVersion }
    }

    const validation = validateMetaSave(parsed)
    return validation.ok
      ? { status: 'loaded', save: validation.value }
      : { status: 'invalid', raw, issues: validation.issues }
  }

  save(state: MetaStateV1, expectedRevision: number, updatedAtMs: number): MetaSaveV1 {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) throw new Error('Expected revision must be a non-negative safe integer')
    if (!Number.isSafeInteger(updatedAtMs) || updatedAtMs < 0) throw new Error('Save timestamp must be a non-negative safe integer')

    const stateValidation = validateMetaState(state)
    if (!stateValidation.ok) throw new Error(`Invalid meta state: ${stateValidation.issues.join('; ')}`)

    const current = this.load()
    if (current.status === 'invalid') throw new Error('Refusing to overwrite invalid meta save')
    if (current.status === 'migration-required') throw new Error('Refusing to overwrite meta save that requires migration')
    const actualRevision = current.status === 'loaded' ? current.save.revision : 0
    if (actualRevision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${actualRevision}`)

    const save: MetaSaveV1 = {
      schemaVersion: META_SAVE_SCHEMA_VERSION,
      revision: actualRevision + 1,
      updatedAtMs,
      data: stateValidation.value,
    }
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(save))
    return save
  }
}
