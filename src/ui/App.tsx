import { useEffect, useRef, useState } from 'react'
import { equipmentDefinitions } from '../data/equipment/definitions'
import { resolveHaiBaTrungHeroVisual } from '../data/assets/prototypeVisualAssets'
import { ACTIVE_HERO_IDS, heroDefinitions } from '../data/heroes/definitions'
import type { GameSpeed } from '../domain/clock/GameClock'
import { resolveEquipmentModifiers, type EquipmentSlot, type HeroEquipment } from '../domain/equipment/EquipmentSystem'
import type { MetaSave } from '../domain/meta/MetaState'
import type { HeroProgression } from '../domain/progression/ProgressionSystem'
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
import { TopCityBar } from './TopCityBar'
import { getBrowserEquipmentV2Runtime } from '../runtime/EquipmentV2Runtime'
import { EquipmentInventoryPanel } from './EquipmentInventoryPanel'
import { EconomyPanel } from './EconomyPanel'
import { getBrowserEconomyRuntime } from '../runtime/EconomyRuntime'
import { CONSUMABLE_ITEM_IDS } from '../data/items/definitions'
import { getBrowserHeroMetaRuntime } from '../runtime/HeroMetaRuntime'
import { selectPlayableOwnedHeroIds } from '../domain/meta/HeroRecruitment'
import { battleInstruction, moveIntentForHero, placementIntentForHero } from '../game/bridge/BattleInteractionContract'
import { canApplyEquipmentOperation, isEquipmentInteractionLocked, selectMetaTab, type MetaTab } from './MetaTabState'

const initialSnapshot: BattleSnapshot = {
  runId: 'initial',
  speed: 1,
  enemiesSpawned: 0,
  enemiesEscaped: 0,
  enemiesDefeated: 0,
  placedHeroes: [],
  selectedHeroId: 'trung-trac',
  wave: 1,
  totalWaves: 10,
  waveStatus: 'waiting',
  cityHp: 10,
  battleStatus: 'running',
  remainingByCategory: { sword: 0, archer: 0, other: 0 },
}

export function App() {
  const equipmentRuntime = getBrowserEquipmentV2Runtime()
  const economyRuntime = getBrowserEconomyRuntime()
  const heroMetaRuntime = getBrowserHeroMetaRuntime()
  const gameHostRef = useRef<HTMLDivElement>(null)
  const [snapshot, setSnapshot] = useState(initialSnapshot)
  const [commandEnergy, setCommandEnergy] = useState<CommandEnergySnapshot>(() => battleBridge.getCommandEnergySnapshot())
  const [autoWaveEnabled, setAutoWaveEnabled] = useState(() => battleBridge.isAutoWaveEnabled())
  const [deploymentCapacity, setDeploymentCapacity] = useState<DeploymentCapacitySnapshot>(() => battleBridge.getDeploymentCapacitySnapshot())
  const [placementMessage, setPlacementMessage] = useState<string | null>(null)
  const [isHeroDetailOpen, setIsHeroDetailOpen] = useState(false)
  const [activeMetaTab, setActiveMetaTab] = useState<MetaTab>('roster')
  const [placementIntent, setPlacementIntent] = useState(() => battleBridge.getPlacementIntent())
  const [rangeEnabled, setRangeEnabled] = useState(() => battleBridge.isRangeVisibilityEnabled())
  const [metaSave, setMetaSave] = useState<MetaSave>(() => battleBridge.getMetaSnapshot() ?? equipmentRuntime.getSnapshot())
  const [economyResult, setEconomyResult] = useState<string>()
  const definitionLoadout = (heroId: string, save: MetaSave = equipmentRuntime.getSnapshot()): HeroEquipment => {
    const loadout = save.data.inventory.equippedByHero[heroId] ?? {}
    const weapon = loadout.weaponInstanceId ? save.data.inventory.equipmentInstances[loadout.weaponInstanceId] : undefined
    const gem = loadout.gemInstanceId ? save.data.inventory.equipmentInstances[loadout.gemInstanceId] : undefined
    return { ...(weapon ? { weaponId: weapon.definitionId } : {}), ...(gem ? { gemId: gem.definitionId } : {}) }
  }
  const [equipment, setEquipment] = useState<HeroEquipment>(() => definitionLoadout(battleBridge.getSelectedHeroId(), metaSave))
  const hudData = toBattleHudData(snapshot)
  const heroOptions = selectPlayableOwnedHeroIds(metaSave.data.heroCollection, ACTIVE_HERO_IDS)
    .map((heroId) => ({ id: heroId, name: heroDefinitions[heroId].name, portraitUrl: resolveHaiBaTrungHeroVisual(heroId)?.portraitUrl }))
  const progression: HeroProgression = metaSave.data.heroCollection[hudData.selectedHeroId]?.progression ?? { stage: 'normal', level: 1 }
  const selectedHeroName = heroDefinitions[hudData.selectedHeroId]?.name ?? 'Hero'
  const equipmentInteractionLocked = isEquipmentInteractionLocked(hudData.waveStatus)

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
    const unsubscribeIntent = battleBridge.onPlacementIntentChange(setPlacementIntent)
    const unsubscribeRange = battleBridge.onRangeVisibilityChange(setRangeEnabled)
    const unsubscribeMeta = battleBridge.onMetaSnapshot((save) => {
      setMetaSave(save)
      setEquipment(definitionLoadout(battleBridge.getSelectedHeroId(), save))
    })

    return () => {
      unsubscribe()
      unsubscribeEnergy()
      unsubscribeAuto()
      unsubscribeCapacity()
      unsubscribePlacement()
      unsubscribeIntent()
      unsubscribeRange()
      unsubscribeMeta()
      game.destroy(true)
    }
  }, [])

  const setSpeed = (speed: GameSpeed) => battleBridge.setSpeed(speed)

  const handleHeroSelect = (heroId: string) => {
    if (!heroDefinitions[heroId] || !metaSave.data.heroCollection[heroId]) return
    battleBridge.setSelectedHeroId(heroId)
    battleBridge.setPlacementIntent(placementIntentForHero(heroId, snapshot.placedHeroes.some((placement) => placement.heroId === heroId)))
    setEquipment(definitionLoadout(heroId, metaSave))
  }

  const handleMoveHero = (heroId: string) => {
    if (!snapshot.placedHeroes.some((placement) => placement.heroId === heroId)) return
    if (placementIntent.mode === 'move' && placementIntent.heroId === heroId) {
      battleBridge.clearPlacementIntent()
      return
    }
    battleBridge.setSelectedHeroId(heroId)
    battleBridge.setPlacementIntent(moveIntentForHero(heroId))
  }

  const handleUpgradeRequest = (heroId: string) => {
    const nowMs = Date.now()
    const current = heroMetaRuntime.getSnapshot()
    try {
      heroMetaRuntime.upgradeLevel(heroId, { expectedRevision: current.revision, idempotencyKey: `ui/hero/upgrade/${heroId}/${crypto.randomUUID()}`, committedAtMs: nowMs })
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Nâng cấp thất bại') }
  }

  const handleAdvanceStageRequest = (heroId: string) => {
    const current = heroMetaRuntime.getSnapshot()
    try {
      heroMetaRuntime.evolve(heroId, { expectedRevision: current.revision, idempotencyKey: `ui/hero/evolve/${heroId}/${crypto.randomUUID()}`, committedAtMs: Date.now() })
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Tiến hóa thất bại') }
  }

  const handleEquipRequest = (heroId: string, slot: EquipmentSlot, itemId: string) => {
    if (equipmentInteractionLocked) {
      setEconomyResult('Wave đang diễn ra — Lắp/Gỡ Equipment đã khóa.')
      return
    }
    const item = equipmentDefinitions[itemId]
    if (!item || item.slot !== slot) return
    const save = equipmentRuntime.getSnapshot()
    const equippedIds = new Set(Object.values(save.data.inventory.equippedByHero).flatMap((loadout) => [loadout.weaponInstanceId, loadout.gemInstanceId].filter((id): id is string => Boolean(id))))
    const instance = Object.values(save.data.inventory.equipmentInstances).find((candidate) => candidate.definitionId === itemId && candidate.slot === slot && !equippedIds.has(candidate.instanceId))
    if (!instance) return
    const nowMs = Date.now()
    const result = equipmentRuntime.transact({ type: 'equip', heroId, instanceId: instance.instanceId }, save.revision, `ui/equipment/equip/${heroId}/${instance.instanceId}/${nowMs}`, nowMs)
    const next = definitionLoadout(heroId, result.save)
    resolveEquipmentModifiers(next, equipmentDefinitions)
    setEquipment(next)
  }

  const handleUnequipRequest = (heroId: string, slot: EquipmentSlot) => {
    if (equipmentInteractionLocked) {
      setEconomyResult('Wave đang diễn ra — Lắp/Gỡ Equipment đã khóa.')
      return
    }
    const save = equipmentRuntime.getSnapshot()
    const nowMs = Date.now()
    const result = equipmentRuntime.transact({ type: 'unequip', heroId, slot }, save.revision, `ui/equipment/unequip/${heroId}/${slot}/${nowMs}`, nowMs)
  }

  const handleInventoryOperation = (operation: Parameters<typeof equipmentRuntime.transact>[0]) => {
    if (!canApplyEquipmentOperation(hudData.waveStatus, operation.type)) {
      setEconomyResult('Wave đang diễn ra — Lắp/Gỡ Equipment đã khóa.')
      return
    }
    const save = equipmentRuntime.getSnapshot()
    const nowMs = Date.now()
    const result = equipmentRuntime.transact(operation, save.revision, `ui/equipment/${operation.type}/${crypto.randomUUID()}`, nowMs)
  }

  const handleGacha = (count: 1 | 10) => {
    const save = economyRuntime.repository.load()
    if (save.status !== 'loaded') return
    const nowMs = Date.now()
    try {
      const result = economyRuntime.gacha.pull(count, save.save.revision, `ui/gacha/${crypto.randomUUID()}`, nowMs)
      setEconomyResult(`Gacha ${count}x: ${result.rewards.map((reward) => reward.id).join(', ')}`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Gacha thất bại') }
  }

  const handleShopBuy = (itemId: string) => {
    const save = economyRuntime.repository.load()
    if (save.status !== 'loaded') return
    try {
      const result = economyRuntime.shop.buy(itemId, 1, save.save.revision, `ui/shop/${crypto.randomUUID()}`, Date.now())
      setEconomyResult(`Đã mua ${itemId}.`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Mua thất bại') }
  }

  const handleConsumableUse = (itemId: string, quantity: number) => {
    const save = economyRuntime.repository.load()
    if (save.status !== 'loaded') return
    try {
      const result = itemId === CONSUMABLE_ITEM_IDS.summonOrder
        ? economyRuntime.consumables.useSummonOrder(quantity, save.save.revision, `ui/use-summon/${crypto.randomUUID()}`, Date.now())
        : economyRuntime.consumables.useCommandEnergyItem(itemId, quantity, save.save.revision, `ui/use-energy/${crypto.randomUUID()}`, Date.now())
      setEconomyResult(`Đã dùng ${quantity} × ${itemId}.`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Dùng vật phẩm thất bại') }
  }

  const handleRecruit = (count: 1 | 10) => {
    const current = heroMetaRuntime.getSnapshot()
    try {
      const result = heroMetaRuntime.recruit(count, Math.random, { expectedRevision: current.revision, idempotencyKey: `ui/hero/recruit/${crypto.randomUUID()}`, committedAtMs: Date.now() })
      setEconomyResult(`Chiêu mộ ${count}x: ${result.results.map(({ heroId, outcome }) => `${heroId} (${outcome})`).join(', ')}`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Chiêu mộ thất bại') }
  }

  const handleAscendStar = (heroId: string) => {
    const current = heroMetaRuntime.getSnapshot()
    try {
      heroMetaRuntime.ascendStar(heroId, { expectedRevision: current.revision, idempotencyKey: `ui/hero/star/${heroId}/${crypto.randomUUID()}`, committedAtMs: Date.now() })
      setEconomyResult(`Đã tăng Sao cho ${heroDefinitions[heroId]?.name ?? heroId}.`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Tăng Sao thất bại') }
  }

  return (
    <main className="app-shell">
      {/* Top City Bar */}
      <TopCityBar data={hudData} wallet={metaSave.data.wallet.balances} />

      <div className="interaction-copy">
        <p className="hint">
        {snapshot.battleStatus === 'won'
          ? 'Chiến thắng! Đã hoàn thành 10 wave.'
          : snapshot.battleStatus === 'lost'
            ? 'Thất bại: Thành đã bị phá.'
            : battleInstruction(placementIntent, selectedHeroName, snapshot.placedHeroes.length, deploymentCapacity.effectiveLimit)}
        </p>
        {placementMessage && <p className="placement-feedback" role="status">{placementMessage}</p>}
      </div>

      {/* Battle Canvas */}
      <section className="game-frame" ref={gameHostRef} aria-label="Battle Scene" />

      <section className={`meta-content-region ${activeMetaTab}`} aria-label="Combat HUD" aria-live="polite">
        <nav className="meta-tabs" aria-label="Điều hướng Đội Hình và Hành Trang">
          <button type="button" className={activeMetaTab === 'roster' ? 'active' : ''} onClick={() => setActiveMetaTab((current) => selectMetaTab(current, 'roster'))}>ĐỘI HÌNH</button>
          <button type="button" className={activeMetaTab === 'inventory' ? 'active' : ''} onClick={() => setActiveMetaTab((current) => selectMetaTab(current, 'inventory'))}>HÀNH TRANG</button>
        </nav>
        {activeMetaTab === 'inventory' && (
          <div className="inventory-scroll-region">
          <EquipmentInventoryPanel
            save={metaSave}
            selectedHeroId={hudData.selectedHeroId}
            definitions={equipmentRuntime.getDefinitions()}
            onEquip={(instanceId) => handleInventoryOperation({ type: 'equip', heroId: hudData.selectedHeroId, instanceId })}
            onUnequip={(slot) => handleInventoryOperation({ type: 'unequip', heroId: hudData.selectedHeroId, slot })}
            onMerge={(ingredientInstanceIds) => handleInventoryOperation({ type: 'merge', ingredientInstanceIds, resultInstanceId: `equipment:${crypto.randomUUID()}` })}
            interactionLocked={equipmentInteractionLocked}
          />
          <EconomyPanel save={metaSave} lastResult={economyResult} onGacha={handleGacha} onBuy={handleShopBuy} onUse={handleConsumableUse} selectedHeroId={hudData.selectedHeroId} onRecruit={handleRecruit} onAscendStar={handleAscendStar} />
          </div>
        )}

      <BottomPlayerHUD
        data={hudData}
        heroes={heroOptions}
        showRoster={activeMetaTab === 'roster'}
        placementIntent={placementIntent}
        rangeEnabled={rangeEnabled}
        onSpeedChange={setSpeed}
        onHeroSelect={handleHeroSelect}
        onMoveHero={handleMoveHero}
        onRangeChange={(enabled) => battleBridge.setRangeVisibilityEnabled(enabled)}
        onOpenHeroDetail={() => setIsHeroDetailOpen(true)}
        commandEnergy={commandEnergy}
        deploymentCapacity={deploymentCapacity}
        autoWaveEnabled={autoWaveEnabled}
        onStartWave={() => battleBridge.requestWaveStart('manual')}
        onAutoWaveChange={(enabled) => battleBridge.setAutoWaveEnabled(enabled)}
      />
      </section>

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
        equipmentInteractionLocked={equipmentInteractionLocked}
      />
    </main>
  )
}
