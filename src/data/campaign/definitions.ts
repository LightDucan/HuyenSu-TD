import type { HeroDefinition } from '../heroes/definitions'
import type { WaveDefinition } from '../waves/prototypeWaves'
import type { BattleMapDefinition } from '../maps/MapDefinition'
export type StageNarrativeDefinition = Readonly<{ preBattle: string; waveBeats: readonly Readonly<{ wave: number; text: string }>[]; victory: string; defeat: string }>

export type BattleStageDefinition = Readonly<{
  id: string
  displayName: string
  map: BattleMapDefinition
  waves: readonly WaveDefinition[]
  allowedHeroIds: readonly HeroDefinition['id'][]
  enemyDefinitionIds: readonly string[]
  historicalConfidence?: string
  narrativeOutcome?: string
  narrative?: StageNarrativeDefinition
  firstClearReward?: Readonly<{ gold: number; knb: number; anhHon: number }>
}>

export type CampaignChapterDefinition = Readonly<{
  id: string
  displayName: string
  historicalArcId?: string
  periodLabel?: string
  enemyFaction?: string
  prerequisiteStageId?: string
  stages: readonly BattleStageDefinition[]
}>
