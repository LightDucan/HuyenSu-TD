import { CONSUMABLE_ITEM_IDS } from '../items/definitions'

export const balanceV1 = {
  commandEnergy: { cap: 60, regenIntervalMs: 120_000, waveCost: 1, binhPhu: { small: 1, medium: 5, large: 10 } },
  gold: { killReward: 2, stageClearReward: 100, gachaPullCost: 100 },
  rewardSources: {
    enemyKillGold: { 'yellow-turban-sword': 1, 'yellow-turban-archer': 1, 'yellow-turban-brute': 2 },
    stageClear: { prototypeStage: { gold: 20, knb: 1, anhHon: 10 } },
  },
  gacha: {
    weights: { gold: 40, weapon: 28, gem: 24, smallBinhPhu: 4, mediumBinhPhu: 2.5, largeBinhPhu: 1.5 },
    goldReturn: 20, pityEnabled: false as const,
  },
  knbShop: { chieuHienLenh: 10, summonOrder: 25 },
  recruitment: { weights: { 'quan-vu': 20, 'trieu-van': 20, 'truong-phi': 20, 'hoang-trung': 20, 'gia-cat-luong': 20 }, duplicateShards: 10, pulls: { one: 1, ten: 10 } },
  stars: { shardCosts: { 2: 10, 3: 25, 4: 50, 5: 100 }, max: 5, flatGrowth: { 1: {}, 2: { hp: 100, atk: 10, range: 1, attackSpeed: 1, crit: 1, critDamage: 5 }, 3: { hp: 250, atk: 25, range: 2, attackSpeed: 2, crit: 2, critDamage: 10 }, 4: { hp: 500, atk: 50, range: 3, attackSpeed: 3, crit: 3, critDamage: 20 }, 5: { hp: 900, atk: 90, range: 4, attackSpeed: 4, crit: 5, critDamage: 35 } } },
  evolution: { anhHonCosts: { rebirth: 100, reincarnation: 250, legendary: 500 }, materialId: 'anh-hon', anhHonPerEligibleHour: 1 },
  activePlay: { knbPerInterval: 1, intervalMs: 60_000 },
  equipment: {
    levelCount: 10,
    mergeInputs: 3,
    tables: {
      'green-dragon-blade': { slot: 'weapon', levels: { 1: { atk: 12, range: 8 }, 2: { atk: 15, range: 9 }, 3: { atk: 18, range: 10 }, 4: { atk: 21, range: 11 }, 5: { atk: 24, range: 12 }, 6: { atk: 27, range: 13 }, 7: { atk: 30, range: 14 }, 8: { atk: 33, range: 15 }, 9: { atk: 36, range: 16 }, 10: { atk: 40, range: 18 } } },
      'swift-jade': { slot: 'gem', levels: { 1: { attackSpeed: 0.15 }, 2: { attackSpeed: 0.18 }, 3: { attackSpeed: 0.21 }, 4: { attackSpeed: 0.24 }, 5: { attackSpeed: 0.27 }, 6: { attackSpeed: 0.3 }, 7: { attackSpeed: 0.33 }, 8: { attackSpeed: 0.36 }, 9: { attackSpeed: 0.39 }, 10: { attackSpeed: 0.45 } } },
    },
  },
  simulation: { minutesPerDay: { casual: 30, regular: 60, active: 120 }, enemiesPerWave: 10, wavesPerHour: 30, startingHeroIds: [] as readonly string[] },
  items: { chieuHienLenh: CONSUMABLE_ITEM_IDS.recruitmentDecree },
} as const

type Widen<T> = T extends number ? number : T extends boolean ? boolean : T extends readonly unknown[] ? T : { [K in keyof T]: Widen<T[K]> }
export type BalanceV1 = Widen<typeof balanceV1>
