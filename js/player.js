class Player {
    constructor(x, y, width, height, sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;

        this.velX = 0.0;
        this.velY = 0.0;
    }

    get getX() {
        return this.x;
    }

    set setX(x) {
        this.x = x;
    }

    get getY() {
        return this.y;
    }

    set setY(y) {
        this.y = y;
    }

    get getWidth() {
        return this.width;
    }

    set setWidth(width) {
        this.width = width;
    }

    get getHeight() {
        return this.height;
    }

    set setHeight(height) {
        this.height = height;
    }

    update(canvas, tick) {
        this.render(canvas);
    }

    render(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.drawImage(this.sprite,
                      this.sprite.width / 3, 0, this.sprite.width / 3, this.sprite.height,
                      this.x, this.y, this.width, this.height);
    }
}
