import type { HeroBaseStats } from '../progression/StatCalculator'
import type { HeroStage } from '../progression/ProgressionSystem'
import { balanceV1 } from '../../data/economy/balanceV1'

export type HeroStar = 1 | 2 | 3 | 4 | 5
export type HeroCollectionEntry = Readonly<{
  heroId: string
  stars: HeroStar
  progression: Readonly<{ stage: HeroStage; level: number; upgradeReadyAt?: number }>
}>
export type HeroCollection = Readonly<Record<string, HeroCollectionEntry>>
export type HeroRecruitmentState = Readonly<{
  heroCollection: HeroCollection
  consumables: Readonly<Record<string, number>>
}>

export const CHIEU_HIEN_LENH_ID = 'item_chieu_hien_lenh' as const
export const ANH_HON_ID = 'anh-hon' as const
export const DUPLICATE_SHARD_QUANTITY = 10 as const
export const ACTIVE_PRODUCTION_HERO_IDS = ['trung-trac', 'trung-nhi', 'le-chan'] as const
export const PROTOTYPE_OWNED_HERO_IDS = ACTIVE_PRODUCTION_HERO_IDS

export function createPrototypeHeroCollection(): HeroCollection {
  return Object.fromEntries(PROTOTYPE_OWNED_HERO_IDS.map((heroId) => [heroId, {
    heroId,
    stars: 1 as const,
    progression: { stage: 'normal' as const, level: 1 },
  }]))
}

export function selectPlayableOwnedHeroIds(heroCollection: HeroCollection, availableHeroIds: readonly string[]): readonly string[] {
  const available = new Set(availableHeroIds)
  return Object.keys(heroCollection).filter((heroId) => available.has(heroId))
}

export function isHeroOwned(heroCollection: HeroCollection, heroId: string): boolean {
  return heroCollection[heroId] !== undefined
}

export type RecruitmentPoolEntry = Readonly<{ heroId: string; weight: number }>
export type RecruitmentConfig = Readonly<{
  pool: readonly RecruitmentPoolEntry[]
  duplicateShardQuantity: number
  starShardCosts: Readonly<Record<2 | 3 | 4 | 5, number>>
  starGrowth: Readonly<Record<HeroStar, Partial<HeroBaseStats>>>
  evolutionCosts: Readonly<Record<'rebirth' | 'reincarnation' | 'legendary', number>>
  passiveByHero?: Readonly<Record<string, Readonly<{ atkPercent?: number; attackSpeedPercent?: number }>>>
}>

export const prototypeHeroRecruitmentConfig: RecruitmentConfig = {
  pool: [
    ...Object.entries(balanceV1.recruitment.weights).map(([heroId, weight]) => ({ heroId, weight })),
  ],
  duplicateShardQuantity: balanceV1.recruitment.duplicateShards,
  starShardCosts: balanceV1.stars.shardCosts,
  starGrowth: balanceV1.stars.flatGrowth,
  evolutionCosts: balanceV1.evolution.anhHonCosts,
  passiveByHero: {},
}

export type RecruitmentResult = Readonly<{ heroId: string; outcome: 'new' | 'duplicate'; shards: number }>
export type RecruitmentBatchResult = Readonly<{ state: HeroRecruitmentState; results: readonly RecruitmentResult[] }>

function add(map: Readonly<Record<string, number>>, id: string, amount: number): Record<string, number> {
  const next = { ...map, [id]: (map[id] ?? 0) + amount }
  if (!Number.isSafeInteger(next[id]) || next[id] < 0) throw new Error('Unsafe inventory quantity')
  return next
}

export function resolveRecruitmentBatch(
  state: HeroRecruitmentState,
  count: 1 | 10,
  random: () => number,
  config: RecruitmentConfig = prototypeHeroRecruitmentConfig,
): RecruitmentBatchResult {
  if ((state.consumables[CHIEU_HIEN_LENH_ID] ?? 0) < count) throw new Error('Insufficient Chiêu Hiền Lệnh')
  const totalWeight = config.pool.reduce((sum, item) => sum + item.weight, 0)
  if (!(totalWeight > 0)) throw new Error('Recruitment pool is empty')
  let heroes = { ...state.heroCollection }
  let consumables: Record<string, number> = { ...state.consumables, [CHIEU_HIEN_LENH_ID]: (state.consumables[CHIEU_HIEN_LENH_ID] ?? 0) - count }
  const results: RecruitmentResult[] = []
  for (let index = 0; index < count; index += 1) {
    const roll = random()
    if (!(roll >= 0 && roll < 1)) throw new Error('Recruitment RNG must return [0,1)')
    let cursor = roll * totalWeight
    const selected = config.pool.find((item) => (cursor -= item.weight) < 0) ?? config.pool[config.pool.length - 1]
    const existing = heroes[selected.heroId]
    if (existing) {
      const shardId = `shard_hero_${selected.heroId}`
      consumables = add(consumables, shardId, config.duplicateShardQuantity)
      results.push({ heroId: selected.heroId, outcome: 'duplicate', shards: config.duplicateShardQuantity })
    } else {
      heroes[selected.heroId] = { heroId: selected.heroId, stars: 1, progression: { stage: 'normal', level: 1 } }
      results.push({ heroId: selected.heroId, outcome: 'new', shards: 0 })
    }
  }
  return { state: { heroCollection: heroes, consumables }, results }
}

export function grantHero(state: HeroRecruitmentState, heroId: string, config = prototypeHeroRecruitmentConfig): { state: HeroRecruitmentState; result: RecruitmentResult } {
  if (state.heroCollection[heroId]) {
    const shards = config.duplicateShardQuantity
    return { state: { heroCollection: state.heroCollection, consumables: add(state.consumables, `shard_hero_${heroId}`, shards) }, result: { heroId, outcome: 'duplicate', shards } }
  }
  return { state: { heroCollection: { ...state.heroCollection, [heroId]: { heroId, stars: 1, progression: { stage: 'normal', level: 1 } } }, consumables: state.consumables }, result: { heroId, outcome: 'new', shards: 0 } }
}

export function ascendHeroStar(state: HeroRecruitmentState, heroId: string, config = prototypeHeroRecruitmentConfig): HeroRecruitmentState {
  const hero = state.heroCollection[heroId]
  if (!hero) throw new Error('Hero is not owned')
  if (hero.stars >= 5) throw new Error('Hero is already 5★')
  const target = (hero.stars + 1) as 2 | 3 | 4 | 5
  const shardId = `shard_hero_${heroId}`
  const required = config.starShardCosts[target]
  const current = state.consumables[shardId] ?? 0
  if (current < required) throw new Error('Insufficient Hero shards')
  return { heroCollection: { ...state.heroCollection, [heroId]: { ...hero, stars: target } }, consumables: { ...state.consumables, [shardId]: current - required } }
}

export function evolveHero(state: HeroRecruitmentState, heroId: string, config = prototypeHeroRecruitmentConfig): HeroRecruitmentState {
  const hero = state.heroCollection[heroId]
  if (!hero) throw new Error('Hero is not owned')
  if (hero.progression.level !== 100 || hero.progression.stage === 'legendary') throw new Error('Hero must be level 100 and have a next stage')
  const next = hero.progression.stage === 'normal' ? 'rebirth' : hero.progression.stage === 'rebirth' ? 'reincarnation' : 'legendary'
  const required = config.evolutionCosts[next]
  const available = state.consumables[ANH_HON_ID] ?? 0
  if (available < required) throw new Error('Insufficient Anh Hồn')
  return { heroCollection: { ...state.heroCollection, [heroId]: { ...hero, progression: { stage: next, level: 1 } } }, consumables: { ...state.consumables, [ANH_HON_ID]: available - required } }
}

export function resolveLegendaryPassive(heroId: string, stage: HeroStage, config = prototypeHeroRecruitmentConfig) {
  return stage === 'legendary' ? config.passiveByHero?.[heroId] : undefined
}
