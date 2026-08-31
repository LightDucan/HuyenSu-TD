import { describe, expect, it } from 'vitest'
import { balanceV1 } from '../../src/data/economy/balanceV1'
import { enemyDefinitions } from '../../src/data/enemies/definitions'
import { ACTIVE_HERO_IDS, HAI_BA_TRUNG_HERO_IDS, heroDefinitions } from '../../src/data/heroes/definitions'
import { ACTIVE_HBT_EQUIPMENT_IDS, equipmentDefinitions, haiBaTrungEquipmentV2Definitions } from '../../src/data/equipment/definitions'
import { haiBaTrungGoldGachaConfig } from '../../src/data/economy/prototypeEconomyConfig'
import { haiBaTrungRewardBalance } from '../../src/data/rewards/prototypeRewardConfig'
import { resolveEquipmentInstanceModifiers } from '../../src/domain/equipment/EquipmentV2'
import { skillDefinitions } from '../../src/data/skills/definitions'
import { prototypeWaves } from '../../src/data/waves/prototypeWaves'
import { ACTIVE_PRODUCTION_HERO_IDS, createPrototypeHeroCollection, isActiveHeroOwned, resolveRecruitmentBatch, selectPlayableOwnedHeroIds } from '../../src/domain/meta/HeroRecruitment'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState, META_SAVE_SCHEMA_VERSION } from '../../src/domain/meta/MetaState'
import { validateMetaSave, validateMetaSaveV5, validateMetaState } from '../../src/domain/meta/MetaValidation'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { ensureMetaRepositoryReady } from '../../src/runtime/RewardRuntime'
import { metaV5PreHaiBaTrung } from '../fixtures/metaV5PreHaiBaTrung'

function legacyStorage() {
  const values = new Map([[META_STORAGE_KEY, JSON.stringify(metaV5PreHaiBaTrung)]])
  const storage: StorageLike = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
  }
  return { storage, values }
}

describe('VS-HBT-C01 runtime content pack', () => {
  it('uses exactly the three active Vietnam Heroes for fresh bootstrap and selection', () => {
    expect(HAI_BA_TRUNG_HERO_IDS).toEqual(['trung-trac', 'trung-nhi', 'le-chan'])
    expect(ACTIVE_PRODUCTION_HERO_IDS).toEqual(ACTIVE_HERO_IDS)
    expect(Object.keys(createPrototypeHeroCollection())).toEqual(HAI_BA_TRUNG_HERO_IDS)
    expect(selectPlayableOwnedHeroIds(createInitialMetaState('fresh', 0).heroCollection, ACTIVE_HERO_IDS)).toEqual(HAI_BA_TRUNG_HERO_IDS)
  })

  it('uses canonical HBT equipment identity while retaining legacy power and compatibility aliases', () => {
    expect(ACTIVE_HBT_EQUIPMENT_IDS).toEqual(['lac-viet-bronze-sword', 'lac-viet-swift-jade'])
    expect(haiBaTrungEquipmentV2Definitions[ACTIVE_HBT_EQUIPMENT_IDS[0]].levelModifiers).toEqual(
      haiBaTrungEquipmentV2Definitions['green-dragon-blade'].levelModifiers,
    )
    expect(haiBaTrungEquipmentV2Definitions[ACTIVE_HBT_EQUIPMENT_IDS[1]].levelModifiers).toEqual(
      haiBaTrungEquipmentV2Definitions['swift-jade'].levelModifiers,
    )
    expect(haiBaTrungGoldGachaConfig.rewards.filter((reward) => reward.type === 'equipment').map((reward) => reward.definitionId))
      .toEqual(['lac-viet-bronze-sword', 'lac-viet-swift-jade'])
    expect(equipmentDefinitions['lac-viet-bronze-sword'].name).toBe('Gươm Đồng Lạc Việt')
    expect(Object.values(equipmentDefinitions).filter(({ id }) => ACTIVE_HBT_EQUIPMENT_IDS.includes(id as typeof ACTIVE_HBT_EQUIPMENT_IDS[number]))).toHaveLength(2)
  })

  it('keeps legacy equipment IDs loadable with the original Lv3 modifiers', () => {
    const legacy = metaV5PreHaiBaTrung.data.inventory.equipmentInstances['legacy-blade-1']
    expect(legacy.definitionId).toBe('green-dragon-blade')
    expect(resolveEquipmentInstanceModifiers(legacy, haiBaTrungEquipmentV2Definitions)).toEqual({ atk: 18, range: 10 })
  })

  it('keeps active content identity out of legacy names and uses canonical stage reward', () => {
    expect(Object.values(haiBaTrungEquipmentV2Definitions).filter(({ id }) => ACTIVE_HBT_EQUIPMENT_IDS.includes(id as typeof ACTIVE_HBT_EQUIPMENT_IDS[number]))
      .some(({ name }) => name.includes('Thanh Long'))).toBe(false)
    expect(Object.keys(haiBaTrungRewardBalance.stageClear)).toEqual(['hbt-lang-bac-stage-01'])
    expect(haiBaTrungRewardBalance.stageClear['hbt-lang-bac-stage-01']).toEqual({ gold: 20, knb: 1, anhHon: 10 })
  })

  it('preserves legacy Tam Quốc entries while keeping them inactive', () => {
    const state = createInitialMetaState('legacy', 0)
    const legacy = { heroId: 'quan-vu', stars: 4 as const, progression: { stage: 'rebirth' as const, level: 9 } }
    const withLegacy = { ...state, heroCollection: { ...state.heroCollection, 'quan-vu': legacy } }
    expect(validateMetaState(withLegacy).ok).toBe(true)
    expect(withLegacy.heroCollection['quan-vu']).toEqual(legacy)
    expect(selectPlayableOwnedHeroIds(withLegacy.heroCollection, ACTIVE_HERO_IDS)).toEqual(HAI_BA_TRUNG_HERO_IDS)
  })

  it('validates a literal pre-HBT Meta V5 save and bootstraps missing starters once', () => {
    expect(META_SAVE_SCHEMA_VERSION).toBe(6)
    expect(validateMetaSaveV5(metaV5PreHaiBaTrung)).toEqual({ ok: true, value: metaV5PreHaiBaTrung })
    const oldHeroBytes = Object.fromEntries(Object.entries(metaV5PreHaiBaTrung.data.heroCollection)
      .map(([heroId, entry]) => [heroId, JSON.stringify(entry)]))
    const oldNonHeroData = {
      profile: metaV5PreHaiBaTrung.data.profile,
      wallet: metaV5PreHaiBaTrung.data.wallet,
      inventory: metaV5PreHaiBaTrung.data.inventory,
      commandEnergy: metaV5PreHaiBaTrung.data.commandEnergy,
      rewardReceipts: metaV5PreHaiBaTrung.data.rewardReceipts,
      activePlayTime: metaV5PreHaiBaTrung.data.activePlayTime,
    }
    const { storage } = legacyStorage()
    let persistCount = 0
    const repository = new LocalMetaRepository(storage, () => { persistCount += 1 })

    ensureMetaRepositoryReady(repository, 'ignored-for-existing-save', 1_000)
    const first = repository.load()
    expect(first.status).toBe('loaded')
    if (first.status !== 'loaded') throw new Error('Expected bootstrapped V5 save')
    expect(first.save.schemaVersion).toBe(6)
    expect(first.save.revision).toBe(metaV5PreHaiBaTrung.revision + 1)
    expect(first.save.updatedAtMs).toBe(metaV5PreHaiBaTrung.updatedAtMs)
    expect(persistCount).toBe(2)
    expect(Object.keys(first.save.data.heroCollection)).toEqual([
      'quan-vu', 'trieu-van', 'truong-phi', 'hoang-trung', 'gia-cat-luong',
      'trung-trac', 'trung-nhi', 'le-chan',
    ])
    HAI_BA_TRUNG_HERO_IDS.forEach((heroId) => expect(first.save.data.heroCollection[heroId]).toEqual({
      heroId,
      stars: 1,
      progression: { stage: 'normal', level: 1 },
    }))
    Object.entries(oldHeroBytes).forEach(([heroId, bytes]) => {
      expect(JSON.stringify(first.save.data.heroCollection[heroId])).toBe(bytes)
    })
    expect({
      profile: first.save.data.profile,
      wallet: first.save.data.wallet,
      inventory: first.save.data.inventory,
      commandEnergy: first.save.data.commandEnergy,
      rewardReceipts: first.save.data.rewardReceipts,
      activePlayTime: first.save.data.activePlayTime,
    }).toEqual(oldNonHeroData)

    ensureMetaRepositoryReady(repository, 'ignored-for-existing-save', 20_000)
    const second = repository.load()
    expect(second).toEqual(first)
    expect(persistCount).toBe(2)
  })

  it('uses the active ownership gate for battle placement without reactivating legacy Heroes', () => {
    const collection = {
      ...createPrototypeHeroCollection(),
      'quan-vu': { heroId: 'quan-vu', stars: 5 as const, progression: { stage: 'legendary' as const, level: 100 } },
    }
    expect(isActiveHeroOwned(collection, 'quan-vu')).toBe(false)
    expect(isActiveHeroOwned(collection, 'trung-trac')).toBe(true)
    expect(selectPlayableOwnedHeroIds(collection, ACTIVE_HERO_IDS)).toEqual(HAI_BA_TRUNG_HERO_IDS)
  })

  it('recruits only active Heroes and creates Hero-specific duplicate shards', () => {
    expect(Object.keys(balanceV1.recruitment.weights)).toEqual(ACTIVE_HERO_IDS)
    const result = resolveRecruitmentBatch({ heroCollection: {}, consumables: { item_chieu_hien_lenh: 10 } }, 10, () => 0)
    expect(result.results.every(({ heroId }) => ACTIVE_HERO_IDS.includes(heroId as typeof ACTIVE_HERO_IDS[number]))).toBe(true)
    expect(result.state.consumables['shard_hero_trung-trac']).toBe(90)
  })

  it('defines exact shared skill triggers and effects without DEF', () => {
    expect(HAI_BA_TRUNG_HERO_IDS.map((id) => heroDefinitions[id].skillTriggerHits)).toEqual([5, 7, 5])
    expect(skillDefinitions['trong-dong-lenh-vuong'].effects).toEqual([{ type: 'aoe', radius: 170, maxTargets: 4 }, { type: 'damage', atkMultiplier: 2.2 }, { type: 'stun', durationMs: 800 }])
    expect(skillDefinitions['lien-hoan-lac-tien'].effects).toEqual([{ type: 'multiHit', hits: 3, intervalMs: 140 }, { type: 'damage', atkMultiplier: 1.1 }, { type: 'slow', ratio: 0.35, durationMs: 2000 }])
    expect(skillDefinitions['song-trao-hai-tan'].effects).toEqual([{ type: 'aoe', radius: 160, maxTargets: 3 }, { type: 'damage', atkMultiplier: 2 }, { type: 'root', durationMs: 1500 }])
    HAI_BA_TRUNG_HERO_IDS.forEach((id) => expect('def' in heroDefinitions[id].baseStats).toBe(false))
  })

  it('defines four data-only HBT enemies and a single Boss in Wave 10', () => {
    const ids = ['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'] as const
    expect(ids.map((id) => enemyDefinitions[id])).toMatchObject([
      { maxHp: 80, moveSpeed: 50, cityDamage: 1 }, { maxHp: 55, moveSpeed: 64, cityDamage: 1 },
      { maxHp: 145, moveSpeed: 36, cityDamage: 2 }, { maxHp: 1200, moveSpeed: 38, cityDamage: 10 },
    ])
    ids.forEach((id) => expect('def' in enemyDefinitions[id]).toBe(false))
    expect(prototypeWaves).toHaveLength(24)
    prototypeWaves.flatMap((wave) => wave.groups).forEach((group) => expect(enemyDefinitions[group.enemyId]).toBeDefined())
    expect(prototypeWaves[23].groups.filter(({ enemyId }) => enemyId === 'boss-ma-vien')).toEqual([expect.objectContaining({ count: 1 })])
    expect(ids.map((id) => balanceV1.rewardSources.enemyKillGold[id])).toEqual([1, 1, 2, 2])
  })
})
