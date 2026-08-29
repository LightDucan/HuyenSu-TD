import type { BattleHudData } from '../game/bridge/BattleHudContract'

export interface TopCityBarProps {
  data: BattleHudData
  wallet?: Readonly<{ gold: number; knb: number }>
}

export function TopCityBar({ data, wallet }: TopCityBarProps) {
  const swordCount = data.remainingByCategory.sword ?? 0
  const archerCount = data.remainingByCategory.archer ?? 0
  const otherCount = data.remainingByCategory.other ?? 0

  return (
    <header className="top-city-bar" aria-label="Thông tin Thành trì và Đợt quái">
      <div className="city-info-group top-hud-left">
        <div className="city-name-row">
          <span className="city-icon" aria-hidden="true">🏯</span>
          <h2 className="city-name">Huyết Chiến Lãng Bạc</h2>
        </div>
        <div className="city-hp-bar-container">
          <span className="hp-label">Thành trì HP:</span>
          <span className="hp-value">{data.cityHp}</span>
          <span className="battle-summary-counts">
            (Hạ: {data.enemiesDefeated} | Thoát: {data.enemiesEscaped})
          </span>
        </div>
      </div>

      {/* 2. Wave Counter (Đợt X/10) */}
      <div className="wave-counter-box" aria-live="polite">
        <span className="wave-label">Tiến trình đợt</span>
        <span className="wave-number">
          Đợt {data.wave}<span className="wave-total">/{data.totalWaves}</span>
        </span>
        {data.battleStatus === 'won' && <span className="status-tag tag-won">Thắng</span>}
        {data.battleStatus === 'lost' && <span className="status-tag tag-lost">Bại</span>}
      </div>

      <div className="top-hud-right">
        {wallet && <div className="wallet-hud" aria-label="Ví tài nguyên"><span>Vàng: {wallet.gold}</span><span>KNB: {wallet.knb}</span></div>}
        {/* 3. Enemy Remaining Counter theo loại */}
        <div className="enemy-counters-box" aria-label="Số lượng quái còn lại theo loại">
        <span className="enemy-box-label">Quái còn lại:</span>
        <div className="enemy-category-chips">
          <div className="enemy-chip chip-sword" title="Đông Hán Bộ Binh">
            <span className="chip-icon">⚔</span>
            <span className="chip-name">Bộ Binh</span>
            <span className="chip-count">×{swordCount}</span>
          </div>

          <div className="enemy-chip chip-archer" title="Đông Hán Nỏ Thủ">
            <span className="chip-icon">🏹</span>
            <span className="chip-name">Nỏ Thủ</span>
            <span className="chip-count">×{archerCount}</span>
          </div>

          {otherCount > 0 && (
            <div className="enemy-chip chip-other" title="Thiết Giáp / Mã Viện">
              <span className="chip-icon">👾</span>
              <span className="chip-name">Thiết Giáp</span>
              <span className="chip-count">×{otherCount}</span>
            </div>
          )}
        </div>
        </div>
      </div>
    </header>
  )
}
