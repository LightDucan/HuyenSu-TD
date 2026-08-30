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
import { defaultBattleStage } from '../data/campaign/haiBaTrungCampaign'
import { productionCampaignCatalog } from '../data/campaign/catalog'
import { createInitialBattleSnapshot } from '../game/bridge/BattleSnapshot'
import { getBrowserDeploymentCapacityRuntime } from '../runtime/DeploymentCapacityRuntime'
import { battleInstruction, moveIntentForHero, placementIntentForHero } from '../game/bridge/BattleInteractionContract'
import { canApplyEquipmentOperationForScreen, isEquipmentInteractionLocked, selectMetaTab, type MetaTab } from './MetaTabState'
import { transitionPlayerJourney, type PlayerJourneyScreen } from './PlayerJourneyState'
import { selectSafeStage, selectStageProgress } from '../domain/campaign/CampaignProgression'
import { selectChapterStatus } from '../data/campaign/catalog'

export function App() {
  const equipmentRuntime = getBrowserEquipmentV2Runtime()
  const economyRuntime = getBrowserEconomyRuntime()
  const heroMetaRuntime = getBrowserHeroMetaRuntime()
  const gameHostRef = useRef<HTMLDivElement>(null)
  const [selectedChapterId, setSelectedChapterId] = useState(productionCampaignCatalog.chapters[0].id)
  const [selectedStageId, setSelectedStageId] = useState(defaultBattleStage.id)
  const [screen, setScreen] = useState<PlayerJourneyScreen>('city')
  const [commandEnergy, setCommandEnergy] = useState<CommandEnergySnapshot>(() => battleBridge.getCommandEnergySnapshot())
  const [autoWaveEnabled, setAutoWaveEnabled] = useState(() => battleBridge.isAutoWaveEnabled())
  const [deploymentCapacity, setDeploymentCapacity] = useState<DeploymentCapacitySnapshot>(() => battleBridge.getDeploymentCapacitySnapshot())
  const [placementMessage, setPlacementMessage] = useState<string | null>(null)
  const [isHeroDetailOpen, setIsHeroDetailOpen] = useState(false)
  const [activeMetaTab, setActiveMetaTab] = useState<MetaTab>('roster')
  const [placementIntent, setPlacementIntent] = useState(() => battleBridge.getPlacementIntent())
  const [rangeEnabled, setRangeEnabled] = useState(() => battleBridge.isRangeVisibilityEnabled())
  const [metaSave, setMetaSave] = useState<MetaSave>(() => battleBridge.getMetaSnapshot() ?? equipmentRuntime.getSnapshot())
  const selectedChapter = productionCampaignCatalog.chapters.find((chapter) => chapter.id === selectedChapterId) ?? productionCampaignCatalog.chapters[0]
  const selectedStage = selectSafeStage([selectedChapter], selectedStageId, metaSave.data.campaignProgress, selectPlayableOwnedHeroIds(metaSave.data.heroCollection, ACTIVE_HERO_IDS))
  const stateStage = selectedStage ?? productionCampaignCatalog.chapters[0].stages[0]
  const playableIds = selectedStage ? selectPlayableOwnedHeroIds(metaSave.data.heroCollection, selectedStage.allowedHeroIds) : []
  const [snapshot, setSnapshot] = useState(() => createInitialBattleSnapshot(stateStage, playableIds, battleBridge.getSelectedHeroId()))
  const [economyResult, setEconomyResult] = useState<string>()
  const definitionLoadout = (heroId: string, save: MetaSave = equipmentRuntime.getSnapshot()): HeroEquipment => {
    const loadout = save.data.inventory.equippedByHero[heroId] ?? {}
    const weapon = loadout.weaponInstanceId ? save.data.inventory.equipmentInstances[loadout.weaponInstanceId] : undefined
    const gem = loadout.gemInstanceId ? save.data.inventory.equipmentInstances[loadout.gemInstanceId] : undefined
    return { ...(weapon ? { weaponId: weapon.definitionId } : {}), ...(gem ? { gemId: gem.definitionId } : {}) }
  }
  const [equipment, setEquipment] = useState<HeroEquipment>(() => definitionLoadout(battleBridge.getSelectedHeroId(), metaSave))
  const hudData = toBattleHudData(snapshot)
  const cityHeroOptions = selectPlayableOwnedHeroIds(metaSave.data.heroCollection, ACTIVE_HERO_IDS)
    .map((heroId) => ({ id: heroId, name: heroDefinitions[heroId].name, portraitUrl: resolveHaiBaTrungHeroVisual(heroId)?.portraitUrl }))
  const heroOptions = selectedStage ? selectPlayableOwnedHeroIds(metaSave.data.heroCollection, selectedStage.allowedHeroIds)
    .map((heroId) => ({ id: heroId, name: heroDefinitions[heroId].name, portraitUrl: resolveHaiBaTrungHeroVisual(heroId)?.portraitUrl }))
    : []
  const progression: HeroProgression = metaSave.data.heroCollection[hudData.selectedHeroId]?.progression ?? { stage: 'normal', level: 1 }
  const selectedHeroName = heroDefinitions[hudData.selectedHeroId]?.name ?? 'Hero'
  const equipmentInteractionLocked = screen === 'battle' && isEquipmentInteractionLocked(hudData.waveStatus)

  useEffect(() => {
    const unsubscribeMeta = battleBridge.onMetaSnapshot((save) => {
      setMetaSave(save)
      setEquipment(definitionLoadout(battleBridge.getSelectedHeroId(), save))
    })
    return unsubscribeMeta
  }, [])

  useEffect(() => {
    if (screen !== 'battle' || !gameHostRef.current) return

    if (!selectedStage) return
    const capacityProjection = getBrowserDeploymentCapacityRuntime().setMapTileCount(selectedStage.map.placementTiles.length)
    setDeploymentCapacity(capacityProjection)
    const game = createGame(gameHostRef.current, selectedStage)
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
    return () => {
      unsubscribe()
      unsubscribeEnergy()
      unsubscribeAuto()
      unsubscribeCapacity()
      unsubscribePlacement()
      unsubscribeIntent()
      unsubscribeRange()
      game.destroy(true)
    }
  }, [screen, selectedStage, economyRuntime])

  useEffect(() => {
    if (screen === 'battle' && snapshot.battleStatus !== 'running' && !snapshot.runId.startsWith('pending-')) setScreen((current) => transitionPlayerJourney(current, 'battle-complete'))
  }, [screen, snapshot.battleStatus])

  const setSpeed = (speed: GameSpeed) => battleBridge.setSpeed(speed)

  const handleHeroSelect = (heroId: string) => {
    if (!heroDefinitions[heroId] || !metaSave.data.heroCollection[heroId] || (screen === 'battle' && (!selectedStage || !new Set<string>(selectedStage.allowedHeroIds).has(heroId)))) return
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
    if (!canApplyEquipmentOperationForScreen(screen, hudData.waveStatus, operation.type)) {
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
    try {
      const result = economyRuntime.gacha.pull(count, save.save.revision, `ui/gacha/${crypto.randomUUID()}`, Date.now())
      setEconomyResult(`Gacha ${count}x: ${result.rewards.map((reward) => reward.id).join(', ')}`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Gacha thất bại') }
  }

  const handleShopBuy = (itemId: string) => {
    const save = economyRuntime.repository.load()
    if (save.status !== 'loaded') return
    try {
      economyRuntime.shop.buy(itemId, 1, save.save.revision, `ui/shop/${crypto.randomUUID()}`, Date.now())
      setEconomyResult(`Đã mua ${itemId}.`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Mua thất bại') }
  }

  const handleConsumableUse = (itemId: string, quantity: number) => {
    const save = economyRuntime.repository.load()
    if (save.status !== 'loaded') return
    try {
      if (itemId === CONSUMABLE_ITEM_IDS.summonOrder) economyRuntime.consumables.useSummonOrder(quantity, save.save.revision, `ui/use-summon/${crypto.randomUUID()}`, Date.now())
      else economyRuntime.consumables.useCommandEnergyItem(itemId, quantity, save.save.revision, `ui/use-energy/${crypto.randomUUID()}`, Date.now())
      setEconomyResult(`Đã dùng ${quantity} × ${itemId}.`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Dùng vật phẩm thất bại') }
  }

  const handleRecruit = (count: 1 | 10) => {
    const current = heroMetaRuntime.getSnapshot()
    try {
      const result = heroMetaRuntime.recruit(count, Math.random, { expectedRevision: current.revision, idempotencyKey: `ui/hero/recruit/${crypto.randomUUID()}`, committedAtMs: Date.now() })
      setEconomyResult(`Chiêu mộ ${count}x: ${result.results.map(({ heroId, outcome }) => `${heroDefinitions[heroId]?.name ?? heroId} (${outcome})`).join(', ')}`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Chiêu mộ thất bại') }
  }

  const handleAscendStar = (heroId: string) => {
    const current = heroMetaRuntime.getSnapshot()
    try {
      heroMetaRuntime.ascendStar(heroId, { expectedRevision: current.revision, idempotencyKey: `ui/hero/star/${heroId}/${crypto.randomUUID()}`, committedAtMs: Date.now() })
      setEconomyResult(`Đã tăng Sao cho ${heroDefinitions[heroId]?.name ?? heroId}.`)
    } catch (error) { setEconomyResult(error instanceof Error ? error.message : 'Tăng Sao thất bại') }
  }

  const handleMetaHeroSelect = (heroId: string) => {
    if (!heroDefinitions[heroId] || !metaSave.data.heroCollection[heroId] || (screen === 'battle' && (!selectedStage || !new Set<string>(selectedStage.allowedHeroIds).has(heroId)))) return
    battleBridge.setSelectedHeroId(heroId)
    setEquipment(definitionLoadout(heroId, metaSave))
  }

  const handleEnterBattle = () => {
    if (!selectedStage || selectStageProgress(selectedChapter, metaSave.data.campaignProgress, selectedStage.id) === 'locked' || playableIds.length === 0) return
    battleBridge.clearPlacementIntent()
    const preferredHeroId = new Set(playableIds).has(battleBridge.getSelectedHeroId()) ? battleBridge.getSelectedHeroId() : playableIds[0]
    if (preferredHeroId) battleBridge.setSelectedHeroId(preferredHeroId)
    setSnapshot(createInitialBattleSnapshot(selectedStage, playableIds, preferredHeroId))
    setScreen((current) => transitionPlayerJourney(current, 'enter-battle'))
  }

  const handleReturnToCity = () => {
    battleBridge.clearPlacementIntent()
    setScreen((current) => transitionPlayerJourney(current, 'return-city'))
  }

  const handleRetryBattle = () => {
    if (!selectedStage) return
    battleBridge.clearPlacementIntent()
    setSnapshot(createInitialBattleSnapshot(selectedStage, playableIds, battleBridge.getSelectedHeroId()))
    setScreen((current) => transitionPlayerJourney(current, 'retry-battle'))
  }

  const heroDetail = <HeroDetailModal
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

  if (screen === 'city') return (
    <main className="app-shell journey-shell city-screen">
      <header className="journey-header"><div><span className="eyebrow">Huyền Sử TD</span><h1>ĐẠI DOANH</h1><p>Quản lý đội hình, trang bị và tài nguyên.</p></div><button type="button" className="btn-primary" onClick={() => setScreen((current) => transitionPlayerJourney(current, 'open-campaign'))}>CHINH CHIẾN</button></header>
      <section className="city-summary" aria-label="Tổng quan Đại Doanh"><strong>Vàng: {metaSave.data.wallet.balances.gold}</strong><strong>KNB: {metaSave.data.wallet.balances.knb}</strong><strong>Quân Lệnh: {metaSave.data.commandEnergy.current}</strong><span>Đội hình sở hữu: {cityHeroOptions.length}</span></section>
      <div className="city-meta-grid">
        <section className="city-roster-panel"><h2>Đội hình</h2><div className="city-hero-list">{cityHeroOptions.map((hero) => <button key={hero.id} type="button" className={hero.id === hudData.selectedHeroId ? 'selected' : ''} onClick={() => handleMetaHeroSelect(hero.id)}>{hero.name}</button>)}</div><button type="button" className="btn-secondary" onClick={() => setIsHeroDetailOpen(true)}>Chi Tiết Tướng</button></section>
        <EquipmentInventoryPanel save={metaSave} selectedHeroId={hudData.selectedHeroId} definitions={equipmentRuntime.getDefinitions()} onEquip={(instanceId) => handleInventoryOperation({ type: 'equip', heroId: hudData.selectedHeroId, instanceId })} onUnequip={(slot) => handleInventoryOperation({ type: 'unequip', heroId: hudData.selectedHeroId, slot })} onMerge={(ingredientInstanceIds) => handleInventoryOperation({ type: 'merge', ingredientInstanceIds, resultInstanceId: `equipment:${crypto.randomUUID()}` })} />
        <EconomyPanel save={metaSave} lastResult={economyResult} onGacha={handleGacha} onBuy={handleShopBuy} onUse={handleConsumableUse} selectedHeroId={hudData.selectedHeroId} onRecruit={handleRecruit} onAscendStar={handleAscendStar} />
      </div>
      {heroDetail}
    </main>
  )

  if (screen === 'campaign') return (
    <main className="app-shell journey-shell campaign-screen">
      <header className="journey-header"><div><span className="eyebrow">CHINH CHIẾN</span><h1>{selectedChapter.displayName}</h1><p>Trạng thái chương: {selectChapterStatus(selectedChapter, metaSave.data.campaignProgress)}</p><p>Chọn một màn để bắt đầu hành trình.</p></div><button type="button" className="btn-secondary" onClick={() => setScreen('city')}>VỀ ĐẠI DOANH</button></header>
      <section className="campaign-card"><div className="chapter-options" aria-label="Chọn chương">{productionCampaignCatalog.chapters.map((chapter) => <button key={chapter.id} type="button" className={chapter.id === selectedChapter.id ? 'selected' : ''} onClick={() => { setSelectedChapterId(chapter.id); const safe = selectSafeStage([chapter], '', metaSave.data.campaignProgress, selectPlayableOwnedHeroIds(metaSave.data.heroCollection, ACTIVE_HERO_IDS)); setSelectedStageId(safe?.id ?? '') }}>{chapter.displayName}</button>)}</div><span className="eyebrow">{selectedChapter.displayName}</span>{selectedStage ? <><h2>{selectedStage.displayName}</h2><p>{selectedStage.waves.length} Wave · {selectedStage.allowedHeroIds.length} tướng khả dụng</p></> : <p role="status">Chương này chưa có màn chơi phù hợp với đội hình hiện tại.</p>}<div className="stage-options" aria-label="Chọn màn">{selectedChapter.stages.map((stage) => { const status = selectStageProgress(selectedChapter, metaSave.data.campaignProgress, stage.id); return <button key={stage.id} type="button" className={stage.id === selectedStage?.id ? 'selected' : ''} disabled={status === 'locked'} onClick={() => setSelectedStageId(stage.id)}>{stage.displayName} — {status === 'completed' ? 'Đã hoàn thành' : status === 'locked' ? 'Chưa mở' : 'Sẵn sàng'}</button> })}</div><button type="button" className="btn-primary" disabled={!selectedStage || playableIds.length === 0} onClick={handleEnterBattle}>VÀO TRẬN</button>{selectedStage && playableIds.length === 0 && <p role="status">Màn này chưa có tướng khả dụng.</p>}</section>
    </main>
  )

  if (screen === 'result') return (
    <main className="app-shell journey-shell result-screen">
      <section className={`result-card ${snapshot.battleStatus}`}><span className="eyebrow">{stateStage.displayName}</span><h1>{snapshot.battleStatus === 'won' ? 'CHIẾN THẮNG' : 'THẤT BẠI'}</h1><p>Đạt đến Wave {snapshot.wave} / {snapshot.totalWaves}</p><div className="result-stats"><span>Quái đã hạ: {snapshot.enemiesDefeated}</span><span>Quái đã thoát: {snapshot.enemiesEscaped}</span><span>Vàng: {metaSave.data.wallet.balances.gold}</span><span>KNB: {metaSave.data.wallet.balances.knb}</span></div><div className="result-actions"><button type="button" className="btn-secondary" onClick={handleReturnToCity}>VỀ ĐẠI DOANH</button><button type="button" className="btn-primary" onClick={handleRetryBattle}>CHƠI LẠI</button></div></section>
    </main>
  )

  return (
    <main className="app-shell battle-screen">
      <TopCityBar data={hudData} wallet={metaSave.data.wallet.balances} stageDisplayName={stateStage.displayName} />
      <div className="interaction-copy"><p className="hint">{battleInstruction(placementIntent, selectedHeroName, snapshot.placedHeroes.length, deploymentCapacity.effectiveLimit)}</p>{placementMessage && <p className="placement-feedback" role="status">{placementMessage}</p>}</div>
      <section className="game-frame" ref={gameHostRef} aria-label="Battle Scene" />
      <section className={`meta-content-region ${activeMetaTab}`} aria-label="Combat HUD" aria-live="polite">
        <nav className="meta-tabs" aria-label="Điều hướng Đội Hình và Hành Trang"><button type="button" className={activeMetaTab === 'roster' ? 'active' : ''} onClick={() => setActiveMetaTab((current) => selectMetaTab(current, 'roster'))}>ĐỘI HÌNH</button><button type="button" className={activeMetaTab === 'inventory' ? 'active' : ''} onClick={() => setActiveMetaTab((current) => selectMetaTab(current, 'inventory'))}>HÀNH TRANG</button></nav>
        {activeMetaTab === 'inventory' && <div className="inventory-scroll-region"><EquipmentInventoryPanel save={metaSave} selectedHeroId={hudData.selectedHeroId} definitions={equipmentRuntime.getDefinitions()} onEquip={(instanceId) => handleInventoryOperation({ type: 'equip', heroId: hudData.selectedHeroId, instanceId })} onUnequip={(slot) => handleInventoryOperation({ type: 'unequip', heroId: hudData.selectedHeroId, slot })} onMerge={(ingredientInstanceIds) => handleInventoryOperation({ type: 'merge', ingredientInstanceIds, resultInstanceId: `equipment:${crypto.randomUUID()}` })} interactionLocked={equipmentInteractionLocked} /></div>}
        <BottomPlayerHUD data={hudData} heroes={heroOptions} showRoster={activeMetaTab === 'roster'} placementIntent={placementIntent} rangeEnabled={rangeEnabled} onSpeedChange={setSpeed} onHeroSelect={handleHeroSelect} onMoveHero={handleMoveHero} onRangeChange={(enabled) => battleBridge.setRangeVisibilityEnabled(enabled)} onOpenHeroDetail={() => setIsHeroDetailOpen(true)} commandEnergy={commandEnergy} deploymentCapacity={deploymentCapacity} autoWaveEnabled={autoWaveEnabled} onStartWave={() => battleBridge.requestWaveStart('manual')} onAutoWaveChange={(enabled) => battleBridge.setAutoWaveEnabled(enabled)} />
      </section>
      {heroDetail}
    </main>
  )
}
