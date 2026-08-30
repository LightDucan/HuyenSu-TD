import type { StorageLike } from '../progression/ProgressionStorage'
import { migrateMetaSaveV1ToV2, migrateMetaSaveV2ToV3, migrateMetaSaveV3ToV4, migrateMetaSaveV4ToV5 } from './MetaMigration'
import { META_SAVE_SCHEMA_VERSION_V5, type MetaSaveV5, type MetaStateV5 } from './MetaState'
import { readSchemaVersion, validateMetaSaveV5, type ValidationResult } from './MetaValidation'
import { prototypeHeroRecruitmentConfig } from './HeroRecruitment'

export { META_SAVE_SCHEMA_VERSION_V5 }
export type { MetaStateV5, MetaSaveV5 }
export const prototypeHeroCollectionConfig = prototypeHeroRecruitmentConfig

export function createMetaV5State(state: Omit<MetaStateV5, 'heroCollection'>, heroCollection: MetaStateV5['heroCollection'] = {}): MetaStateV5 {
  return { ...state, heroCollection }
}

export const migrateMetaV4ToV5 = migrateMetaSaveV4ToV5

export function migrateMetaSaveToV5(value: unknown, storage?: StorageLike): ValidationResult<MetaSaveV5> {
  const version = readSchemaVersion(value)
  if (version === 5) return validateMetaSaveV5(value)
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
