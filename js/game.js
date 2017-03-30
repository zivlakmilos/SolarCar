class Game {
    constructor(canvas) {
        this.canvas = canvas;

        this.camera = new Camera(new Point(0, 1000, 0), 100);
        this.state = Game.StateStartScreen;

        var playerSprite = document.getElementById("imgPlayer");
        this.player = new Player(canvas.width / 2 - 25,
                                 canvas.height - 55,
                                 75, 50, playerSprite);
        this.street = new Street();

        this.time = new Date().getTime();
    }

    static get StateGame() { return 0; }
    static get StateGameOver() { return 1; }
    static get StateStartScreen() { return 2; }

    keyDown(key) {
        if(this.state == Game.StateStartScreen || this.state == Game.StateGameOver) {
            if(key == 32) {         // Space
                this.player.score = 0;
                this.camera.z = 0;
                this.state = this.StateGame;
                return;
            }
        }

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
        if(this.state == Game.StateGameOver) {
            var ctx = this.canvas.getContext("2d");

            ctx.fillStyle = "#00b2ff";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "30px Arial";
            ctx.fillText(this.player.score, this.canvas.width / 2, this.canvas.height / 2);
            ctx.fillText("Press space to play again", this.canvas.width - 370, this.canvas.height - 25);
            return;
        }

        if(this.state == Game.StateStartScreen) {
            var ctx = this.canvas.getContext("2d");

            ctx.fillStyle = "#00b2ff";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "30px Arial";
            ctx.fillText(this.player.score, this.canvas.width / 2, this.canvas.height / 2);
            var img = document.getElementById("imgSun");
            ctx.drawImage(img, 0, 0, img.width, img.height,
                               this.canvas.width / 2 - img.width / 4, this.canvas.height / 2 - img.height / 4,
                               img.width / 2, img.height / 2);
            ctx.fillText("Press space to play again", this.canvas.width - 370, this.canvas.height - 25);
            return;
        }

        var date = new Date();
        var tick = (date.getTime() - this.time) / 1000.0;
        this.time = date.getTime();

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.camera.position.z += tick * 1500.0;
        this.street.cameraLimit(this.camera, 50);

        if(!this.street.update(this.camera, canvas, tick, this.player)) {
            this.state = Game.StateGameOver;
        }
        this.player.update(this.camera, canvas, tick);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Arial";
        ctx.fillText(this.player.score, 10, 30);
    }
}
