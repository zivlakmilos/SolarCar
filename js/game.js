class Game {
    constructor(canvas) {
        this.canvas = canvas;

        var playerSprite = document.getElementById("imgPlayer");
        this.player = new Player(canvas.width / 2 - 25,
                                 canvas.height - 55,
                                 75, 50, playerSprite);
    }

    keyDown(key) {
        switch(key) {
        case 37:        // Left
            this.player.left(true);
            break;
        case 38:        // Up
            break;
        case 39:        // Right
            this.player.right(true);
            break;
        case 40:        // Down
            break;
        }
    }

    keyUp(key) {
        switch(key) {
        case 37:        // Left
            this.player.left(false);
            break;
        case 38:        // Up
            break;
        case 39:        // Right
            this.player.right(false);
            break;
        case 40:        // Down
            break;
        }
    }

    update(tick) {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.update(canvas, tick);
    }
}
