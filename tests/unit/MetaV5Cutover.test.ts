import { describe, expect, it, vi } from 'vitest'
import appSource from '../../src/ui/App.tsx?raw'
import modalSource from '../../src/ui/HeroDetailModal.tsx?raw'
import panelSource from '../../src/ui/HeroProgressionPanel.tsx?raw'
import battleSceneSource from '../../src/game/scenes/BattleScene.ts?raw'
import { LocalMetaRepository, META_STORAGE_KEY } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState, type MetaState } from '../../src/domain/meta/MetaState'
import { validateMetaSave } from '../../src/domain/meta/MetaValidation'
import { PROGRESSION_STORAGE_KEY, type StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { HeroMetaRuntimeController } from '../../src/runtime/HeroMetaRuntime'
import { ANH_HON_ID, CHIEU_HIEN_LENH_ID, isHeroOwned, selectPlayableOwnedHeroIds } from '../../src/domain/meta/HeroRecruitment'
import { calculateHeroStats, type HeroBaseStats } from '../../src/domain/progression/StatCalculator'
import { prototypeEquipmentV2Definitions } from '../../src/data/equipment/definitions'

function memoryStorage(entries: Readonly<Record<string, string>> = {}): { storage: StorageLike; values: Map<string, string> } {
  const values = new Map(Object.entries(entries))
  return { storage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value) } }, values }
}

function ready(heroCollection: MetaState['heroCollection'] = createInitialMetaState('player', 0).heroCollection) {
  const memory = memoryStorage()
  const repository = new LocalMetaRepository(memory.storage)
  repository.save({ ...createInitialMetaState('player', 0), heroCollection }, 0, 0)
  return { ...memory, repository }
}

describe('FAST-05A canonical Meta V5 repository', () => {
  it('loads and saves V5 with a validated heroCollection', () => {
    const { repository } = ready()
    const loaded = repository.load()
    expect(loaded).toMatchObject({ status: 'loaded', save: { schemaVersion: 6, revision: 1 } })
    if (loaded.status === 'loaded') expect(validateMetaSave(loaded.save).ok).toBe(true)
    const malformed = loaded.status === 'loaded' ? { ...loaded.save, data: { ...loaded.save.data, heroCollection: { bad: { heroId: 'other', stars: 7, progression: { stage: 'normal', level: 0 } } } } } : undefined
    expect(validateMetaSave(malformed).ok).toBe(false)
  })

  it('migrates V4 through the repository once and preserves invalid legacy input', () => {
    const canonical = createInitialMetaState('player', 0)
    const { heroCollection: _heroes, campaignProgress: _progress, ...v4State } = canonical
    const rawV4 = JSON.stringify({ schemaVersion: 4, revision: 3, updatedAtMs: 0, data: v4State })
    const legacy = JSON.stringify({ version: 1, heroes: { 'quan-vu': { stage: 'rebirth', level: 8 } } })
    const valid = memoryStorage({ [META_STORAGE_KEY]: rawV4, [PROGRESSION_STORAGE_KEY]: legacy })
    const repository = new LocalMetaRepository(valid.storage)
    const migrated = repository.migrateV4(3)
    expect(migrated).toMatchObject({ schemaVersion: 6, revision: 3, data: { heroCollection: { 'quan-vu': { progression: { stage: 'rebirth', level: 8 } } } } })
    expect(repository.load()).toMatchObject({ status: 'loaded', save: { revision: 3 } })

    const invalidLegacy = '{bad-json'
    const invalid = memoryStorage({ [META_STORAGE_KEY]: rawV4, [PROGRESSION_STORAGE_KEY]: invalidLegacy })
    expect(() => new LocalMetaRepository(invalid.storage).migrateV4(3)).toThrow('legacy progression')
    expect(invalid.values.get(META_STORAGE_KEY)).toBe(rawV4)
    expect(invalid.values.get(PROGRESSION_STORAGE_KEY)).toBe(invalidLegacy)
  })

  it('keeps Reward, Command Energy, Equipment and Economy transactions operational after V4→V5 migration', () => {
    const canonical = createInitialMetaState('player', 0)
    const { heroCollection: _heroes, campaignProgress: _progress, ...v4State } = canonical
    const memory = memoryStorage({ [META_STORAGE_KEY]: JSON.stringify({ schemaVersion: 4, revision: 1, updatedAtMs: 0, data: v4State }) })
    const repository = new LocalMetaRepository(memory.storage)
    const migrated = repository.migrateV4(1)
    const reward = repository.transactReward({ idempotencyKey: 'post-migration/reward', operations: [{ type: 'grant-currency', currency: 'gold', amount: 10 }] }, migrated.revision, 1)
    const energy = repository.spendCommandEnergy(1, reward.save.revision, 2)
    const equipment = repository.transactEquipment({ idempotencyKey: 'post-migration/equipment', operation: { type: 'grant-instance', instance: { instanceId: 'post-migration-weapon', definitionId: 'green-dragon-blade', slot: 'weapon', level: 1 } } }, prototypeEquipmentV2Definitions, energy.save.revision, 3)
    const economy = repository.transactEconomy({ idempotencyKey: 'post-migration/economy', operations: [{ type: 'grant-currency', currency: 'knb', amount: 1 }] }, prototypeEquipmentV2Definitions, equipment.save.revision, 4)
    expect(economy.save).toMatchObject({ schemaVersion: 6, revision: 5, data: { wallet: { balances: { gold: 10, knb: 1 } }, commandEnergy: { current: 59 }, inventory: { equipmentInstances: { 'post-migration-weapon': expect.any(Object) } } } })
  })
})

describe('FAST-05A Hero Meta runtime', () => {
  it('upgrades one level in V5, publishes the snapshot, refreshes the placed Hero, and is idempotent', () => {
    const { repository } = ready()
    const bridge = new BattleBridge()
    const snapshots = vi.fn(); const refreshes = vi.fn()
    bridge.onMetaSnapshot(snapshots); bridge.onPlacedHeroStatsRefresh(refreshes)
    const runtime = new HeroMetaRuntimeController(repository, bridge)
    const first = runtime.upgradeLevel('trung-trac', { expectedRevision: 1, idempotencyKey: 'hero/upgrade/1', committedAtMs: 100 })
    expect(first.save).toMatchObject({ revision: 2, updatedAtMs: 100, data: { heroCollection: { 'trung-trac': { progression: { level: 2 } } }, rewardReceipts: { 'hero/upgrade/1': { committedAtMs: 100 } } } })
    expect(snapshots).toHaveBeenCalledWith(first.save)
    expect(refreshes).toHaveBeenCalledWith('trung-trac')
    const retry = runtime.upgradeLevel('trung-trac', { expectedRevision: 2, idempotencyKey: 'hero/upgrade/1', committedAtMs: 100 })
    expect(retry.save.revision).toBe(2)
    expect(() => runtime.upgradeLevel('trieu-van', { expectedRevision: 2, idempotencyKey: 'hero/upgrade/1', committedAtMs: 101 })).toThrow('different payload')
    expect(() => runtime.upgradeLevel('trung-trac', { expectedRevision: 2, idempotencyKey: 'hero/upgrade/clock', committedAtMs: 99 })).toThrow('monotonic')
  })

  it('rejects free evolution and consumes Anh Hồn atomically while preserving stars', () => {
    const { repository } = ready()
    const initial = repository.load(); if (initial.status !== 'loaded') throw new Error('missing save')
    const hero = initial.save.data.heroCollection['trung-trac']
    repository.save({ ...initial.save.data, heroCollection: { ...initial.save.data.heroCollection, 'trung-trac': { ...hero, stars: 4, progression: { stage: 'normal', level: 100 } } } }, 1, 10)
    const bridge = new BattleBridge()
    const refreshes = vi.fn(); bridge.onPlacedHeroStatsRefresh(refreshes)
    const runtime = new HeroMetaRuntimeController(repository, bridge)
    expect(() => runtime.evolve('trung-trac', { expectedRevision: 2, idempotencyKey: 'evolve/no-material', committedAtMs: 20 })).toThrow('Anh Hồn')
    const current = repository.load(); if (current.status !== 'loaded') throw new Error('missing save')
    repository.save({ ...current.save.data, inventory: { ...current.save.data.inventory, consumables: { ...current.save.data.inventory.consumables, [ANH_HON_ID]: 100 } } }, 2, 20)
    const evolved = runtime.evolve('trung-trac', { expectedRevision: 3, idempotencyKey: 'evolve/paid', committedAtMs: 30 })
    expect(evolved.save.data.heroCollection['trung-trac']).toMatchObject({ stars: 4, progression: { stage: 'rebirth', level: 1 } })
    expect(evolved.save.data.inventory.consumables[ANH_HON_ID]).toBe(0)
    expect(refreshes).toHaveBeenCalledWith('trung-trac')
  })

  it('recruits through V5, makes a new Hero selectable, and blocks unowned deployment selection', () => {
    const { repository } = ready({})
    const initial = repository.load(); if (initial.status !== 'loaded') throw new Error('missing save')
    repository.save({ ...initial.save.data, inventory: { ...initial.save.data.inventory, consumables: { [CHIEU_HIEN_LENH_ID]: 10 } } }, 1, 1)
    const bridge = new BattleBridge()
    const refreshes = vi.fn(); bridge.onPlacedHeroStatsRefresh(refreshes)
    const runtime = new HeroMetaRuntimeController(repository, bridge)
    const recruited = runtime.recruit(10, () => 0, { expectedRevision: 2, idempotencyKey: 'recruit/10', committedAtMs: 2 })
    expect(recruited.results[0].outcome).toBe('new')
    expect(recruited.results[1].outcome).toBe('duplicate')
    const starred = runtime.ascendStar('trung-trac', { expectedRevision: 3, idempotencyKey: 'star/2', committedAtMs: 3 })
    expect(starred.save.data.heroCollection['trung-trac'].stars).toBe(2)
    expect(refreshes).toHaveBeenCalledWith('trung-trac')
    expect(selectPlayableOwnedHeroIds(recruited.save.data.heroCollection, ['trung-trac', 'trung-nhi'])).toEqual(['trung-trac'])
    expect(isHeroOwned(recruited.save.data.heroCollection, 'trung-trac')).toBe(true)
    expect(isHeroOwned(recruited.save.data.heroCollection, 'trung-nhi')).toBe(false)
  })
})

describe('FAST-05A shared star and Legendary stats', () => {
  const base: HeroBaseStats = { hp: 100, atk: 20, range: 100, attackSpeed: 1, crit: 0.1, critDamage: 1.5 }
  it('applies all six flat star bonuses and Legendary percentages only when supplied', () => {
    const starGrowth = { 5: { hp: 10, atk: 5, range: 2, attackSpeed: 0.2, crit: 0.03, critDamage: 0.2 } }
    const noStar = calculateHeroStats(base, { stage: 'reincarnation', level: 1 })
    const pre = calculateHeroStats(base, { stage: 'reincarnation', level: 1 }, {}, {}, 5, starGrowth)
    const legendaryBase = calculateHeroStats(base, { stage: 'legendary', level: 1 }, {}, {}, 5, starGrowth)
    const legendary = calculateHeroStats(base, { stage: 'legendary', level: 1 }, {}, {}, 5, starGrowth, { atkPercent: 0.2, attackSpeedPercent: 0.1 })
    expect(pre).toEqual({ hp: noStar.hp + 10, atk: noStar.atk + 5, range: noStar.range + 2, attackSpeed: noStar.attackSpeed + 0.2, crit: noStar.crit + 0.03, critDamage: noStar.critDamage + 0.2 })
    expect(legendary.atk).toBeGreaterThan(legendaryBase.atk)
    expect(legendary.attackSpeed).toBeGreaterThan(legendaryBase.attackSpeed)
  })
})

describe('FAST-05A production legacy progression ban', () => {
  it('keeps App, Hero UI, and Battle runtime free of legacy progression storage APIs and free advanceStage calls', () => {
    const production = [appSource, modalSource, panelSource, battleSceneSource].join('\n')
    expect(production).not.toMatch(/ProgressionStorage|loadProgression\s*\(|saveHeroProgression\s*\(|saveProgressionAndRefresh\s*\(/)
    expect(appSource).not.toMatch(/advanceStage\s*\(/)
  })
})
