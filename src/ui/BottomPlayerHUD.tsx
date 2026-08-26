import type { GameSpeed } from '../domain/clock/GameClock'
import type { BattleHudData } from '../game/bridge/BattleHudContract'
import type { CommandEnergySnapshot } from '../game/bridge/BattleBridge'
import { HeroPortrait } from './HeroPortrait'

export interface BottomPlayerHUDProps {
  data: Pick<BattleHudData, 'speed' | 'placedHeroes' | 'selectedHeroId' | 'waveStatus' | 'battleStatus'>
  commandEnergy: CommandEnergySnapshot
  autoWaveEnabled: boolean
  heroes: readonly Readonly<{ id: string; name: string; portraitUrl?: string }>[]
  onSpeedChange: (speed: GameSpeed) => void
  onHeroSelect: (heroId: string) => void
  onOpenHeroDetail: () => void
  onStartWave: () => void
  onAutoWaveChange: (enabled: boolean) => void
}

export function BottomPlayerHUD({
  data,
  heroes,
  onSpeedChange,
  onHeroSelect,
  onOpenHeroDetail,
  commandEnergy,
  autoWaveEnabled,
  onStartWave,
  onAutoWaveChange,
}: BottomPlayerHUDProps) {
  const startDisabled = data.waveStatus !== 'waiting'
    || data.battleStatus !== 'running'
    || data.placedHeroes.length === 0
    || commandEnergy.current < 1

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
                <HeroPortrait className="hero-slot-avatar" name={hero.name} src={hero.portraitUrl} />
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
        <div className="command-energy-controls" aria-label="Điều khiển Quân Lệnh và Wave">
          <span className="command-energy-value">Quân Lệnh: {commandEnergy.current} / {commandEnergy.cap}</span>
          <button type="button" className="btn-hud-control" disabled={startDisabled} onClick={onStartWave}>
            BẮT ĐẦU WAVE
          </button>
          <button
            type="button"
            className={`btn-hud-control ${autoWaveEnabled ? 'active' : ''}`}
            aria-pressed={autoWaveEnabled}
            onClick={() => onAutoWaveChange(!autoWaveEnabled)}
          >
            AUTO WAVE: {autoWaveEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

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
