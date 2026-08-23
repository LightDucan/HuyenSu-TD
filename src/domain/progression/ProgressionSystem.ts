export const MAX_HERO_LEVEL = 100

export type HeroStage = 'normal' | 'rebirth' | 'reincarnation' | 'legendary'
export type HeroProgression = Readonly<{ stage: HeroStage; level: number; upgradeReadyAt?: number }>

const nextStage: Record<Exclude<HeroStage, 'legendary'>, HeroStage> = {
  normal: 'rebirth',
  rebirth: 'reincarnation',
  reincarnation: 'legendary',
}

export function canUpgrade(state: HeroProgression, nowMs: number, cooldownEnabled = true): boolean {
  return state.level < MAX_HERO_LEVEL && (!cooldownEnabled || state.upgradeReadyAt == null || nowMs >= state.upgradeReadyAt)
}

export function upgradeLevel(state: HeroProgression, nowMs: number, cooldownMs: number, cooldownEnabled = true): HeroProgression {
  if (!canUpgrade(state, nowMs, cooldownEnabled)) throw new Error('Hero is not ready to upgrade')
  const { upgradeReadyAt: _upgradeReadyAt, ...withoutCooldown } = state
  return cooldownEnabled
    ? { ...withoutCooldown, level: state.level + 1, upgradeReadyAt: nowMs + cooldownMs }
    : { ...withoutCooldown, level: state.level + 1 }
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
