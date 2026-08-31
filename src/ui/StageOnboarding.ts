export type OnboardingInput = Readonly<{ incomplete: boolean; waveStatus: 'waiting' | 'running' | 'won'; wave: number; placedHeroCount: number; rangeEnabled: boolean; speed: 1 | 3; autoWave: boolean; deployed: number; effectiveLimit: number; equipmentLocked: boolean }>
export function selectStageOnboardingHint(input: OnboardingInput): string | undefined {
  if (!input.incomplete) return undefined
  if (input.placedHeroCount === 0) return 'Chọn Tướng và đặt vào một vị trí triển khai.'
  if (input.waveStatus === 'waiting' && !input.rangeEnabled) return 'Kiểm tra Tầm đánh rồi bắt đầu Wave.'
  if (input.waveStatus === 'running' && input.wave <= 3) return 'Kỹ năng Chủ động sẽ tự kích hoạt sau đủ số đòn đánh.'
  if (input.placedHeroCount > 1 && input.wave <= 12) return 'Có thể triển khai nhiều Tướng và đổi vị trí.'
  if (input.speed === 3) return 'x3 tăng tốc trận đấu.'
  if (input.autoWave) return 'Tự động Wave sẽ bắt đầu đợt tiếp theo khi có thể.'
  if (input.equipmentLocked) return 'Trang bị bị khóa trong Wave đang diễn ra.'
  return `Triển khai: ${input.deployed} / ${input.effectiveLimit}`
}
