export type HeroPlacement = Readonly<{ heroId: string; slotId: string }>

export type PlacementResult = Readonly<{
  placement: HeroPlacement
  previousSlotId?: string
  recalledHeroId?: string
}>

export class HeroPlacementRegistry {
  private readonly validSlotIds: ReadonlySet<string>
  private readonly slotByHero = new Map<string, string>()
  private readonly heroBySlot = new Map<string, string>()

  constructor(validSlotIds: readonly string[]) {
    if (validSlotIds.length === 0 || new Set(validSlotIds).size !== validSlotIds.length) {
      throw new RangeError('Placement slots must be unique and non-empty')
    }
    this.validSlotIds = new Set(validSlotIds)
  }

  place(heroId: string, slotId: string): PlacementResult {
    if (!this.validSlotIds.has(slotId)) throw new RangeError(`Invalid placement slot: ${slotId}`)

    const previousSlotId = this.slotByHero.get(heroId)
    const recalledHeroId = this.heroBySlot.get(slotId)

    if (previousSlotId === slotId) return { placement: { heroId, slotId }, previousSlotId }

    if (previousSlotId) this.heroBySlot.delete(previousSlotId)
    if (recalledHeroId && recalledHeroId !== heroId) this.slotByHero.delete(recalledHeroId)

    this.slotByHero.set(heroId, slotId)
    this.heroBySlot.set(slotId, heroId)

    return {
      placement: { heroId, slotId },
      ...(previousSlotId ? { previousSlotId } : {}),
      ...(recalledHeroId && recalledHeroId !== heroId ? { recalledHeroId } : {}),
    }
  }

  getHeroAt(slotId: string): string | undefined { return this.heroBySlot.get(slotId) }

  getSlotOf(heroId: string): string | undefined { return this.slotByHero.get(heroId) }

  getPlacements(): HeroPlacement[] {
    return [...this.slotByHero].map(([heroId, slotId]) => ({ heroId, slotId }))
  }
}
