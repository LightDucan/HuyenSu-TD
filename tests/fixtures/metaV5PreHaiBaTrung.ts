import type { MetaSave } from '../../src/domain/meta/MetaState'

/** Literal save captured at the pre-HBT V5 content boundary. Never derive this from current bootstrap code. */
export const metaV5PreHaiBaTrung: MetaSave = {
  schemaVersion: 5,
  revision: 17,
  updatedAtMs: 9_000,
  data: {
    profile: {
      schemaVersion: 1,
      playerId: 'legacy-v5-player',
      playerLevel: 12,
      playerExp: 345,
      createdAtMs: 100,
      updatedAtMs: 8_500,
      summonOrderCount: 2,
    },
    wallet: { balances: { gold: 777, knb: 33 } },
    inventory: {
      consumables: {
        item_chieu_hien_lenh: 4,
        shard_hero_quan_vu: 27,
        'anh-hon': 120,
      },
      equipmentInstances: {
        'legacy-blade-1': { instanceId: 'legacy-blade-1', definitionId: 'weapon-test-atk', slot: 'weapon', level: 3 },
      },
      equippedByHero: {
        'quan-vu': { weaponInstanceId: 'legacy-blade-1' },
      },
      unresolvedLegacyEquipmentInstanceIds: ['old-gem-unresolved'],
    },
    commandEnergy: { current: 44, regenAnchorAtMs: 8_000 },
    rewardReceipts: {
      'stage:legacy-run:prototype-stage-01': { transactionFingerprint: 'legacy-stage-fingerprint', committedAtMs: 7_000 },
    },
    activePlayTime: { observedVisibleMs: 360_000, observedHiddenMs: 120_000, remainderEligibleMs: 45_000 },
    heroCollection: {
      'quan-vu': { heroId: 'quan-vu', stars: 5, progression: { stage: 'reincarnation', level: 73, upgradeReadyAt: 10_000 } },
      'trieu-van': { heroId: 'trieu-van', stars: 4, progression: { stage: 'rebirth', level: 51 } },
      'truong-phi': { heroId: 'truong-phi', stars: 3, progression: { stage: 'normal', level: 99 } },
      'hoang-trung': { heroId: 'hoang-trung', stars: 2, progression: { stage: 'legendary', level: 12 } },
      'gia-cat-luong': { heroId: 'gia-cat-luong', stars: 1, progression: { stage: 'normal', level: 7 } },
    },
  },
}
