import { describe, expect, it } from 'vitest'
import { BA_TRIEU_STAGE_IDS, baTrieuChapter } from '../../src/data/campaign/baTrieuCampaign'
import { productionCampaignCatalog, validateCampaignCatalog } from '../../src/data/campaign/catalog'
import { HAI_BA_TRUNG_STAGE06_ID, haiBaTrungChapter } from '../../src/data/campaign/haiBaTrungCampaign'
import { balanceV1 } from '../../src/data/economy/balanceV1'
import { ACTIVE_HERO_IDS, BA_TRIEU_HERO_IDS, HAI_BA_TRUNG_HERO_IDS, heroDefinitions } from '../../src/data/heroes/definitions'
import { createProductionRewardConfig, productionRewardBalance } from '../../src/data/rewards/prototypeRewardConfig'
import { resolveProductionHeroVisual } from '../../src/data/assets/prototypeVisualAssets'
import { selectSafeStage, selectStageProgress } from '../../src/domain/campaign/CampaignProgression'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import { ACTIVE_PRODUCTION_HERO_IDS, CHIEU_HIEN_LENH_ID, createPrototypeHeroCollection, prototypeHeroRecruitmentConfig, resolveRecruitmentBatch, STARTER_HERO_IDS } from '../../src/domain/meta/HeroRecruitment'
import { LocalMetaRepository } from '../../src/domain/meta/MetaRepository'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import { ensureMetaRepositoryReady, RewardRuntimeController } from '../../src/runtime/RewardRuntime'

const storage = (): StorageLike => { const values = new Map<string, string>(); return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) } }

describe('GAME-C06 Bà Triệu roster and rewards', () => {
  it('separates HBT, Bà Triệu, production and starter Hero groups', () => {
    expect(HAI_BA_TRUNG_HERO_IDS).toEqual(['trung-trac', 'trung-nhi', 'le-chan'])
    expect(BA_TRIEU_HERO_IDS).toEqual(['ba-trieu', 'trieu-quoc-dat', 'dinh-boi'])
    expect(ACTIVE_HERO_IDS).toEqual([...HAI_BA_TRUNG_HERO_IDS, ...BA_TRIEU_HERO_IDS])
    expect(ACTIVE_PRODUCTION_HERO_IDS).toEqual(ACTIVE_HERO_IDS)
    expect(STARTER_HERO_IDS).toEqual(HAI_BA_TRUNG_HERO_IDS)
    expect(Object.keys(createPrototypeHeroCollection())).toEqual(HAI_BA_TRUNG_HERO_IDS)
    expect(Object.keys(createInitialMetaState('fresh', 0).heroCollection)).toEqual(HAI_BA_TRUNG_HERO_IDS)
  })

  it('defines all three Heroes and their provisional shared-effect skills', () => {
    expect(BA_TRIEU_HERO_IDS.map((id) => heroDefinitions[id].activeSkillId)).toEqual(['gio-manh-nui-nua', 'hieu-trieu-quan-yen', 'giu-luy-bo-dien'])
    BA_TRIEU_HERO_IDS.forEach((id) => expect(Object.keys(heroDefinitions[id].baseStats).sort()).toEqual(['hp', 'atk', 'range', 'attackSpeed', 'crit', 'critDamage'].sort()))
  })

  it('recruits every Bà Triệu Hero deterministically through the existing resolver', () => {
    expect(prototypeHeroRecruitmentConfig.pool.map(({ heroId }) => heroId)).toEqual(ACTIVE_HERO_IDS)
    const recruit = (roll: number) => resolveRecruitmentBatch({ heroCollection: {}, consumables: { [CHIEU_HIEN_LENH_ID]: 1 } }, 1, () => roll).results[0].heroId
    expect([recruit(0.51), recruit(0.68), recruit(0.85)]).toEqual(BA_TRIEU_HERO_IDS)
  })

  it('keeps chapter Hero boundaries and blocks zero-owned Bà Triệu selection', () => {
    expect(haiBaTrungChapter.stages[0].allowedHeroIds).toEqual(HAI_BA_TRUNG_HERO_IDS)
    baTrieuChapter.stages.forEach((stage) => expect(stage.allowedHeroIds).toEqual(BA_TRIEU_HERO_IDS))
    const unlocked = { completedStages: { [HAI_BA_TRUNG_STAGE06_ID]: { firstCompletedAtMs: 1 } } }
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], unlocked, HAI_BA_TRUNG_HERO_IDS)).toBeUndefined()
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], unlocked, ['ba-trieu'])?.id).toBe(BA_TRIEU_STAGE_IDS[0])
  })

  it('resolves safe no-art production visuals without borrowing HBT assets', () => {
    BA_TRIEU_HERO_IDS.forEach((heroId) => expect(resolveProductionHeroVisual(heroId)).toMatchObject({ heroId, portraitUrl: undefined, idleUrl: undefined, attackUrl: undefined, vfxUrl: undefined }))
  })

  it('covers all Wu enemies and Bà Triệu stages in the production reward config', () => {
    expect(['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'].map((id) => productionRewardBalance.enemyKillGold[id])).toEqual([1, 1, 2, 2])
    expect(Object.fromEntries(BA_TRIEU_STAGE_IDS.map((id) => [id, productionRewardBalance.stageClear[id]]))).toEqual(balanceV1.rewardSources.stageClear.baTrieu)
  })

  it('keeps Bà Triệu kill/stage rewards idempotent per run and repeatable on a new run', () => {
    const s = storage(); const repository = new LocalMetaRepository(s); const bridge = new BattleBridge(); ensureMetaRepositoryReady(repository, 'reward', 0)
    const runtime = new RewardRuntimeController(repository, bridge, createProductionRewardConfig('visible-only')); runtime.start()
    bridge.reportEnemyDefeated({ runId: 'run-1', enemyInstanceId: 'wu-1', enemyId: 'wu-sword-infantry', occurredAtMs: 1 })
    bridge.reportEnemyDefeated({ runId: 'run-1', enemyInstanceId: 'wu-1', enemyId: 'wu-sword-infantry', occurredAtMs: 2 })
    bridge.reportStageVictory({ runId: 'run-1', stageId: BA_TRIEU_STAGE_IDS[0], occurredAtMs: 3 })
    bridge.reportStageVictory({ runId: 'run-1', stageId: BA_TRIEU_STAGE_IDS[0], occurredAtMs: 4 })
    bridge.reportStageVictory({ runId: 'run-2', stageId: BA_TRIEU_STAGE_IDS[0], occurredAtMs: 5 })
    const current = repository.load(); expect(current.status === 'loaded' && current.save.data.wallet.balances).toEqual({ gold: 41, knb: 2 })
    runtime.stop()
  })

  it('lets chapter lock outrank stale completion and restores it after the prerequisite returns', () => {
    const stale = { completedStages: { [BA_TRIEU_STAGE_IDS[0]]: { firstCompletedAtMs: 5 } } }
    expect(selectStageProgress(baTrieuChapter, stale, BA_TRIEU_STAGE_IDS[0])).toBe('locked')
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], stale, ['ba-trieu'])).toBeUndefined()
    const restored = { completedStages: { ...stale.completedStages, [HAI_BA_TRUNG_STAGE06_ID]: { firstCompletedAtMs: 1 } } }
    expect(selectStageProgress(baTrieuChapter, restored, BA_TRIEU_STAGE_IDS[0])).toBe('completed')
    expect(selectSafeStage([baTrieuChapter], BA_TRIEU_STAGE_IDS[0], restored, ['ba-trieu'])?.id).toBe(BA_TRIEU_STAGE_IDS[0])
    expect(validateCampaignCatalog(productionCampaignCatalog)).toEqual([])
  })
})
