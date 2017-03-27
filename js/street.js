class Line {
    constructor(x, y, z, even) {
        this.worldP1 = new Point(x, y, z);
        this.worldP2 = new Point(x, y, z + Line.segmentLength());
        this.screenP1 = new Point();            // Calculate later
        this.screenP2 = new Point();            // Calculate later
        this.screenW1 = 0;                      // Calculate later
        this.screenW2 = 0;                      // Calculate later

        this.colorGrass = even ? "#008f00" : "#026b02";
        this.colorRubmle = even ? "#FF0000" : "#FFFFFF";
        this.colorRoad = even ? "#939393" : "#858585";
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

    update(camera, canvas, tick) {
        if(this.worldP1.z < camera.position.z)
            return;

        this.projection(camera, canvas);
        this.render(canvas);
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
}

class Street {
    constructor() {
        this.segments = [];
        this.segmentColor = 0;

        for(var i = 0; i < 100; i++)
            this.segments.push(new Line(0, 0, i * Line.segmentLength(), i % 2));
    }

    update(camera, canvas, tick) {
        for(var i = 0; i < this.segments.length; i++)
            this.segments[i].update(camera, canvas, tick);
    }

    renderBackground(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "#007dff";
        ctx.rect(0, 0, canvas.width, canvas.height * 7.5 / 12);
        ctx.fill();
        ctx.closePath();
    }
}
