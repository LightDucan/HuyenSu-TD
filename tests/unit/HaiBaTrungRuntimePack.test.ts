import { describe, expect, it } from 'vitest'
import { balanceV1 } from '../../src/data/economy/balanceV1'
import { enemyDefinitions } from '../../src/data/enemies/definitions'
import { ACTIVE_HERO_IDS, heroDefinitions } from '../../src/data/heroes/definitions'
import { skillDefinitions } from '../../src/data/skills/definitions'
import { prototypeWaves } from '../../src/data/waves/prototypeWaves'
import { ACTIVE_PRODUCTION_HERO_IDS, createPrototypeHeroCollection, resolveRecruitmentBatch, selectPlayableOwnedHeroIds } from '../../src/domain/meta/HeroRecruitment'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import { validateMetaState } from '../../src/domain/meta/MetaValidation'

describe('VS-HBT-C01 runtime content pack', () => {
  it('uses exactly the three active Vietnam Heroes for fresh bootstrap and selection', () => {
    expect(ACTIVE_HERO_IDS).toEqual(['trung-trac', 'trung-nhi', 'le-chan'])
    expect(ACTIVE_PRODUCTION_HERO_IDS).toEqual(ACTIVE_HERO_IDS)
    expect(Object.keys(createPrototypeHeroCollection())).toEqual(ACTIVE_HERO_IDS)
    expect(selectPlayableOwnedHeroIds(createInitialMetaState('fresh', 0).heroCollection, ACTIVE_HERO_IDS)).toEqual(ACTIVE_HERO_IDS)
  })

  it('preserves legacy Tam Quốc entries while keeping them inactive', () => {
    const state = createInitialMetaState('legacy', 0)
    const legacy = { heroId: 'quan-vu', stars: 4 as const, progression: { stage: 'rebirth' as const, level: 9 } }
    const withLegacy = { ...state, heroCollection: { ...state.heroCollection, 'quan-vu': legacy } }
    expect(validateMetaState(withLegacy).ok).toBe(true)
    expect(withLegacy.heroCollection['quan-vu']).toEqual(legacy)
    expect(selectPlayableOwnedHeroIds(withLegacy.heroCollection, ACTIVE_HERO_IDS)).toEqual(ACTIVE_HERO_IDS)
  })

  it('recruits only active Heroes and creates Hero-specific duplicate shards', () => {
    expect(Object.keys(balanceV1.recruitment.weights)).toEqual(ACTIVE_HERO_IDS)
    const result = resolveRecruitmentBatch({ heroCollection: {}, consumables: { item_chieu_hien_lenh: 10 } }, 10, () => 0)
    expect(result.results.every(({ heroId }) => ACTIVE_HERO_IDS.includes(heroId as typeof ACTIVE_HERO_IDS[number]))).toBe(true)
    expect(result.state.consumables['shard_hero_trung-trac']).toBe(90)
  })

  it('defines exact shared skill triggers and effects without DEF', () => {
    expect(ACTIVE_HERO_IDS.map((id) => heroDefinitions[id].skillTriggerHits)).toEqual([5, 7, 5])
    expect(skillDefinitions['trong-dong-lenh-vuong'].effects).toEqual([{ type: 'aoe', radius: 170, maxTargets: 4 }, { type: 'damage', atkMultiplier: 2.2 }, { type: 'stun', durationMs: 800 }])
    expect(skillDefinitions['lien-hoan-lac-tien'].effects).toEqual([{ type: 'multiHit', hits: 3, intervalMs: 140 }, { type: 'damage', atkMultiplier: 1.1 }, { type: 'slow', ratio: 0.35, durationMs: 2000 }])
    expect(skillDefinitions['song-trao-hai-tan'].effects).toEqual([{ type: 'aoe', radius: 160, maxTargets: 3 }, { type: 'damage', atkMultiplier: 2 }, { type: 'root', durationMs: 1500 }])
    ACTIVE_HERO_IDS.forEach((id) => expect('def' in heroDefinitions[id].baseStats).toBe(false))
  })

  it('defines four data-only HBT enemies and a single Boss in Wave 10', () => {
    const ids = ['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien']
    expect(ids.map((id) => enemyDefinitions[id])).toMatchObject([
      { maxHp: 80, moveSpeed: 50, cityDamage: 1 }, { maxHp: 55, moveSpeed: 64, cityDamage: 1 },
      { maxHp: 145, moveSpeed: 36, cityDamage: 2 }, { maxHp: 1200, moveSpeed: 38, cityDamage: 10 },
    ])
    ids.forEach((id) => expect('def' in enemyDefinitions[id]).toBe(false))
    expect(prototypeWaves).toHaveLength(10)
    prototypeWaves.flatMap((wave) => wave.groups).forEach((group) => expect(enemyDefinitions[group.enemyId]).toBeDefined())
    expect(prototypeWaves[9].groups.filter(({ enemyId }) => enemyId === 'boss-ma-vien')).toEqual([expect.objectContaining({ count: 1 })])
    expect(Object.keys(balanceV1.rewardSources.enemyKillGold).sort()).toEqual(ids.sort())
  })
})
