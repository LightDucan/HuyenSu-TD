import { enemyDefinitions } from '../enemies/definitions'
import { baTrieuMaps } from '../maps/baTrieuMaps'
import { baTrieuStageWaves } from '../waves/baTrieuWaves'
import { HAI_BA_TRUNG_STAGE03_ID } from './haiBaTrungCampaign'
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
const stage02Narrative = {
  preBattle: 'Năm 248, sử liệu ghi nhận nghĩa quân công hãm thành ấp tại Cửu Chân. Trận địa cụ thể này là phục dựng gameplay: cửa tuyến ngoài đã mở — giữ hành lang đột phá trước quân giữ đồn phản kích.',
  waveBeats: [
    { wave: 1, text: 'Quân giữ đồn phản kích từ tuyến ngoài!' },
    { wave: 7, text: 'Giáp binh đang dồn ép cửa đột phá.' },
    { wave: 14, text: 'Lực lượng trong thành ấp đang tổ chức lại đội hình.' },
    { wave: 20, text: 'Đốc chiến quan tung lực lượng dự bị cuối cùng!' },
  ],
  victory: 'Sức kháng cự của đồn trị địa phương đã bị bẻ gãy. Nghĩa quân giữ được vị trí thành ấp và mở thêm đà tiến trong Cửu Chân.',
  defeat: 'Đầu cầu đột phá đã sụp đổ. Đội quân công kích phải lui lại và tập hợp trước khi thử lại.',
} as const
const stage03Narrative = {
  preBattle: 'Cuộc nổi dậy năm 248 lan rộng khắp Cửu Chân. Bến Sông Mã dưới đây là phục dựng tổng hợp: quân tiếp viện Đông Ngô đang tiến từ hành lang đường sông. Hãy chặn chúng trước khi tuyến nghĩa quân bị xuyên thủng.',
  waveBeats: [
    { wave: 1, text: 'Nhóm tiếp viện đầu tiên đã tới bờ sông!' },
    { wave: 8, text: 'Đội đổ bộ nỏ thủ đang tạo sức ép dọc bờ.' },
    { wave: 15, text: 'Dòng tiếp viện dồn dập qua hành lang sông.' },
    { wave: 22, text: 'Đốc chiến quan tung cột quân cuối cùng!' },
  ],
  victory: 'Cột tiếp viện trước mắt đã bị đánh tan. Hành lang sông tạm thời được giữ vững, giúp nghĩa quân tiếp tục hoạt động trong vùng.',
  defeat: 'Cột tiếp viện đã xuyên thủng tuyến bờ sông. Hành lang bị uy hiếp; hãy tập hợp lại và thử lại.',
} as const
const stage04Narrative = {
  preBattle: 'Bồ Điền trong màn chơi này là phục dựng theo truyền thống địa phương: nghĩa quân đang dựng một lũy đất mới, còn các đợt công kích Đông Ngô đã áp sát. Hãy giữ vững tuyến phòng thủ chưa hoàn thiện.',
  waveBeats: [
    { wave: 1, text: 'Địch đang thăm dò tuyến lũy còn dang dở!' },
    { wave: 8, text: 'Nỏ thủ bắt đầu thử lửa công sự.' },
    { wave: 16, text: 'Giáp binh mở đợt công kích dồn dập!' },
    { wave: 24, text: 'Cột áp chế cuối cùng cùng đốc chiến quan tiến vào!' },
  ],
  victory: 'Đợt công kích trước mắt đã bị đẩy lùi. Tuyến lũy giữ được và nghĩa quân bảo toàn chỗ đứng tại Bồ Điền.',
  defeat: 'Tuyến phòng thủ đã sụp đổ dưới sức ép công kích. Hãy tập hợp lại và thử giữ lũy lần nữa.',
} as const
const stage05Narrative = {
  preBattle: 'Sử liệu xác nhận Lục Dận chỉ huy việc bình định Giao Châu năm 248, nhưng trận Đại Chiến Bồ Điền dưới đây là phục dựng tổng hợp. Một cánh quân Đông Ngô đang dồn tới căn cứ — hãy giữ vững trận địa.',
  waveBeats: [
    { wave: 1, text: 'Đợt công kích chính tràn vào cánh đồng Bồ Điền!' },
    { wave: 9, text: 'Đội hình giáp binh và nỏ thủ đang mở rộng sức ép.' },
    { wave: 18, text: 'Trận địa bước vào nhịp giằng co căng thẳng!' },
    { wave: 26, text: 'Một đốc chiến quan chiến trường tung cột quân cuối cùng!' },
  ],
  victory: 'Đợt công kích trực diện trước mắt đã bị đẩy lùi. Vị trí Bồ Điền còn nguyên vẹn trong lúc này, nhưng chiến dịch bình định vẫn tiếp diễn.',
  defeat: 'Trận địa đồng bằng đã sụp đổ dưới sức ép. Nghĩa quân rút về khu phòng thủ cuối và có thể thử lại.',
} as const
const stage06Narrative = {
  preBattle: 'Cuộc khởi nghĩa bước vào hồi kết trong năm 248. Theo truyền thống địa phương, phòng tuyến cuối của Bà Triệu gắn với Núi Tùng; trận địa cụ thể này là phục dựng gameplay. Quân Đông Ngô đang siết vòng vây — hãy giữ vững phòng tuyến cuối.',
  waveBeats: [
    { wave: 1, text: 'Cột quân trấn áp đầu tiên tiến vào đường núi!' },
    { wave: 10, text: 'Vòng vây đang siết chặt quanh phòng tuyến.' },
    { wave: 19, text: 'Hành lang phòng thủ cuối chịu sức ép liên tục!' },
    { wave: 28, text: 'Đốc chiến quan chiến trường tung cột quân cuối cùng!' },
  ],
  victory: 'Phòng tuyến cuối đã giữ đến hồi kết. Chính sử chép cuộc khởi nghĩa bị dẹp trong năm 248 và Bà Triệu tử trận; truyền thống địa phương kể rằng bà tuẫn tiết tại Núi Tùng. Cuộc chiến khép lại, nhưng khí phách bất khuất của Bà Triệu còn lưu truyền.',
  defeat: 'Phòng tuyến tan vỡ trước khi màn Last Stand hoàn tất. Hãy bố trí lại lực lượng và thử lại.',
} as const

const stages: readonly BattleStageDefinition[] = BA_TRIEU_STAGE_IDS.map((id, index) => ({
  id, displayName: stageNames[index], map: baTrieuMaps[index], waves: baTrieuStageWaves[index],
  allowedHeroIds: BA_TRIEU_HERO_IDS, enemyDefinitionIds, historicalConfidence: confidence[index], narrativeOutcome: outcomes[index],
  ...(index === 0 ? { narrative: stage01Narrative } : index === 1 ? { narrative: stage02Narrative } : index === 2 ? { narrative: stage03Narrative } : index === 3 ? { narrative: stage04Narrative } : index === 4 ? { narrative: stage05Narrative } : { narrative: stage06Narrative }),
}))

export const baTrieuChapter = {
  id: BA_TRIEU_CHAPTER_ID,
  displayName: 'Bà Triệu — Khởi Nghĩa Núi Nưa (248)',
  historicalArcId: 'ARC-BT-01',
  periodLabel: '248 CE',
  enemyFaction: 'Đông Ngô',
  prerequisiteStageId: HAI_BA_TRUNG_STAGE03_ID,
  stages,
} satisfies CampaignChapterDefinition

enemyDefinitionIds.forEach((enemyId) => {
  if (!enemyDefinitions[enemyId]) throw new Error(`Bà Triệu campaign references unknown enemy ${enemyId}`)
})
