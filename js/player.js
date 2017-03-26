class Player {
    constructor(x, y, width, height, sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;

        this.speed = 100.0;
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

    right(isDown) {
        if(isDown)
            this.velX += this.speed;
        else
            this.velX -= this.speed;
        this.normalizeSpeed();
    }

    left(isDown) {
        if(isDown)
            this.velX -= this.speed;
        else
            this.velX += this.speed;
        this.normalizeSpeed();
    }

    normalizeSpeed() {
        if(this.velX > this.speed)
            this.velX = this.speed;
        if(this.velX < -this.speed)
            this.velX = -this.speed;
    }

    update(camera, canvas, tick) {
        this.x += this.velX * tick;

        if(this.x < 0)
            this.x = 0;
        else if(this.x > canvas.width - this.width)
            this.x = canvas.width - this.width;

        this.render(canvas);
    }

    render(canvas) {
        var ctx = canvas.getContext("2d");

        var spriteX = this.velX > 0 ? 2 : 1;
        spriteX = this.velX < 0 ? 0 : spriteX;
        spriteX = spriteX * this.sprite.width / 3;
        ctx.drawImage(this.sprite,
                      spriteX, 0, this.sprite.width / 3, this.sprite.height,
                      this.x, this.y, this.width, this.height);
    }
}
