import { HAI_BA_TRUNG_HERO_IDS } from '../heroes/definitions'
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
    allowedHeroIds: HAI_BA_TRUNG_HERO_IDS,
    enemyDefinitionIds,
    narrative: {
      preBattle: 'Quân Đông Hán đã áp sát Lãng Bạc. Giữ vững tuyến phòng ngự, bảo toàn lực lượng và chặn đợt tiến công của Mã Viện.',
      waveBeats: [1, 6, 12, 18, 24].map((wave) => ({ wave, text: ['Quân Hán đã tới — giữ tuyến đầu!', 'Nỏ thủ đang tiến lên từ phía sau.', 'Thiết giáp ép sát lối vượt đầm.', 'Đợt tiến công chính đang bắt đầu.', 'Mã Viện đã thân chinh áp trận!'][[1, 6, 12, 18, 24].indexOf(wave)] })),
      victory: 'Đợt tiến công tại Lãng Bạc đã bị chặn lại. Quân ta giữ được chiến địa trong lúc này, nhưng chiến dịch của Mã Viện vẫn chưa kết thúc.',
      defeat: 'Phòng tuyến Lãng Bạc đã vỡ. Điều chỉnh vị trí tướng và chuẩn bị lại đội hình.',
    },
    firstClearReward: { gold: 100, knb: 50, anhHon: 100 },
  }],
} satisfies CampaignChapterDefinition

enemyDefinitionIds.forEach((enemyId) => {
  if (!enemyDefinitions[enemyId]) throw new Error(`Campaign stage references unknown enemy ${enemyId}`)
})

export const defaultCampaignChapter = haiBaTrungChapter
export const defaultBattleStage = haiBaTrungChapter.stages[0]
