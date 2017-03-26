class Game {
    constructor(canvas) {
        this.canvas = canvas;

        this.camera = new Camera(new Point(0, 500, 0), 100);

        var playerSprite = document.getElementById("imgPlayer");
        this.player = new Player(canvas.width / 2 - 25,
                                 canvas.height - 55,
                                 75, 50, playerSprite);
        this.street = new Street();

        this.time = new Date().getTime();
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

    update() {
        var date = new Date();
        var tick = (date.getTime() - this.time) / 1000.0;
        this.time = date.getTime();

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.street.update(this.camera, canvas, tick);
        this.player.update(this.camera, canvas, tick);
    }
}
