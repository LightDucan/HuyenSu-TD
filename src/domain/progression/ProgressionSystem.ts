export const MAX_HERO_LEVEL = 100

export type HeroStage = 'normal' | 'rebirth' | 'reincarnation' | 'legendary'
export type HeroProgression = Readonly<{ stage: HeroStage; level: number; upgradeReadyAt?: number }>

const nextStage: Record<Exclude<HeroStage, 'legendary'>, HeroStage> = {
  normal: 'rebirth',
  rebirth: 'reincarnation',
  reincarnation: 'legendary',
}

export function canUpgrade(state: HeroProgression, nowMs: number): boolean {
  return state.level < MAX_HERO_LEVEL && (state.upgradeReadyAt == null || nowMs >= state.upgradeReadyAt)
}

export function upgradeLevel(state: HeroProgression, nowMs: number, cooldownMs: number): HeroProgression {
  if (!canUpgrade(state, nowMs)) throw new Error('Hero is not ready to upgrade')
  return { ...state, level: state.level + 1, upgradeReadyAt: nowMs + cooldownMs }
}

export function canAdvanceStage(state: HeroProgression): boolean {
  return state.level === MAX_HERO_LEVEL && state.stage !== 'legendary'
}

export function advanceStage(state: HeroProgression): HeroProgression {
  if (!canAdvanceStage(state)) throw new Error('Hero must reach level 100 before advancing')
  const stage = state.stage as Exclude<HeroStage, 'legendary'>
  return { stage: nextStage[stage], level: 1 }
}

export function stageStatMultiplier(stage: HeroStage): number {
  return { normal: 1, rebirth: 1.35, reincarnation: 1.8, legendary: 2.5 }[stage]
}
