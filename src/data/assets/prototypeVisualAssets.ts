import type { GameSpeed } from '../../domain/clock/GameClock'
import { ACTIVE_HERO_IDS } from '../heroes/definitions'

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

export type HeroVisualAvailability = Readonly<{ portrait: boolean; idle: boolean; attack: boolean; vfx: boolean }>

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
  'trung-trac': 'trong-dong-lenh-vuong',
  'trung-nhi': 'lien-hoan-lac-tien',
  'le-chan': 'song-trao-hai-tan',
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

export function resolveHaiBaTrungHeroVisual(heroId: string, lookup: VisualAssetLookup = bundledAssetLookup): HeroVisualAsset | undefined {
  return ACTIVE_HERO_IDS.includes(heroId as typeof ACTIVE_HERO_IDS[number]) ? resolvePrototypeHeroVisual(heroId, lookup) : undefined
}

export const haiBaTrungHeroVisuals: Readonly<Record<string, HeroVisualAsset>> = Object.fromEntries(
  ACTIVE_HERO_IDS.map((heroId) => [heroId, resolveHaiBaTrungHeroVisual(heroId, bundledAssetLookup)!]),
)

export function getHeroVisualAvailability(heroId: string, lookup: VisualAssetLookup = bundledAssetLookup): HeroVisualAvailability {
  const visual = resolveHaiBaTrungHeroVisual(heroId, lookup)
  return { portrait: Boolean(visual?.portraitUrl), idle: Boolean(visual?.idleUrl), attack: Boolean(visual?.attackUrl), vfx: Boolean(visual?.vfxUrl) }
}

export function validatePngAsset(bytes: Uint8Array): Readonly<{ ok: boolean; reason?: string }> {
  if (bytes.length < 26 || ![137, 80, 78, 71, 13, 10, 26, 10].every((value, index) => bytes[index] === value)) return { ok: false, reason: 'not a PNG' }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  if (view.getUint32(12) !== 0x49484452) return { ok: false, reason: 'missing IHDR' }
  const width = view.getUint32(16); const height = view.getUint32(20); const colorType = bytes[25]
  if (width !== 128 || height !== 128) return { ok: false, reason: 'asset must be 128x128' }
  if (colorType !== 4 && colorType !== 6) return { ok: false, reason: 'asset must have alpha channel' }
  return { ok: true }
}

export const prototypeHeroVisuals: Readonly<Record<string, HeroVisualAsset>> = Object.fromEntries(
  Object.keys(visualDefinitions).map((heroId) => [heroId, resolvePrototypeHeroVisual(heroId, bundledAssetLookup)!]),
)

export function scaleVisualDuration(baseDurationMs: number, speed: GameSpeed): number {
  return baseDurationMs / speed
}
