import Phaser from 'phaser'
import { haiBaTrungMap } from '../data/maps/prototypeMap'
import { BattleScene } from './scenes/BattleScene'

export function createGame(parent: HTMLElement): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: haiBaTrungMap.width,
    height: haiBaTrungMap.height,
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
