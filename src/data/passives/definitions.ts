export type PassiveDefinition = Readonly<{
  id: string
  name: string
  description: string
  requiredStage: 'legendary'
}>

export const heroPassives: Record<string, PassiveDefinition> = {
  'quan-vu': {
    id: 'uy-chan-hoa-ha',
    name: 'Uy Chấn Hoa Hạ',
    description: 'Tăng 20% sát thương kỹ năng và 15% tốc đánh khi đạt cảnh giới Huyền Sử.',
    requiredStage: 'legendary',
  },
  'trieu-van': {
    id: 'long-dam-bat-tu',
    name: 'Long Đảm Bất Tử',
    description: 'Tăng 25% tốc đánh và 10% tỉ lệ chí mạng khi đạt cảnh giới Huyền Sử.',
    requiredStage: 'legendary',
  },
  'truong-phi': {
    id: 'cuong-no-truong-ban',
    name: 'Cuồng Nộ Trường Bản',
    description: 'Tăng 30% sát thương cơ bản (ATK) khi đạt cảnh giới Huyền Sử.',
    requiredStage: 'legendary',
  },
  'hoang-trung': {
    id: 'than-tien-lao-tuong',
    name: 'Thần Tiễn Lão Tướng',
    description: 'Tăng 50 tầm đánh (Range) và 20% sát thương chí mạng khi đạt cảnh giới Huyền Sử.',
    requiredStage: 'legendary',
  },
  'gia-cat-luong': {
    id: 'toa-vu-khong-minh',
    name: 'Tọa Vũ Khổng Minh',
    description: 'Tăng 25% sát thương kỹ năng và giảm 1 đòn cần để kích hoạt kỹ năng khi đạt cảnh giới Huyền Sử.',
    requiredStage: 'legendary',
  },
}
