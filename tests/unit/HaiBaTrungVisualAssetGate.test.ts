import { describe, expect, it } from 'vitest'
const bundledPngs = import.meta.glob('../../src/assets/{heroes,portraits,vfx}/**/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
import { ACTIVE_HERO_IDS } from '../../src/data/heroes/definitions'
import { getHeroVisualAvailability, haiBaTrungHeroVisuals, resolveHaiBaTrungHeroVisual, validatePngAsset } from '../../src/data/assets/prototypeVisualAssets'

describe('VS-HBT-V01 production visual asset gate', () => {
  it('keeps exactly the active HBT visual manifest and skill mappings', () => {
    expect(Object.keys(haiBaTrungHeroVisuals)).toEqual(['trung-trac', 'trung-nhi', 'le-chan'])
    expect(ACTIVE_HERO_IDS.map((id) => haiBaTrungHeroVisuals[id].skillId)).toEqual([
      'trong-dong-lenh-vuong', 'lien-hoan-lac-tien', 'song-trao-hai-tan',
    ])
    expect(haiBaTrungHeroVisuals['trung-trac'].portraitUrl).toBeTruthy()
    expect(haiBaTrungHeroVisuals['trung-trac'].idleUrl).toBeTruthy()
    expect(haiBaTrungHeroVisuals['trung-trac'].attackUrl).toBeTruthy()
    expect(haiBaTrungHeroVisuals['trung-trac'].vfxUrl).toBeTruthy()
  })

  it('scans all 12 actual production binaries and validates their PNG contract', () => {
    const paths = ACTIVE_HERO_IDS.flatMap((heroId) => [
      `src/assets/portraits/${heroId}.png`,
      `src/assets/heroes/${heroId}/idle.png`,
      `src/assets/heroes/${heroId}/attack.png`,
    ]).concat([
      'src/assets/vfx/trong-dong-lenh-vuong.png',
      'src/assets/vfx/lien-hoan-lac-tien.png',
      'src/assets/vfx/song-trao-hai-tan.png',
    ])
    expect(paths).toHaveLength(12)
    paths.forEach((assetPath) => {
      const globPath = `../../src/assets/${assetPath.slice('src/assets/'.length)}`
      expect(bundledPngs[globPath], assetPath).toBeTruthy()
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
