import type { GameSpeed } from '../../domain/clock/GameClock'

const assetUrls = import.meta.glob('../../assets/{heroes,portraits,vfx}/**/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export type HeroVisualAsset = Readonly<{
  heroId: string
  skillId: string
  portraitUrl?: string
  idleUrl?: string
  attackUrl?: string
  vfxUrl?: string
  idleTextureKey: string
  attackTextureKey: string
  vfxTextureKey: string
}>

export type VisualAssetLookup = (path: string) => string | undefined

const bundledAssetLookup: VisualAssetLookup = (path) => assetUrls[`../../assets/${path}`]

function defineHeroVisual(heroId: string, skillId: string, lookup: VisualAssetLookup): HeroVisualAsset {
  return {
    heroId,
    skillId,
    portraitUrl: lookup(`portraits/${heroId}.png`),
    idleUrl: lookup(`heroes/${heroId}/idle.png`),
    attackUrl: lookup(`heroes/${heroId}/attack.png`),
    vfxUrl: lookup(`vfx/${skillId}.png`),
    idleTextureKey: `hero:${heroId}:idle`,
    attackTextureKey: `hero:${heroId}:attack`,
    vfxTextureKey: `skill:${skillId}:vfx`,
  }
}

const visualDefinitions: Readonly<Record<string, string>> = {
  'quan-vu': 'thanh-long-tram',
  'truong-phi': 'ba-xa-gam-vang',
  'trieu-van': 'that-tien-that-xuat',
  'hoang-trung': 'bach-bo-xuyen-duong',
  'gia-cat-luong': 'dong-phong-hoa-tran',
}

export function resolvePrototypeHeroVisual(heroId: string, lookup: VisualAssetLookup = bundledAssetLookup): HeroVisualAsset | undefined {
  const skillId = visualDefinitions[heroId]
  return skillId ? defineHeroVisual(heroId, skillId, lookup) : undefined
}

export const prototypeHeroVisuals: Readonly<Record<string, HeroVisualAsset>> = Object.fromEntries(
  Object.keys(visualDefinitions).map((heroId) => [heroId, resolvePrototypeHeroVisual(heroId, bundledAssetLookup)!]),
)

export function scaleVisualDuration(baseDurationMs: number, speed: GameSpeed): number {
  return baseDurationMs / speed
}
