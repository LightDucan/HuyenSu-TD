import type { GameSpeed } from '../domain/clock/GameClock'
import type { BattleHudData } from '../game/bridge/BattleHudContract'

export interface BottomPlayerHUDProps {
  data: Pick<BattleHudData, 'speed' | 'placedHeroes' | 'selectedHeroId'>
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
            const placement = data.placedHeroes.find((item) => item.heroId === hero.id)
            const isDeployed = placement != null
            return (
              <button
                type="button"
                key={hero.id}
                className={`hero-slot-card ${isSelected ? 'selected' : ''} ${isDeployed ? 'deployed' : 'ready'}`}
                onClick={() => onHeroSelect(hero.id)}
                title={isDeployed ? `Chọn ${hero.name} để di chuyển` : `Chọn ${hero.name} để triển khai`}
              >
                <div className="hero-slot-avatar">⚔️</div>
                <div className="hero-slot-meta">
                  <span className="hero-slot-name">{hero.name}</span>
                  <span className={`hero-slot-status ${isDeployed ? 'status-deployed' : 'status-ready'}`}>
                    {isDeployed ? (isSelected ? 'Chọn ô để di chuyển' : 'Đã triển khai') : isSelected ? 'Đã chọn để đặt' : 'Trong Hero Deck'}
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
