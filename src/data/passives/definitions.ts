export type PassiveDefinition = Readonly<{
  id: string
  name: string
  description: string
  requiredStage: 'legendary'
}>

export const heroPassives: Record<string, PassiveDefinition> = {
  'trung-trac': { id: 'trung-vuong-linh-nam', name: 'Trưng Vương Lĩnh Nam', description: 'Khái niệm Huyền Sử đang hoãn: AoE Skill và điều kiện thành trì chưa được shared passive system hỗ trợ.', requiredStage: 'legendary' },
  'trung-nhi': { id: 'tien-phong-lac-tien', name: 'Tiên Phong Lạc Tiễn', description: 'Khái niệm Huyền Sử đang hoãn: Range, AttackSpeed và mũi tên phụ khi Crit chưa được shared passive system hỗ trợ.', requiredStage: 'legendary' },
  'le-chan': { id: 'nu-tuong-an-bien', name: 'Nữ Tướng An Biên', description: 'Khái niệm Huyền Sử đang hoãn: Root bonus damage và Crit/CritDamage chưa được shared passive system hỗ trợ.', requiredStage: 'legendary' },
  'quan-vu': {
    id: 'uy-chan-hoa-ha',
    name: 'Uy Chấn Hoa Hạ',
    description: 'Nội tại Huyền Sử của Quan Vũ. Hiệu ứng chiến đấu đang chờ shared passive system.',
    requiredStage: 'legendary',
  },
  'trieu-van': {
    id: 'long-dam-bat-tu',
    name: 'Long Đảm Bất Tử',
    description: 'Nội tại Huyền Sử của Triệu Vân. Hiệu ứng chiến đấu đang chờ shared passive system.',
    requiredStage: 'legendary',
  },
  'truong-phi': {
    id: 'cuong-no-truong-ban',
    name: 'Cuồng Nộ Trường Bản',
    description: 'Nội tại Huyền Sử của Trương Phi. Hiệu ứng chiến đấu đang chờ shared passive system.',
    requiredStage: 'legendary',
  },
  'hoang-trung': {
    id: 'than-tien-lao-tuong',
    name: 'Thần Tiễn Lão Tướng',
    description: 'Nội tại Huyền Sử của Hoàng Trung. Hiệu ứng chiến đấu đang chờ shared passive system.',
    requiredStage: 'legendary',
  },
  'gia-cat-luong': {
    id: 'toa-vu-khong-minh',
    name: 'Tọa Vũ Khổng Minh',
    description: 'Nội tại Huyền Sử của Gia Cát Lượng. Hiệu ứng chiến đấu đang chờ shared passive system.',
    requiredStage: 'legendary',
  },
}
