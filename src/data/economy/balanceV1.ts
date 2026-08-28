import { CONSUMABLE_ITEM_IDS } from '../items/definitions'

const sharedWeaponLevels = { 1: { atk: 12, range: 8 }, 2: { atk: 15, range: 9 }, 3: { atk: 18, range: 10 }, 4: { atk: 21, range: 11 }, 5: { atk: 24, range: 12 }, 6: { atk: 27, range: 13 }, 7: { atk: 30, range: 14 }, 8: { atk: 33, range: 15 }, 9: { atk: 36, range: 16 }, 10: { atk: 40, range: 18 } } as const
const sharedGemLevels = { 1: { attackSpeed: 0.15 }, 2: { attackSpeed: 0.18 }, 3: { attackSpeed: 0.21 }, 4: { attackSpeed: 0.24 }, 5: { attackSpeed: 0.27 }, 6: { attackSpeed: 0.3 }, 7: { attackSpeed: 0.33 }, 8: { attackSpeed: 0.36 }, 9: { attackSpeed: 0.39 }, 10: { attackSpeed: 0.45 } } as const
const sharedWeaponTable = { slot: 'weapon' as const, levels: sharedWeaponLevels }
const sharedGemTable = { slot: 'gem' as const, levels: sharedGemLevels }

export const balanceV1 = {
  commandEnergy: { cap: 60, regenIntervalMs: 120_000, waveCost: 1, binhPhu: { small: 1, medium: 5, large: 10 } },
  gold: { gachaPullCost: 100 },
  rewardSources: {
    enemyKillGold: { 'han-sword-infantry': 1, 'han-crossbow-soldier': 1, 'han-armored-guard': 2, 'boss-ma-vien': 2 },
    stageClear: { prototypeStage: { gold: 20, knb: 1, anhHon: 10 } },
  },
  gacha: {
    weights: { gold: 40, weapon: 28, gem: 24, smallBinhPhu: 4, mediumBinhPhu: 2.5, largeBinhPhu: 1.5 },
    goldReturn: 20, pityEnabled: false as const,
  },
  knbShop: { chieuHienLenh: 10, summonOrder: 25 },
  recruitment: { weights: { 'trung-trac': 1, 'trung-nhi': 1, 'le-chan': 1 }, duplicateShards: 10, pulls: { one: 1, ten: 10 } },
  stars: { shardCosts: { 2: 10, 3: 25, 4: 50, 5: 100 }, max: 5, flatGrowth: { 1: {}, 2: { hp: 100, atk: 10, range: 1, attackSpeed: 1, crit: 1, critDamage: 5 }, 3: { hp: 250, atk: 25, range: 2, attackSpeed: 2, crit: 2, critDamage: 10 }, 4: { hp: 500, atk: 50, range: 3, attackSpeed: 3, crit: 3, critDamage: 20 }, 5: { hp: 900, atk: 90, range: 4, attackSpeed: 4, crit: 5, critDamage: 35 } } },
  evolution: { anhHonCosts: { rebirth: 100, reincarnation: 250, legendary: 500 }, materialId: 'anh-hon' },
  activePlay: { knbPerInterval: 1, intervalMs: 60_000 },
  equipment: {
    levelCount: 10,
    mergeInputs: 3,
    tables: {
      'lac-viet-bronze-sword': sharedWeaponTable,
      'green-dragon-blade': sharedWeaponTable,
      'lac-viet-swift-jade': sharedGemTable,
      'swift-jade': sharedGemTable,
    },
  },
  simulation: { minutesPerDay: { casual: 30, regular: 60, active: 120 }, wavesPerHour: 30, enemiesPerWave: 10, level100Readiness: { daysPerStage: 30 }, startingHeroIds: [] as readonly string[] },
  items: { chieuHienLenh: CONSUMABLE_ITEM_IDS.recruitmentDecree },
} as const

type Widen<T> = T extends number ? number : T extends boolean ? boolean : T extends readonly unknown[] ? T : { [K in keyof T]: Widen<T[K]> }
export type BalanceV1 = Widen<typeof balanceV1>
