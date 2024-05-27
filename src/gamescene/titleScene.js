// import {ASPECT_RATIO, DISPLAY_PIXEL} from '..constanta.js'
export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' })
        this.titleSceneBackground
        this.titleSceneText
        this.titleSceneTextStyle = {
            font: '70px impact',
            fill: '#ffffff',
            align: 'center'
        }
        this.startButton
    }

    init(data) {

    }

    preload() {
        this.load.image('titleSceneBackground', '/assets/sprites/background-day.png')
        this.load.image('startButton', '/assets/sprites/start.png')
        console.log("titlescene")
    }

    create(data) {
        let { width, height } = this.sys.game.canvas
        this.titleSceneBackground = this.add.image(0, 0, 'titleSceneBackground').setScale(1.9)
        this.titleSceneBackground.x = width / 2
        this.titleSceneBackground.y = height / 2

        this.titleSceneText = this.add.text(width / 2, (height / 2) - 100, "Flappy Bird", this.titleSceneTextStyle).setOrigin(0.5)

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