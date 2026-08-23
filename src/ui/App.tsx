import { useEffect, useRef, useState } from 'react'
import { equipmentDefinitions } from '../data/equipment/definitions'
import { heroDefinitions } from '../data/heroes/definitions'
import type { GameSpeed } from '../domain/clock/GameClock'
import { loadEquipment, saveHeroEquipment } from '../domain/equipment/EquipmentStorage'
import { resolveEquipmentModifiers, type EquipmentSlot, type HeroEquipment } from '../domain/equipment/EquipmentSystem'
import { advanceStage, canAdvanceStage, canUpgrade, type HeroProgression, upgradeLevel } from '../domain/progression/ProgressionSystem'
import { loadProgression, saveHeroProgression } from '../domain/progression/ProgressionStorage'
import { battleBridge, type BattleSnapshot } from '../game/bridge/BattleBridge'
import { toBattleHudData } from '../game/bridge/BattleHudContract'
import { createGame } from '../game/createGame'
import { BottomPlayerHUD } from './BottomPlayerHUD'
import { HeroDetailModal } from './HeroDetailModal'
import { TopCityBar } from './TopCityBar'

const initialSnapshot: BattleSnapshot = {
  speed: 1,
  enemiesSpawned: 0,
  enemiesEscaped: 0,
  enemiesDefeated: 0,
  heroPlaced: false,
  selectedHeroId: 'quan-vu',
  wave: 1,
  totalWaves: 10,
  cityHp: 10,
  battleStatus: 'running',
  remainingByCategory: { sword: 0, archer: 0, other: 0 },
}

export function App() {
  const initialHeroId = battleBridge.getSelectedHeroId()
  const gameHostRef = useRef<HTMLDivElement>(null)
  const [snapshot, setSnapshot] = useState(initialSnapshot)
  const [isHeroDetailOpen, setIsHeroDetailOpen] = useState(false)
  const [progression, setProgression] = useState<HeroProgression>(() =>
    loadProgression(window.localStorage).heroes[initialHeroId] ?? { stage: 'normal', level: 1 },
  )
  const [equipment, setEquipment] = useState<HeroEquipment>(() =>
    loadEquipment(window.localStorage).heroes[initialHeroId] ?? {},
  )
  const hudData = toBattleHudData(snapshot)
  const heroOptions = Object.values(heroDefinitions).map(({ id, name }) => ({ id, name }))
  const selectedHeroName = heroDefinitions[hudData.selectedHeroId]?.name ?? 'Hero'

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

  const handleHeroSelect = (heroId: string) => {
    if (snapshot.heroPlaced || !heroDefinitions[heroId]) return
    battleBridge.setSelectedHeroId(heroId)
    setProgression(loadProgression(window.localStorage).heroes[heroId] ?? { stage: 'normal', level: 1 })
    setEquipment(loadEquipment(window.localStorage).heroes[heroId] ?? {})
  }

  const handleUpgradeRequest = (heroId: string) => {
    const nowMs = Date.now()
    if (!canUpgrade(progression, nowMs)) return
    const next = upgradeLevel(progression, nowMs, 3000)
    saveHeroProgression(window.localStorage, heroId, next)
    setProgression(next)
  }

  const handleAdvanceStageRequest = (heroId: string) => {
    if (!canAdvanceStage(progression)) return
    const next = advanceStage(progression)
    saveHeroProgression(window.localStorage, heroId, next)
    setProgression(next)
  }

  const handleEquipRequest = (heroId: string, slot: EquipmentSlot, itemId: string) => {
    const item = equipmentDefinitions[itemId]
    if (!item || item.slot !== slot) return
    const next = slot === 'weapon' ? { ...equipment, weaponId: itemId } : { ...equipment, gemId: itemId }
    resolveEquipmentModifiers(next, equipmentDefinitions)
    saveHeroEquipment(window.localStorage, heroId, next)
    setEquipment(next)
  }

  const handleUnequipRequest = (heroId: string, slot: EquipmentSlot) => {
    const next = slot === 'weapon' ? { ...equipment, weaponId: undefined } : { ...equipment, gemId: undefined }
    saveHeroEquipment(window.localStorage, heroId, next)
    setEquipment(next)
  }

  return (
    <main className="app-shell">
      {/* Top City Bar */}
      <TopCityBar data={hudData} />

      <p className="hint">
        {snapshot.battleStatus === 'won' ? 'Chiến thắng! Đã hoàn thành 10 wave.' : snapshot.battleStatus === 'lost' ? 'Thất bại: Thành đã bị phá.' : snapshot.heroPlaced ? `${selectedHeroName} đang tự động chiến đấu.` : `Chọn một ô xanh để đặt ${selectedHeroName}.`}
      </p>

      {/* Battle Canvas */}
      <section className="game-frame" ref={gameHostRef} aria-label="Battle Scene" />

      {/* Bottom Player HUD */}
      <BottomPlayerHUD
        data={hudData}
        heroes={heroOptions}
        onSpeedChange={setSpeed}
        onHeroSelect={handleHeroSelect}
        onOpenHeroDetail={() => setIsHeroDetailOpen(true)}
      />

      <HeroDetailModal
        isOpen={isHeroDetailOpen}
        onClose={() => setIsHeroDetailOpen(false)}
        heroId={hudData.selectedHeroId}
        progression={progression}
        equipment={equipment}
        onUpgradeRequest={handleUpgradeRequest}
        onAdvanceStageRequest={handleAdvanceStageRequest}
        onEquipRequest={handleEquipRequest}
        onUnequipRequest={handleUnequipRequest}
      />
    </main>
  )
}
