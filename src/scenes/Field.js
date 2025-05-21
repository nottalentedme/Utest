import { Player } from './Player.js';

export class Field extends Phaser.Scene {
    constructor() {
        super('Field');
    }

    preload() {
        // Загрузка фонов
        this.load.image('field1', 'assets/Field/pole1.png');
        this.load.image('field2', 'assets/Field/pole2.png');
        this.load.image('field3', 'assets/Field/pole3.png');

        // Загрузка игрока
        this.load.image('player1', 'assets/Character/pers1.png');
        this.load.image('player2', 'assets/Character/pers2.png');
        this.load.image('player3', 'assets/Character/pers3.png');

        // Спрайт героя (необязательно, если не используется)
        this.load.spritesheet('hero', 'assets/pers.png', { frameWidth: 968, frameHeight: 968 });
    }

    create() {
        const { width, height } = this.scale;

        // Настройка анимации фона
        this.fieldFrames = ['field1', 'field2', 'field3'];
        this.currentFrameIndex = 0;

        this.background = this.add.image(width / 2, height / 2, this.fieldFrames[this.currentFrameIndex])
            .setDisplaySize(width, height)
            .setOrigin(0.5, 0.5);

        // Таймер смены фона
        this.time.addEvent({
            delay: 500, // миллисекунды между кадрами
            loop: true,
            callback: () => {
                this.currentFrameIndex = (this.currentFrameIndex + 1) % this.fieldFrames.length;
                this.background.setTexture(this.fieldFrames[this.currentFrameIndex]);
            }
        });

        // Создание игрока
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
        // Можно добавить дополнительную логику обновления
    }
}
