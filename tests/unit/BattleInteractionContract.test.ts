import { describe, expect, it } from 'vitest'
import { ACTIVE_HERO_IDS } from '../../src/data/heroes/definitions'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import {
  battleInstruction,
  completePlacementIntent,
  moveIntentForHero,
  placementIntentForHero,
  shouldShowHeroRange,
} from '../../src/game/bridge/BattleInteractionContract'
import { selectMetaTab } from '../../src/ui/MetaTabState'

describe('battle interaction safety contract', () => {
  it('starts placement only for a Hero that is not deployed', () => {
    expect(placementIntentForHero('trung-trac', false)).toEqual({ mode: 'place', heroId: 'trung-trac' })
    expect(placementIntentForHero('trung-trac', true)).toEqual({ mode: 'neutral' })
  })

  it('requires explicit move intent for a deployed Hero', () => {
    expect(moveIntentForHero('trung-trac')).toEqual({ mode: 'move', heroId: 'trung-trac' })
  })

  it('clears placement or movement after success and on background cancel', () => {
    expect(completePlacementIntent({ mode: 'place', heroId: 'trung-nhi' })).toEqual({ mode: 'neutral' })
    expect(completePlacementIntent({ mode: 'move', heroId: 'le-chan' })).toEqual({ mode: 'neutral' })
  })

  it('does not leave an old Hero movable on a later tile click', () => {
    const bridge = new BattleBridge()
    bridge.setPlacementIntent(moveIntentForHero('trung-trac'))
    bridge.clearPlacementIntent()
    expect(bridge.getPlacementIntent()).toEqual({ mode: 'neutral' })
  })

  it('uses neutral copy unless a placement action is pending', () => {
    expect(battleInstruction({ mode: 'neutral' }, 'Trưng Trắc', 1, 7)).toBe('Sẵn sàng chiến đấu')
    expect(battleInstruction({ mode: 'place', heroId: 'trung-nhi' }, 'Trưng Nhị', 1, 7)).toContain('đặt Trưng Nhị')
    expect(battleInstruction({ mode: 'move', heroId: 'le-chan' }, 'Lê Chân', 2, 7)).toContain('di chuyển Lê Chân')
  })

  it('keeps global range visibility off by default and independently toggleable', () => {
    const bridge = new BattleBridge()
    expect(bridge.isRangeVisibilityEnabled()).toBe(false)
    bridge.setRangeVisibilityEnabled(true)
    expect(bridge.isRangeVisibilityEnabled()).toBe(true)
    expect(shouldShowHeroRange(false, { mode: 'neutral' }, 'trung-trac')).toBe(false)
    expect(shouldShowHeroRange(true, { mode: 'neutral' }, 'trung-trac')).toBe(true)
    expect(shouldShowHeroRange(false, { mode: 'move', heroId: 'trung-trac' }, 'trung-trac')).toBe(true)
    expect(shouldShowHeroRange(false, { mode: 'move', heroId: 'trung-trac' }, 'trung-nhi')).toBe(false)
  })

  it('switches between roster and inventory as one contextual content region', () => {
    expect(selectMetaTab('roster', 'inventory')).toBe('inventory')
    expect(selectMetaTab('inventory', 'roster')).toBe('roster')
  })

  it('keeps the playable roster limited to the three active Hai Ba Trung Heroes', () => {
    expect(ACTIVE_HERO_IDS).toEqual(['trung-trac', 'trung-nhi', 'le-chan'])
  })
})
