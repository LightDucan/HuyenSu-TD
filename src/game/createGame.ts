import Phaser from 'phaser'
import { prototypeMap } from '../data/maps/prototypeMap'
import { BattleScene } from './scenes/BattleScene'

export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: prototypeMap.width,
    height: prototypeMap.height,
    backgroundColor: '#1f3b2d',
    scene: [BattleScene],
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
