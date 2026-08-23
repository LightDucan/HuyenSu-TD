import type { GameSpeed } from '../domain/clock/GameClock'
import type { BattleHudData } from '../game/bridge/BattleHudContract'

export interface BottomPlayerHUDProps {
  data: Pick<BattleHudData, 'speed' | 'heroPlaced' | 'selectedHeroId'>
  heroes: readonly Readonly<{ id: string; name: string }>[]
  onSpeedChange: (speed: GameSpeed) => void
  onHeroSelect: (heroId: string) => void
  onOpenHeroDetail: () => void
}

export function BottomPlayerHUD({
  data,
  heroes,
  onSpeedChange,
  onHeroSelect,
  onOpenHeroDetail,
}: BottomPlayerHUDProps) {
  return (
    <footer className="bottom-player-hud" aria-label="Bảng điều khiển người chơi và trận đấu">
      <div className="hero-selection-section" aria-label="Khu vực chọn tướng triển khai">
        <span className="section-mini-label">Đội hình xuất trận</span>
        <div className="hero-slot-list">
          {heroes.map((hero) => {
            const isSelected = hero.id === data.selectedHeroId
            return (
              <button
                type="button"
                key={hero.id}
                className={`hero-slot-card ${isSelected ? 'selected' : ''} ${data.heroPlaced && isSelected ? 'deployed' : 'ready'}`}
                disabled={data.heroPlaced && !isSelected}
                onClick={() => data.heroPlaced ? onOpenHeroDetail() : onHeroSelect(hero.id)}
                title={data.heroPlaced ? 'Đội hình đã được triển khai' : `Chọn ${hero.name}`}
              >
                <div className="hero-slot-avatar">⚔️</div>
                <div className="hero-slot-meta">
                  <span className="hero-slot-name">{hero.name}</span>
                  <span className={`hero-slot-status ${data.heroPlaced && isSelected ? 'status-deployed' : 'status-ready'}`}>
                    {data.heroPlaced && isSelected ? 'Đang tác chiến' : isSelected ? 'Đã chọn' : 'Sẵn sàng'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="battle-controls-section">
        {/* Speed Controls (x1 / x3) */}
        <div className="speed-toggle-group" aria-label="Tốc độ trận đấu">
          {([1, 3] as const).map((speed) => (
            <button
              key={speed}
              type="button"
              className={`speed-btn ${data.speed === speed ? 'active' : ''}`}
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
