import { validateEquipmentInstance } from '../equipment/EquipmentV2'
import type { EquipmentV2Definition } from '../equipment/EquipmentSystem'
import { selectDeploymentCapacity } from './DeploymentCapacity'
import { grantCommandEnergy } from './CommandEnergy'
import type { CurrencyId, EquipmentInstance, MetaStateV4 } from './MetaState'

export type EconomyOperation =
  | Readonly<{ type: 'grant-currency'; currency: CurrencyId; amount: number }>
  | Readonly<{ type: 'spend-currency'; currency: CurrencyId; amount: number }>
  | Readonly<{ type: 'grant-consumable'; itemId: string; quantity: number }>
  | Readonly<{ type: 'consume-consumable'; itemId: string; quantity: number }>
  | Readonly<{ type: 'grant-equipment-instance'; instance: EquipmentInstance }>
  | Readonly<{ type: 'grant-command-energy'; amount: number }>
  | Readonly<{ type: 'increment-summon-orders'; quantity: number }>

export type EconomyTransactionRequest = Readonly<{
  idempotencyKey: string
  operations: readonly EconomyOperation[]
  receiptFingerprint?: string
}>

export type EconomyTransactionResult =
  | Readonly<{ status: 'applied'; state: MetaStateV4 }>
  | Readonly<{ status: 'already-applied'; state: MetaStateV4 }>

function assertPositiveSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${label} must be a positive safe integer`)
}

function addSafe(current: number, delta: number, label: string): number {
  const next = current + delta
  if (!Number.isSafeInteger(next) || next < 0) throw new Error(`${label} would become invalid`)
  return next
}

export function applyEconomyTransaction(
  state: MetaStateV4,
  request: EconomyTransactionRequest,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
  committedAtMs: number,
): EconomyTransactionResult {
  if (request.idempotencyKey.trim().length === 0) throw new Error('Idempotency key must not be empty')
  if (!Number.isSafeInteger(committedAtMs) || committedAtMs < 0) throw new Error('Commit timestamp must be a non-negative safe integer')
  if (request.operations.length === 0) throw new Error('Economy transaction must contain at least one operation')
  const fingerprint = request.receiptFingerprint ?? JSON.stringify(request.operations)
  if (fingerprint.length === 0) throw new Error('Economy transaction fingerprint must not be empty')
  const receipt = state.rewardReceipts[request.idempotencyKey]
  if (receipt) {
    if (receipt.transactionFingerprint !== fingerprint) throw new Error('Idempotency key was already used for a different transaction')
    return { status: 'already-applied', state }
  }

  const balances = { ...state.wallet.balances }
  const consumables = { ...state.inventory.consumables }
  const equipmentInstances = { ...state.inventory.equipmentInstances }
  let commandEnergy = state.commandEnergy
  let summonOrderCount = state.profile.summonOrderCount

  request.operations.forEach((operation) => {
    if (operation.type === 'grant-currency' || operation.type === 'spend-currency') {
      assertPositiveSafeInteger(operation.amount, 'Currency amount')
      const delta = operation.type === 'grant-currency' ? operation.amount : -operation.amount
      balances[operation.currency] = addSafe(balances[operation.currency], delta, `Wallet ${operation.currency}`)
    } else if (operation.type === 'grant-consumable' || operation.type === 'consume-consumable') {
      if (operation.itemId.trim().length === 0) throw new Error('Consumable item ID must not be empty')
      assertPositiveSafeInteger(operation.quantity, 'Consumable quantity')
      const delta = operation.type === 'grant-consumable' ? operation.quantity : -operation.quantity
      consumables[operation.itemId] = addSafe(consumables[operation.itemId] ?? 0, delta, `Consumable ${operation.itemId}`)
    } else if (operation.type === 'grant-equipment-instance') {
      validateEquipmentInstance(operation.instance, definitions)
      if (equipmentInstances[operation.instance.instanceId]) throw new Error('Equipment instance ID already exists')
      equipmentInstances[operation.instance.instanceId] = operation.instance
    } else if (operation.type === 'grant-command-energy') {
      assertPositiveSafeInteger(operation.amount, 'Command Energy grant amount')
      const granted = grantCommandEnergy(commandEnergy, operation.amount, committedAtMs)
      if (granted.status === 'invalid-clock') throw new Error('Command Energy clock cannot go backward')
      commandEnergy = granted.state
    } else if (operation.type === 'increment-summon-orders') {
      assertPositiveSafeInteger(operation.quantity, 'Summon Order quantity')
      summonOrderCount = addSafe(summonOrderCount, operation.quantity, 'Summon Order count')
      selectDeploymentCapacity({ ...state.profile, summonOrderCount })
    } else {
      const unsupported: never = operation
      throw new Error(`Unsupported economy operation: ${String(unsupported)}`)
    }
  })

  return {
    status: 'applied',
    state: {
      ...state,
      profile: { ...state.profile, summonOrderCount, updatedAtMs: committedAtMs },
      wallet: { balances },
      inventory: { ...state.inventory, consumables, equipmentInstances },
      commandEnergy,
      rewardReceipts: { ...state.rewardReceipts, [request.idempotencyKey]: { transactionFingerprint: fingerprint, committedAtMs } },
    },
  }
}
