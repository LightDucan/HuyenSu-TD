import Phaser from 'phaser'
import { BattleScene } from './scenes/BattleScene'
import type { BattleStageDefinition } from '../data/campaign/definitions'

export function createGame(parent: HTMLElement, stage: BattleStageDefinition): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: stage.map.width,
    height: stage.map.height,
    backgroundColor: '#1f3b2d',
    scene: [new BattleScene(stage)],
    render: {
      antialias: true,
      pixelArt: false,
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  })
}
