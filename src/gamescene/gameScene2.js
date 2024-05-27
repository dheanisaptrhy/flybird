import { ASPECT_RATIO, DISPLAY_PIXEL, DISPLAY } from '../constanta.js'

const PIPE_OFFSET = 100;
const PIPE_GATE = 50
const PIPE_ID = 'PIPE'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' })
        this.player
        this.background
        this.ground
        this.cursor
        this.pipe
        this.pipeGroup
        this.gameover = false
        this.birdFly
        this.birdFall
        this.pointSound
        this.coin = 0
        this.textCoin
        this.gameStart = false
    }

    preload() {
        // images
        this.load.image('background', '/assets/sprites/background-day.png')
        this.load.image('player', '/assets/sprites/bluebird-midflap.png')
        this.load.image('pipe', '/assets/sprites/pipe-green.png')
        this.load.image('ground', '/assets/sprites/base.png')
        // texts
        // this.load.bitmapFont('flappy', '/assets/sprites/flappy.png', '/assets/sprites/flappy.xml' )

        // sounds
        this.load.audio('wing', '/assets/audio/wing.wav')
        this.load.audio('point', '/assets/audio/point.wav')
        this.load.audio('hit', '/assets/audio/hit.wav')

    }

    create(data) {
        let { width, height } = this.sys.game.canvas
        // background
        this.background = this.add.tileSprite(0, 0, 288, 512, 'background').setScale(2)
        this.background.x = width / 2
        this.background.y = height / 2
        this.background.setInteractive()

        // ground
        this.ground = this.add.tileSprite(0, height - 50, width, 100, 'ground').setOrigin(0, 0)

        // player
        this.player = this.physics.add.sprite(50, height / 2, 'player').setScale(1.2)
        this.player.body.allowGravity = false; //dibuat ga jatuh pas pertama kali
        this.player.setInteractive()
        this.player.setCollideWorldBounds(true);

        // Pipe
        this.pipeGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })
        this.physics.add.collider(
            this.player, this.pipeGroup, this.onCollde, null, this
        )

        // adding sound
        this.birdFly = this.sound.add("wing")
        this.birdFall = this.sound.add("hit")
        this.pointSound = this.sound.add("point")

        // score
        // this.textCoin = this.add.bitmapText(10, 10, 'flappy', this.coin, 32)
        // this.textCoin.letterSpacing = 1
        // this.textCoin.depth = 1

    }
    update() {
        if (!this.gameover) {
            this.background.tilePositionX += 2
            this.ground.tilePositionX += 20

            this.pipeGroup.children.each((pipe) => {
                pipe.x -= 10
                if (pipe.x < -32) {
                    this.pipeGroup.remove(pipe, true, true)
                    if (pipe.name === PIPE_ID) {
                        // this.coin += 1
                        // this.textCoin.text = this.coin
                        this.pointSound.play()
                    }
                }
            })
            if (this.player.y > this.ground.y) {
                this.gameOver()
                this.pipeGroup.destroy()
            }
        }
    }

    onCollde() {
        this.gameOver()
        this.player.body.allowGravity = false;
        this.gameStart = false
    }

    startGame() {
        if (!this.gameStart) {
            this.gameStart = true
            this.background.on('pointerdown', this.jump, this)
            // respawn pipe
            this.time.addEvent({
                delay: 800,
                callback: this.onPipeTimer,
                callbackScope: this,
                loop: true
            })
            this.onPipeTimer()

        }
    }
    jump() {
        this.player.setVelocityY(-400)
        this.player.body.allowGravity = true;
        this.birdFly.play()
    }

    addPipe(width, height) {
        const offSet = Phaser.Math.Between(-PIPE_OFFSET * 2, PIPE_OFFSET * 2)
        const topPipe = this.physics.add.sprite(width, 0 + offSet - PIPE_GATE, 'pipe')
        topPipe.flipX = true
        topPipe.setRotation(Phaser.Math.DegToRad(180))
        const bottomPipe = this.physics.add.sprite(width, height + offSet + PIPE_GATE, 'pipe')
        bottomPipe.name = PIPE_ID
        this.pipeGroup.add(topPipe)
        this.pipeGroup.add(bottomPipe)
    }

    onPipeTimer() {
        this.addPipe(DISPLAY.WIDTH, DISPLAY.HEIGHT)
    }

    gameOver() {
        this.birdFall.play()
        this.background.disableInteractive()
        this.gameover = true
        this.pipeGroup.destroy()

    }
}