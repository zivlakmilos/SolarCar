class Game {
    constructor(canvas) {
        this.canvas = canvas;
    }

    update(tick) {
        var ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(20, 40, 50, 50);
        ctx.fillSyle ="#000000";
        ctx.fill();
        ctx.closePath();
    }
}
