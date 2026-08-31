import { describe, expect, it } from 'vitest'
import { HAI_BA_TRUNG_HERO_IDS } from '../../src/data/heroes/definitions'
import { BattleBridge } from '../../src/game/bridge/BattleBridge'
import {
  battleInstruction,
  completePlacementIntent,
  moveIntentForHero,
  placementIntentForHero,
  shouldShowHeroRange,
} from '../../src/game/bridge/BattleInteractionContract'
import { canApplyEquipmentOperation, isEquipmentInteractionLocked, selectMetaTab } from '../../src/ui/MetaTabState'
import { createInitialMetaState, META_SAVE_SCHEMA_VERSION } from '../../src/domain/meta/MetaState'

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
    expect(shouldShowHeroRange(false, { mode: 'neutral' }, 'trung-trac', 'trung-trac')).toBe(false)
    expect(shouldShowHeroRange(true, { mode: 'neutral' }, 'trung-trac', 'trung-trac')).toBe(true)
    expect(shouldShowHeroRange(true, { mode: 'neutral' }, 'trung-trac', 'trung-nhi')).toBe(false)
    expect(shouldShowHeroRange(false, { mode: 'move', heroId: 'trung-trac' }, 'trung-trac', 'trung-trac')).toBe(true)
    expect(shouldShowHeroRange(false, { mode: 'move', heroId: 'trung-trac' }, 'trung-trac', 'trung-nhi')).toBe(false)
  })

  it('switches between roster and inventory as one contextual content region', () => {
    expect(selectMetaTab('roster', 'inventory')).toBe('inventory')
    expect(selectMetaTab('inventory', 'roster')).toBe('roster')
  })

  it('locks Equip and Unequip only while a Wave is running', () => {
    expect(isEquipmentInteractionLocked('waiting')).toBe(false)
    expect(isEquipmentInteractionLocked('running')).toBe(true)
    expect(isEquipmentInteractionLocked('won')).toBe(false)
    expect(canApplyEquipmentOperation('running', 'equip')).toBe(false)
    expect(canApplyEquipmentOperation('running', 'unequip')).toBe(false)
    expect(canApplyEquipmentOperation('running', 'merge')).toBe(true)
  })

  it('keeps bridge-owned battle state intact across presentation tab changes', () => {
    const bridge = new BattleBridge()
    bridge.setSelectedHeroId('le-chan')
    bridge.setSpeed(3)
    bridge.setAutoWaveEnabled(true)
    bridge.emitCommandEnergySnapshot({ current: 47, cap: 60 })
    bridge.emitSnapshot({
      runId: 'tab-preservation-run', speed: 3, enemiesSpawned: 2, enemiesEscaped: 0, enemiesDefeated: 1,
      placedHeroes: [{ heroId: 'le-chan', slotId: 'slot-1' }], selectedHeroId: 'le-chan', wave: 4,
      totalWaves: 10, waveStatus: 'waiting', cityHp: 10, battleStatus: 'running',
      remainingByCategory: { sword: 1, archer: 0, other: 0 },
    })
    bridge.emitMetaSnapshot({
      schemaVersion: META_SAVE_SCHEMA_VERSION,
      revision: 3,
      updatedAtMs: 100,
      data: { ...createInitialMetaState('tab-player', 0), wallet: { balances: { gold: 120, knb: 7 } } },
    })
    const tab = selectMetaTab('roster', 'inventory')
    expect(tab).toBe('inventory')
    expect(bridge.getSelectedHeroId()).toBe('le-chan')
    expect(bridge.getSpeed()).toBe(3)
    expect(bridge.isAutoWaveEnabled()).toBe(true)
    expect(bridge.getCommandEnergySnapshot()).toEqual({ current: 47, cap: 60 })
    expect(bridge.getLatestSnapshot()).toMatchObject({ wave: 4, placedHeroes: [{ heroId: 'le-chan', slotId: 'slot-1' }] })
    expect(bridge.getMetaSnapshot()?.data.wallet.balances).toEqual({ gold: 120, knb: 7 })
  })

  it('keeps the playable roster limited to the three active Hai Ba Trung Heroes', () => {
    expect(HAI_BA_TRUNG_HERO_IDS).toEqual(['trung-trac', 'trung-nhi', 'le-chan'])
  })
})
