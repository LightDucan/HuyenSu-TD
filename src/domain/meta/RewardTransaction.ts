import type { CurrencyId, MetaStateV2 } from './MetaState'

export type RewardOperation =
  | Readonly<{ type: 'grant-currency'; currency: CurrencyId; amount: number }>
  | Readonly<{ type: 'spend-currency'; currency: CurrencyId; amount: number }>
  | Readonly<{ type: 'grant-consumable'; itemId: string; quantity: number }>

export type RewardTransactionRequest = Readonly<{
  idempotencyKey: string
  operations: readonly RewardOperation[]
}>

export type RewardTransactionResult =
  | Readonly<{ status: 'applied'; state: MetaStateV2 }>
  | Readonly<{ status: 'already-applied'; state: MetaStateV2 }>

function assertPositiveSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${label} must be a positive safe integer`)
}

function addSafe(current: number, delta: number, label: string): number {
  const next = current + delta
  if (!Number.isSafeInteger(next) || next < 0) throw new Error(`${label} would become invalid`)
  return next
}

function fingerprint(operations: readonly RewardOperation[]): string {
  return JSON.stringify(operations)
}

export function applyRewardTransaction(state: MetaStateV2, request: RewardTransactionRequest, committedAtMs: number): RewardTransactionResult {
  if (request.idempotencyKey.trim().length === 0) throw new Error('Idempotency key must not be empty')
  if (!Number.isSafeInteger(committedAtMs) || committedAtMs < 0) throw new Error('Commit timestamp must be a non-negative safe integer')
  if (request.operations.length === 0) throw new Error('Reward transaction must contain at least one operation')

  const transactionFingerprint = fingerprint(request.operations)
  const receipt = state.rewardReceipts[request.idempotencyKey]
  if (receipt !== undefined) {
    if (receipt.transactionFingerprint !== transactionFingerprint) throw new Error('Idempotency key was already used for a different transaction')
    return { status: 'already-applied', state }
  }

  const balances = { ...state.wallet.balances }
  const consumables = { ...state.inventory.consumables }
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
      rewardReceipts: {
        ...state.rewardReceipts,
        [request.idempotencyKey]: { transactionFingerprint, committedAtMs },
      },
    },
  }
}
