import { useEffect, useRef, useState } from 'react'
import type { GameSpeed } from '../domain/clock/GameClock'
import { battleBridge, type BattleSnapshot } from '../game/bridge/BattleBridge'
import { createGame } from '../game/createGame'
import { HeroDetailModal } from './HeroDetailModal'
import { HeroProgressionPanel } from './HeroProgressionPanel'

const initialSnapshot: BattleSnapshot = {
  speed: 1,
  enemiesSpawned: 0,
  enemiesEscaped: 0,
  enemiesDefeated: 0,
  heroPlaced: false,
  wave: 1,
  totalWaves: 10,
  cityHp: 10,
  battleStatus: 'running',
  remainingByCategory: { sword: 0, archer: 0, other: 0 },
}

export function App() {
  const gameHostRef = useRef<HTMLDivElement>(null)
  const [snapshot, setSnapshot] = useState(initialSnapshot)
  const [isHeroDetailOpen, setIsHeroDetailOpen] = useState(false)

  useEffect(() => {
    if (!gameHostRef.current) return

    const game = createGame(gameHostRef.current)
    const unsubscribe = battleBridge.onSnapshot(setSnapshot)

    return () => {
      unsubscribe()
      game.destroy(true)
    }
  }, [])

  const setSpeed = (speed: GameSpeed) => battleBridge.setSpeed(speed)

  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Technical Prototype</p>
          <h1>Huyền Sử TD</h1>
        </div>
        <div className="battle-status" aria-live="polite">
          <span>Wave: {snapshot.wave}/{snapshot.totalWaves}</span>
          <span>Thành: {snapshot.cityHp}</span>
          <span>⚔ {snapshot.remainingByCategory.sword}</span>
          <span>🏹 {snapshot.remainingByCategory.archer}</span>
          <span>Hạ: {snapshot.enemiesDefeated}</span>
          <span>Thoát: {snapshot.enemiesEscaped}</span>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="hero-detail-trigger-btn"
            onClick={() => setIsHeroDetailOpen(true)}
          >
            🗡️ Chi Tiết Tướng
          </button>
          <div className="speed-controls" aria-label="Tốc độ trận đấu">
            {([1, 3] as const).map((speed) => (
              <button
                className={snapshot.speed === speed ? 'active' : ''}
                key={speed}
                onClick={() => setSpeed(speed)}
                type="button"
              >
                x{speed}
              </button>
            ))}
          </div>
        </div>
      </header>
      <p className="hint">
        {snapshot.battleStatus === 'won' ? 'Chiến thắng! Đã hoàn thành 10 wave.' : snapshot.battleStatus === 'lost' ? 'Thất bại: Thành đã bị phá.' : snapshot.heroPlaced ? 'Quan Vũ đang tự động chiến đấu.' : 'Chọn một ô xanh để đặt Quan Vũ.'}
      </p>
      <section className="game-frame" ref={gameHostRef} aria-label="Battle Scene" />

      <HeroProgressionPanel />

      <HeroDetailModal
        isOpen={isHeroDetailOpen}
        onClose={() => setIsHeroDetailOpen(false)}
      />
    </main>
  )
}


