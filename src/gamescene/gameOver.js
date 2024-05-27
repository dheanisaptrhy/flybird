// import {ASPECT_RATIO, DISPLAY_PIXEL} from '..constanta.js'
export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' })
        this.goSceneBackground
        this.goSceneText
        this.goSceneTextStyle = {
            font: '70px impact',
            fill: '#ffffff',
            align: 'center'
        }
        this.startButton
    }

    init(data) {

    }

    preload() {
        this.load.image('goSceneBackground', '/assets/sprites/background-day.png')
        
    }

    create(data) {
        let { width, height } = this.sys.game.canvas
        this.goSceneBackground = this.add.image(0, 0, 'goSceneBackground').setScale(1.9)
        this.goSceneBackground.x = width / 2
        this.goSceneBackground.y = height / 2

        this.goSceneText = this.add.text(width / 2, (height / 2) - 100, "Flappy Bird", this.titleSceneTextStyle).setOrigin(0.5)

        this.startButton = this.add.sprite(width / 2, height / 2, 'startButton').setScale(0.5)
        this.startButton.setInteractive({ useHandCursor: true })
        this.startButton.on('pointerdown', ()=> this.clickButton())
    }
    update() {

    }

    clickButton(){
        this.scene.start('gameScene')
    }
}