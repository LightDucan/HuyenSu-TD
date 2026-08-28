import type { GoldGachaConfig, GachaRewardConfig } from '../../data/economy/prototypeEconomyConfig'
import type { EquipmentV2Definition } from '../equipment/EquipmentSystem'
import type { EconomyOperation } from './EconomyTransaction'
import type { EconomyTransactionCommit, LocalMetaRepository } from './MetaRepository'

export type RandomSource = () => number
export type EquipmentInstanceIdFactory = (pullIndex: number, reward: Extract<GachaRewardConfig, { type: 'equipment' }>) => string

export type GoldGachaPullResult = Readonly<{
  transaction: EconomyTransactionCommit
  rewards: readonly GachaRewardConfig[]
}>

function assertConfig(config: GoldGachaConfig, definitions: Readonly<Record<string, EquipmentV2Definition>>): void {
  if (!Number.isSafeInteger(config.pullCostGold) || config.pullCostGold <= 0) throw new Error('Gacha Gold pull cost must be a positive safe integer')
  if (config.rewards.length === 0) throw new Error('Gacha reward pool must not be empty')
  config.rewards.forEach((reward) => {
    if (!Number.isFinite(reward.weight) || reward.weight <= 0) throw new Error('Gacha reward weight must be positive')
    if (reward.type === 'gold' && (!Number.isSafeInteger(reward.amount) || reward.amount <= 0)) throw new Error('Gacha Gold reward must be a positive safe integer')
    if (reward.type === 'equipment' && !definitions[reward.definitionId]) throw new Error(`Unknown Gacha equipment definition: ${reward.definitionId}`)
    if (reward.type === 'consumable' && (!Number.isSafeInteger(reward.quantity) || reward.quantity <= 0)) throw new Error('Gacha consumable quantity must be positive')
  })
  const energyWeights = config.rewards.filter((reward) => reward.type === 'consumable').map((reward) => reward.weight)
  const otherWeights = config.rewards.filter((reward) => reward.type !== 'consumable').map((reward) => reward.weight)
  if (energyWeights.length === 0 || otherWeights.length === 0 || Math.max(...energyWeights) >= Math.min(...otherWeights)) {
    throw new Error('Binh Phu rewards must be the rarest Gacha categories')
  }
  if (config.pity.enabled !== false) throw new Error('Prototype Gacha pity must remain disabled')
}

export function selectWeightedReward(config: GoldGachaConfig, randomValue: number): GachaRewardConfig {
  if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) throw new Error('Gacha RNG value must be in [0, 1)')
  const totalWeight = config.rewards.reduce((sum, reward) => sum + reward.weight, 0)
  let cursor = randomValue * totalWeight
  for (const reward of config.rewards) {
    cursor -= reward.weight
    if (cursor < 0) return reward
  }
  return config.rewards[config.rewards.length - 1]
}

export class GoldGachaService {
  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly definitions: Readonly<Record<string, EquipmentV2Definition>>,
    private readonly config: GoldGachaConfig,
    private readonly random: RandomSource,
    private readonly createInstanceId: EquipmentInstanceIdFactory,
  ) { assertConfig(config, definitions) }

  pull(count: 1 | 10, expectedRevision: number, idempotencyKey: string, nowMs: number): GoldGachaPullResult {
    if (count !== 1 && count !== 10) throw new Error('Gacha pull count must be 1 or 10')
    const current = this.repository.load()
    if (current.status !== 'loaded') throw new Error('Gold Gacha requires a current Meta V5 save')
    if (current.save.revision !== expectedRevision) throw new Error(`Meta save revision conflict: expected ${expectedRevision}, actual ${current.save.revision}`)
    const receiptFingerprint = JSON.stringify({ type: 'gold-gacha', count })
    const priorReceipt = current.save.data.rewardReceipts[idempotencyKey]
    if (priorReceipt) {
      if (priorReceipt.transactionFingerprint !== receiptFingerprint) throw new Error('Idempotency key was already used for a different transaction')
      return { transaction: { status: 'already-applied', save: current.save }, rewards: [] }
    }
    const totalCost = this.config.pullCostGold * count
    if (!Number.isSafeInteger(totalCost)) throw new Error('Gacha total cost exceeds safe integer range')
    const rewards = Array.from({ length: count }, () => selectWeightedReward(this.config, this.random()))
    const operations: EconomyOperation[] = [{ type: 'spend-currency', currency: 'gold', amount: totalCost }]
    rewards.forEach((reward, pullIndex) => {
      if (reward.type === 'gold') operations.push({ type: 'grant-currency', currency: 'gold', amount: reward.amount })
      else if (reward.type === 'consumable') operations.push({ type: 'grant-consumable', itemId: reward.itemId, quantity: reward.quantity })
      else {
        const definition = this.definitions[reward.definitionId]
        operations.push({
          type: 'grant-equipment-instance',
          instance: { instanceId: this.createInstanceId(pullIndex, reward), definitionId: reward.definitionId, slot: definition.slot, level: 1 },
        })
      }
    })
    const transaction = this.repository.transactEconomy({ idempotencyKey, operations, receiptFingerprint }, this.definitions, expectedRevision, nowMs)
    return { transaction, rewards }
  }
}
