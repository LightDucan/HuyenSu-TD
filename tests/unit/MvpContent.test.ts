import { describe, expect, it } from 'vitest'
import { enemyDefinitions } from '../../src/data/enemies/definitions'
import { heroDefinitions } from '../../src/data/heroes/definitions'
import { heroPassives } from '../../src/data/passives/definitions'
import { skillDefinitions } from '../../src/data/skills/definitions'
import { prototypeWaves } from '../../src/data/waves/prototypeWaves'

describe('MVP content', () => {
  it('contains five valid Heroes linked to shared skills and passives', () => {
    const heroes = Object.values(heroDefinitions)
    expect(heroes).toHaveLength(5)
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
    expect(Object.keys(enemyDefinitions)).toHaveLength(3)
    expect(prototypeWaves).toHaveLength(10)
    prototypeWaves.forEach((wave) => {
      expect(wave.groups.length).toBeGreaterThan(0)
      wave.groups.forEach((group) => expect(enemyDefinitions[group.enemyId]).toBeDefined())
    })
  })

  it('contains eight compositions using only shared Skill effects', () => {
    const skills = Object.values(skillDefinitions)
    const allowedEffects = new Set(['damage', 'aoe', 'slow', 'stun', 'root', 'multiHit'])
    expect(skills).toHaveLength(8)
    skills.forEach((skill) => {
      expect(skill.effects.length).toBeGreaterThan(0)
      skill.effects.forEach((effect) => expect(allowedEffects.has(effect.type)).toBe(true))
    })
  })
})
