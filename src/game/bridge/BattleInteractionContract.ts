export type PlacementIntent =
  | Readonly<{ mode: 'neutral' }>
  | Readonly<{ mode: 'place' | 'move'; heroId: string }>

export const NEUTRAL_PLACEMENT_INTENT: PlacementIntent = Object.freeze({ mode: 'neutral' })

export function placementIntentForHero(heroId: string, isDeployed: boolean): PlacementIntent {
  return isDeployed ? NEUTRAL_PLACEMENT_INTENT : { mode: 'place', heroId }
}

export function moveIntentForHero(heroId: string): PlacementIntent {
  return { mode: 'move', heroId }
}

export function completePlacementIntent(_intent: PlacementIntent): PlacementIntent {
  return NEUTRAL_PLACEMENT_INTENT
}

export function shouldShowHeroRange(
  rangeEnabled: boolean,
  intent: PlacementIntent,
  selectedHeroId: string,
  heroId: string,
): boolean {
  if (heroId !== selectedHeroId) return false
  return rangeEnabled || (intent.mode === 'move' && intent.heroId === heroId)
}

export function battleInstruction(
  intent: PlacementIntent,
  heroName: string,
  placedCount: number,
  placementLimit: number,
): string {
  if (intent.mode === 'place') return `Chọn ô hợp lệ để đặt ${heroName}. Đã triển khai ${placedCount}/${placementLimit} Hero.`
  if (intent.mode === 'move') return `Chọn ô hợp lệ để di chuyển ${heroName}. Đã triển khai ${placedCount}/${placementLimit} Hero.`
  return 'Sẵn sàng chiến đấu'
}
