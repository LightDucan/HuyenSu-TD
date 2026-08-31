import { enemyDefinitions } from '../enemies/definitions'
import { baTrieuMaps } from '../maps/baTrieuMaps'
import { baTrieuStageWaves } from '../waves/baTrieuWaves'
import { HAI_BA_TRUNG_STAGE_ID } from './haiBaTrungCampaign'
import { ACTIVE_HERO_IDS } from '../heroes/definitions'
import type { BattleStageDefinition, CampaignChapterDefinition } from './definitions'

export const BA_TRIEU_CHAPTER_ID = 'chapter-ba-trieu-248'
export const BA_TRIEU_STAGE_IDS = ['bt-01-tu-nghia-nui-nua', 'bt-02-cong-pha-thanh-ap', 'bt-03-ben-song-ma', 'bt-04-lap-luy-bo-dien', 'bt-05-dai-chien-bo-dien', 'bt-06-khuc-ca-nui-tung'] as const
export const BA_TRIEU_HERO_PROVENANCE = {
  'Bà Triệu': 'CORE — T1 / near-source / T2; Núi Tùng belongs to local T3 tradition',
  'Triệu Quốc Đạt': 'CONDITIONAL — later/local historiographical tradition (T3)',
  'Đinh Bôi': 'CONDITIONAL — local Đinh tradition at Bồ Điền (T3)',
} as const
/** Temporary playable placeholders until the Bà Triệu roster and art receive their own audited production task. */
export const BA_TRIEU_HERO_IDS = ACTIVE_HERO_IDS
const enemyDefinitionIds = ['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'] as const
const stageNames = ['Tụ Nghĩa Núi Nưa', 'Công Phá Thành Ấp', 'Bến Sông Mã', 'Lập Lũy Bồ Điền', 'Đại Chiến Bồ Điền', 'Khúc Ca Núi Tùng'] as const
const confidence = ['LOCAL TRADITION / RECONSTRUCTION', 'GENERAL CITY ATTACK SUPPORTED; SPECIFIC TƯ PHỐ BATTLE RECONSTRUCTED', 'COMPOSITE RECONSTRUCTION', 'LOCAL TRADITION / RECONSTRUCTION', 'COMPOSITE RECONSTRUCTION', 'LOCAL TRADITION / RECONSTRUCTION'] as const
const outcomes = [
  'Bảo vệ căn cứ khởi nghĩa sơ khai.', 'Công hãm một thành ấp Đông Ngô tại Cửu Chân.',
  'Ngăn lực lượng tiếp ứng đường sông.', 'Giữ vững chiến lũy theo truyền thống địa phương Bồ Điền.',
  'Đẩy lui một đợt công kích, không tiêu diệt hoàn toàn quân Đông Ngô.',
  'Last Stand: giữ gìn di sản kháng chiến; cuộc khởi nghĩa bị dập tắt năm 248. Núi Tùng/tuẫn tiết là truyền thống địa phương.',
] as const

const stages: readonly BattleStageDefinition[] = BA_TRIEU_STAGE_IDS.map((id, index) => ({
  id, displayName: stageNames[index], map: baTrieuMaps[index], waves: baTrieuStageWaves[index],
  allowedHeroIds: BA_TRIEU_HERO_IDS, enemyDefinitionIds, historicalConfidence: confidence[index], narrativeOutcome: outcomes[index],
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
