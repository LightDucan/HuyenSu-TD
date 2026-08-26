import type { ActivePlayTimeProgress, CurrencyId, MetaStateV3 } from './MetaState'

export type RewardOperation =
  | Readonly<{ type: 'grant-currency'; currency: CurrencyId; amount: number }>
  | Readonly<{ type: 'spend-currency'; currency: CurrencyId; amount: number }>
  | Readonly<{ type: 'grant-consumable'; itemId: string; quantity: number }>
  | Readonly<{ type: 'set-active-play-time'; progress: ActivePlayTimeProgress }>

export type RewardTransactionRequest = Readonly<{
  idempotencyKey: string
  operations: readonly RewardOperation[]
  receiptPolicy?: 'persist' | 'checkpoint-only'
}>

export type RewardTransactionResult =
  | Readonly<{ status: 'applied'; state: MetaStateV3 }>
  | Readonly<{ status: 'already-applied'; state: MetaStateV3 }>

function assertPositiveSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${label} must be a positive safe integer`)
}

function assertNonNegativeSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`)
}

function addSafe(current: number, delta: number, label: string): number {
  const next = current + delta
  if (!Number.isSafeInteger(next) || next < 0) throw new Error(`${label} would become invalid`)
  return next
}

function fingerprint(operations: readonly RewardOperation[]): string {
  return JSON.stringify(operations)
}

export function applyRewardTransaction(state: MetaStateV3, request: RewardTransactionRequest, committedAtMs: number): RewardTransactionResult {
  if (request.idempotencyKey.trim().length === 0) throw new Error('Idempotency key must not be empty')
  if (!Number.isSafeInteger(committedAtMs) || committedAtMs < 0) throw new Error('Commit timestamp must be a non-negative safe integer')
  if (request.operations.length === 0) throw new Error('Reward transaction must contain at least one operation')
  const activeCheckpointOperations = request.operations.filter((operation) => operation.type === 'set-active-play-time')
  if (request.receiptPolicy === 'checkpoint-only' && activeCheckpointOperations.length !== 1) {
    throw new Error('Checkpoint-only transaction requires exactly one active play-time checkpoint')
  }

  const transactionFingerprint = fingerprint(request.operations)
  if (request.receiptPolicy !== 'checkpoint-only') {
    const receipt = state.rewardReceipts[request.idempotencyKey]
    if (receipt !== undefined) {
      if (receipt.transactionFingerprint !== transactionFingerprint) throw new Error('Idempotency key was already used for a different transaction')
      return { status: 'already-applied', state }
    }
  }

  const balances = { ...state.wallet.balances }
  const consumables = { ...state.inventory.consumables }
  let activePlayTime = state.activePlayTime
  for (const operation of request.operations) {
    if (operation.type === 'grant-currency') {
      assertPositiveSafeInteger(operation.amount, 'Currency grant amount')
      balances[operation.currency] = addSafe(balances[operation.currency], operation.amount, `Wallet ${operation.currency}`)
    } else if (operation.type === 'spend-currency') {
      assertPositiveSafeInteger(operation.amount, 'Currency spend amount')
      balances[operation.currency] = addSafe(balances[operation.currency], -operation.amount, `Wallet ${operation.currency}`)
    } else if (operation.type === 'grant-consumable') {
      if (operation.itemId.trim().length === 0) throw new Error('Consumable item ID must not be empty')
      assertPositiveSafeInteger(operation.quantity, 'Consumable grant quantity')
      consumables[operation.itemId] = addSafe(consumables[operation.itemId] ?? 0, operation.quantity, `Consumable ${operation.itemId}`)
    } else if (operation.type === 'set-active-play-time') {
      assertNonNegativeSafeInteger(operation.progress.observedVisibleMs, 'Observed visible time')
      assertNonNegativeSafeInteger(operation.progress.observedHiddenMs, 'Observed hidden time')
      assertNonNegativeSafeInteger(operation.progress.remainderEligibleMs, 'Active play-time remainder')
      if (operation.progress.observedVisibleMs < state.activePlayTime.observedVisibleMs || operation.progress.observedHiddenMs < state.activePlayTime.observedHiddenMs) {
        throw new Error('Active play-time cumulative duration cannot go backward')
      }
      if (request.receiptPolicy === 'checkpoint-only' && operation.progress.observedVisibleMs === state.activePlayTime.observedVisibleMs && operation.progress.observedHiddenMs === state.activePlayTime.observedHiddenMs) {
        throw new Error('Active play-time checkpoint must advance cumulative duration')
      }
      activePlayTime = { ...operation.progress }
    } else {
      const unsupported: never = operation
      throw new Error(`Unsupported reward operation: ${String(unsupported)}`)
    }
  }

  return {
    status: 'applied',
    state: {
      ...state,
      profile: { ...state.profile, updatedAtMs: committedAtMs },
      wallet: { balances },
      inventory: { ...state.inventory, consumables },
      activePlayTime,
      rewardReceipts: request.receiptPolicy === 'checkpoint-only'
        ? state.rewardReceipts
        : { ...state.rewardReceipts, [request.idempotencyKey]: { transactionFingerprint, committedAtMs } },
    },
  }
}
