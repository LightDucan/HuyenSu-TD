import Phaser from 'phaser'
import { quanVu } from '../../data/heroes/quanVu'
import { prototypeMap } from '../../data/maps/prototypeMap'
import { GameClock } from '../../domain/clock/GameClock'
import { CombatController } from '../../domain/combat/CombatController'
import type { CombatEnemy, Vector2 } from '../../domain/combat/types'
import { battleBridge } from '../bridge/BattleBridge'

const ENEMY_SPEED = 58

export class BattleScene extends Phaser.Scene {
  private readonly gameClock = new GameClock()
  private path!: Phaser.Curves.Path
  private enemy!: Phaser.GameObjects.Arc
  private enemyHpBar!: Phaser.GameObjects.Rectangle
  private enemyState!: CombatEnemy
  private distanceTravelled = 0
  private pathLength = 0
  private escaped = false
  private defeated = false
  private heroPlaced = false
  private combatController?: CombatController
  private heroVisual?: Phaser.GameObjects.Container
  private rangeVisual?: Phaser.GameObjects.Arc
  private removeSpeedListener?: () => void

  constructor() {
    super('battle')
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1f3b2d')
    this.drawGrid()
    this.path = this.createFixedPath()
    this.pathLength = this.path.getLength()
    this.enemy = this.add.circle(0, 0, 16, 0xdc2626).setStrokeStyle(3, 0xfef2f2)
    this.enemyHpBar = this.add.rectangle(0, 0, 36, 5, 0x22c55e).setOrigin(0, 0.5)
    this.enemyState = {
      id: 'enemy-sword-1',
      position: { x: 0, y: 0 },
      pathProgress: 0,
      hp: 90,
      maxHp: 90,
      alive: true,
    }
    this.placeEnemy(0)
    this.createPlacementTiles()

    this.gameClock.setSpeed(battleBridge.getSpeed())
    this.removeSpeedListener = battleBridge.onSpeedChange((speed) => {
      this.gameClock.setSpeed(speed)
      this.emitSnapshot()
    })

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.removeSpeedListener?.())
    this.emitSnapshot()
  }

  update(_time: number, delta: number): void {
    const scaledDelta = this.gameClock.scale(delta)
    const attack = this.combatController?.update(scaledDelta, [this.enemyState])
    if (attack) this.onAttack(attack.damage, attack.critical, attack.killed)

    if (this.escaped || this.defeated) return

    this.distanceTravelled += (ENEMY_SPEED * scaledDelta) / 1000
    const progress = Math.min(this.distanceTravelled / this.pathLength, 1)
    this.placeEnemy(progress)

    if (progress === 1) {
      this.escaped = true
      this.enemy.setFillStyle(0x6b7280)
      this.emitSnapshot()
    }
  }

  private createFixedPath(): Phaser.Curves.Path {
    const [first, ...rest] = prototypeMap.fixedPath
    const path = new Phaser.Curves.Path(first.x, first.y)
    rest.forEach((point) => path.lineTo(point.x, point.y))

    const pathGraphics = this.add.graphics()
    pathGraphics.lineStyle(42, 0x8b6f47, 1)
    path.draw(pathGraphics)
    pathGraphics.lineStyle(3, 0xf5deb3, 0.8)
    path.draw(pathGraphics)

    return path
  }

  private drawGrid(): void {
    const graphics = this.add.graphics().lineStyle(1, 0xffffff, 0.08)
    const cellWidth = prototypeMap.width / prototypeMap.grid.columns
    const cellHeight = prototypeMap.height / prototypeMap.grid.rows

    for (let column = 0; column <= prototypeMap.grid.columns; column += 1) {
      graphics.lineBetween(column * cellWidth, 0, column * cellWidth, prototypeMap.height)
    }
    for (let row = 0; row <= prototypeMap.grid.rows; row += 1) {
      graphics.lineBetween(0, row * cellHeight, prototypeMap.width, row * cellHeight)
    }
  }

  private placeEnemy(progress: number): void {
    const point = this.path.getPoint(progress)
    this.enemy.setPosition(point.x, point.y)
    this.enemyHpBar.setPosition(point.x - 18, point.y - 24)
    this.enemyState.position = { x: point.x, y: point.y }
    this.enemyState.pathProgress = progress
  }

  private createPlacementTiles(): void {
    const cellWidth = prototypeMap.width / prototypeMap.grid.columns
    const cellHeight = prototypeMap.height / prototypeMap.grid.rows

    prototypeMap.placementTiles.forEach((tile) => {
      const center = {
        x: (tile.column + 0.5) * cellWidth,
        y: (tile.row + 0.5) * cellHeight,
      }
      const marker = this.add
        .rectangle(center.x, center.y, cellWidth - 10, cellHeight - 10, 0x38bdf8, 0.16)
        .setStrokeStyle(2, 0x7dd3fc, 0.55)
        .setInteractive({ useHandCursor: true })

      marker.on('pointerdown', () => {
        if (this.heroPlaced) return
        this.placeHero(center)
        marker.disableInteractive().setVisible(false)
      })
    })
  }

  private placeHero(position: Vector2): void {
    this.heroPlaced = true
    this.rangeVisual = this.add
      .circle(position.x, position.y, quanVu.baseStats.range, 0x38bdf8, 0.08)
      .setStrokeStyle(2, 0x7dd3fc, 0.5)

    const body = this.add.circle(0, 0, 24, 0x2563eb).setStrokeStyle(3, 0xdbeafe)
    const label = this.add.text(0, 0, 'QV', { color: '#ffffff', fontSize: '14px', fontStyle: 'bold' }).setOrigin(0.5)
    this.heroVisual = this.add.container(position.x, position.y, [body, label])
    this.combatController = new CombatController(position, quanVu.baseStats)
    this.emitSnapshot()
  }

  private onAttack(damage: number, critical: boolean, killed: boolean): void {
    this.heroVisual?.setScale(1.16)
    this.tweens.add({ targets: this.heroVisual, scale: 1, duration: 90 })
    this.enemy.setFillStyle(critical ? 0xfbbf24 : 0xf87171)
    this.time.delayedCall(80, () => this.enemy.active && this.enemy.setFillStyle(0xdc2626))

    const damageText = this.add
      .text(this.enemy.x, this.enemy.y - 34, `${critical ? 'CRIT ' : ''}-${Math.round(damage)}`, {
        color: critical ? '#fde047' : '#ffffff',
        fontSize: '14px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
    this.tweens.add({ targets: damageText, y: damageText.y - 28, alpha: 0, duration: 520, onComplete: () => damageText.destroy() })

    this.enemyHpBar.width = 36 * (this.enemyState.hp / this.enemyState.maxHp)
    if (killed) {
      this.defeated = true
      this.enemy.setFillStyle(0x334155).setAlpha(0.45)
      this.enemyHpBar.setVisible(false)
    }
    this.emitSnapshot()
  }

  private emitSnapshot(): void {
    battleBridge.emitSnapshot({
      speed: this.gameClock.getSpeed(),
      enemiesSpawned: 1,
      enemiesEscaped: this.escaped ? 1 : 0,
      enemiesDefeated: this.defeated ? 1 : 0,
      heroPlaced: this.heroPlaced,
    })
  }
}
