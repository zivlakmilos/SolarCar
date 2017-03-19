class Sprite {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
    }

    render(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.drawImage(this.img,
                      0, 0, this.img.width, this.img.height,
                      this.x, this.x, this.width, this.height);
    }
}
