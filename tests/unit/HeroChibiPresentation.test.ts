import { describe, expect, it } from 'vitest'
import { getHeroChibiPresentation } from '../../src/data/presentation/heroChibiPresentation'
describe('VIBE-C08 Chibi standard', () => {
  it('defines ranged Trưng Nhị and melee Trưng Trắc with shared pivot/VFX contract', () => {
    const ranged = getHeroChibiPresentation('trung-nhi')!; const melee = getHeroChibiPresentation('trung-trac')!
    expect(ranged.type).toBe('ranged'); expect(ranged.animations).toMatchObject({ idle: expect.any(String), aim: expect.any(String), shoot: expect.any(String) })
    expect(melee.type).toBe('melee'); expect(melee.animations).toMatchObject({ idle: expect.any(String), ready: expect.any(String), strike: expect.any(String) })
    expect(ranged.pivot).toEqual(melee.pivot); expect(ranged.attackVfxKey).not.toBe(ranged.animations.shoot)
  })
})
