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

export function validateMetaSaveV5(value: unknown): { ok: true; value: MetaSaveV5 } | { ok: false; issues: readonly string[] } {
  if (!value || typeof value !== 'object') return { ok: false, issues: ['Meta V5 save must be an object'] }
  const candidate = value as Partial<MetaSaveV5>
  const issues: string[] = []
  if (candidate.schemaVersion !== 5) issues.push('schemaVersion must be 5')
  if (!Number.isSafeInteger(candidate.revision) || (candidate.revision ?? 0) < 1) issues.push('revision must be positive safe integer')
  if (!Number.isSafeInteger(candidate.updatedAtMs) || (candidate.updatedAtMs ?? -1) < 0) issues.push('updatedAtMs must be non-negative safe integer')
  const collection = candidate.data?.heroCollection
  if (!collection || typeof collection !== 'object' || Array.isArray(collection)) issues.push('heroCollection must be an object')
  else Object.entries(collection).forEach(([key, hero]) => {
    if (!hero || typeof hero !== 'object' || hero.heroId !== key) { issues.push(`heroCollection.${key} heroId mismatch`); return }
    if (![1, 2, 3, 4, 5].includes(hero.stars)) issues.push(`heroCollection.${key}.stars must be 1..5`)
    const progression = hero.progression
    if (!progression || !['normal', 'rebirth', 'reincarnation', 'legendary'].includes(progression.stage) || !Number.isSafeInteger(progression.level) || progression.level < 1 || progression.level > 100) issues.push(`heroCollection.${key}.progression is invalid`)
    if (progression && progression.upgradeReadyAt !== undefined && (!Number.isSafeInteger(progression.upgradeReadyAt) || progression.upgradeReadyAt < 0)) issues.push(`heroCollection.${key}.upgradeReadyAt is invalid`)
  })
  return issues.length ? { ok: false, issues } : { ok: true, value: value as MetaSaveV5 }
}

export function migrateMetaSaveToV5(value: unknown, storage?: StorageLike): { ok: true; value: MetaSaveV5 } | { ok: false; issues: readonly string[] } {
  const version = readSchemaVersion(value)
  if (version === 5) {
    return validateMetaSaveV5(value)
  }
  if (version === 1) { const v2 = migrateMetaSaveV1ToV2(value); if (!v2.ok) return v2; const v3 = migrateMetaSaveV2ToV3(v2.value); if (!v3.ok) return v3; const v4 = migrateMetaSaveV3ToV4(v3.value); if (!v4.ok) return v4; return migrateMetaV4ToV5(v4.value, storage) }
  if (version === 2) { const v3 = migrateMetaSaveV2ToV3(value); if (!v3.ok) return v3; const v4 = migrateMetaSaveV3ToV4(v3.value); if (!v4.ok) return v4; return migrateMetaV4ToV5(v4.value, storage) }
  if (version === 3) { const v4 = migrateMetaSaveV3ToV4(value); if (!v4.ok) return v4; return migrateMetaV4ToV5(v4.value, storage) }
  if (version === 4) return migrateMetaV4ToV5(value, storage)
  return { ok: false, issues: ['unsupported Meta schema version'] }
}
