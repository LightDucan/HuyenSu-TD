import { HAI_BA_TRUNG_HERO_IDS } from '../heroes/definitions'
import { enemyDefinitions } from '../enemies/definitions'
import { haiBaTrungMap } from '../maps/prototypeMap'
import { haiBaTrungWaves } from '../waves/prototypeWaves'
import { haiBaTrungStage02Map, haiBaTrungStage03Map, haiBaTrungStage04Map, haiBaTrungStage05Map } from '../maps/haiBaTrungProductionMaps'
import { haiBaTrungStage02Waves, haiBaTrungStage03Waves, haiBaTrungStage04Waves, haiBaTrungStage05Waves } from '../waves/haiBaTrungProductionWaves'
import type { CampaignChapterDefinition } from './definitions'

export const HAI_BA_TRUNG_STAGE_ID = 'hbt-lang-bac-stage-01'
export const HAI_BA_TRUNG_STAGE02_ID = 'hbt-lang-bac-stage-02'
export const HAI_BA_TRUNG_STAGE03_ID = 'hbt-cam-khe-stage-03'
export const HAI_BA_TRUNG_STAGE04_ID = 'hbt-thuy-bo-stage-04'
export const HAI_BA_TRUNG_STAGE05_ID = 'hbt-cam-khe-stage-05'
export const HAI_BA_TRUNG_STAGE_IDS = [HAI_BA_TRUNG_STAGE_ID, HAI_BA_TRUNG_STAGE02_ID, HAI_BA_TRUNG_STAGE03_ID, HAI_BA_TRUNG_STAGE04_ID, HAI_BA_TRUNG_STAGE05_ID] as const
export const HBT_STAGE01_FIRST_CLEAR_REWARD = { gold: 100, knb: 50, anhHon: 100 } as const
const stage01EnemyDefinitionIds = [...new Set(haiBaTrungWaves.flatMap((wave) => wave.groups.map((group) => group.enemyId)))]
const nonBossEnemyDefinitionIds = ['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard'] as const

export const haiBaTrungChapter = {
  id: 'chapter-i-hai-ba-trung',
  displayName: haiBaTrungMap.title,
  stages: [
    {
      id: HAI_BA_TRUNG_STAGE_ID, displayName: 'Huyết Chiến Lãng Bạc', map: haiBaTrungMap, waves: haiBaTrungWaves,
      allowedHeroIds: HAI_BA_TRUNG_HERO_IDS, enemyDefinitionIds: stage01EnemyDefinitionIds,
      narrative: {
        preBattle: 'Quân Đông Hán đã áp sát Lãng Bạc. Giữ vững tuyến phòng ngự, bảo toàn lực lượng và chặn đợt tiến công của Mã Viện.',
        waveBeats: [1, 6, 12, 18, 24].map((wave) => ({ wave, text: ['Quân Hán đã tới — giữ tuyến đầu!', 'Nỏ thủ đang tiến lên từ phía sau.', 'Thiết giáp ép sát lối vượt đầm.', 'Đợt tiến công chính đang bắt đầu.', 'Mã Viện đã thân chinh áp trận!'][[1, 6, 12, 18, 24].indexOf(wave)] })),
        victory: 'Đợt tiến công tại Lãng Bạc đã bị chặn lại. Quân ta giữ được chiến địa trong lúc này, nhưng chiến dịch của Mã Viện vẫn chưa kết thúc.',
        defeat: 'Phòng tuyến Lãng Bạc đã vỡ. Điều chỉnh vị trí tướng và chuẩn bị lại đội hình.',
      },
      firstClearReward: HBT_STAGE01_FIRST_CLEAR_REWARD,
    },
    {
      id: HAI_BA_TRUNG_STAGE02_ID, displayName: 'Rút Tuyến Lãng Bạc', map: haiBaTrungStage02Map, waves: haiBaTrungStage02Waves,
      allowedHeroIds: HAI_BA_TRUNG_HERO_IDS, enemyDefinitionIds: nonBossEnemyDefinitionIds,
      historicalConfidence: 'COMPOSITE RECONSTRUCTION',
      narrativeOutcome: 'Bảo vệ hành lang rút quân và tuyến phòng ngự kế tiếp; không coi đây là một trận đánh có tên được sử liệu xác nhận.',
      narrative: {
        preBattle: 'Sau giao tranh tại Lãng Bạc, sức ép của quân Đông Hán ngày càng lớn. Màn chơi này là phục dựng tổng hợp: hãy giữ hành lang rút quân để lực lượng kháng chiến có thể chuyển sang tuyến phòng ngự kế tiếp.',
        waveBeats: [
          { wave: 1, text: 'Quân Hán đã áp sát hành lang rút quân!' }, { wave: 6, text: 'Nỏ thủ đang tìm cách khóa các khoảng trống trên tuyến.' },
          { wave: 12, text: 'Giáp binh tăng sức ép — bảo vệ đường lui!' }, { wave: 18, text: 'Đợt truy kích lớn đang dồn tới tuyến sau!' },
          { wave: 22, text: 'Giữ vững đợt cuối để lực lượng rút khỏi khu vực!' },
        ],
        victory: 'Hành lang rút quân đã được giữ đủ lâu để lực lượng kháng chiến chuyển sang tuyến kế tiếp. Đây là thắng lợi chiến thuật của màn chơi; chiến dịch của Mã Viện vẫn tiếp diễn.',
        defeat: 'Hành lang rút quân bị xuyên thủng trước khi lực lượng kịp chuyển tuyến. Hãy bố trí lại đội hình và thử lại.',
      },
    },
    {
      id: HAI_BA_TRUNG_STAGE03_ID, displayName: 'Phòng Tuyến Cẩm Khê', map: haiBaTrungStage03Map, waves: haiBaTrungStage03Waves,
      allowedHeroIds: HAI_BA_TRUNG_HERO_IDS, enemyDefinitionIds: nonBossEnemyDefinitionIds,
      historicalConfidence: 'CORE location/event + gameplay reconstruction',
      narrativeOutcome: 'Giữ một tuyến phòng ngự tại Cẩm Khê trong khuôn khổ gameplay; không tuyên bố đánh bại chiến dịch Đông Hán.',
      narrative: {
        preBattle: 'Cẩm Khê gắn với giai đoạn kháng cự cuối của Hai Bà Trưng trong chiến dịch 42–43. Địa hình và trận tuyến cụ thể trong màn chơi là phục dựng gameplay. Quân Đông Hán đang dồn tới — hãy giữ phòng tuyến.',
        waveBeats: [
          { wave: 1, text: 'Tuyến Cẩm Khê bắt đầu giao chiến!' }, { wave: 6, text: 'Nỏ thủ đối phương đang gây sức ép từ phía sau!' },
          { wave: 12, text: 'Giáp binh tiến vào khu vực trọng yếu của phòng tuyến!' }, { wave: 18, text: 'Sức ép chiến dịch tăng mạnh — giữ vững đội hình!' },
          { wave: 24, text: 'Đợt công kích cuối của màn chơi đang tràn tới!' },
        ],
        victory: 'Phòng tuyến đã đứng vững qua đợt công kích này. Kháng cự tại Cẩm Khê vẫn tiếp diễn; màn chơi không thay đổi kết cục lịch sử của chiến dịch.',
        defeat: 'Phòng tuyến Cẩm Khê đã bị xuyên thủng. Hãy điều chỉnh vị trí tướng và tổ chức lại phòng thủ.',
      },
    },
    {
      id: HAI_BA_TRUNG_STAGE04_ID, displayName: 'Hành Lang Thủy Bộ', map: haiBaTrungStage04Map, waves: haiBaTrungStage04Waves,
      allowedHeroIds: HAI_BA_TRUNG_HERO_IDS, enemyDefinitionIds: nonBossEnemyDefinitionIds,
      historicalConfidence: 'COMPOSITE RECONSTRUCTION',
      narrativeOutcome: 'Bảo vệ việc di chuyển của người, lực lượng và tiếp tế qua một hành lang sông/đầm lầy được phục dựng cho gameplay; không coi đây là một trận đánh có tên được sử liệu xác nhận.',
      narrative: {
        preBattle: 'Áp lực của quân Đông Hán tiếp tục dồn lên các tuyến kháng cự. Hành lang thủy bộ trong màn chơi là phục dựng tổng hợp cho điều kiện sông, đầm lầy và đường chuyển quân. Hãy giữ tuyến để người, lực lượng và tiếp tế có thể tiếp tục di chuyển.',
        waveBeats: [
          { wave: 1, text: 'Quân Hán đã tiến vào hành lang thủy bộ!' }, { wave: 6, text: 'Nỏ thủ đang khống chế các khoảng trống trên đường chuyển tuyến!' },
          { wave: 12, text: 'Giáp binh ép sát những điểm vượt hẹp!' }, { wave: 18, text: 'Sức ép lên hành lang vận chuyển đang tăng mạnh!' },
          { wave: 22, text: 'Giữ đợt cuối để tuyến di chuyển không bị cắt đứt!' },
        ],
        victory: 'Hành lang được giữ đủ lâu để lực lượng và tiếp tế tiếp tục chuyển qua khu vực. Đây là kết quả chiến thuật của màn chơi; chiến dịch Đông Hán vẫn tiếp diễn.',
        defeat: 'Hành lang đã bị xuyên thủng trước khi việc chuyển tuyến hoàn tất. Hãy bố trí lại đội hình và thử lại.',
      },
    },
    {
      id: HAI_BA_TRUNG_STAGE05_ID, displayName: 'Tuyến Cuối Cẩm Khê', map: haiBaTrungStage05Map, waves: haiBaTrungStage05Waves,
      allowedHeroIds: HAI_BA_TRUNG_HERO_IDS, enemyDefinitionIds: nonBossEnemyDefinitionIds,
      historicalConfidence: 'CORE campaign endpoint + COMPOSITE RECONSTRUCTION',
      narrativeOutcome: 'Giữ một tuyến cuối trong bối cảnh Cẩm Khê để trì hoãn đà tiến và bảo toàn lực lượng/di sản kháng cự; không tuyên bố đảo ngược kết cục lịch sử.',
      narrative: {
        preBattle: 'Cẩm Khê gắn với giai đoạn cuối của cuộc kháng cự chống chiến dịch Mã Viện. Tuyến phòng thủ cụ thể trong màn chơi là phục dựng tổng hợp. Sức ép quân Đông Hán đang lên cao — hãy trì hoãn đà tiến và giữ đường cho lực lượng phía sau.',
        waveBeats: [
          { wave: 1, text: 'Đợt công kích đầu tiên đã chạm tuyến cuối!' }, { wave: 7, text: 'Nỏ thủ đang tìm khoảng trống để phá thế phòng thủ!' },
          { wave: 13, text: 'Giáp binh dồn sức vào khu vực trọng yếu!' }, { wave: 20, text: 'Phòng tuyến chịu sức ép liên tục — không để đường sau bị cắt!' },
          { wave: 26, text: 'Đợt công kích cuối của màn chơi đang tràn tới!' },
        ],
        victory: 'Tuyến cuối đã giữ đủ lâu để làm chậm đà tiến và bảo toàn một phần lực lượng phía sau. Đây không phải chiến thắng chiến lược; hồi kết lịch sử của chiến dịch vẫn ở phía trước.',
        defeat: 'Phòng tuyến đã bị xuyên thủng trước khi nhiệm vụ trì hoãn hoàn tất. Hãy tổ chức lại đội hình và thử lại.',
      },
    },
  ],
} satisfies CampaignChapterDefinition

new Set([...stage01EnemyDefinitionIds, ...nonBossEnemyDefinitionIds]).forEach((enemyId) => {
  if (!enemyDefinitions[enemyId]) throw new Error(`Campaign stage references unknown enemy ${enemyId}`)
})

export const defaultCampaignChapter = haiBaTrungChapter
export const defaultBattleStage = haiBaTrungChapter.stages[0]
