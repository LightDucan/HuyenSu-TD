import type { HeroProgression } from './ProgressionSystem'

export type StorageLike = Pick<Storage, 'getItem' | 'setItem'>
export type ProgressionSave = Readonly<{ version: 1; heroes: Record<string, HeroProgression> }>

export const PROGRESSION_STORAGE_KEY = 'huyen-su-td/progression-v1'

export function loadProgression(storage: StorageLike): ProgressionSave {
  const raw = storage.getItem(PROGRESSION_STORAGE_KEY)
  if (!raw) return { version: 1, heroes: {} }
  try {
    const parsed = JSON.parse(raw) as ProgressionSave
    if (parsed.version !== 1 || typeof parsed.heroes !== 'object' || parsed.heroes == null) throw new Error('Invalid progression save')
    return parsed
  } catch {
    return { version: 1, heroes: {} }
  }
}

export function saveHeroProgression(storage: StorageLike, heroId: string, progression: HeroProgression): ProgressionSave {
  const save = loadProgression(storage)
  const next: ProgressionSave = { version: 1, heroes: { ...save.heroes, [heroId]: progression } }
  storage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(next))
  return next
}
