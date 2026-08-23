import { describe, expect, it } from 'vitest'
import { HeroPlacementRegistry } from '../../src/domain/placement/HeroPlacementRegistry'

describe('HeroPlacementRegistry', () => {
  it('supports any number of configured slots without imposing a Hero cap', () => {
    const slots = Array.from({ length: 50 }, (_, index) => `slot-${index}`)
    const registry = new HeroPlacementRegistry(slots)

    slots.forEach((slotId, index) => registry.place(`hero-${index}`, slotId))

    expect(registry.getPlacements()).toHaveLength(50)
  })

  it('moves a Hero between valid slots without duplicating it', () => {
    const registry = new HeroPlacementRegistry(['a', 'b'])
    registry.place('quan-vu', 'a')

    expect(registry.place('quan-vu', 'b')).toEqual({
      placement: { heroId: 'quan-vu', slotId: 'b' },
      previousSlotId: 'a',
    })
    expect(registry.getHeroAt('a')).toBeUndefined()
    expect(registry.getPlacements()).toEqual([{ heroId: 'quan-vu', slotId: 'b' }])
  })

  it('recalls the previous occupant when another Hero is placed on its slot', () => {
    const registry = new HeroPlacementRegistry(['a', 'b'])
    registry.place('quan-vu', 'a')
    registry.place('trieu-van', 'b')

    expect(registry.place('quan-vu', 'b')).toMatchObject({ recalledHeroId: 'trieu-van' })
    expect(registry.getSlotOf('trieu-van')).toBeUndefined()
    expect(registry.getHeroAt('b')).toBe('quan-vu')
    expect(registry.getPlacements()).toHaveLength(1)
  })

  it('rejects slots outside the map placement contract', () => {
    const registry = new HeroPlacementRegistry(['valid'])
    expect(() => registry.place('quan-vu', 'enemy-path')).toThrow(RangeError)
  })
})
