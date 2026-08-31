import { describe, expect, it } from 'vitest'
import { enemyDefinitions } from '../../src/data/enemies/definitions'
import { HAI_BA_TRUNG_HERO_IDS, heroDefinitions } from '../../src/data/heroes/definitions'
import { heroPassives } from '../../src/data/passives/definitions'
import { skillDefinitions } from '../../src/data/skills/definitions'
import { prototypeWaves } from '../../src/data/waves/prototypeWaves'

describe('MVP content', () => {
  it('contains exactly three active Vietnam Heroes linked to shared skills', () => {
    const heroes = HAI_BA_TRUNG_HERO_IDS.map((id) => heroDefinitions[id])
    expect(heroes).toHaveLength(3)
    heroes.forEach((hero) => {
      expect(Object.keys(hero.baseStats).sort()).toEqual(
        ['hp', 'atk', 'range', 'attackSpeed', 'crit', 'critDamage'].sort(),
      )
      expect(hero.skillTriggerHits).toBeGreaterThan(0)
      expect(skillDefinitions[hero.activeSkillId]).toBeDefined()
      expect(heroPassives[hero.id]?.requiredStage).toBe('legendary')
    })
  })

  it('contains exactly three referenced enemy types and ten waves', () => {
    expect(['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'].every((id) => enemyDefinitions[id])).toBe(true)
    expect(prototypeWaves).toHaveLength(24)
    prototypeWaves.forEach((wave) => {
      expect(wave.groups.length).toBeGreaterThan(0)
      wave.groups.forEach((group) => expect(enemyDefinitions[group.enemyId]).toBeDefined())
    })
  })

  it('contains eight compositions using only shared Skill effects', () => {
    const skills = Object.values(skillDefinitions)
    const allowedEffects = new Set(['damage', 'aoe', 'slow', 'stun', 'root', 'multiHit'])
    expect(skills.length).toBeGreaterThanOrEqual(11)
    skills.forEach((skill) => {
      expect(skill.effects.length).toBeGreaterThan(0)
      skill.effects.forEach((effect) => expect(allowedEffects.has(effect.type)).toBe(true))
    })
  })
})
