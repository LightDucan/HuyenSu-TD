import { giaCatLuong } from './giaCatLuong'
import { hoangTrung } from './hoangTrung'
import { quanVu } from './quanVu'
import { trieuVan } from './trieuVan'
import { truongPhi } from './truongPhi'
import { trungTrac } from './trungTrac'
import { trungNhi } from './trungNhi'
import { leChan } from './leChan'
import { baTrieu } from './baTrieu'
import { trieuQuocDat } from './trieuQuocDat'
import { dinhBoi } from './dinhBoi'

export type HeroArchetype = 'near-melee' | 'mid-melee' | 'bow' | 'magic'

export type HeroDefinition = Readonly<{
  id: string
  name: string
  faction: string
  archetype: HeroArchetype
  baseStats: {
    hp: number
    atk: number
    range: number
    attackSpeed: number
    crit: number
    critDamage: number
  }
  skillTriggerHits: number
  activeSkillId: string
  presentation: {
    skinId: string
    animationSetId: string
  }
}>

export const heroDefinitions: Record<string, HeroDefinition> = {
  [trungTrac.id]: trungTrac,
  [trungNhi.id]: trungNhi,
  [leChan.id]: leChan,
  [baTrieu.id]: baTrieu,
  [trieuQuocDat.id]: trieuQuocDat,
  [dinhBoi.id]: dinhBoi,
  [quanVu.id]: quanVu,
  [trieuVan.id]: trieuVan,
  [truongPhi.id]: truongPhi,
  [hoangTrung.id]: hoangTrung,
  [giaCatLuong.id]: giaCatLuong,
}

export const HAI_BA_TRUNG_HERO_IDS = ['trung-trac', 'trung-nhi', 'le-chan'] as const
export const BA_TRIEU_HERO_IDS = ['ba-trieu', 'trieu-quoc-dat', 'dinh-boi'] as const
export const PRODUCTION_HERO_IDS = [...HAI_BA_TRUNG_HERO_IDS, ...BA_TRIEU_HERO_IDS] as const
export const ACTIVE_HERO_IDS = PRODUCTION_HERO_IDS
export { baTrieu, dinhBoi, giaCatLuong, hoangTrung, leChan, quanVu, trieuQuocDat, trieuVan, trungNhi, trungTrac, truongPhi }
