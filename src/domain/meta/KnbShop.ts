import type { KnbShopEntry } from '../../data/economy/prototypeEconomyConfig'
import type { EquipmentV2Definition } from '../equipment/EquipmentSystem'
import type { EconomyTransactionCommit, LocalMetaRepository } from './MetaRepository'

export class KnbShopService {
  private readonly entries: ReadonlyMap<string, KnbShopEntry>

  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly definitions: Readonly<Record<string, EquipmentV2Definition>>,
    entries: readonly KnbShopEntry[],
  ) {
    if (new Set(entries.map((entry) => entry.itemId)).size !== entries.length) throw new Error('KNB Shop item IDs must be unique')
    entries.forEach((entry) => {
      if (entry.itemId.trim().length === 0 || !Number.isSafeInteger(entry.quantity) || entry.quantity <= 0 || !Number.isSafeInteger(entry.priceKnb) || entry.priceKnb <= 0) throw new Error('Invalid KNB Shop entry')
    })
    this.entries = new Map(entries.map((entry) => [entry.itemId, entry]))
  }

  buy(itemId: string, purchaseCount: number, expectedRevision: number, idempotencyKey: string, nowMs: number): EconomyTransactionCommit {
    const entry = this.entries.get(itemId)
    if (!entry) throw new Error('Unknown KNB Shop item')
    if (!Number.isSafeInteger(purchaseCount) || purchaseCount <= 0) throw new Error('Shop purchase count must be a positive safe integer')
    const price = entry.priceKnb * purchaseCount
    const quantity = entry.quantity * purchaseCount
    if (!Number.isSafeInteger(price) || !Number.isSafeInteger(quantity)) throw new Error('Shop purchase exceeds safe integer range')
    return this.repository.transactEconomy({
      idempotencyKey,
      operations: [
        { type: 'spend-currency', currency: 'knb', amount: price },
        { type: 'grant-consumable', itemId: entry.itemId, quantity },
      ],
    }, this.definitions, expectedRevision, nowMs)
  }
}

