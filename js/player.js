class Player extends Sprite {
    constructor(x, y, width, height, sprite) {
        super(x, y, width, height, sprite);

        this.velX = 0.0;
        this.velY = 0.0;
    }

    update(canvas, tick) {
        super.render(canvas);
    }
}
