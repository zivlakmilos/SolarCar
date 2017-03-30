class Line {
    constructor(x, y, z, index) {
        this.worldP1 = new Point(x, y, z);
        this.worldP2 = new Point(x, y, z + Line.segmentLength());
        this.screenP1 = new Point();            // Calculate later
        this.screenP2 = new Point();            // Calculate later
        this.screenW1 = 0;                      // Calculate later
        this.screenW2 = 0;                      // Calculate later
        this.sprite = null;                     // Load later
        this.spriteX = 0;                       // Calculate later
        this.index = index;

        this.colorGrass = index % 2 ? "#008f00" : "#026b02";
        this.colorRubmle = index % 2 ? "#FF0000" : "#FFFFFF";
        this.colorRoad = index % 2 ? "#939393" : "#858585";
    }

    static segmentLength() {
        return 200.0;
    }

    static roadWidth() {
        return 1000.0;
    }

    projection(camera, canvas) {
        this.screenP1 = Util.projection(this.worldP1, camera, canvas.width, canvas.height);
        this.screenP2 = Util.projection(this.worldP2, camera, canvas.width, canvas.height);

        var scale = camera.depth / (this.worldP1.z - camera.position.z);
        this.screenW1 = scale * Line.roadWidth() * canvas.width / 2;
        scale = camera.depth / (this.worldP2.z - camera.position.z);
        this.screenW2 = scale * Line.roadWidth() * canvas.width / 2;
    }

    update(camera, canvas, tick, player) {
        if(this.worldP1.z < camera.position.z || this.worldP1.z - camera.position.z > 5000.0) {
            this.sprite = null;
            return true;
        }

        this.projection(camera, canvas);
        this.render(canvas);

        if(this.index % 10 == 0) {
            if(this.sprite == null) {
                this.sprite = document.getElementById("imgCloud");
                var scale = camera.depth / (this.worldP1.z - camera.position.z);
                this.spriteX = Util.randomRange(0.0, 3.0) - 2.0;
            }

            return this.renderSprite(camera, canvas, player);
        } else if(this.index % 5 == 0) {
            if(this.sprite == null) {
                this.sprite = document.getElementById("imgSun");
                var scale = camera.depth / (this.worldP1.z - camera.position.z);
                this.spriteX = Util.randomRange(0.0, 3.0) - 2.0;
            }

            return this.renderSprite(camera, canvas, player);
        }
        return true;
    }

    render(canvas) {
        var ctx = canvas.getContext("2d");

        var p1 = new Point(this.screenP1.x, this.screenP1.y, this.screenP1.z);
        var p2 = new Point(this.screenP1.x, this.screenP1.y, this.screenP1.z);
        var p3 = new Point(this.screenP2.x, this.screenP2.y, this.screenP2.z);
        var p4 = new Point(this.screenP2.x, this.screenP2.y, this.screenP2.z);

        p1.x -= this.screenW1;
        p2.x += this.screenW1;
        p3.x += this.screenW2;
        p4.x -= this.screenW2;

        Util.polygon(ctx, 0, p1.y, ctx.canvas.width, p2.y,
                          ctx.canvas.width, p3.y, 0, p4.y, this.colorGrass);
        Util.polygon2(ctx, p1, p2, p3, p4, this.colorRoad);
    }

    renderSprite(camera, canvas, player) {
        var ctx = canvas.getContext("2d");

        var scale = camera.depth / (this.worldP1.z - camera.position.z);
        var x = this.screenP1.x + scale * this.spriteX * canvas.width / 2;
        var y = this.screenP1.y;
        var width = 200.0 * this.screenW1 / canvas.width;
        var height = 200.0 * this.screenW1 / canvas.width;

        x += width * this.spriteX;
        y -= height;

        ctx.drawImage(this.sprite,
                      0, 0, this.sprite.width, this.sprite.height,
                      x, y, width, height);

        if(player.collision(x, y, width, height)) {
            if(this.index % 10 == 0)
                return false;
            player.score++;
            this.spriteX = -1000;
        }

        return true;
    }
}

class Street {
    constructor() {
        this.segments = [];

        for(var i = 0; i < 100; i++)
            this.segments.push(new Line(0, 0, i * Line.segmentLength(), i));
    }

    cameraLimit(camera) {
        if(camera.position.z >= 50 * Line.segmentLength()) {
            var oldPos = camera.position.z / Line.segmentLength();
            camera.position.z -= 50 * Line.segmentLength();
            var newPos = camera.position.z / Line.segmentLength();

            var dif = oldPos - newPos;
            for(var i = 0; i < this.segments.length - dif; i++) {
                this.segments[i].sprite = this.segments[i + dif].sprite;
                this.segments[i].spriteX = this.segments[i + dif].spriteX;
            }
        }
    }

    update(camera, canvas, tick, player) {
        this.renderBackground(canvas);

        for(var i = 0; i < this.segments.length; i++)
            if(!this.segments[this.segments.length - i - 1].update(camera, canvas, tick, player))
                return false;
        return true;
    }

    renderBackground(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "#51a6fe";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.closePath();
    }
}
