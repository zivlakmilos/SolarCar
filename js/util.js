class Point {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get X() { return this.x; }
    set X(x) { this.x = x; }

    get Y() { return this.x; }
    set Y(y) { this.y = y; }

    get Z() { return this.x; }
    set Z(z) { this.z = z; }
}

class Camera {
    constructor(position, fieldOfView) {
        this.position = position;
        this.FieldOfView = fieldOfView;
    }

    get Position() { return this.position; }
    set Position(position) { this.position = position; }

    get FieldOfView() { return this.fieldOfView; }
    get Depth() { return this.depth; }
    set FieldOfView(fov) {
        this.fieldOfView = fov;
        this.depth = 1 / Math.tan((fov / 2) * Math.PI / 180);
    }
}

class Util {

    static polygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.lineTo(x1, y1);
        ctx.fill();
        ctx.closePath();
    }

    static polygon2(ctx, p1, p2, p3, p4, color) {
        Util.polygon(ctx, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, color);
    }

    static projection(point, camera, width, height) {
        var translate = new Point();
        translate.x = point.x - camera.position.x;
        translate.y = point.y - camera.position.y;
        translate.z = point.z - camera.position.z;

        var scale = camera.depth / translate.z;

        var projection = new Point();
        projection.x = translate.x * scale;
        projection.y = translate.y * scale;

        var scaled = new Point();
        scaled.x = width / 2 + projection.x * width / 2;
        scaled.y = height / 2 - projection.y * height / 2;

        return scaled;
    }
}
