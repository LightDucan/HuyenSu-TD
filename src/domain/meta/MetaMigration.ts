import {
  META_SAVE_SCHEMA_VERSION_V4,
  META_SAVE_SCHEMA_VERSION,
  META_SAVE_SCHEMA_VERSION_V2,
  META_SAVE_SCHEMA_VERSION_V3,
  META_SAVE_SCHEMA_VERSION_V5,
  type MetaSaveV5,
  type MetaSaveV6,
  type MetaSaveV2,
  type MetaSaveV3,
  type MetaSaveV4,
  type MetaSave,
} from './MetaState'
import { type ValidationResult, validateMetaSaveV1, validateMetaSaveV2, validateMetaSaveV3, validateMetaSaveV4, validateMetaSaveV5 } from './MetaValidation'
import { PROGRESSION_STORAGE_KEY, type StorageLike } from '../progression/ProgressionStorage'
import { createPrototypeHeroCollection, type HeroCollection } from './HeroRecruitment'
import type { HeroProgression } from '../progression/ProgressionSystem'

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
      schemaVersion: META_SAVE_SCHEMA_VERSION_V4,
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

function readLegacyHeroCollection(storage?: StorageLike): ValidationResult<HeroCollection> {
  const fallback = createPrototypeHeroCollection()
  if (!storage) return { ok: true, value: fallback }
  const raw = storage.getItem(PROGRESSION_STORAGE_KEY)
  if (raw === null) return { ok: true, value: fallback }
  try {
    const parsed = JSON.parse(raw) as { version?: unknown; heroes?: unknown }
    if (parsed.version !== 1 || typeof parsed.heroes !== 'object' || parsed.heroes === null || Array.isArray(parsed.heroes)) return { ok: false, issues: ['legacy progression save is invalid'] }
    const imported: Record<string, { heroId: string; stars: 1 | 2 | 3 | 4 | 5; progression: HeroProgression }> = { ...fallback }
    for (const heroId of Object.keys(parsed.heroes).sort()) {
      const progression = (parsed.heroes as Record<string, unknown>)[heroId]
      if (!progression || typeof progression !== 'object' || Array.isArray(progression)) return { ok: false, issues: [`legacy progression ${heroId} is invalid`] }
      const candidate = progression as Partial<HeroProgression>
      if (!['normal', 'rebirth', 'reincarnation', 'legendary'].includes(candidate.stage ?? '') || !Number.isSafeInteger(candidate.level) || (candidate.level ?? 0) < 1 || (candidate.level ?? 101) > 100) return { ok: false, issues: [`legacy progression ${heroId} is invalid`] }
      if (candidate.upgradeReadyAt !== undefined && (!Number.isSafeInteger(candidate.upgradeReadyAt) || candidate.upgradeReadyAt < 0)) return { ok: false, issues: [`legacy progression ${heroId} cooldown is invalid`] }
      imported[heroId] = { heroId, stars: 1, progression: candidate as HeroProgression }
    }
    return { ok: true, value: imported }
  } catch { return { ok: false, issues: ['legacy progression save is not valid JSON'] } }
}

export function migrateMetaSaveV4ToV5(value: unknown, storage?: StorageLike): ValidationResult<MetaSaveV5> {
  const v4 = validateMetaSaveV4(value)
  if (!v4.ok) return v4
  const collection = readLegacyHeroCollection(storage)
  if (!collection.ok) return collection
  return {
    ok: true,
    value: {
      schemaVersion: META_SAVE_SCHEMA_VERSION_V5,
      revision: v4.value.revision,
      updatedAtMs: v4.value.updatedAtMs,
      data: { ...v4.value.data, heroCollection: collection.value },
    },
  }
}

export function migrateMetaSaveV5ToV6(value: unknown): ValidationResult<MetaSaveV6> {
  const v5 = validateMetaSaveV5(value)
  if (!v5.ok) return v5
  return { ok: true, value: { schemaVersion: 6, revision: v5.value.revision, updatedAtMs: v5.value.updatedAtMs, data: { ...v5.value.data, campaignProgress: { completedStages: {} } } } }
}
