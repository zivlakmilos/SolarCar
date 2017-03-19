class Game {
    constructor(canvas) {
        this.canvas = canvas;

        var playerSprite = document.getElementById("imgPlayer");
        this.player = new Player(10, 10, 100, 100, playerSprite);
    }

    update(tick) {
        this.player.update(canvas, tick);
    }
}
