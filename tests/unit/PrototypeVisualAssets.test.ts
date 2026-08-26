import { describe, expect, it } from 'vitest'
import { heroDefinitions } from '../../src/data/heroes/definitions'
import { prototypeHeroVisuals, scaleVisualDuration } from '../../src/data/assets/prototypeVisualAssets'

describe('VIS-C01 prototype visual assets', () => {
  it('maps all five runtime Heroes to idle, attack, portrait and matching Skill VFX assets', () => {
    expect(Object.keys(prototypeHeroVisuals).sort()).toEqual(Object.keys(heroDefinitions).sort())
    Object.values(heroDefinitions).forEach((hero) => {
      const visual = prototypeHeroVisuals[hero.id]
      expect(visual.skillId).toBe(hero.activeSkillId)
      expect([visual.portraitUrl, visual.idleUrl, visual.attackUrl, visual.vfxUrl].every(Boolean)).toBe(true)
    })
    expect(new Set(Object.values(prototypeHeroVisuals).flatMap((visual) => [visual.portraitUrl, visual.idleUrl, visual.attackUrl, visual.vfxUrl])).size).toBe(20)
  })

  it('scales attack and VFX timing with Battle x1/x3', () => {
    expect(scaleVisualDuration(180, 1)).toBe(180)
    expect(scaleVisualDuration(180, 3)).toBe(60)
  })
})
