import '../style.css'
import Phaser from 'phaser'
import GameScene from './gamescene/gameScene'
import TitleScene from './gamescene/titleScene'
import GameOver from './gamescene/gameOver.js'
import { ASPECT_RATIO, DISPLAY_PIXEL } from './constanta.js'

const sizes = {
  width: ASPECT_RATIO.WIDTH * DISPLAY_PIXEL.WIDTH,
  height: ASPECT_RATIO.HEIGHT * DISPLAY_PIXEL.HEIGHT
}

// initialization all class
const titleScene = new TitleScene()
const gameScene = new GameScene()
const gameOver = new GameOver()

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 800 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}
const game = new Phaser.Game(config)

// load scene
game.scene.add('titleScene', titleScene)
game.scene.add('gameScene', gameScene)

// start game 
game.scene.start('titleScene')
