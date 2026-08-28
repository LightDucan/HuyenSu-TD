import Phaser from 'phaser'
import { enemyDefinitions, type EnemyCategory } from '../../data/enemies/definitions'
import { heroDefinitions, quanVu, type HeroDefinition } from '../../data/heroes/definitions'
import { prototypeMap } from '../../data/maps/prototypeMap'
import { prototypeWaves } from '../../data/waves/prototypeWaves'
import { prototypeHeroVisuals, resolvePrototypeHeroVisual, scaleVisualDuration } from '../../data/assets/prototypeVisualAssets'
import { GameClock } from '../../domain/clock/GameClock'
import { CombatController } from '../../domain/combat/CombatController'
import type { CombatEnemy, Vector2 } from '../../domain/combat/types'
import { calculateHeroLoadoutStatsV2 } from '../../domain/equipment/HeroLoadout'
import { WaveManager } from '../../domain/waves/WaveManager'
import { skillDefinitions } from '../../data/skills/definitions'
import { resolveSkill } from '../../domain/skills/SkillResolver'
import { HeroPlacementRegistry } from '../../domain/placement/HeroPlacementRegistry'
import { battleBridge } from '../bridge/BattleBridge'
import { createBattleRunId } from '../runtime/BattleRunIdentity'
import { refreshPlacedHeroRuntimeStats } from '../runtime/PlacedHeroRuntimeStats'
import { getBrowserEquipmentV2Runtime } from '../../runtime/EquipmentV2Runtime'
import { prototypeEquipmentV2Definitions } from '../../data/equipment/definitions'
import { isHeroOwned } from '../../domain/meta/HeroRecruitment'

type EnemyVisual = { state: CombatEnemy; definitionId: string; body: Phaser.GameObjects.Arc; hpBar: Phaser.GameObjects.Rectangle }
type PlacementTileRuntime = { id: string; center: Vector2; marker: Phaser.GameObjects.Rectangle }
type PlacedHeroRuntime = {
  definition: HeroDefinition
  stats: HeroDefinition['baseStats']
  combatController: CombatController
  visual: Phaser.GameObjects.Container
  sprite?: Phaser.GameObjects.Image
  rangeVisual: Phaser.GameObjects.Arc
  position: Vector2
  slotId: string
}
const INITIAL_CITY_HP = 10
const PROTOTYPE_STAGE_ID = 'prototype-stage-01'

export class BattleScene extends Phaser.Scene {
  private readonly gameClock = new GameClock()
  private readonly waveManager = new WaveManager(prototypeWaves)
  private path!: Phaser.Curves.Path
  private pathLength = 0
  private readonly enemies: EnemyVisual[] = []
  private readonly enemyPool: EnemyVisual[] = []
  private cityHp = INITIAL_CITY_HP
  private enemiesDefeated = 0
  private enemiesEscaped = 0
  private enemySpawnSequence = 0
  private runId!: string
  private battleStatus: 'running' | 'won' | 'lost' = 'running'
  private readonly placedHeroes = new Map<string, PlacedHeroRuntime>()
  private readonly placementTiles = new Map<string, PlacementTileRuntime>()
  private placementRegistry!: HeroPlacementRegistry
  private removeSpeedListener?: () => void
  private removeHeroSelectionListener?: () => void
  private removeHeroStatsRefreshListener?: () => void
  private removeWaveStartDecisionListener?: () => void

  constructor() { super('battle') }

  preload(): void {
    Object.values(prototypeHeroVisuals).forEach((visual) => {
      if (visual.idleUrl) this.load.image(visual.idleTextureKey, visual.idleUrl)
      if (visual.attackUrl) this.load.image(visual.attackTextureKey, visual.attackUrl)
      if (visual.vfxUrl) this.load.image(visual.vfxTextureKey, visual.vfxUrl)
    })
  }

  init(): void {
    this.runId = createBattleRunId()
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1f3b2d')
    this.drawGrid()
    this.path = this.createFixedPath()
    this.pathLength = this.path.getLength()
    this.placementRegistry = new HeroPlacementRegistry(
      prototypeMap.placementTiles.map((tile) => this.placementSlotId(tile.column, tile.row)),
    )
    this.createPlacementTiles()
    this.gameClock.setSpeed(battleBridge.getSpeed())
    this.removeSpeedListener = battleBridge.onSpeedChange((speed) => { this.gameClock.setSpeed(speed); this.emitSnapshot() })
    this.removeHeroSelectionListener = battleBridge.onHeroSelectionChange(() => {
      this.refreshPlacementMarkers()
      this.emitSnapshot()
    })
    this.removeHeroStatsRefreshListener = battleBridge.onPlacedHeroStatsRefresh((heroId) => {
      this.refreshHeroRuntimeStats(heroId)
    })
    this.removeWaveStartDecisionListener = battleBridge.onWaveStartDecision((decision) => {
      if (decision.status !== 'approved' || decision.runId !== this.runId || decision.waveNumber !== this.waveManager.getCurrentWaveNumber()) return
      if (this.battleStatus !== 'running' || this.placedHeroes.size === 0) return
      if (this.waveManager.beginCurrentWave()) this.emitSnapshot()
    })
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.removeSpeedListener?.()
      this.removeHeroSelectionListener?.()
      this.removeHeroStatsRefreshListener?.()
      this.removeWaveStartDecisionListener?.()
    })
    this.emitSnapshot()
  }

  update(_time: number, delta: number): void {
    if (this.battleStatus !== 'running' || this.placedHeroes.size === 0) return
    const scaledDelta = this.gameClock.scale(delta)
    this.waveManager.update(scaledDelta).forEach((definitionId) => this.spawnEnemy(definitionId))
    for (const hero of this.placedHeroes.values()) {
      const attack = hero.combatController.update(scaledDelta, this.enemies.map((enemy) => enemy.state))
      if (!attack) continue
      this.onAttack(hero, attack.attack.targetId, attack.attack.damage, attack.attack.critical, attack.attack.killed)
      if (attack.skillTriggered) this.onSkill(hero)
    }
    this.moveEnemies(scaledDelta)
    if (this.battleStatus === 'running' && this.waveManager.completeWhenNoEnemiesRemain(this.enemies.length)) {
      if (this.waveManager.getStatus() === 'won') {
        this.battleStatus = 'won'
        battleBridge.reportStageVictory({ runId: this.runId, stageId: PROTOTYPE_STAGE_ID, occurredAtMs: Date.now() })
      }
      this.emitSnapshot()
    }
  }

  private spawnEnemy(definitionId: string): void {
    const definition = enemyDefinitions[definitionId]
    const visual = this.enemyPool.pop() ?? this.createEnemyVisual()
    visual.definitionId = definition.id
    visual.state = { id: `${this.runId}-enemy-${this.enemySpawnSequence}`, position: { x: 0, y: 0 }, pathProgress: 0, hp: definition.maxHp, maxHp: definition.maxHp, alive: true }
    this.enemySpawnSequence += 1
    visual.body.setFillStyle(definition.color).setVisible(true).setAlpha(1)
    visual.hpBar.displayWidth = 36; visual.hpBar.setVisible(true)
    this.positionEnemy(visual, 0)
    this.enemies.push(visual)
    this.emitSnapshot()
  }

  private createEnemyVisual(): EnemyVisual {
    return { definitionId: '', state: { id: '', position: { x: 0, y: 0 }, pathProgress: 0, hp: 0, maxHp: 0, alive: false }, body: this.add.circle(0, 0, 16, 0xdc2626).setStrokeStyle(3, 0xfef2f2), hpBar: this.add.rectangle(0, 0, 36, 5, 0x22c55e).setOrigin(0, 0.5) }
  }

  private moveEnemies(deltaMs: number): void {
    for (let index = this.enemies.length - 1; index >= 0; index -= 1) {
      const visual = this.enemies[index]
      const definition = enemyDefinitions[visual.definitionId]
      this.updateEnemyStatus(visual.state, deltaMs)
      const speedMultiplier = visual.state.immobilizedRemainingMs ? 0 : 1 - (visual.state.slow?.ratio ?? 0)
      const progress = Math.min(visual.state.pathProgress + (definition.moveSpeed * speedMultiplier * deltaMs) / 1000 / this.pathLength, 1)
      this.positionEnemy(visual, progress)
      if (progress === 1) this.removeEnemy(index, 'escaped')
    }
  }

  private updateEnemyStatus(enemy: CombatEnemy, deltaMs: number): void {
    if (enemy.slow) {
      enemy.slow.remainingMs -= deltaMs
      if (enemy.slow.remainingMs <= 0) delete enemy.slow
    }
    if (enemy.immobilizedRemainingMs) {
      enemy.immobilizedRemainingMs = Math.max(0, enemy.immobilizedRemainingMs - deltaMs)
      if (enemy.immobilizedRemainingMs === 0) delete enemy.immobilizedRemainingMs
    }
  }

  private positionEnemy(visual: EnemyVisual, progress: number): void {
    const point = this.path.getPoint(progress)
    visual.body.setPosition(point.x, point.y)
    visual.hpBar.setPosition(point.x - 18, point.y - 24)
    visual.state.position = { x: point.x, y: point.y }
    visual.state.pathProgress = progress
  }

  private onAttack(hero: PlacedHeroRuntime, targetId: string, damage: number, critical: boolean, killed: boolean): void {
    const index = this.enemies.findIndex((enemy) => enemy.state.id === targetId)
    if (index < 0) return
    const enemy = this.enemies[index]
    const visualAsset = resolvePrototypeHeroVisual(hero.definition.id)
    if (hero.sprite && visualAsset?.attackUrl && this.textures.exists(visualAsset.attackTextureKey)) {
      hero.sprite.setTexture(visualAsset.attackTextureKey)
      this.time.delayedCall(scaleVisualDuration(180, this.gameClock.getSpeed()), () => {
        if (hero.sprite?.active && visualAsset.idleUrl && this.textures.exists(visualAsset.idleTextureKey)) hero.sprite.setTexture(visualAsset.idleTextureKey)
      })
    }
    enemy.body.setFillStyle(critical ? 0xfbbf24 : 0xf87171)
    this.time.delayedCall(80, () => enemy.body.active && enemy.body.setFillStyle(enemyDefinitions[enemy.definitionId].color))
    const damageText = this.add.text(enemy.body.x, enemy.body.y - 34, `${critical ? 'CRIT ' : ''}-${Math.round(damage)}`, { color: critical ? '#fde047' : '#ffffff', fontSize: '14px', fontStyle: 'bold' }).setOrigin(0.5)
    this.tweens.add({ targets: damageText, y: damageText.y - 28, alpha: 0, duration: 520, onComplete: () => damageText.destroy() })
    enemy.hpBar.width = 36 * (enemy.state.hp / enemy.state.maxHp)
    if (killed) this.removeEnemy(index, 'defeated')
    else this.emitSnapshot()
  }

  private onSkill(hero: PlacedHeroRuntime): void {
    const result = resolveSkill(skillDefinitions[hero.definition.activeSkillId], hero.position, hero.stats, this.enemies.map((enemy) => enemy.state))
    const visualAsset = resolvePrototypeHeroVisual(hero.definition.id)
    if (visualAsset?.vfxUrl && this.textures.exists(visualAsset.vfxTextureKey)) {
      const vfx = this.add.image(hero.position.x, hero.position.y - 28, visualAsset.vfxTextureKey)
        .setDisplaySize(96, 96)
        .setAlpha(0.82)
        .setDepth(8)
      this.tweens.add({ targets: vfx, alpha: 0, scale: 1.18, duration: scaleVisualDuration(420, this.gameClock.getSpeed()), onComplete: () => vfx.destroy() })
    }
    result.killedEnemyIds.forEach((id) => {
      const index = this.enemies.findIndex((enemy) => enemy.state.id === id)
      if (index >= 0) this.removeEnemy(index, 'defeated')
    })
    if (result.affectedEnemyIds.length > result.killedEnemyIds.length) this.emitSnapshot()
  }

  private removeEnemy(index: number, reason: 'defeated' | 'escaped'): void {
    const [enemy] = this.enemies.splice(index, 1)
    enemy.body.setVisible(false); enemy.hpBar.setVisible(false); enemy.state.alive = false
    this.enemyPool.push(enemy)
    if (reason === 'defeated') {
      this.enemiesDefeated += 1
      battleBridge.reportEnemyDefeated({ runId: this.runId, enemyInstanceId: enemy.state.id, enemyId: enemy.definitionId, occurredAtMs: Date.now() })
    }
    else {
      this.enemiesEscaped += 1
      this.cityHp = Math.max(0, this.cityHp - enemyDefinitions[enemy.definitionId].cityDamage)
      if (this.cityHp === 0) this.battleStatus = 'lost'
    }
    this.emitSnapshot()
  }

  private createPlacementTiles(): void {
    const cellWidth = prototypeMap.width / prototypeMap.grid.columns
    const cellHeight = prototypeMap.height / prototypeMap.grid.rows
    prototypeMap.placementTiles.forEach((tile) => {
      const id = this.placementSlotId(tile.column, tile.row)
      const center = { x: (tile.column + 0.5) * cellWidth, y: (tile.row + 0.5) * cellHeight }
      const marker = this.add.rectangle(center.x, center.y, cellWidth - 10, cellHeight - 10, 0x38bdf8, 0.16).setStrokeStyle(2, 0x7dd3fc, 0.55).setInteractive({ useHandCursor: true })
      marker.on('pointerdown', () => this.placeOrMoveSelectedHero(id))
      this.placementTiles.set(id, { id, center, marker })
    })
  }

  private placementSlotId(column: number, row: number): string {
    return `slot-${column}-${row}`
  }

  private placeOrMoveSelectedHero(slotId: string): void {
    const selectedHeroId = battleBridge.getSelectedHeroId()
    const metaState = getBrowserEquipmentV2Runtime().getSnapshot().data
    if (!isHeroOwned(metaState.heroCollection, selectedHeroId)) return
    const definition = heroDefinitions[selectedHeroId] ?? quanVu
    const tile = this.placementTiles.get(slotId)
    if (!tile) return

    const capacity = battleBridge.getDeploymentCapacitySnapshot()
    const placement = this.placementRegistry.placeWithinCapacity(definition.id, slotId, capacity.effectiveLimit)
    if (placement.status === 'rejected') {
      battleBridge.reportPlacementFeedback({
        status: 'rejected',
        heroId: definition.id,
        reason: placement.reason,
        effectiveLimit: capacity.effectiveLimit,
      })
      return
    }
    const result = placement.result
    if (result.recalledHeroId) this.recallHero(result.recalledHeroId)

    const existing = this.placedHeroes.get(definition.id)
    if (existing) this.repositionHero(existing, tile.center, slotId)
    else this.placedHeroes.set(definition.id, this.createHeroRuntime(definition, tile.center, slotId))

    this.refreshPlacementMarkers()
    battleBridge.reportPlacementFeedback({ status: 'placed', heroId: definition.id })
    this.emitSnapshot()
  }

  private createHeroRuntime(definition: HeroDefinition, position: Vector2, slotId: string): PlacedHeroRuntime {
    const equipmentState = getBrowserEquipmentV2Runtime().getSnapshot().data
    const progression = equipmentState.heroCollection[definition.id]?.progression ?? { stage: 'normal', level: 1 }
    const stats = calculateHeroLoadoutStatsV2(definition.baseStats, progression, equipmentState, definition.id, prototypeEquipmentV2Definitions)
    const rangeVisual = this.add.circle(position.x, position.y, stats.range, 0x38bdf8, 0.08).setStrokeStyle(2, 0x7dd3fc, 0.5)
    const visualAsset = resolvePrototypeHeroVisual(definition.id)
    const sprite = visualAsset?.idleUrl && this.textures.exists(visualAsset.idleTextureKey)
      ? this.add.image(0, 0, visualAsset.idleTextureKey).setOrigin(0.5, 112 / 128).setDisplaySize(72, 72)
      : undefined
    const fallbackBody = sprite ? undefined : this.add.circle(0, 0, 24, 0x2563eb).setStrokeStyle(3, 0xdbeafe)
    const fallbackLabel = sprite ? undefined : this.add.text(0, 0, definition.name.split(' ').map((part) => part[0]).join('').slice(-2).toUpperCase(), { color: '#ffffff', fontSize: '14px', fontStyle: 'bold' }).setOrigin(0.5)
    const visualChildren: Phaser.GameObjects.GameObject[] = sprite ? [sprite] : [fallbackBody!, fallbackLabel!]
    const visual = this.add.container(position.x, position.y, visualChildren).setDepth(6)
    return {
      definition,
      stats,
      combatController: new CombatController(position, stats, Math.random, definition.skillTriggerHits),
      visual,
      sprite,
      rangeVisual,
      position,
      slotId,
    }
  }

  private repositionHero(hero: PlacedHeroRuntime, position: Vector2, slotId: string): void {
    hero.position = position
    hero.slotId = slotId
    hero.combatController.reposition(position)
    hero.visual.setPosition(position.x, position.y)
    hero.rangeVisual.setPosition(position.x, position.y)
  }

  private refreshHeroRuntimeStats(heroId: string): void {
    const refreshed = refreshPlacedHeroRuntimeStats(this.placedHeroes.get(heroId), (hero) => {
      const equipmentState = getBrowserEquipmentV2Runtime().getSnapshot().data
      const progression = equipmentState.heroCollection[heroId]?.progression ?? { stage: 'normal', level: 1 }
      return calculateHeroLoadoutStatsV2(hero.definition.baseStats, progression, equipmentState, heroId, prototypeEquipmentV2Definitions)
    })
    if (refreshed) this.emitSnapshot()
  }

  private recallHero(heroId: string): void {
    const hero = this.placedHeroes.get(heroId)
    if (!hero) return
    hero.visual.destroy(true)
    hero.rangeVisual.destroy()
    this.placedHeroes.delete(heroId)
  }

  private refreshPlacementMarkers(): void {
    const selectedHeroId = battleBridge.getSelectedHeroId()
    this.placementTiles.forEach((tile) => {
      const occupantId = this.placementRegistry.getHeroAt(tile.id)
      const isSelectedHero = occupantId === selectedHeroId
      tile.marker
        .setFillStyle(isSelectedHero ? 0xfbbf24 : occupantId ? 0x10b981 : 0x38bdf8, occupantId ? 0.28 : 0.16)
        .setStrokeStyle(2, isSelectedHero ? 0xfde047 : occupantId ? 0x6ee7b7 : 0x7dd3fc, 0.7)
    })
  }

  private createFixedPath(): Phaser.Curves.Path {
    const [first, ...rest] = prototypeMap.fixedPath
    const path = new Phaser.Curves.Path(first.x, first.y)
    rest.forEach((point) => path.lineTo(point.x, point.y))
    const graphics = this.add.graphics()
    graphics.lineStyle(42, 0x8b6f47, 1); path.draw(graphics)
    graphics.lineStyle(3, 0xf5deb3, 0.8); path.draw(graphics)
    return path
  }

  private drawGrid(): void {
    const graphics = this.add.graphics().lineStyle(1, 0xffffff, 0.08)
    const cellWidth = prototypeMap.width / prototypeMap.grid.columns
    const cellHeight = prototypeMap.height / prototypeMap.grid.rows
    for (let column = 0; column <= prototypeMap.grid.columns; column += 1) graphics.lineBetween(column * cellWidth, 0, column * cellWidth, prototypeMap.height)
    for (let row = 0; row <= prototypeMap.grid.rows; row += 1) graphics.lineBetween(0, row * cellHeight, prototypeMap.width, row * cellHeight)
  }

  private remainingByCategory(): Record<EnemyCategory, number> {
    const result: Record<EnemyCategory, number> = { sword: 0, archer: 0, other: 0 }
    this.enemies.forEach((enemy) => { result[enemyDefinitions[enemy.definitionId].category] += 1 })
    return result
  }

  private emitSnapshot(): void {
    battleBridge.emitSnapshot({
      runId: this.runId, speed: this.gameClock.getSpeed(), enemiesSpawned: this.enemies.length + this.enemiesDefeated + this.enemiesEscaped,
      enemiesEscaped: this.enemiesEscaped, enemiesDefeated: this.enemiesDefeated,
      placedHeroes: this.placementRegistry.getPlacements(), selectedHeroId: battleBridge.getSelectedHeroId(),
      wave: this.waveManager.getCurrentWaveNumber(), totalWaves: this.waveManager.getTotalWaves(), waveStatus: this.waveManager.getStatus(), cityHp: this.cityHp,
      battleStatus: this.battleStatus, remainingByCategory: this.remainingByCategory(),
    })
  }
}
