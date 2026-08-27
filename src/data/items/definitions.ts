export const CONSUMABLE_ITEM_IDS = {
  smallEnergyToken: 'tieu-binh-phu',
  mediumEnergyToken: 'trung-binh-phu',
  largeEnergyToken: 'dai-binh-phu',
  recruitmentDecree: 'item_chieu_hien_lenh',
  summonOrder: 'item_lenh_hieu_trieu',
} as const

export const commandEnergyItemValues: Readonly<Record<string, number>> = {
  [CONSUMABLE_ITEM_IDS.smallEnergyToken]: 1,
  [CONSUMABLE_ITEM_IDS.mediumEnergyToken]: 5,
  [CONSUMABLE_ITEM_IDS.largeEnergyToken]: 10,
}

