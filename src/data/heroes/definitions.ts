import { giaCatLuong } from './giaCatLuong'
import { hoangTrung } from './hoangTrung'
import { quanVu } from './quanVu'
import { trieuVan } from './trieuVan'
import { truongPhi } from './truongPhi'

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
  [quanVu.id]: quanVu,
  [trieuVan.id]: trieuVan,
  [truongPhi.id]: truongPhi,
  [hoangTrung.id]: hoangTrung,
  [giaCatLuong.id]: giaCatLuong,
}

export { giaCatLuong, hoangTrung, quanVu, trieuVan, truongPhi }
