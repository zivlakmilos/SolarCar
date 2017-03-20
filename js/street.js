class Segment {
    constructor(y, height, color) {
        this.y1 = y;
        this.height = height;
        this.y2 = this.y1 + this.y1 * this.height / 100.0;
        this.color = color;

        this.speed = 100.0;
    }

    get getY1() {
        return this.y1;
    }

    get getY2() {
        return this.y2;
    }

    update(canvas, tick) {
        this.y1 += this.speed * tick;
        this.x1 = 100.0 * (canvas.height - this.y1) / (canvas.height / 3.0);

        this.y2 = this.y1 + this.y1 * this.height / 250.0;
        this.x2 = 100.0 * (canvas.height - this.y2) / (canvas.height / 3.0);

        this.render(canvas);
    }

    render(canvas) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(canvas.width - this.x1, this.y1);
        ctx.lineTo(canvas.width - this.x2, this.y2);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x1, this.y1);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "#CC0000";
        ctx.moveTo(this.x1 - 25, this.y1);
        ctx.lineTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x2 - 25, this.y2);
        ctx.lineTo(this.x1 - 25, this.y1);
        ctx.fill();
        ctx.endPath();
    }
}

class Street {
    constructor() {
        this.segments = [];
        this.segmentColor = 0;

        //for(var i = 0; i < 10; i++) {
            //this.segments.push(new Segment(100 * i, 100));
        //}
        //this.segments.push(new Segment(100, 100));
    }

    update(canvas, tick) {
        if(this.segments.length < 1) {
            this.segments.push(new Segment(canvas.height / 3.0 + 25, 25, "#555555"));
        } else if(this.segments[this.segments.length - 1].getY2 > canvas.height / 3.0 + 100) {
            var color = "#555555";
            if(this.segmentColor > 0) {
                color = "#333333";
                this.segmentColor = 0
            } else {
                this.segmentColor++;
            }
            this.segments.push(new Segment(canvas.height / 3.0 + 50, 25, color));
        }

        for(var i = 0; i < this.segments.length; i++) {
            this.segments[i].update(canvas, tick);
            if(this.segments[i].getY1 > canvas.height)
                this.segments.splice(i--, 1);
        }
        //this.render(canvas);
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
