import { giaCatLuong } from './giaCatLuong'
import { hoangTrung } from './hoangTrung'
import { quanVu } from './quanVu'
import { trieuVan } from './trieuVan'
import { truongPhi } from './truongPhi'
import { trungTrac } from './trungTrac'
import { trungNhi } from './trungNhi'
import { leChan } from './leChan'

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
  [quanVu.id]: quanVu,
  [trieuVan.id]: trieuVan,
  [truongPhi.id]: truongPhi,
  [hoangTrung.id]: hoangTrung,
  [giaCatLuong.id]: giaCatLuong,
}

export const ACTIVE_HERO_IDS = ['trung-trac', 'trung-nhi', 'le-chan'] as const
export { giaCatLuong, hoangTrung, leChan, quanVu, trieuVan, trungNhi, trungTrac, truongPhi }
