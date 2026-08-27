import { useEffect, useRef, useState } from 'react'
import { equipmentDefinitions } from '../data/equipment/definitions'
import { resolvePrototypeHeroVisual } from '../data/assets/prototypeVisualAssets'
import { heroDefinitions } from '../data/heroes/definitions'
import { featureFlags } from '../config/features'
import type { GameSpeed } from '../domain/clock/GameClock'
import { resolveEquipmentModifiers, type EquipmentSlot, type HeroEquipment } from '../domain/equipment/EquipmentSystem'
import type { MetaSaveV4 } from '../domain/meta/MetaState'
import { advanceStage, canAdvanceStage, canUpgrade, type HeroProgression, upgradeLevel } from '../domain/progression/ProgressionSystem'
import { loadProgression } from '../domain/progression/ProgressionStorage'
import {
  battleBridge,
  type BattleSnapshot,
  type CommandEnergySnapshot,
  type DeploymentCapacitySnapshot,
} from '../game/bridge/BattleBridge'
import { toBattleHudData } from '../game/bridge/BattleHudContract'
import { createGame } from '../game/createGame'
import { BottomPlayerHUD } from './BottomPlayerHUD'
import { HeroDetailModal } from './HeroDetailModal'
import { saveProgressionAndRefresh } from './HeroRuntimeRefreshActions'
import { TopCityBar } from './TopCityBar'
import { getBrowserEquipmentV2Runtime } from '../runtime/EquipmentV2Runtime'
import { EquipmentInventoryPanel } from './EquipmentInventoryPanel'

const initialSnapshot: BattleSnapshot = {
  runId: 'initial',
  speed: 1,
  enemiesSpawned: 0,
  enemiesEscaped: 0,
  enemiesDefeated: 0,
  placedHeroes: [],
  selectedHeroId: 'quan-vu',
  wave: 1,
  totalWaves: 10,
  waveStatus: 'waiting',
  cityHp: 10,
  battleStatus: 'running',
  remainingByCategory: { sword: 0, archer: 0, other: 0 },
}

export function App() {
  const equipmentRuntime = getBrowserEquipmentV2Runtime()
  const initialHeroId = battleBridge.getSelectedHeroId()
  const gameHostRef = useRef<HTMLDivElement>(null)
  const [snapshot, setSnapshot] = useState(initialSnapshot)
  const [commandEnergy, setCommandEnergy] = useState<CommandEnergySnapshot>(() => battleBridge.getCommandEnergySnapshot())
  const [autoWaveEnabled, setAutoWaveEnabled] = useState(() => battleBridge.isAutoWaveEnabled())
  const [deploymentCapacity, setDeploymentCapacity] = useState<DeploymentCapacitySnapshot>(() => battleBridge.getDeploymentCapacitySnapshot())
  const [placementMessage, setPlacementMessage] = useState<string | null>(null)
  const [isHeroDetailOpen, setIsHeroDetailOpen] = useState(false)
  const [activeMetaTab, setActiveMetaTab] = useState<'roster' | 'inventory'>('roster')
  const [metaSave, setMetaSave] = useState<MetaSaveV4>(() => equipmentRuntime.getSnapshot())
  const [progression, setProgression] = useState<HeroProgression>(() =>
    loadProgression(window.localStorage).heroes[initialHeroId] ?? { stage: 'normal', level: 1 },
  )
  const definitionLoadout = (heroId: string, save: MetaSaveV4 = equipmentRuntime.getSnapshot()): HeroEquipment => {
    const loadout = save.data.inventory.equippedByHero[heroId] ?? {}
    const weapon = loadout.weaponInstanceId ? save.data.inventory.equipmentInstances[loadout.weaponInstanceId] : undefined
    const gem = loadout.gemInstanceId ? save.data.inventory.equipmentInstances[loadout.gemInstanceId] : undefined
    return { ...(weapon ? { weaponId: weapon.definitionId } : {}), ...(gem ? { gemId: gem.definitionId } : {}) }
  }
  const [equipment, setEquipment] = useState<HeroEquipment>(() => definitionLoadout(initialHeroId, metaSave))
  const hudData = toBattleHudData(snapshot)
  const heroOptions = Object.values(heroDefinitions).map(({ id, name }) => ({ id, name, portraitUrl: resolvePrototypeHeroVisual(id)?.portraitUrl }))
  const selectedHeroName = heroDefinitions[hudData.selectedHeroId]?.name ?? 'Hero'
  const selectedPlacement = hudData.placedHeroes.find(({ heroId }) => heroId === hudData.selectedHeroId)

  useEffect(() => {
    if (!gameHostRef.current) return

    const game = createGame(gameHostRef.current)
    const unsubscribe = battleBridge.onSnapshot(setSnapshot)
    const unsubscribeEnergy = battleBridge.onCommandEnergySnapshot(setCommandEnergy)
    const unsubscribeAuto = battleBridge.onAutoWaveChange(setAutoWaveEnabled)
    const unsubscribeCapacity = battleBridge.onDeploymentCapacitySnapshot(setDeploymentCapacity)
    const unsubscribePlacement = battleBridge.onPlacementFeedback((feedback) => {
      setPlacementMessage(feedback.status === 'rejected'
        ? `Đã đạt giới hạn triển khai ${feedback.effectiveLimit} Hero trên bản đồ này.`
        : null)
    })

    return () => {
      unsubscribe()
      unsubscribeEnergy()
      unsubscribeAuto()
      unsubscribeCapacity()
      unsubscribePlacement()
      game.destroy(true)
    }
  }, [])

  const setSpeed = (speed: GameSpeed) => battleBridge.setSpeed(speed)

  const handleHeroSelect = (heroId: string) => {
    if (!heroDefinitions[heroId]) return
    battleBridge.setSelectedHeroId(heroId)
    setProgression(loadProgression(window.localStorage).heroes[heroId] ?? { stage: 'normal', level: 1 })
    setEquipment(definitionLoadout(heroId))
  }

  const handleUpgradeRequest = (heroId: string) => {
    const nowMs = Date.now()
    if (!canUpgrade(progression, nowMs, featureFlags.upgradeCooldownEnabled)) return
    const next = upgradeLevel(progression, nowMs, 3000, featureFlags.upgradeCooldownEnabled)
    saveProgressionAndRefresh(window.localStorage, battleBridge, heroId, next)
    setProgression(next)
  }

  const handleAdvanceStageRequest = (heroId: string) => {
    if (!canAdvanceStage(progression)) return
    const next = advanceStage(progression)
    saveProgressionAndRefresh(window.localStorage, battleBridge, heroId, next)
    setProgression(next)
  }

  const handleEquipRequest = (heroId: string, slot: EquipmentSlot, itemId: string) => {
    const item = equipmentDefinitions[itemId]
    if (!item || item.slot !== slot) return
    const save = equipmentRuntime.getSnapshot()
    const equippedIds = new Set(Object.values(save.data.inventory.equippedByHero).flatMap((loadout) => [loadout.weaponInstanceId, loadout.gemInstanceId].filter((id): id is string => Boolean(id))))
    const instance = Object.values(save.data.inventory.equipmentInstances).find((candidate) => candidate.definitionId === itemId && candidate.slot === slot && !equippedIds.has(candidate.instanceId))
    if (!instance) return
    const nowMs = Date.now()
    const result = equipmentRuntime.transact({ type: 'equip', heroId, instanceId: instance.instanceId }, save.revision, `ui/equipment/equip/${heroId}/${instance.instanceId}/${nowMs}`, nowMs)
    setMetaSave(result.save)
    const next = definitionLoadout(heroId, result.save)
    resolveEquipmentModifiers(next, equipmentDefinitions)
    setEquipment(next)
  }

  const handleUnequipRequest = (heroId: string, slot: EquipmentSlot) => {
    const save = equipmentRuntime.getSnapshot()
    const nowMs = Date.now()
    const result = equipmentRuntime.transact({ type: 'unequip', heroId, slot }, save.revision, `ui/equipment/unequip/${heroId}/${slot}/${nowMs}`, nowMs)
    setMetaSave(result.save)
    setEquipment(definitionLoadout(heroId, result.save))
  }

  const handleInventoryOperation = (operation: Parameters<typeof equipmentRuntime.transact>[0]) => {
    const save = equipmentRuntime.getSnapshot()
    const nowMs = Date.now()
    const result = equipmentRuntime.transact(operation, save.revision, `ui/equipment/${operation.type}/${crypto.randomUUID()}`, nowMs)
    setMetaSave(result.save)
    setEquipment(definitionLoadout(hudData.selectedHeroId, result.save))
  }

  return (
    <main className="app-shell">
      {/* Top City Bar */}
      <TopCityBar data={hudData} />

      <p className="hint">
        {snapshot.battleStatus === 'won'
          ? 'Chiến thắng! Đã hoàn thành 10 wave.'
          : snapshot.battleStatus === 'lost'
            ? 'Thất bại: Thành đã bị phá.'
            : selectedPlacement
              ? `Chọn ô hợp lệ để di chuyển ${selectedHeroName}. Đã triển khai ${snapshot.placedHeroes.length}/${deploymentCapacity.effectiveLimit} Hero.`
              : `Chọn ô hợp lệ để đặt ${selectedHeroName}. Đã triển khai ${snapshot.placedHeroes.length}/${deploymentCapacity.effectiveLimit} Hero.`}
      </p>
      {placementMessage && <p className="placement-feedback" role="status">{placementMessage}</p>}

      <nav className="meta-tabs" aria-label="Điều hướng Đội Hình và Hành Trang">
        <button type="button" className={activeMetaTab === 'roster' ? 'active' : ''} onClick={() => setActiveMetaTab('roster')}>ĐỘI HÌNH</button>
        <button type="button" className={activeMetaTab === 'inventory' ? 'active' : ''} onClick={() => setActiveMetaTab('inventory')}>HÀNH TRANG</button>
      </nav>
      {activeMetaTab === 'inventory' && (
        <EquipmentInventoryPanel
          save={metaSave}
          selectedHeroId={hudData.selectedHeroId}
          definitions={equipmentRuntime.getDefinitions()}
          onEquip={(instanceId) => handleInventoryOperation({ type: 'equip', heroId: hudData.selectedHeroId, instanceId })}
          onUnequip={(slot) => handleInventoryOperation({ type: 'unequip', heroId: hudData.selectedHeroId, slot })}
          onMerge={(ingredientInstanceIds) => handleInventoryOperation({ type: 'merge', ingredientInstanceIds, resultInstanceId: `equipment:${crypto.randomUUID()}` })}
        />
      )}

      {/* Battle Canvas */}
      <section className="game-frame" ref={gameHostRef} aria-label="Battle Scene" />

      {/* Bottom Player HUD */}
      <BottomPlayerHUD
        data={hudData}
        heroes={heroOptions}
        onSpeedChange={setSpeed}
        onHeroSelect={handleHeroSelect}
        onOpenHeroDetail={() => setIsHeroDetailOpen(true)}
        commandEnergy={commandEnergy}
        deploymentCapacity={deploymentCapacity}
        autoWaveEnabled={autoWaveEnabled}
        onStartWave={() => battleBridge.requestWaveStart('manual')}
        onAutoWaveChange={(enabled) => battleBridge.setAutoWaveEnabled(enabled)}
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
