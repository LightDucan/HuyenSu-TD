import type { StorageLike } from '../progression/ProgressionStorage'
import type { HeroEquipment } from './EquipmentSystem'

export type EquipmentSave = Readonly<{ version: 1; heroes: Record<string, HeroEquipment> }>

export const EQUIPMENT_STORAGE_KEY = 'huyen-su-td/equipment-v1'

export function loadEquipment(storage: StorageLike): EquipmentSave {
  const raw = storage.getItem(EQUIPMENT_STORAGE_KEY)
  if (!raw) return { version: 1, heroes: {} }
  try {
    const parsed = JSON.parse(raw) as EquipmentSave
    if (parsed.version !== 1 || typeof parsed.heroes !== 'object' || parsed.heroes == null) throw new Error('Invalid equipment save')
    return parsed
  } catch {
    return { version: 1, heroes: {} }
  }
}

export function saveHeroEquipment(storage: StorageLike, heroId: string, equipment: HeroEquipment): EquipmentSave {
  const save = loadEquipment(storage)
  const next: EquipmentSave = { version: 1, heroes: { ...save.heroes, [heroId]: equipment } }
  storage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(next))
  return next
}
