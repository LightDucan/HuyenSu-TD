import { META_SAVE_SCHEMA_VERSION, type MetaSaveV2 } from './MetaState'
import { type ValidationResult, validateMetaSaveV1 } from './MetaValidation'

export function migrateMetaSaveV1ToV2(value: unknown): ValidationResult<MetaSaveV2> {
  const v1 = validateMetaSaveV1(value)
  if (!v1.ok) return v1

  return {
    ok: true,
    value: {
      schemaVersion: META_SAVE_SCHEMA_VERSION,
      revision: v1.value.revision,
      updatedAtMs: v1.value.updatedAtMs,
      data: { ...v1.value.data, rewardReceipts: {} },
    },
  }
}
