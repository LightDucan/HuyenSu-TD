import { useEffect, useRef, useState } from 'react'
import type { GameSpeed } from '../domain/clock/GameClock'
import { battleBridge, type BattleSnapshot } from '../game/bridge/BattleBridge'
import { createGame } from '../game/createGame'

const initialSnapshot: BattleSnapshot = {
  speed: 1,
  enemiesSpawned: 0,
  enemiesEscaped: 0,
}

export function App() {
  const gameHostRef = useRef<HTMLDivElement>(null)
  const [snapshot, setSnapshot] = useState(initialSnapshot)

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
          <span>Enemy: {snapshot.enemiesSpawned}</span>
          <span>Thoát: {snapshot.enemiesEscaped}</span>
        </div>
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
      </header>
      <section className="game-frame" ref={gameHostRef} aria-label="Battle Scene" />
    </main>
  )
}
