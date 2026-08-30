import { describe, expect, it } from 'vitest'
import { defaultBattleStage } from '../../src/data/campaign/haiBaTrungCampaign'
import type { BattleStageDefinition } from '../../src/data/campaign/definitions'
import type { BattleMapDefinition } from '../../src/data/maps/MapDefinition'
import { createInitialBattleSnapshot } from '../../src/game/bridge/BattleSnapshot'

describe('generic battle stage contract', () => {
  it('keeps the active stage data-driven and derives a fresh snapshot', () => {
    const map: BattleMapDefinition = { id: 'test-map', title: 'Test', theme: 'test', width: 320, height: 240, grid: { columns: 4, rows: 3 }, fixedPath: [{ x: 0, y: 120 }, { x: 320, y: 120 }], placementTiles: [{ column: 0, row: 0 }, { column: 1, row: 0 }] }
    const stage: BattleStageDefinition = { ...defaultBattleStage, id: 'test-stage', displayName: 'Test Stage', map }
    expect(stage.map).toBe(map)
    expect(createInitialBattleSnapshot(stage).totalWaves).toBe(stage.waves.length)
    expect(createInitialBattleSnapshot(stage).battleStatus).toBe('running')
    const restricted = { ...stage, allowedHeroIds: ['le-chan'] as const }
    expect(createInitialBattleSnapshot(restricted, restricted.allowedHeroIds, 'trung-trac').selectedHeroId).toBe('le-chan')
  })
})
