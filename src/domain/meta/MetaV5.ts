import type { MetaSaveV4, MetaStateV4 } from './MetaState'
import { validateMetaSave, readSchemaVersion } from './MetaValidation'
import { migrateMetaSaveV1ToV2, migrateMetaSaveV2ToV3, migrateMetaSaveV3ToV4 } from './MetaMigration'
import { PROGRESSION_STORAGE_KEY, type StorageLike } from '../progression/ProgressionStorage'
import type { HeroProgression } from '../progression/ProgressionSystem'
import { prototypeHeroRecruitmentConfig, type HeroCollection } from './HeroRecruitment'

export const META_SAVE_SCHEMA_VERSION_V5 = 5 as const
export type MetaStateV5 = Readonly<MetaStateV4 & { heroCollection: HeroCollection }>
export type MetaSaveV5 = Readonly<{ schemaVersion: typeof META_SAVE_SCHEMA_VERSION_V5; revision: number; updatedAtMs: number; data: MetaStateV5 }>

export function createMetaV5State(state: MetaStateV4, heroCollection: HeroCollection = {}): MetaStateV5 {
  return { ...state, heroCollection }
}

export function migrateMetaV4ToV5(value: unknown, storage?: StorageLike): { ok: true; value: MetaSaveV5 } | { ok: false; issues: readonly string[] } {
  const v4 = validateMetaSave(value)
  if (!v4.ok) return v4
  const legacy: Record<string, HeroProgression> = {}
  const raw = storage?.getItem(PROGRESSION_STORAGE_KEY)
  if (raw !== null && raw !== undefined) {
    try {
      const parsed = JSON.parse(raw) as { version?: number; heroes?: Record<string, HeroProgression> }
      if (parsed.version !== 1 || !parsed.heroes || typeof parsed.heroes !== 'object') return { ok: false, issues: ['legacy progression save is invalid'] }
      Object.keys(parsed.heroes).sort().forEach((heroId) => { legacy[heroId] = parsed.heroes![heroId] })
    } catch { return { ok: false, issues: ['legacy progression save is not valid JSON'] } }
  }
  const heroCollection: Record<string, { heroId: string; stars: 1; progression: HeroProgression }> = {}
  Object.keys(legacy).sort().forEach((heroId) => { heroCollection[heroId] = { heroId, stars: 1, progression: legacy[heroId] } })
  return { ok: true, value: { schemaVersion: META_SAVE_SCHEMA_VERSION_V5, revision: v4.value.revision, updatedAtMs: v4.value.updatedAtMs, data: createMetaV5State(v4.value.data, heroCollection) } }
}

export const prototypeHeroCollectionConfig = prototypeHeroRecruitmentConfig

export function migrateMetaSaveToV5(value: unknown, storage?: StorageLike): { ok: true; value: MetaSaveV5 } | { ok: false; issues: readonly string[] } {
  const version = readSchemaVersion(value)
  if (version === 5) {
    const candidate = value as MetaSaveV5
    return candidate.data && candidate.schemaVersion === 5 ? { ok: true, value: candidate } : { ok: false, issues: ['invalid Meta V5 save'] }
  }
  if (version === 1) { const v2 = migrateMetaSaveV1ToV2(value); if (!v2.ok) return v2; const v3 = migrateMetaSaveV2ToV3(v2.value); if (!v3.ok) return v3; const v4 = migrateMetaSaveV3ToV4(v3.value); if (!v4.ok) return v4; return migrateMetaV4ToV5(v4.value, storage) }
  if (version === 2) { const v3 = migrateMetaSaveV2ToV3(value); if (!v3.ok) return v3; const v4 = migrateMetaSaveV3ToV4(v3.value); if (!v4.ok) return v4; return migrateMetaV4ToV5(v4.value, storage) }
  if (version === 3) { const v4 = migrateMetaSaveV3ToV4(value); if (!v4.ok) return v4; return migrateMetaV4ToV5(v4.value, storage) }
  if (version === 4) return migrateMetaV4ToV5(value, storage)
  return { ok: false, issues: ['unsupported Meta schema version'] }
}
