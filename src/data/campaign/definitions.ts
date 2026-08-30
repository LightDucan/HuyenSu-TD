import type { HeroDefinition } from '../heroes/definitions'
import type { WaveDefinition } from '../waves/prototypeWaves'
import type { haiBaTrungMap } from '../maps/prototypeMap'

export type BattleStageDefinition = Readonly<{
  id: string
  displayName: string
  map: typeof haiBaTrungMap
  waves: readonly WaveDefinition[]
  allowedHeroIds: readonly HeroDefinition['id'][]
  enemyDefinitionIds: readonly string[]
}>

export type CampaignChapterDefinition = Readonly<{
  id: string
  displayName: string
  stages: readonly BattleStageDefinition[]
}>
