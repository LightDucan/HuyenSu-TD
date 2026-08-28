import type { StorageLike } from '../progression/ProgressionStorage'
import { migrateMetaSaveV1ToV2, migrateMetaSaveV2ToV3, migrateMetaSaveV3ToV4, migrateMetaSaveV4ToV5 } from './MetaMigration'
import { META_SAVE_SCHEMA_VERSION, type MetaSave, type MetaState } from './MetaState'
import { readSchemaVersion, validateMetaSave, type ValidationResult } from './MetaValidation'
import { prototypeHeroRecruitmentConfig } from './HeroRecruitment'

export const META_SAVE_SCHEMA_VERSION_V5 = META_SAVE_SCHEMA_VERSION
export type MetaStateV5 = MetaState
export type MetaSaveV5 = MetaSave
export const prototypeHeroCollectionConfig = prototypeHeroRecruitmentConfig
export const validateMetaSaveV5 = validateMetaSave

export function createMetaV5State(state: Omit<MetaState, 'heroCollection'>, heroCollection: MetaState['heroCollection'] = {}): MetaState {
  return { ...state, heroCollection }
}

export const migrateMetaV4ToV5 = migrateMetaSaveV4ToV5

export function migrateMetaSaveToV5(value: unknown, storage?: StorageLike): ValidationResult<MetaSave> {
  const version = readSchemaVersion(value)
  if (version === 5) return validateMetaSave(value)
  if (version === 1) {
    const v2 = migrateMetaSaveV1ToV2(value); if (!v2.ok) return v2
    const v3 = migrateMetaSaveV2ToV3(v2.value); if (!v3.ok) return v3
    const v4 = migrateMetaSaveV3ToV4(v3.value); if (!v4.ok) return v4
    return migrateMetaSaveV4ToV5(v4.value, storage)
  }
  if (version === 2) {
    const v3 = migrateMetaSaveV2ToV3(value); if (!v3.ok) return v3
    const v4 = migrateMetaSaveV3ToV4(v3.value); if (!v4.ok) return v4
    return migrateMetaSaveV4ToV5(v4.value, storage)
  }
  if (version === 3) {
    const v4 = migrateMetaSaveV3ToV4(value); if (!v4.ok) return v4
    return migrateMetaSaveV4ToV5(v4.value, storage)
  }
  if (version === 4) return migrateMetaSaveV4ToV5(value, storage)
  return { ok: false, issues: ['unsupported Meta schema version'] }
}
