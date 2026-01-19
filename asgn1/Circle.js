class Circle {

    constructor(xy, rgba, size, segments) {
        console.log("make circle");
        this.xy = xy;
        this.rgba = rgba;
        this.size = size;
        this.segments = segments;
    }

    render() {

        //Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size, this.size);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);

        var d = this.size / 200; // delta
        var angleStep = 360.0/this.segments;

        for (var angle = 0; angle < 360; angle += angleStep) {
            let centerPt = [this.xy[0], this.xy[1]];
            let angle1 = angle;
            let angle2 = angle+angleStep;
            let vec1 = [Math.cos(angle1*Math.PI/180)*d, Math.sin(angle1*Math.PI/180)*d];
            let vec2 = [Math.cos(angle2*Math.PI/180)*d, Math.sin(angle2*Math.PI/180)*d];
            let p1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
            let p2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];

            drawTriangle([this.xy[0], this.xy[1], p1[0], p1[1], p2[0], p2[1]]);
        }
    }
}