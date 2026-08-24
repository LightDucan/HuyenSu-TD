import { saveHeroEquipment } from '../domain/equipment/EquipmentStorage'
import type { HeroEquipment } from '../domain/equipment/EquipmentSystem'
import type { HeroProgression } from '../domain/progression/ProgressionSystem'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import { saveHeroProgression } from '../domain/progression/ProgressionStorage'

export type HeroStatsRefreshPort = {
  refreshPlacedHeroStats(heroId: string): void
}

export function saveProgressionAndRefresh(
  storage: StorageLike,
  refreshPort: HeroStatsRefreshPort,
  heroId: string,
  progression: HeroProgression,
): void {
  saveHeroProgression(storage, heroId, progression)
  refreshPort.refreshPlacedHeroStats(heroId)
}

export function saveEquipmentAndRefresh(
  storage: StorageLike,
  refreshPort: HeroStatsRefreshPort,
  heroId: string,
  equipment: HeroEquipment,
): void {
  saveHeroEquipment(storage, heroId, equipment)
  refreshPort.refreshPlacedHeroStats(heroId)
}
