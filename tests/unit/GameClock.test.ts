import { describe, expect, it } from 'vitest'
import { GameClock } from '../../src/domain/clock/GameClock'

describe('GameClock', () => {
  it('scales battle delta using the selected speed', () => {
    const clock = new GameClock()

    expect(clock.scale(100)).toBe(100)
    clock.setSpeed(3)
    expect(clock.scale(100)).toBe(300)
  })

  it('rejects invalid delta values', () => {
    const clock = new GameClock()

    expect(() => clock.scale(-1)).toThrow(RangeError)
    expect(() => clock.scale(Number.NaN)).toThrow(RangeError)
  })
})
