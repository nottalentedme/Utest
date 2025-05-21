import { Player } from './Player.js'

export class HighFlag extends Phaser.Scene {
    constructor() {
        super('HighFlag');
    }

    preload() {
        this.load.image('player1', 'assets/Character/pers1.png');
        this.load.image('player2', 'assets/Character/pers2.png');
        this.load.image('player3', 'assets/Character/pers3.png');

        this.load.image('verh', 'assets/verh.png');
        this.load.spritesheet('hero', 'assets/pers.png', { frameWidth: 968, frameHeight: 968 });
    }

    create() {
        const { width, height } = this.scale;

        this.background = this.add.image(width / 2, height / 2, 'verh')
            .setDisplaySize(width, height)
            .setOrigin(0.5, 0.5);

        this.player = new Player(this, 150, 850, ['player1', 'player2', 'player3']);
    }

    moveHero(pixels = 300) {
        this.player.move(pixels);

        // Проверка выхода за границы после движения
        this.time.delayedCall(1100, () => {
            this.checkPlayerBounds();
        });
    }

    checkPlayerBounds() {
        const sprite = this.player?.sprite;
        if (!sprite) return;

        const padding = 50;
        if (
            sprite.x < -padding ||
            sprite.x > this.scale.width + padding ||
            sprite.y < -padding ||
            sprite.y > this.scale.height + padding
        ) {
            alert('😞 Джэк потерял мотивацию и ушёл в закат...\n\nПопробуйте начать заново!');
            location.reload(); // можно заменить на собственный перезапуск без перезагрузки
        }
    }



    update() {

    }
}
