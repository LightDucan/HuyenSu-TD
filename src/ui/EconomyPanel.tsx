import { prototypeGoldGachaConfig, prototypeKnbShopConfig } from '../data/economy/prototypeEconomyConfig'
import { commandEnergyItemValues, CONSUMABLE_ITEM_IDS } from '../data/items/definitions'
import type { MetaSaveV4 } from '../domain/meta/MetaState'

export interface EconomyPanelProps {
  save: MetaSaveV4
  lastResult?: string
  onGacha: (count: 1 | 10) => void
  onBuy: (itemId: string) => void
  onUse: (itemId: string, quantity: number) => void
}

const ITEM_NAMES: Readonly<Record<string, string>> = {
  [CONSUMABLE_ITEM_IDS.smallEnergyToken]: 'Tiểu Binh Phù (+1 Quân Lệnh)',
  [CONSUMABLE_ITEM_IDS.mediumEnergyToken]: 'Trung Binh Phù (+5 Quân Lệnh)',
  [CONSUMABLE_ITEM_IDS.largeEnergyToken]: 'Đại Binh Phù (+10 Quân Lệnh)',
  [CONSUMABLE_ITEM_IDS.recruitmentDecree]: 'Chiêu Hiền Lệnh',
  [CONSUMABLE_ITEM_IDS.summonOrder]: 'Lệnh Hiệu Triệu (+1 capacity vĩnh viễn)',
}

export function EconomyPanel({ save, lastResult, onGacha, onBuy, onUse }: EconomyPanelProps) {
  const consumables = Object.entries(save.data.inventory.consumables).filter(([, quantity]) => quantity > 0)
  return (
    <section className="economy-panel" aria-label="Gacha Gold, KNB Shop và vật phẩm tiêu hao">
      <div className="economy-wallet">
        <strong>Vàng: {save.data.wallet.balances.gold}</strong>
        <strong>KNB: {save.data.wallet.balances.knb}</strong>
        <span>Quân Lệnh: {save.data.commandEnergy.current} · Lệnh Hiệu Triệu đã dùng: {save.data.profile.summonOrderCount}</span>
      </div>
      <div className="economy-columns">
        <article>
          <h3>Gold Gacha</h3>
          <p>Prototype cost: {prototypeGoldGachaConfig.pullCostGold} Gold/lượt · Pity OFF · 10x không có bảo đảm ẩn.</p>
          <button type="button" onClick={() => onGacha(1)}>Rút 1x</button>
          <button type="button" onClick={() => onGacha(10)}>Rút 10x</button>
        </article>
        <article>
          <h3>KNB Shop</h3>
          {prototypeKnbShopConfig.map((entry) => (
            <div className="economy-row" key={entry.itemId}>
              <span>{entry.name} · {entry.priceKnb} KNB</span>
              <button type="button" onClick={() => onBuy(entry.itemId)}>Mua</button>
            </div>
          ))}
        </article>
        <article>
          <h3>Vật phẩm tiêu hao</h3>
          {consumables.length === 0 && <p>Chưa có vật phẩm.</p>}
          {consumables.map(([itemId, quantity]) => {
            const usable = commandEnergyItemValues[itemId] !== undefined || itemId === CONSUMABLE_ITEM_IDS.summonOrder
            return (
              <div className="economy-row" key={itemId}>
                <span>{ITEM_NAMES[itemId] ?? itemId} ×{quantity}</span>
                {usable && <span><button type="button" onClick={() => onUse(itemId, 1)}>Dùng 1</button><button type="button" onClick={() => onUse(itemId, quantity)}>Dùng tất cả</button></span>}
              </div>
            )
          })}
        </article>
      </div>
      {lastResult && <p className="economy-result" role="status">{lastResult}</p>}
      <small>Toàn bộ cost/rate/price hiện là PROTOTYPE / NON-FINAL; Phase 18 khóa balance.</small>
    </section>
  )
}

