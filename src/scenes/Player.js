export class Player {
    constructor(scene, x, y, textureFrames) {
        this.scene = scene;
        this.frames = textureFrames; // массив строк с ключами текстур, например ['player1', 'player2', 'player3']
        this.currentFrameIndex = 0;

        this.sprite = scene.add.sprite(x, y, this.frames[0]);
        this.sprite.setScale(0.5);

        this.animationTimer = null;
    }

    startWalkingAnimation() {
        if (this.animationTimer) return; // если анимация уже запущена — не запускаем

        this.animationTimer = this.scene.time.addEvent({
            delay: 150, // меняем кадр каждые 150 мс
            callback: () => {
                this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
                this.sprite.setTexture(this.frames[this.currentFrameIndex]);
            },
            loop: true,
        });
    }

    stopWalkingAnimation() {
        if (this.animationTimer) {
            this.animationTimer.remove();
            this.animationTimer = null;
        }
        this.currentFrameIndex = 0;
        this.sprite.setTexture(this.frames[0]); // возвращаем первый кадр (стоя)
    }

    move(pixels) {
        this.startWalkingAnimation();

        this.scene.tweens.add({
            targets: this.sprite,
            x: this.sprite.x + pixels,
            y: this.sprite.y - pixels / 2,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.stopWalkingAnimation();
            }
        });
    }
}
