class Cube {

    constructor(rgba) {
        this.rgba = rgba;
        this.matrix = new Matrix4();
    }

    render() {

        // pass in color
        gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);
    
        // front of cube
        drawTriangle3D( [0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
        drawTriangle3D( [0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
    }
}