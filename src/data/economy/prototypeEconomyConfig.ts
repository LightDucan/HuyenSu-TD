import { CONSUMABLE_ITEM_IDS } from '../items/definitions'

export type GachaRewardConfig =
  | Readonly<{ id: string; type: 'gold'; amount: number; weight: number }>
  | Readonly<{ id: string; type: 'equipment'; definitionId: string; weight: number }>
  | Readonly<{ id: string; type: 'consumable'; itemId: string; quantity: number; weight: number }>

export type GoldGachaConfig = Readonly<{
  pullCostGold: number
  rewards: readonly GachaRewardConfig[]
  pity: Readonly<{ enabled: false }>
}>

export type KnbShopEntry = Readonly<{ itemId: string; quantity: number; priceKnb: number; name: string }>

// PROTOTYPE / NON-FINAL BALANCE CONFIG. Phase 18 owns cost, rates and Gold return.
export const prototypeGoldGachaConfig: GoldGachaConfig = {
  pullCostGold: 100,
  pity: { enabled: false },
  rewards: [
    { id: 'gold-return', type: 'gold', amount: 20, weight: 40 },
    { id: 'weapon-lv1', type: 'equipment', definitionId: 'green-dragon-blade', weight: 28 },
    { id: 'gem-lv1', type: 'equipment', definitionId: 'swift-jade', weight: 24 },
    { id: 'small-energy-token', type: 'consumable', itemId: CONSUMABLE_ITEM_IDS.smallEnergyToken, quantity: 1, weight: 4 },
    { id: 'medium-energy-token', type: 'consumable', itemId: CONSUMABLE_ITEM_IDS.mediumEnergyToken, quantity: 1, weight: 2.5 },
    { id: 'large-energy-token', type: 'consumable', itemId: CONSUMABLE_ITEM_IDS.largeEnergyToken, quantity: 1, weight: 1.5 },
  ],
}

// PROTOTYPE / NON-FINAL BALANCE CONFIG. Phase 18 owns final KNB prices.
export const prototypeKnbShopConfig: readonly KnbShopEntry[] = [
  { itemId: CONSUMABLE_ITEM_IDS.recruitmentDecree, quantity: 1, priceKnb: 10, name: 'Chiêu Hiền Lệnh' },
  { itemId: CONSUMABLE_ITEM_IDS.summonOrder, quantity: 1, priceKnb: 25, name: 'Lệnh Hiệu Triệu' },
]

