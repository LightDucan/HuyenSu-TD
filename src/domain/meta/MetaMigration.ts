import { META_SAVE_SCHEMA_VERSION, META_SAVE_SCHEMA_VERSION_V2, type MetaSaveV2, type MetaSaveV3 } from './MetaState'
import { type ValidationResult, validateMetaSaveV1, validateMetaSaveV2 } from './MetaValidation'

export function migrateMetaSaveV1ToV2(value: unknown): ValidationResult<MetaSaveV2> {
  const v1 = validateMetaSaveV1(value)
  if (!v1.ok) return v1

  return {
    ok: true,
    value: {
      schemaVersion: META_SAVE_SCHEMA_VERSION_V2,
      revision: v1.value.revision,
      updatedAtMs: v1.value.updatedAtMs,
      data: { ...v1.value.data, rewardReceipts: {} },
    },
  }
}

export function migrateMetaSaveV2ToV3(value: unknown): ValidationResult<MetaSaveV3> {
  const v2 = validateMetaSaveV2(value)
  if (!v2.ok) return v2

  return {
    ok: true,
    value: {
      schemaVersion: META_SAVE_SCHEMA_VERSION,
      revision: v2.value.revision,
      updatedAtMs: v2.value.updatedAtMs,
      data: {
        ...v2.value.data,
        activePlayTime: { observedVisibleMs: 0, observedHiddenMs: 0, remainderEligibleMs: 0 },
      },
    },
  }
}
