import { describe, expect, it } from 'vitest'
import { ascendHeroStar, evolveHero, grantHero, prototypeHeroRecruitmentConfig, resolveRecruitmentBatch, resolveLegendaryPassive, type HeroRecruitmentState } from '../../src/domain/meta/HeroRecruitment'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import { migrateMetaV4ToV5 } from '../../src/domain/meta/MetaV5'

const owned = (heroId = 'quan-vu'): HeroRecruitmentState => ({ heroCollection: { [heroId]: { heroId, stars: 1, progression: { stage: 'normal', level: 1 } } }, consumables: {} })

describe('Phase 17 recruitment and ascension domain', () => {
  it('consumes exactly one decree and unlocks a new hero', () => {
    const result = resolveRecruitmentBatch({ heroCollection: {}, consumables: { item_chieu_hien_lenh: 1 } }, 1, () => 0)
    expect(result.state.consumables.item_chieu_hien_lenh).toBe(0)
    expect(result.results[0]).toMatchObject({ outcome: 'new', heroId: 'quan-vu' })
    expect(result.state.heroCollection['quan-vu']).toMatchObject({ stars: 1, progression: { stage: 'normal', level: 1 } })
  })
  it('processes 10x sequentially so the second same hero is duplicate', () => {
    const result = resolveRecruitmentBatch({ heroCollection: {}, consumables: { item_chieu_hien_lenh: 10 } }, 10, () => 0)
    expect(result.results[0].outcome).toBe('new')
    expect(result.results[1].outcome).toBe('duplicate')
    expect(result.state.consumables['shard_hero_quan-vu']).toBe(90)
  })
  it('rejects insufficient decrees atomically and direct KNB is impossible', () => {
    const state = { heroCollection: {}, consumables: { gold: 100, knb: 100 } }
    expect(() => resolveRecruitmentBatch(state, 1, () => 0)).toThrow('Insufficient')
    expect(state).toEqual({ heroCollection: {}, consumables: { gold: 100, knb: 100 } })
  })
  it('converts duplicate and ascends only with own shards through 5 stars', () => {
    let state = grantHero(owned(), 'quan-vu').state
    state = { ...state, consumables: { ...state.consumables, 'shard_hero_quan-vu': 185 } }
    state = ascendHeroStar(state, 'quan-vu'); state = ascendHeroStar(state, 'quan-vu'); state = ascendHeroStar(state, 'quan-vu'); state = ascendHeroStar(state, 'quan-vu')
    expect(state.heroCollection['quan-vu'].stars).toBe(5)
    expect(() => ascendHeroStar(state, 'quan-vu')).toThrow('5')
    expect(() => ascendHeroStar({ heroCollection: { 'quan-vu': { ...state.heroCollection['quan-vu'], stars: 1 } }, consumables: { shard_hero_other: 1000 } }, 'quan-vu')).toThrow('Insufficient')
  })
  it('evolves with shared Anh Hồn, preserving stars, and unlocks shared passive at Legendary', () => {
    let state: HeroRecruitmentState = { ...owned(), consumables: { [ANH_HON_ID]: 850 } }
    state = { ...state, heroCollection: { 'quan-vu': { ...state.heroCollection['quan-vu'], stars: 4, progression: { stage: 'normal', level: 100 } } } }
    state = evolveHero(state, 'quan-vu'); expect(state.heroCollection['quan-vu']).toMatchObject({ stars: 4, progression: { stage: 'rebirth', level: 1 } })
    state = { ...state, heroCollection: { 'quan-vu': { ...state.heroCollection['quan-vu'], progression: { stage: 'rebirth', level: 100 } } } }
    state = evolveHero(state, 'quan-vu'); state = { ...state, heroCollection: { 'quan-vu': { ...state.heroCollection['quan-vu'], progression: { stage: 'reincarnation', level: 100 } } } }
    state = evolveHero(state, 'quan-vu'); expect(resolveLegendaryPassive('quan-vu', 'legendary')).toBeUndefined()
    expect(() => evolveHero(state, 'quan-vu')).toThrow('next stage')
  })
})

const ANH_HON_ID = 'anh-hon'

describe('Phase 17 config invariants', () => {
  it('keeps five-star cap and six flat stats only', () => {
    expect(Object.keys(prototypeHeroRecruitmentConfig.starGrowth[5]!)).toEqual(expect.arrayContaining(['hp', 'atk', 'range', 'attackSpeed', 'crit', 'critDamage']))
    expect(Object.values(prototypeHeroRecruitmentConfig.starGrowth).some((growth) => 'def' in growth)).toBe(false)
  })
  it('imports legacy progression deterministically into Meta V5 without writing legacy data', () => {
    const initial = createInitialMetaState('migration-test', 0)
    const legacy = { version: 1, heroes: { 'trieu-van': { stage: 'rebirth', level: 4 }, 'quan-vu': { stage: 'normal', level: 9 } } }
    const storage = { getItem: (key: string) => key === 'huyen-su-td/progression-v1' ? JSON.stringify(legacy) : null, setItem: () => undefined }
    const result = migrateMetaV4ToV5({ schemaVersion: 4, revision: 1, updatedAtMs: 0, data: initial }, storage)
    expect(result.ok).toBe(true)
    if (result.ok) expect(Object.keys(result.value.data.heroCollection)).toEqual(['quan-vu', 'trieu-van'])
  })
})
