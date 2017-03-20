class Line {
    constructor(z, color) {
        this.ddz = 4;
        this.dz = 20;
        this.z = z;
        this.roadLength = 250.0;

        this.color = color;
    }

    get getZ() {
        return this.z;
    }

    update(canvas, tick) {
        this.dz -= this.ddz * tick;
        //this.dz = 4;
        this.z -= this.dz;

        this.render(canvas);
    }

    render(canvas) {
        var ctx = canvas.getContext("2d");

        if(this.z < 0)
            return;

        var scale1 = 1.0 / this.z;
        var y1 = canvas.height * scale1;
        y1 = (canvas.height / 2) - (canvas.height / 2) * y1;
        var x1 = (canvas.width + 25.0) * scale1;
        x1 = (canvas.width / 2) + (canvas.width / 2) * x1;

        var scale2 = 1.0 / (this.z + this.roadLength);
        var y2 = canvas.height * scale2;
        y2 = (canvas.height / 2) - (canvas.height / 2) * y2;
        var x2 = (canvas.width + 25.0) * scale2;
        x2 = (canvas.width / 2) + (canvas.width / 2) * x2;

        y1 = canvas.height - y1;
        y2 = canvas.height - y2;

        ctx.beginPath();
        if(this.color > 0)
            ctx.fillStyle = "#FF0000";
        else
            ctx.fillStyle = "#FFFFFF"
        ctx.moveTo(x1, y1);
        ctx.lineTo(canvas.width - x1, y1);
        ctx.lineTo(canvas.width - x2, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.fill();
        ctx.closePath();

        var scale1 = 1.0 / this.z;
        var y1 = canvas.height * scale1;
        y1 = (canvas.height / 2) - (canvas.height / 2) * y1;
        var x1 = canvas.width * scale1;
        x1 = (canvas.width / 2) + (canvas.width / 2) * x1;

        var scale2 = 1.0 / (this.z + this.roadLength);
        var y2 = canvas.height * scale2;
        y2 = (canvas.height / 2) - (canvas.height / 2) * y2;
        var x2 = canvas.width * scale2;
        x2 = (canvas.width / 2) + (canvas.width / 2) * x2;

        y1 = canvas.height - y1;
        y2 = canvas.height - y2;

        ctx.beginPath();
        if(this.color > 0)
            ctx.fillStyle = "#939393";
        else
            ctx.fillStyle = "#858585"
        ctx.moveTo(x1, y1);
        ctx.lineTo(canvas.width - x1, y1);
        ctx.lineTo(canvas.width - x2, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.fill();
        ctx.closePath();
    }
}

class Street {
    constructor() {
        this.segments = [];
        this.segmentColor = 0;
    }

    update(canvas, tick) {
        if(this.segments.length < 1) {
            this.segments.push(new Line(2000.0, this.segmentColor));
            this.segmentColor++;
        } else if(this.segments[this.segments.length - 1].getZ < 1750) {
            this.segments.push(new Line(2000.0, this.segmentColor));

            if(this.segmentColor > 0)
                this.segmentColor = 0;
            else
                this.segmentColor++;
        }

        for(var i = 0; i < this.segments.length; i++) {
            this.segments[i].update(canvas, tick);
            if(this.segments[i].getZ < 1)
                this.segments.splice(i--, 1);
        }
    }

    render(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "#555555";
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width - 200, 2 * canvas.height / 3);
        ctx.lineTo(200, 2 * canvas.height / 3);
        ctx.lineTo(0, canvas.height);
        ctx.fill();
        ctx.closePath();
    }
}
