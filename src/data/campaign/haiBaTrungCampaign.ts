import { ACTIVE_HERO_IDS } from '../heroes/definitions'
import { enemyDefinitions } from '../enemies/definitions'
import { haiBaTrungMap } from '../maps/prototypeMap'
import { haiBaTrungWaves } from '../waves/prototypeWaves'
import type { CampaignChapterDefinition } from './definitions'

export const HAI_BA_TRUNG_STAGE_ID = 'hbt-lang-bac-stage-01'
const enemyDefinitionIds = [...new Set(haiBaTrungWaves.flatMap((wave) => wave.groups.map((group) => group.enemyId)))]

export const haiBaTrungChapter = {
  id: 'chapter-i-hai-ba-trung',
  displayName: haiBaTrungMap.title,
  stages: [{
    id: HAI_BA_TRUNG_STAGE_ID,
    displayName: 'Huyết Chiến Lãng Bạc',
    map: haiBaTrungMap,
    waves: haiBaTrungWaves,
    allowedHeroIds: ACTIVE_HERO_IDS,
    enemyDefinitionIds,
  }],
} satisfies CampaignChapterDefinition

enemyDefinitionIds.forEach((enemyId) => {
  if (!enemyDefinitions[enemyId]) throw new Error(`Campaign stage references unknown enemy ${enemyId}`)
})

export const defaultCampaignChapter = haiBaTrungChapter
export const defaultBattleStage = haiBaTrungChapter.stages[0]
