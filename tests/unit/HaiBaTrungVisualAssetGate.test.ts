import { describe, expect, it } from 'vitest'
import { ACTIVE_HERO_IDS } from '../../src/data/heroes/definitions'
import { getHeroVisualAvailability, haiBaTrungHeroVisuals, resolveHaiBaTrungHeroVisual, validatePngAsset } from '../../src/data/assets/prototypeVisualAssets'

describe('VS-HBT-V01 production visual asset gate', () => {
  it('keeps exactly the active HBT visual manifest and skill mappings', () => {
    expect(Object.keys(haiBaTrungHeroVisuals)).toEqual(['trung-trac', 'trung-nhi', 'le-chan'])
    expect(ACTIVE_HERO_IDS.map((id) => haiBaTrungHeroVisuals[id].skillId)).toEqual([
      'trong-dong-lenh-vuong', 'lien-hoan-lac-tien', 'song-trao-hai-tan',
    ])
    expect(haiBaTrungHeroVisuals['trung-trac']).toMatchObject({
      portraitUrl: undefined, idleUrl: undefined, attackUrl: undefined, vfxUrl: undefined,
    })
  })

  it('resolves canonical paths through injectable lookup with safe partial availability', () => {
    const lookup = (path: string) => path === 'portraits/trung-trac.png' ? '/assets/trung-trac.png' : undefined
    const visual = resolveHaiBaTrungHeroVisual('trung-trac', lookup)
    expect(visual?.portraitUrl).toBe('/assets/trung-trac.png')
    expect(visual?.idleUrl).toBeUndefined()
    expect(getHeroVisualAvailability('trung-trac', lookup)).toEqual({ portrait: true, idle: false, attack: false, vfx: false })
    expect(getHeroVisualAvailability('trung-nhi', () => undefined)).toEqual({ portrait: false, idle: false, attack: false, vfx: false })
    expect(resolveHaiBaTrungHeroVisual('quan-vu', lookup)).toBeUndefined()
    expect(resolveHaiBaTrungHeroVisual('unknown-hero', lookup)).toBeUndefined()
  })

  it('validates supplied PNG technical metadata without requiring art binaries', () => {
    const bytes = new Uint8Array(26)
    bytes.set([137, 80, 78, 71, 13, 10, 26, 10], 0)
    bytes.set([0, 0, 0, 13, 73, 72, 68, 82], 8)
    const view = new DataView(bytes.buffer)
    view.setUint32(16, 128); view.setUint32(20, 128)
    bytes[25] = 6
    expect(validatePngAsset(bytes)).toEqual({ ok: true })
    expect(validatePngAsset(new Uint8Array())).toMatchObject({ ok: false })
  })
})
