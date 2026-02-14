class Cube {

    constructor(translate = [0,0,0],
                scale = [1,1,1],
                rgba = [1,1,1,1],
                texColorWeight = 1) {

        this.translate = translate;
        this.scale = scale;
        this.rgba = rgba;
        this.texColorWeight = texColorWeight;

        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            console.log("Failed to create the buffer object");
            return false;
        }

        this.loadCube();
    }

    setCube(translate = [0,0,0],
            scale = [1,1,1],
            rgba = [1,1,1,1],
            texColorWeight = 1) {

        this.translate = translate;
        this.scale = scale;
        this.rgba = rgba;
        this.texColorWeight = texColorWeight;

        this.render();
    }

    loadCube()
    {
        const vertexUVBuffer = [];

        // front of cube
        vertexUVBuffer.push(0,0,0, 0,0, // xyz, uv
                            1,1,0, 1,1,
                            1,0,0, 1,0);
        vertexUVBuffer.push(0,0,0, 0,0,
                            0,1,0, 0,1,
                            1,1,0, 1,1);

        // top of cube
        vertexUVBuffer.push(0,1,0, 0,0,
                            1,1,0, 1,0,
                            0,1,1, 0,1 );
        vertexUVBuffer.push(1,1,0, 1,0,
                            0,1,1, 0,1,
                            1,1,1, 1,1 );

        // left side of cube
        vertexUVBuffer.push(0,0,0, 1,0,
                            0,1,0, 1,1,
                            0,0,1, 0,0 );
        vertexUVBuffer.push(0,1,1, 0,1,
                            0,1,0, 1,1,
                            0,0,1, 0,0 );

        // right side of cube
        vertexUVBuffer.push(1,0,0, 0,0,
                            1,1,0, 0,1,
                            1,0,1, 1,0 );
        vertexUVBuffer.push(1,1,1, 1,1,
                            1,1,0, 0,1,
                            1,0,1, 1,0 );

        // back of cube
        vertexUVBuffer.push(0,0,1, 1,0,
                            1,1,1, 0,1,
                            1,0,1, 0,0 );
        vertexUVBuffer.push(0,0,1, 1,0,
                            0,1,1, 1,1,
                            1,1,1, 0,1 );

        //  bottom of cube
        vertexUVBuffer.push(0,0,0, 0,1,
                            0,0,1, 0,0,
                            1,0,0, 1,1 );
        vertexUVBuffer.push(1,0,1, 1,0,
                            0,0,1,0,0,
                            1,0,0, 1,1 );

        // bind vertex and uv data to this.buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexUVBuffer), gl.STATIC_DRAW);

        const FSIZE = 4;

        // position
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
        gl.enableVertexAttribArray(a_Position);

        // uv
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
        gl.enableVertexAttribArray(a_UV);

    }

    render() {

        // model matrix
        const modelMat = new Matrix4();
        modelMat.translate(this.translate[0], this.translate[1], this.translate[2]); // center based on scale
        modelMat.scale(this.scale[0], this.scale[1], this.scale[2]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, modelMat.elements);

        // frag color
        gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);

        // tex color weight
        gl.uniform1f(u_TexColorWeight, this.texColorWeight);

        gl.drawArrays(gl.TRIANGLES, 0, 36);

    }
}
