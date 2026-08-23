import type { EnemyCategory } from '../data/enemies/definitions'

export interface TopCityBarProps {
  cityName?: string
  defenseLevel?: number | string
  difficulty?: string
  cityHp: number
  wave: number
  totalWaves: number
  remainingByCategory: Record<EnemyCategory, number>
  enemiesDefeated?: number
  enemiesEscaped?: number
  battleStatus?: 'running' | 'won' | 'lost'
}

export function TopCityBar({
  cityName = 'Kinh Châu Thành',
  defenseLevel = 'Cấp 1',
  difficulty = 'Thường',
  cityHp,
  wave,
  totalWaves,
  remainingByCategory,
  enemiesDefeated = 0,
  enemiesEscaped = 0,
  battleStatus = 'running',
}: TopCityBarProps) {
  const swordCount = remainingByCategory.sword ?? 0
  const archerCount = remainingByCategory.archer ?? 0
  const otherCount = remainingByCategory.other ?? 0

  return (
    <header className="top-city-bar" aria-label="Thông tin Thành trì và Đợt quái">
      {/* 1. Tên thành / Cấp phòng thủ / Độ khó */}
      <div className="city-info-group">
        <div className="city-name-row">
          <span className="city-icon" aria-hidden="true">🏯</span>
          <h2 className="city-name">{cityName}</h2>
          <span className="defense-badge">{defenseLevel}</span>
          <span className="difficulty-badge">{difficulty}</span>
        </div>
        <div className="city-hp-bar-container">
          <span className="hp-label">Thành trì HP:</span>
          <span className="hp-value">{cityHp}</span>
          <span className="battle-summary-counts">
            (Hạ: {enemiesDefeated} | Thoát: {enemiesEscaped})
          </span>
        </div>
      </div>

      {/* 2. Wave Counter (Đợt X/10) */}
      <div className="wave-counter-box" aria-live="polite">
        <span className="wave-label">Tiến trình đợt</span>
        <span className="wave-number">
          Đợt {wave}<span className="wave-total">/{totalWaves}</span>
        </span>
        {battleStatus === 'won' && <span className="status-tag tag-won">Thắng</span>}
        {battleStatus === 'lost' && <span className="status-tag tag-lost">Bại</span>}
      </div>

      {/* 3. Enemy Remaining Counter theo loại */}
      <div className="enemy-counters-box" aria-label="Số lượng quái còn lại theo loại">
        <span className="enemy-box-label">Quái còn lại:</span>
        <div className="enemy-category-chips">
          <div className="enemy-chip chip-sword" title="Lính Kiếm">
            <span className="chip-icon">⚔</span>
            <span className="chip-name">Kiếm</span>
            <span className="chip-count">×{swordCount}</span>
          </div>

          <div className="enemy-chip chip-archer" title="Lính Cung">
            <span className="chip-icon">🏹</span>
            <span className="chip-name">Cung</span>
            <span className="chip-count">×{archerCount}</span>
          </div>

          {otherCount > 0 && (
            <div className="enemy-chip chip-other" title="Lính Khác">
              <span className="chip-icon">👾</span>
              <span className="chip-name">Khác</span>
              <span className="chip-count">×{otherCount}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
