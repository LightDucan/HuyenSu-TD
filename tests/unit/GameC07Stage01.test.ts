import { describe, expect, it } from 'vitest'
import { defaultBattleStage, HAI_BA_TRUNG_STAGE_ID } from '../../src/data/campaign/haiBaTrungCampaign'
import { enemyDefinitions } from '../../src/data/enemies/definitions'
import { resolveEnemyVisual, hbtEnemyVisualManifest } from '../../src/data/assets/enemyVisualAssets'

describe('GAME-C07 HBT Stage 01 production contract', () => {
  it('keeps stable stage identity and 24 unique waves', () => {
    expect(defaultBattleStage.id).toBe(HAI_BA_TRUNG_STAGE_ID)
    expect(defaultBattleStage.waves).toHaveLength(24)
    expect(new Set(defaultBattleStage.waves.map((wave) => wave.id)).size).toBe(24)
  })
  it('reserves Mã Viện for wave 24 and validates all enemy references', () => {
    const bosses = defaultBattleStage.waves.flatMap((wave) => wave.groups.filter((group) => group.enemyId === 'boss-ma-vien'))
    expect(bosses).toHaveLength(1)
    expect(defaultBattleStage.waves[23].groups.some((group) => group.enemyId === 'boss-ma-vien')).toBe(true)
    defaultBattleStage.waves.flatMap((wave) => wave.groups).forEach((group) => expect(enemyDefinitions[group.enemyId]).toBeDefined())
  })
  it('provides readable path, placement and visual-only terrain data', () => {
    expect(defaultBattleStage.map.placementTiles.length).toBeGreaterThanOrEqual(10)
    expect(new Set(defaultBattleStage.map.placementTiles.map((tile) => `${tile.column}:${tile.row}`)).size).toBe(defaultBattleStage.map.placementTiles.length)
    expect(defaultBattleStage.map.fixedPath.length).toBeGreaterThanOrEqual(6)
    expect(defaultBattleStage.map.terrainDecorations?.length).toBeGreaterThan(0)
  })
  it('resolves all HBT enemy visual definitions with safe fallback contract', () => {
    expect(Object.keys(hbtEnemyVisualManifest)).toHaveLength(4)
    Object.keys(hbtEnemyVisualManifest).forEach((id) => expect(resolveEnemyVisual(id)?.frameCount).toBe(8))
    expect(resolveEnemyVisual('unknown')).toBeUndefined()
  })
  it('contains historical-safe narrative and first-clear onboarding reward', () => {
    const narrative = defaultBattleStage.narrative!
    expect(narrative.preBattle && narrative.victory && narrative.defeat).toBeTruthy()
    expect(narrative.waveBeats.every((beat) => beat.wave >= 1 && beat.wave <= 24)).toBe(true)
    expect(narrative.victory).not.toMatch(/chết|bị giết/i)
    expect(defaultBattleStage.firstClearReward).toEqual({ gold: 100, knb: 50, anhHon: 100 })
  })
})
