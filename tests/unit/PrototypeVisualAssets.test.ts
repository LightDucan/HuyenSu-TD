import { describe, expect, it } from 'vitest'
import { ACTIVE_HERO_IDS, heroDefinitions } from '../../src/data/heroes/definitions'
import { prototypeHeroVisuals, resolvePrototypeHeroVisual, scaleVisualDuration } from '../../src/data/assets/prototypeVisualAssets'

describe('VIS-C01 prototype visual assets', () => {
  it('maps all five runtime Heroes to idle, attack, portrait and matching Skill VFX assets', () => {
    expect(Object.keys(prototypeHeroVisuals).sort()).toEqual(Object.keys(heroDefinitions).sort())
    Object.values(heroDefinitions).filter((hero) => !ACTIVE_HERO_IDS.includes(hero.id as typeof ACTIVE_HERO_IDS[number])).forEach((hero) => {
      const visual = prototypeHeroVisuals[hero.id]
      expect(visual.skillId).toBe(hero.activeSkillId)
      expect([visual.portraitUrl, visual.idleUrl, visual.attackUrl, visual.vfxUrl].every(Boolean)).toBe(true)
    })
    ACTIVE_HERO_IDS.forEach((id) => expect(prototypeHeroVisuals[id]).toMatchObject({ heroId: id }))
  })

  it('scales attack and VFX timing with Battle x1/x3', () => {
    expect(scaleVisualDuration(180, 1)).toBe(180)
    expect(scaleVisualDuration(180, 3)).toBe(60)
  })

  it('returns a safe mapping when a portrait is missing', () => {
    expect(() => resolvePrototypeHeroVisual('quan-vu', (path) => path.includes('portraits/') ? undefined : path)).not.toThrow()
    expect(resolvePrototypeHeroVisual('quan-vu', (path) => path.includes('portraits/') ? undefined : path)?.portraitUrl).toBeUndefined()
  })

  it('returns a safe mapping when idle and attack textures are missing', () => {
    const visual = resolvePrototypeHeroVisual('quan-vu', (path) => path.includes('heroes/') ? undefined : path)
    expect(visual?.idleUrl).toBeUndefined()
    expect(visual?.attackUrl).toBeUndefined()
  })

  it('returns safe no-VFX behavior when the VFX file is missing', () => {
    expect(resolvePrototypeHeroVisual('quan-vu', (path) => path.includes('vfx/') ? undefined : path)?.vfxUrl).toBeUndefined()
  })

  it('returns undefined without throwing for an unknown Hero ID', () => {
    expect(() => resolvePrototypeHeroVisual('unknown-hero')).not.toThrow()
    expect(resolvePrototypeHeroVisual('unknown-hero')).toBeUndefined()
  })
})
