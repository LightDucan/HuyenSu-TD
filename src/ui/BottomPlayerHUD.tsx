import type { GameSpeed } from '../domain/clock/GameClock'
import type { BattleHudData } from '../game/bridge/BattleHudContract'
import type { CommandEnergySnapshot, DeploymentCapacitySnapshot } from '../game/bridge/BattleBridge'
import { HeroPortrait } from './HeroPortrait'
import type { PlacementIntent } from '../game/bridge/BattleInteractionContract'

export interface BottomPlayerHUDProps {
  data: Pick<BattleHudData, 'speed' | 'placedHeroes' | 'selectedHeroId' | 'waveStatus' | 'battleStatus'>
  commandEnergy: CommandEnergySnapshot
  deploymentCapacity: DeploymentCapacitySnapshot
  autoWaveEnabled: boolean
  showRoster: boolean
  placementIntent: PlacementIntent
  rangeEnabled: boolean
  heroes: readonly Readonly<{ id: string; name: string; portraitUrl?: string }>[]
  onSpeedChange: (speed: GameSpeed) => void
  onHeroSelect: (heroId: string) => void
  onMoveHero: (heroId: string) => void
  onRangeChange: (enabled: boolean) => void
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
  deploymentCapacity,
  autoWaveEnabled,
  showRoster,
  placementIntent,
  rangeEnabled,
  onStartWave,
  onAutoWaveChange,
  onMoveHero,
  onRangeChange,
}: BottomPlayerHUDProps) {
  const startDisabled = data.waveStatus !== 'waiting'
    || data.battleStatus !== 'running'
    || data.placedHeroes.length === 0
    || commandEnergy.current < 1

  return (
    <footer className="bottom-player-hud" aria-label="Bảng điều khiển người chơi và trận đấu">
      {showRoster && <div className="hero-selection-section" aria-label="Khu vực chọn tướng triển khai">
        <span className="section-mini-label">Đội hình xuất trận</span>
        <div className="hero-slot-list">
          {heroes.map((hero) => {
            const isSelected = hero.id === data.selectedHeroId
            const placement = data.placedHeroes.find((item) => item.heroId === hero.id)
            const isDeployed = placement != null
            const isMoving = placementIntent.mode === 'move' && placementIntent.heroId === hero.id
            const isPlacing = placementIntent.mode === 'place' && placementIntent.heroId === hero.id
            return (
              <div className="hero-slot-wrap" key={hero.id}>
              <button
                type="button"
                className={`hero-slot-card ${isSelected ? 'selected' : ''} ${isDeployed ? 'deployed' : 'ready'}`}
                onClick={() => onHeroSelect(hero.id)}
                title={isDeployed ? `Chọn ${hero.name}` : `Chọn ${hero.name} để triển khai`}
              >
                <HeroPortrait className="hero-slot-avatar" name={hero.name} src={hero.portraitUrl} />
                <div className="hero-slot-meta">
                  <span className="hero-slot-name">{hero.name}</span>
                  <span className={`hero-slot-status ${isDeployed ? 'status-deployed' : 'status-ready'}`}>
                    {isMoving ? 'Đang chọn vị trí mới' : isDeployed ? 'Đã triển khai' : isPlacing ? 'Đang chọn vị trí' : 'Trong Hero Deck'}
                  </span>
                </div>
              </button>
              {isDeployed && isSelected && (
                <button type="button" className={`hero-move-btn ${isMoving ? 'active' : ''}`} onClick={() => onMoveHero(hero.id)}>
                  {isMoving ? 'HỦY DI CHUYỂN' : 'DI CHUYỂN'}
                </button>
              )}
              </div>
            )
          })}
        </div>
      </div>}

      <div className="battle-controls-section">
        <div className="command-energy-controls" aria-label="Điều khiển Quân Lệnh và Wave">
          <span className="command-energy-value">Quân Lệnh: {commandEnergy.current} / {commandEnergy.cap}</span>
          <span className="deployment-capacity-value">Triển khai: {data.placedHeroes.length} / {deploymentCapacity.effectiveLimit}</span>
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

        <button
          type="button"
          className={`btn-hud-control ${rangeEnabled ? 'active' : ''}`}
          aria-pressed={rangeEnabled}
          onClick={() => onRangeChange(!rangeEnabled)}
        >
          TẦM ĐÁNH: {rangeEnabled ? 'ON' : 'OFF'}
        </button>

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
