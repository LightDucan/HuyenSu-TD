import { useState } from 'react'
import { quanVu } from '../data/heroes/quanVu'
import type { GameSpeed } from '../domain/clock/GameClock'

export interface BottomPlayerHUDProps {
  playerName?: string
  playerLevel?: number
  gold?: number
  food?: number
  currentSpeed: GameSpeed
  onSpeedChange: (speed: GameSpeed) => void
  onOpenHeroDetail: () => void
  heroPlaced?: boolean
  isAutoEnabled?: boolean
  onToggleAuto?: (nextAuto: boolean) => void
}

export function BottomPlayerHUD({
  playerName = 'Chúa Công',
  playerLevel = 1,
  gold = 1000,
  food = 500,
  currentSpeed,
  onSpeedChange,
  onOpenHeroDetail,
  heroPlaced = false,
  isAutoEnabled = false,
  onToggleAuto,
}: BottomPlayerHUDProps) {
  const [internalAuto, setInternalAuto] = useState(isAutoEnabled)

  const handleAutoClick = () => {
    const next = !internalAuto
    setInternalAuto(next)
    onToggleAuto?.(next)
  }

  return (
    <footer className="bottom-player-hud" aria-label="Bảng điều khiển người chơi và trận đấu">
      {/* 1. Player Info & Resources */}
      <div className="player-profile-section">
        <div className="player-avatar-box">
          <span className="player-avatar-icon" aria-hidden="true">👑</span>
        </div>
        <div className="player-details">
          <div className="player-name-row">
            <span className="player-name">{playerName}</span>
            <span className="player-level-badge">Cấp {playerLevel}</span>
          </div>
          <div className="player-resources">
            <div className="resource-item" title="Vàng">
              <span className="res-icon">🪙</span>
              <span className="res-value">{gold.toLocaleString()}</span>
            </div>
            <div className="resource-item" title="Lương thảo">
              <span className="res-icon">🌾</span>
              <span className="res-value">{food.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Selection Area */}
      <div className="hero-selection-section" aria-label="Khu vực chọn tướng triển khai">
        <span className="section-mini-label">Đội hình xuất trận</span>
        <div className="hero-slot-list">
          <button
            type="button"
            className={`hero-slot-card ${heroPlaced ? 'deployed' : 'ready'}`}
            onClick={onOpenHeroDetail}
            title="Nhấn để xem chi tiết tướng"
          >
            <div className="hero-slot-avatar">🗡️</div>
            <div className="hero-slot-meta">
              <span className="hero-slot-name">{quanVu.name}</span>
              <span className={`hero-slot-status ${heroPlaced ? 'status-deployed' : 'status-ready'}`}>
                {heroPlaced ? 'Đang tác chiến' : 'Chưa đặt map'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Battle Controls: Speed, Auto placeholder, Hero Detail */}
      <div className="battle-controls-section">
        {/* Auto Button Placeholder */}
        <button
          type="button"
          className={`btn-hud-control btn-auto ${internalAuto ? 'auto-active' : ''}`}
          onClick={handleAutoClick}
          title="Tự động sử dụng kỹ năng / hỗ trợ chiến đấu"
        >
          <span className="btn-hud-icon">🤖</span>
          <span className="btn-hud-text">Tự Động: {internalAuto ? 'BẬT' : 'TẮT'}</span>
        </button>

        {/* Speed Controls (x1 / x3) */}
        <div className="speed-toggle-group" aria-label="Tốc độ trận đấu">
          {([1, 3] as const).map((speed) => (
            <button
              key={speed}
              type="button"
              className={`speed-btn ${currentSpeed === speed ? 'active' : ''}`}
              onClick={() => onSpeedChange(speed)}
            >
              x{speed}
            </button>
          ))}
        </div>

        {/* Hero Detail Modal Trigger */}
        <button
          type="button"
          className="btn-hud-control btn-hero-detail"
          onClick={onOpenHeroDetail}
        >
          <span className="btn-hud-icon">🗡️</span>
          <span className="btn-hud-text">Chi Tiết Tướng</span>
        </button>
      </div>
    </footer>
  )
}
