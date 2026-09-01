import { enemyDefinitions } from '../enemies/definitions'
import { baTrieuMaps } from '../maps/baTrieuMaps'
import { baTrieuStageWaves } from '../waves/baTrieuWaves'
import { HAI_BA_TRUNG_STAGE_ID } from './haiBaTrungCampaign'
import { BA_TRIEU_HERO_IDS } from '../heroes/definitions'
import type { BattleStageDefinition, CampaignChapterDefinition } from './definitions'

export const BA_TRIEU_CHAPTER_ID = 'chapter-ba-trieu-248'
export const BA_TRIEU_STAGE_IDS = ['bt-01-tu-nghia-nui-nua', 'bt-02-cong-pha-thanh-ap', 'bt-03-ben-song-ma', 'bt-04-lap-luy-bo-dien', 'bt-05-dai-chien-bo-dien', 'bt-06-khuc-ca-nui-tung'] as const
export const BA_TRIEU_HERO_PROVENANCE = {
  'Bà Triệu': 'CORE — T1 / near-source / T2; Núi Tùng belongs to local T3 tradition',
  'Triệu Quốc Đạt': 'CONDITIONAL — later/local historiographical tradition (T3)',
  'Đinh Bôi': 'CONDITIONAL — local Đinh tradition at Bồ Điền (T3)',
} as const
export { BA_TRIEU_HERO_IDS }
const enemyDefinitionIds = ['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'] as const
const stageNames = ['Tụ Nghĩa Núi Nưa', 'Công Phá Thành Ấp', 'Bến Sông Mã', 'Lập Lũy Bồ Điền', 'Đại Chiến Bồ Điền', 'Khúc Ca Núi Tùng'] as const
const confidence = ['LOCAL TRADITION / RECONSTRUCTION', 'GENERAL CITY ATTACK SUPPORTED; SPECIFIC TƯ PHỐ BATTLE RECONSTRUCTED', 'COMPOSITE RECONSTRUCTION', 'LOCAL TRADITION / RECONSTRUCTION', 'COMPOSITE RECONSTRUCTION', 'LOCAL TRADITION / RECONSTRUCTION'] as const
const outcomes = [
  'Bảo vệ căn cứ khởi nghĩa sơ khai.', 'Công hãm một thành ấp Đông Ngô tại Cửu Chân.',
  'Ngăn lực lượng tiếp ứng đường sông.', 'Giữ vững chiến lũy theo truyền thống địa phương Bồ Điền.',
  'Đẩy lui một đợt công kích, không tiêu diệt hoàn toàn quân Đông Ngô.',
  'Last Stand: giữ gìn di sản kháng chiến; cuộc khởi nghĩa bị dập tắt năm 248. Núi Tùng/tuẫn tiết là truyền thống địa phương.',
] as const

export const BA_TRIEU_STAGE01_HISTORICAL_CONFIDENCE = 'LOCAL TRADITION / RECONSTRUCTION' as const
const stage01Narrative = {
  preBattle: 'Production Reconstruction — Theo truyền thống địa phương về Núi Nưa, nghĩa quân đang tụ hội tại vùng Cửu Chân. Quân Đông Ngô gây sức ép tới gần; hãy giữ vị trí tập hợp để cuộc khởi nghĩa có thể lan rộng.',
  waveBeats: [
    { wave: 1, text: 'Tiếp xúc đầu tiên — nghĩa quân giữ vững đội hình!' },
    { wave: 6, text: 'Nỏ thủ và giáp binh đang ép vào các điểm yếu.' },
    { wave: 12, text: 'Sức ép Đông Ngô tăng mạnh — giữ chặt tuyến giữa!' },
    { wave: 18, text: 'Đội trấn áp cuối cùng cùng đốc chiến quan đang tiến vào!' },
  ],
  victory: 'Đợt trấn áp trước mắt đã bị đẩy lùi. Nghĩa quân có thêm thời gian mở rộng lực lượng, nhưng cuộc kháng chiến chống Đông Ngô vẫn tiếp diễn.',
  defeat: 'Vị trí tập hợp đã mất và đội hình bị phá vỡ. Hãy bố trí lại lực lượng để giành lại căn cứ.',
} as const

const stages: readonly BattleStageDefinition[] = BA_TRIEU_STAGE_IDS.map((id, index) => ({
  id, displayName: stageNames[index], map: baTrieuMaps[index], waves: baTrieuStageWaves[index],
  allowedHeroIds: BA_TRIEU_HERO_IDS, enemyDefinitionIds, historicalConfidence: confidence[index], narrativeOutcome: outcomes[index],
  ...(index === 0 ? { narrative: stage01Narrative } : {}),
}))

export const baTrieuChapter = {
  id: BA_TRIEU_CHAPTER_ID,
  displayName: 'Bà Triệu — Khởi Nghĩa Núi Nưa (248)',
  historicalArcId: 'ARC-BT-01',
  periodLabel: '248 CE',
  enemyFaction: 'Đông Ngô',
  prerequisiteStageId: HAI_BA_TRUNG_STAGE_ID,
  stages,
} satisfies CampaignChapterDefinition

enemyDefinitionIds.forEach((enemyId) => {
  if (!enemyDefinitions[enemyId]) throw new Error(`Bà Triệu campaign references unknown enemy ${enemyId}`)
})
