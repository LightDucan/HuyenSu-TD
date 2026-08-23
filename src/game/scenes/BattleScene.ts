import Phaser from 'phaser'
import { enemyDefinitions, type EnemyCategory } from '../../data/enemies/definitions'
import { quanVu } from '../../data/heroes/quanVu'
import { prototypeMap } from '../../data/maps/prototypeMap'
import { prototypeWaves } from '../../data/waves/prototypeWaves'
import { GameClock } from '../../domain/clock/GameClock'
import { CombatController } from '../../domain/combat/CombatController'
import type { CombatEnemy, Vector2 } from '../../domain/combat/types'
import { WaveManager } from '../../domain/waves/WaveManager'
import { battleBridge } from '../bridge/BattleBridge'

type EnemyVisual = { state: CombatEnemy; definitionId: string; body: Phaser.GameObjects.Arc; hpBar: Phaser.GameObjects.Rectangle }
const INITIAL_CITY_HP = 10

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
  private heroPlaced = false
  private battleStatus: 'running' | 'won' | 'lost' = 'running'
  private combatController?: CombatController
  private heroVisual?: Phaser.GameObjects.Container
  private removeSpeedListener?: () => void

  constructor() { super('battle') }

  create(): void {
    this.cameras.main.setBackgroundColor('#1f3b2d')
    this.drawGrid()
    this.path = this.createFixedPath()
    this.pathLength = this.path.getLength()
    this.createPlacementTiles()
    this.gameClock.setSpeed(battleBridge.getSpeed())
    this.removeSpeedListener = battleBridge.onSpeedChange((speed) => { this.gameClock.setSpeed(speed); this.emitSnapshot() })
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.removeSpeedListener?.())
    this.emitSnapshot()
  }

  update(_time: number, delta: number): void {
    if (this.battleStatus !== 'running' || !this.heroPlaced) return
    const scaledDelta = this.gameClock.scale(delta)
    this.waveManager.update(scaledDelta).forEach((definitionId) => this.spawnEnemy(definitionId))
    const attack = this.combatController?.update(scaledDelta, this.enemies.map((enemy) => enemy.state))
    if (attack) this.onAttack(attack.targetId, attack.damage, attack.critical, attack.killed)
    this.moveEnemies(scaledDelta)
    if (this.battleStatus === 'running' && this.waveManager.completeWhenNoEnemiesRemain(this.enemies.length)) {
      if (this.waveManager.getStatus() === 'won') this.battleStatus = 'won'
      this.emitSnapshot()
    }
  }

  private spawnEnemy(definitionId: string): void {
    const definition = enemyDefinitions[definitionId]
    const visual = this.enemyPool.pop() ?? this.createEnemyVisual()
    visual.definitionId = definition.id
    visual.state = { id: `${definition.id}-${this.enemiesDefeated}-${this.enemiesEscaped}-${this.enemies.length}`, position: { x: 0, y: 0 }, pathProgress: 0, hp: definition.maxHp, maxHp: definition.maxHp, alive: true }
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
      const progress = Math.min(visual.state.pathProgress + (definition.moveSpeed * deltaMs) / 1000 / this.pathLength, 1)
      this.positionEnemy(visual, progress)
      if (progress === 1) this.removeEnemy(index, 'escaped')
    }
  }

  private positionEnemy(visual: EnemyVisual, progress: number): void {
    const point = this.path.getPoint(progress)
    visual.body.setPosition(point.x, point.y)
    visual.hpBar.setPosition(point.x - 18, point.y - 24)
    visual.state.position = { x: point.x, y: point.y }
    visual.state.pathProgress = progress
  }

  private onAttack(targetId: string, damage: number, critical: boolean, killed: boolean): void {
    const index = this.enemies.findIndex((enemy) => enemy.state.id === targetId)
    if (index < 0) return
    const enemy = this.enemies[index]
    this.heroVisual?.setScale(1.16)
    this.tweens.add({ targets: this.heroVisual, scale: 1, duration: 90 })
    enemy.body.setFillStyle(critical ? 0xfbbf24 : 0xf87171)
    this.time.delayedCall(80, () => enemy.body.active && enemy.body.setFillStyle(enemyDefinitions[enemy.definitionId].color))
    const damageText = this.add.text(enemy.body.x, enemy.body.y - 34, `${critical ? 'CRIT ' : ''}-${Math.round(damage)}`, { color: critical ? '#fde047' : '#ffffff', fontSize: '14px', fontStyle: 'bold' }).setOrigin(0.5)
    this.tweens.add({ targets: damageText, y: damageText.y - 28, alpha: 0, duration: 520, onComplete: () => damageText.destroy() })
    enemy.hpBar.width = 36 * (enemy.state.hp / enemy.state.maxHp)
    if (killed) this.removeEnemy(index, 'defeated')
    else this.emitSnapshot()
  }

  private removeEnemy(index: number, reason: 'defeated' | 'escaped'): void {
    const [enemy] = this.enemies.splice(index, 1)
    enemy.body.setVisible(false); enemy.hpBar.setVisible(false); enemy.state.alive = false
    this.enemyPool.push(enemy)
    if (reason === 'defeated') this.enemiesDefeated += 1
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
      const center = { x: (tile.column + 0.5) * cellWidth, y: (tile.row + 0.5) * cellHeight }
      const marker = this.add.rectangle(center.x, center.y, cellWidth - 10, cellHeight - 10, 0x38bdf8, 0.16).setStrokeStyle(2, 0x7dd3fc, 0.55).setInteractive({ useHandCursor: true })
      marker.on('pointerdown', () => { if (!this.heroPlaced) { this.placeHero(center); marker.disableInteractive().setVisible(false) } })
    })
  }

  private placeHero(position: Vector2): void {
    this.heroPlaced = true
    this.add.circle(position.x, position.y, quanVu.baseStats.range, 0x38bdf8, 0.08).setStrokeStyle(2, 0x7dd3fc, 0.5)
    const body = this.add.circle(0, 0, 24, 0x2563eb).setStrokeStyle(3, 0xdbeafe)
    const label = this.add.text(0, 0, 'QV', { color: '#ffffff', fontSize: '14px', fontStyle: 'bold' }).setOrigin(0.5)
    this.heroVisual = this.add.container(position.x, position.y, [body, label])
    this.combatController = new CombatController(position, quanVu.baseStats)
    this.emitSnapshot()
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
      speed: this.gameClock.getSpeed(), enemiesSpawned: this.enemies.length + this.enemiesDefeated + this.enemiesEscaped,
      enemiesEscaped: this.enemiesEscaped, enemiesDefeated: this.enemiesDefeated, heroPlaced: this.heroPlaced,
      wave: this.waveManager.getCurrentWaveNumber(), totalWaves: this.waveManager.getTotalWaves(), cityHp: this.cityHp,
      battleStatus: this.battleStatus, remainingByCategory: this.remainingByCategory(),
    })
  }
}
