class Cube {

    constructor() {
        this.rgba = [1,1,1,1];
        this.matrix = new Matrix4();
        this.scale = [1,1,1];
        this.translate = [0,0,0];
        this.rotAxis = [0,0,1];
        this.rot = 0;
    }

    setScale(x, y, z) {
        this.scale = [x,y,z];
    }

    setTranslate(x, y, z) {
        this.translate = [x,y,z];
    }

    setRotation(degrees, x, y, z) {
        this.rot = degrees;
        this.rotAxis = [x,y,z];
    }

    getTranslatedMatrix() {
        const transMat = new Matrix4(this.matrix);
        transMat.translate(this.scale[0]*-.5 + this.translate[0], this.scale[1]*-.5 + this.translate[1], this.scale[2]*-.5 + this.translate[2]); // center based on scale
        transMat.rotate(this.rot, this.rotAxis[0], this.rotAxis[1], this.rotAxis[2]);
        return transMat;
    }

    render() {

        const transMat = new Matrix4(this.matrix);

        transMat.translate(this.scale[0]*-.5 + this.translate[0], this.scale[1]*-.5 + this.translate[1], this.scale[2]*-.5 + this.translate[2]); // center based on scale
        transMat.rotate(this.rot, this.rotAxis[0], this.rotAxis[1], this.rotAxis[2]);
        transMat.scale(this.scale[0], this.scale[1], this.scale[2]);

        this.drawCube(transMat);
    }

    drawCube(transMat) {
        // pass in color
        
        //gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);

        //pass the matrix to u_ModelMatrix
        gl.uniformMatrix4fv(u_ModelMatrix, false, transMat.elements);
    
        // front of cube
        drawTriangle3D( [ 0,0,0, 1,1,0, 1,0,0 ], [ 0,0, 1,1, 1,0 ]);
        drawTriangle3D( [ 0,0,0, 0,1,0, 1,1,0 ], [ 0,0, 0,1, 1,1 ] );

        // // top of cube
        // drawTriangle3D( [ 0,1,0, 1,1,0, 0,1,1 ]);
        // drawTriangle3D( [ 1,1,0, 0,1,1, 1,1,1 ]);

        // // left side of cube
        // drawTriangle3D( [ 0,0,0, 0,1,0, 0,0,1 ]);
        // drawTriangle3D( [ 0,1,1, 0,1,0, 0,0,1 ]);

        // // right side of cube
        // drawTriangle3D( [ 1,0,0, 1,1,0, 1,0,1 ]);
        // drawTriangle3D( [ 1,1,1, 1,1,0, 1,0,1 ]);

        // // back of cube
        // drawTriangle3D( [ 0,0,1, 1,1,1, 1,0,1 ]);
        // drawTriangle3D( [ 0,0,1, 0,1,1, 1,1,1 ]);


        // // bottom of cube
        // drawTriangle3D( [ 0,0,0, 0,0,1, 1,0,0 ]);
        // drawTriangle3D( [ 1,0,1, 0,0,1, 1,0,0 ]);

    }
}

function drawTriangle3D(vertices, uv) {

    //position
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the vertex buffer object');
        return -1;
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    //uv
    // Create a buffer object
    var uvBuffer = gl.createBuffer();
    if (!uvBuffer) {
        console.log('Failed to create the uv buffer object');
        return -1;
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
    
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_UV);


    //loadTexture();

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
