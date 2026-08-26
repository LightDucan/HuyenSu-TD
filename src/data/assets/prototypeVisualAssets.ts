import type { GameSpeed } from '../../domain/clock/GameClock'

const assetUrls = import.meta.glob('../../assets/{heroes,portraits,vfx}/**/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export type HeroVisualAsset = Readonly<{
  heroId: string
  skillId: string
  portraitUrl: string
  idleUrl: string
  attackUrl: string
  vfxUrl: string
  idleTextureKey: string
  attackTextureKey: string
  vfxTextureKey: string
}>

function requireAsset(path: string): string {
  const url = assetUrls[`../../assets/${path}`]
  if (!url) throw new Error(`Missing prototype visual asset: ${path}`)
  return url
}

function defineHeroVisual(heroId: string, skillId: string): HeroVisualAsset {
  return {
    heroId,
    skillId,
    portraitUrl: requireAsset(`portraits/${heroId}.png`),
    idleUrl: requireAsset(`heroes/${heroId}/idle.png`),
    attackUrl: requireAsset(`heroes/${heroId}/attack.png`),
    vfxUrl: requireAsset(`vfx/${skillId}.png`),
    idleTextureKey: `hero:${heroId}:idle`,
    attackTextureKey: `hero:${heroId}:attack`,
    vfxTextureKey: `skill:${skillId}:vfx`,
  }
}

export const prototypeHeroVisuals: Readonly<Record<string, HeroVisualAsset>> = {
  'quan-vu': defineHeroVisual('quan-vu', 'thanh-long-tram'),
  'truong-phi': defineHeroVisual('truong-phi', 'ba-xa-gam-vang'),
  'trieu-van': defineHeroVisual('trieu-van', 'that-tien-that-xuat'),
  'hoang-trung': defineHeroVisual('hoang-trung', 'bach-bo-xuyen-duong'),
  'gia-cat-luong': defineHeroVisual('gia-cat-luong', 'dong-phong-hoa-tran'),
}

export function scaleVisualDuration(baseDurationMs: number, speed: GameSpeed): number {
  return baseDurationMs / speed
}
