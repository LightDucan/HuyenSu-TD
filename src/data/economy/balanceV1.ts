import { CONSUMABLE_ITEM_IDS } from '../items/definitions'

export const balanceV1 = {
  commandEnergy: { cap: 60, regenIntervalMs: 120_000, waveCost: 1, binhPhu: { small: 1, medium: 5, large: 10 } },
  gold: { killReward: 2, stageClearReward: 100, gachaPullCost: 100 },
  gacha: {
    weights: { gold: 40, weapon: 28, gem: 24, smallBinhPhu: 4, mediumBinhPhu: 2.5, largeBinhPhu: 1.5 },
    goldReturn: 20, pityEnabled: false as const,
  },
  knbShop: { chieuHienLenh: 10, summonOrder: 25 },
  recruitment: { weights: { 'quan-vu': 20, 'trieu-van': 20, 'truong-phi': 20, 'hoang-trung': 20, 'gia-cat-luong': 20 }, duplicateShards: 10, pulls: { one: 1, ten: 10 } },
  stars: { shardCosts: { 2: 10, 3: 25, 4: 50, 5: 100 }, max: 5 },
  evolution: { anhHonCosts: { rebirth: 100, reincarnation: 250, legendary: 500 }, materialId: 'anh-hon', anhHonPerEligibleHour: 1 },
  activePlay: { knbPerInterval: 1, intervalMs: 60_000 },
  equipment: { levelCount: 10, mergeInputs: 3 },
  items: { chieuHienLenh: CONSUMABLE_ITEM_IDS.recruitmentDecree },
} as const

type Widen<T> = T extends number ? number : T extends boolean ? boolean : T extends readonly unknown[] ? T : { [K in keyof T]: Widen<T[K]> }
export type BalanceV1 = Widen<typeof balanceV1>
