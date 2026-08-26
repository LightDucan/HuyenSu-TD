import { COMMAND_ENERGY_BASE_CAP, type CommandEnergyState } from './MetaState'

export const COMMAND_ENERGY_REGEN_INTERVAL_MS = 120_000 as const
export const COMMAND_ENERGY_WAVE_COST = 1 as const

export type CommandEnergyConfig = Readonly<{
  baseCap: number
  regenIntervalMs: number
}>

export const defaultCommandEnergyConfig: CommandEnergyConfig = {
  baseCap: COMMAND_ENERGY_BASE_CAP,
  regenIntervalMs: COMMAND_ENERGY_REGEN_INTERVAL_MS,
}

export type CommandEnergyResolveResult =
  | Readonly<{ status: 'resolved'; state: CommandEnergyState }>
  | Readonly<{ status: 'invalid-clock'; state: CommandEnergyState }>

export type CommandEnergySpendResult =
  | Readonly<{ status: 'spent'; state: CommandEnergyState }>
  | Readonly<{ status: 'insufficient'; state: CommandEnergyState }>
  | Readonly<{ status: 'invalid-clock'; state: CommandEnergyState }>

export type CommandEnergyGrantResult =
  | Readonly<{ status: 'granted'; state: CommandEnergyState }>
  | Readonly<{ status: 'invalid-clock'; state: CommandEnergyState }>

function assertNonNegativeSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`)
}

function validateStateAndConfig(state: CommandEnergyState, config: CommandEnergyConfig): void {
  assertNonNegativeSafeInteger(state.current, 'Command Energy current')
  assertNonNegativeSafeInteger(state.regenAnchorAtMs, 'Command Energy regen anchor')
  if (!Number.isSafeInteger(config.baseCap) || config.baseCap < 1) throw new Error('Command Energy base cap must be a positive safe integer')
  if (!Number.isSafeInteger(config.regenIntervalMs) || config.regenIntervalMs < 1) throw new Error('Command Energy regen interval must be a positive safe integer')
}

function validateTimestamp(nowMs: number): void {
  assertNonNegativeSafeInteger(nowMs, 'Command Energy timestamp')
}

export function selectCommandEnergyCap(playerLevel: number, config: CommandEnergyConfig = defaultCommandEnergyConfig): number {
  if (!Number.isSafeInteger(playerLevel) || playerLevel < 1) throw new Error('Player Level must be a positive safe integer')
  validateStateAndConfig({ current: 0, regenAnchorAtMs: 0 }, config)
  // Player Level scaling remains deliberately open. Phase 12 uses the locked base cap only.
  return config.baseCap
}

export function resolveCommandEnergyRegen(
  state: CommandEnergyState,
  nowMs: number,
  config: CommandEnergyConfig = defaultCommandEnergyConfig,
): CommandEnergyResolveResult {
  validateStateAndConfig(state, config)
  validateTimestamp(nowMs)
  if (nowMs < state.regenAnchorAtMs) return { status: 'invalid-clock', state }

  const cap = config.baseCap
  if (state.current >= cap) return { status: 'resolved', state }

  const elapsedMs = nowMs - state.regenAnchorAtMs
  const completedIntervals = Math.floor(elapsedMs / config.regenIntervalMs)
  if (completedIntervals === 0) return { status: 'resolved', state }

  const missingEnergy = cap - state.current
  if (completedIntervals >= missingEnergy) {
    // Reaching cap discards all surplus elapsed time so regeneration can never be banked.
    return { status: 'resolved', state: { current: cap, regenAnchorAtMs: nowMs } }
  }

  return {
    status: 'resolved',
    state: {
      current: state.current + completedIntervals,
      regenAnchorAtMs: state.regenAnchorAtMs + completedIntervals * config.regenIntervalMs,
    },
  }
}

export function spendCommandEnergy(
  state: CommandEnergyState,
  cost: number,
  nowMs: number,
  config: CommandEnergyConfig = defaultCommandEnergyConfig,
): CommandEnergySpendResult {
  assertNonNegativeSafeInteger(cost, 'Command Energy cost')
  if (cost < 1) throw new Error('Command Energy cost must be at least 1')

  const resolved = resolveCommandEnergyRegen(state, nowMs, config)
  if (resolved.status === 'invalid-clock') return resolved
  if (resolved.state.current < cost) return { status: 'insufficient', state }

  const current = resolved.state.current - cost
  const crossedBelowCap = resolved.state.current >= config.baseCap && current < config.baseCap
  return {
    status: 'spent',
    state: {
      current,
      regenAnchorAtMs: crossedBelowCap ? nowMs : resolved.state.regenAnchorAtMs,
    },
  }
}

export function grantCommandEnergy(
  state: CommandEnergyState,
  amount: number,
  nowMs: number,
  config: CommandEnergyConfig = defaultCommandEnergyConfig,
): CommandEnergyGrantResult {
  assertNonNegativeSafeInteger(amount, 'Command Energy grant')
  if (amount < 1) throw new Error('Command Energy grant must be at least 1')

  const resolved = resolveCommandEnergyRegen(state, nowMs, config)
  if (resolved.status === 'invalid-clock') return resolved
  if (resolved.state.current > Number.MAX_SAFE_INTEGER - amount) throw new Error('Command Energy grant exceeds safe integer range')

  const current = resolved.state.current + amount
  return {
    status: 'granted',
    state: {
      current,
      regenAnchorAtMs: current >= config.baseCap ? nowMs : resolved.state.regenAnchorAtMs,
    },
  }
}
