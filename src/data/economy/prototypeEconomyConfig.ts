import { CONSUMABLE_ITEM_IDS } from '../items/definitions'
import { balanceV1 } from './balanceV1'

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

export const prototypeGoldGachaConfig: GoldGachaConfig = {
  pullCostGold: balanceV1.gold.gachaPullCost,
  pity: { enabled: balanceV1.gacha.pityEnabled },
  rewards: [
    { id: 'gold-return', type: 'gold', amount: balanceV1.gacha.goldReturn, weight: balanceV1.gacha.weights.gold },
    { id: 'weapon-lv1', type: 'equipment', definitionId: 'green-dragon-blade', weight: balanceV1.gacha.weights.weapon },
    { id: 'gem-lv1', type: 'equipment', definitionId: 'swift-jade', weight: balanceV1.gacha.weights.gem },
    { id: 'small-energy-token', type: 'consumable', itemId: CONSUMABLE_ITEM_IDS.smallEnergyToken, quantity: 1, weight: balanceV1.gacha.weights.smallBinhPhu },
    { id: 'medium-energy-token', type: 'consumable', itemId: CONSUMABLE_ITEM_IDS.mediumEnergyToken, quantity: 1, weight: balanceV1.gacha.weights.mediumBinhPhu },
    { id: 'large-energy-token', type: 'consumable', itemId: CONSUMABLE_ITEM_IDS.largeEnergyToken, quantity: 1, weight: balanceV1.gacha.weights.largeBinhPhu },
  ],
}

export const prototypeKnbShopConfig: readonly KnbShopEntry[] = [
  { itemId: CONSUMABLE_ITEM_IDS.recruitmentDecree, quantity: 1, priceKnb: balanceV1.knbShop.chieuHienLenh, name: 'Chiêu Hiền Lệnh' },
  { itemId: CONSUMABLE_ITEM_IDS.summonOrder, quantity: 1, priceKnb: balanceV1.knbShop.summonOrder, name: 'Lệnh Hiệu Triệu' },
]

