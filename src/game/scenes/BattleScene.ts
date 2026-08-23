import Phaser from 'phaser'
import { prototypeMap } from '../../data/maps/prototypeMap'
import { GameClock } from '../../domain/clock/GameClock'
import { battleBridge } from '../bridge/BattleBridge'

const ENEMY_SPEED = 90

export class BattleScene extends Phaser.Scene {
  private readonly gameClock = new GameClock()
  private path!: Phaser.Curves.Path
  private enemy!: Phaser.GameObjects.Arc
  private distanceTravelled = 0
  private pathLength = 0
  private escaped = false
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
    this.placeEnemy(0)

    this.gameClock.setSpeed(battleBridge.getSpeed())
    this.removeSpeedListener = battleBridge.onSpeedChange((speed) => {
      this.gameClock.setSpeed(speed)
      this.emitSnapshot()
    })

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.removeSpeedListener?.())
    this.emitSnapshot()
  }

  update(_time: number, delta: number): void {
    if (this.escaped) return

    this.distanceTravelled += (ENEMY_SPEED * this.gameClock.scale(delta)) / 1000
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
  }

  private emitSnapshot(): void {
    battleBridge.emitSnapshot({
      speed: this.gameClock.getSpeed(),
      enemiesSpawned: 1,
      enemiesEscaped: this.escaped ? 1 : 0,
    })
  }
}
