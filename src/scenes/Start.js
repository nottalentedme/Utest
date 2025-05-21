
export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }
    preload() {
        this.load.image('start', 'assets/start.png');
        this.load.image('startButton', 'assets/pers.png');
        this.load.spritesheet('hero', 'assets/pers.png', { frameWidth: 968, frameHeight: 968 });

    }
    create() {
        const { width, height } = this.scale;

        // Добавляем фоновое изображение по центру и растягиваем его под размер экрана
        this.background = this.add.image(width / 2, height / 2, 'start')
            .setDisplaySize(width, height)
            .setOrigin(0.5, 0.5);

        const button = this.add.image(width / 2, height * 0.8, 'startButton')
            .setInteractive({ useHandCursor: true })
            .setScale(0.5); // можешь изменить масштаб

        // Обработчик клика
        button.on('pointerdown', () => {
            this.scene.start('Field'); // Переход на сцену Field
        });
        
    }

    update() {
        this.background.tilePositionX += 0;
    }
}