import {
  META_SAVE_SCHEMA_VERSION,
  META_SAVE_SCHEMA_VERSION_V2,
  META_SAVE_SCHEMA_VERSION_V3,
  type MetaSaveV2,
  type MetaSaveV3,
  type MetaSaveV4,
} from './MetaState'
import { type ValidationResult, validateMetaSaveV1, validateMetaSaveV2, validateMetaSaveV3 } from './MetaValidation'

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
      schemaVersion: META_SAVE_SCHEMA_VERSION_V3,
      revision: v2.value.revision,
      updatedAtMs: v2.value.updatedAtMs,
      data: {
        ...v2.value.data,
        activePlayTime: { observedVisibleMs: 0, observedHiddenMs: 0, remainderEligibleMs: 0 },
      },
    },
  }
}

export function migrateMetaSaveV3ToV4(value: unknown): ValidationResult<MetaSaveV4> {
  const v3 = validateMetaSaveV3(value)
  if (!v3.ok) return v3

  return {
    ok: true,
    value: {
      schemaVersion: META_SAVE_SCHEMA_VERSION,
      revision: v3.value.revision,
      updatedAtMs: v3.value.updatedAtMs,
      data: {
        ...v3.value.data,
        inventory: {
          consumables: v3.value.data.inventory.consumables,
          equipmentInstances: {},
          equippedByHero: {},
          unresolvedLegacyEquipmentInstanceIds: [...v3.value.data.inventory.equipmentInstanceIds],
        },
      },
    },
  }
}
