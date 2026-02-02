class LambHead extends Cube {
    constructor() {
        super();
    }

    render() {
        
        const transMat = new Matrix4(this.matrix);

        transMat.translate(this.scale[0]*-.5 + this.translate[0], this.scale[1]*-.5 + this.translate[1], this.scale[2]*-.5 + this.translate[2]); // center based on scale
        transMat.rotate(this.rot, this.rotAxis[0], this.rotAxis[1], this.rotAxis[2]);
        transMat.scale(this.scale[0], this.scale[1], this.scale[2]);

        this.drawLambHead(transMat);
    }

    drawLambHead(transMat) {

        // pass in color
        gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);

        //pass the matrix to u_ModelMatrix
        gl.uniformMatrix4fv(u_ModelMatrix, false, transMat.elements);
    
        // front of head
        drawTriangle3D( [0.0,0.0,0.0, -.5,1.0,0.2, 0.0,2.0,0.0 ]);
        drawTriangle3D( [0.0,0.0,0.0, 1.0,0.0,0.0, 0.0,2.0,0.0 ]);
        drawTriangle3D( [1.0,2.0,0.0, 1.0,0.0,0.0, 0.0,2.0,0.0 ]);
        drawTriangle3D( [1.0,0.0,0.0, 1.8,0.5,0.3, 1.0,0.8,0.0 ]);
        drawTriangle3D( [1.8,0.9,0.3, 1.8,0.5,0.3, 1.0,0.8,0.0 ]);
        drawTriangle3D( [1.8,0.9,0.3, 1.0,2.0,0.0, 1.0,0.8,0.0 ]);

        // front top
        drawTriangle3D( [1.8,0.9,0.3, 1.0,2.0,0.0, 1.8,0.9,0.7 ]);
        drawTriangle3D( [1.0,2.0,1.0, 1.0,2.0,0.0, 1.8,0.9,0.7 ]);

        // top
        drawTriangle3D( [0.0,2.0,0.0, 1.0,2.0,0.0, 0.0,2.0,1.0 ]);
        drawTriangle3D( [1.0,2.0,1.0, 1.0,2.0,0.0, 0.0,2.0,1.0 ]);

        // back top
        drawTriangle3D( [0.0,2.0,0.0, -.5,1.0,0.2, 0.0,2.0,1.0 ]);
        drawTriangle3D( [-.5,1.0,0.8, -.5,1.0,0.2, 0.0,2.0,1.0 ]);

        // draw other faces slightly darker
        gl.uniform4f(u_FragColor, this.rgba[0]*.9, this.rgba[1]*.9, this.rgba[2]*.9, this.rgba[3]);

        // chin
        drawTriangle3D( [1.8,0.5,0.7, 1.8,0.5,0.3, 1.8,0.9,0.3 ]);
        drawTriangle3D( [1.8,0.5,0.7, 1.8,0.9,0.7, 1.8,0.9,0.3 ]);

        // bottom back
        drawTriangle3D( [0.0,0.0,0.0, 0.0,0.0,1.0, -.5,1.0,0.2 ]);
        drawTriangle3D( [-.5,1.0,0.8, 0.0,0.0,1.0, -.5,1.0,0.2 ]);

        // draw bottom and back faces EVEN darker
        gl.uniform4f(u_FragColor, this.rgba[0]*.8, this.rgba[1]*.8, this.rgba[2]*.8, this.rgba[3]);
        
        // under chin
        drawTriangle3D( [1.0,0.0,0.0, 1.8,0.5,0.3, 1.0,0.0,1.0 ]);
        drawTriangle3D( [1.8,0.5,0.7, 1.8,0.5,0.3, 1.0,0.0,1.0 ]);

        // back of head
        drawTriangle3D( [0.0,0.0,1.0, -.5,1.0,0.8, 0.0,2.0,1.0 ]);
        drawTriangle3D( [0.0,0.0,1.0, 1.0,0.0,1.0, 0.0,2.0,1.0 ]);
        drawTriangle3D( [1.0,2.0,1.0, 1.0,0.0,1.0, 0.0,2.0,1.0 ]);
        drawTriangle3D( [1.0,0.0,1.0, 1.8,0.5,0.7, 1.0,0.8,1.0 ]);
        drawTriangle3D( [1.8,0.9,0.7, 1.8,0.5,0.7, 1.0,0.8,1.0 ]);
        drawTriangle3D( [1.8,0.9,0.7, 1.0,2.0,1.0, 1.0,0.8,1.0 ]);

        // bottom of head
        drawTriangle3D( [0.0,0.0,0.0, 0.0,0.0,1.0, 0.0,0.0,1.0 ]);
        drawTriangle3D( [1.0,0.0,1.0, 0.0,0.0,1.0, 0.0,0.0,1.0 ]);

    }
}