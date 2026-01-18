class Triangle {

    constructor(xy, rgba, size) {

        this.rgba = rgba;
        this.xy = xy;
        this.size = size;
    }

    render() {

        //Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size, this.size);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);

        var d = this.size / 200; // delta
        drawTriangle([this.xy[0] - d, this.xy[1], this.xy[0]+d, this.xy[1], this.xy[0], this.xy[1] + d * 2]);

        console.log("draw triangle!!!");
    }
}

function drawTriangle(vertices) {
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}