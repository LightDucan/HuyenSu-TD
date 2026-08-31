import { describe, expect, it } from 'vitest'
import { shouldPrepareAim, TRUNG_NHI_CHIBI } from '../../src/game/presentation/TrungNhiChibiConfig'

describe('VIBE-C05 Trưng Nhị chibi presentation', () => {
  it('uses the required reusable animation names and a bottom-center pivot', () => {
    expect(TRUNG_NHI_CHIBI.animations).toMatchObject({
      idle: 'trung_nhi_idle',
      aim: 'trung_nhi_aim',
      shoot: 'trung_nhi_shoot',
    })
    expect(TRUNG_NHI_CHIBI.bottomPivot).toBeGreaterThan(0.8)
    expect(TRUNG_NHI_CHIBI.attackVfx.offset).toEqual({ x: -43, y: -49 })
    expect(TRUNG_NHI_CHIBI.animations.attackVfx).not.toBe(TRUNG_NHI_CHIBI.animations.shoot)
  })

  it('prepares Aim only near a real pending attack', () => {
    expect(shouldPrepareAim(250, true)).toBe(true)
    expect(shouldPrepareAim(251, true)).toBe(false)
    expect(shouldPrepareAim(0, true)).toBe(false)
    expect(shouldPrepareAim(100, false)).toBe(false)
  })
})
