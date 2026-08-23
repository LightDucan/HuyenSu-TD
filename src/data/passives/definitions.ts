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
}
