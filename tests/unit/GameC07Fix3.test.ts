import { describe, expect, it } from 'vitest'
import { selectStageOnboardingHint } from '../../src/ui/StageOnboarding'
describe('GAME-C07 FIX3 onboarding selectors', () => {
  const base = { incomplete: true, waveStatus: 'waiting' as const, wave: 1, placedHeroCount: 0, rangeEnabled: false, speed: 1 as const, autoWave: false, deployed: 0, effectiveLimit: 7, equipmentLocked: false }
  it('guides first placement and suppresses replay noise', () => { expect(selectStageOnboardingHint(base)).toContain('đặt'); expect(selectStageOnboardingHint({ ...base, incomplete: false })).toBeUndefined() })
  it('progresses contextual hints from battle state', () => { expect(selectStageOnboardingHint({ ...base, placedHeroCount: 1 })).toContain('Tầm'); expect(selectStageOnboardingHint({ ...base, placedHeroCount: 1, waveStatus: 'running' })).toContain('Kỹ năng'); expect(selectStageOnboardingHint({ ...base, placedHeroCount: 2, wave: 8, rangeEnabled: true })).toContain('nhiều Tướng') })
})
