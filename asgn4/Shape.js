class Shape {

    //#region universal setup

    constructor(translate = [0,0,0],
                scale = [1,1,1],
                rgba = [1,1,1,1],
                texColorWeight = 1,
                rotation = 0,
                rotationAxis = [0,0,0]) {

        this.translate = translate;
        this.scale = scale;
        this.rgba = rgba;
        this.texColorWeight = texColorWeight;
        this.rotation = rotation;
        this.rotationAxis = rotationAxis;


        this.numVertices = 0;
    }

    setShape(translate = [0,0,0],
            scale = [1,1,1],
            rgba = [1,1,1,1],
            texColorWeight = 1,
            rotation = 0,
            rotationAxis = [0,0,0]) {

        this.translate = translate;
        this.scale = scale;
        this.rgba = rgba;
        this.texColorWeight = texColorWeight;
        this.rotation = rotation;
        this.rotationAxis = rotationAxis;

        this.render();
    }

    render() {

        // model matrix
        const modelMat = new Matrix4();
        modelMat.translate(this.translate[0], this.translate[1], this.translate[2]);
        if (this.rotation != 0) modelMat.setRotate(this.rotation, ...this.rotationAxis);
        modelMat.scale(this.scale[0], this.scale[1], this.scale[2]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, modelMat.elements);

        // frag color
        gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);

        // tex color weight
        gl.uniform1f(u_TexColorWeight, this.texColorWeight);

        gl.drawArrays(gl.TRIANGLES, 0, this.numVertices);

    }

    bindBuffer(vertices) {

        // bind vertex and uv data to this.buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        const FSIZE = 4;

        // position
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 8, 0);
        gl.enableVertexAttribArray(a_Position);

        // uv
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, FSIZE * 8, FSIZE * 3);
        gl.enableVertexAttribArray(a_UV);

        // normal
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, FSIZE * 8, FSIZE * 5);
        gl.enableVertexAttribArray(a_Normal);
    }

    //#endregion

    //#region unique shape setup

    loadCube()
    {
        const vertexBuffer = [];
        this.buffer = gl.createBuffer();

        // front of cube
        vertexBuffer.push(  0,0,0, 0,0, 0,0,1, // xyz, uv, normal
                            1,1,0, 1,1, 0,0,1,
                            1,0,0, 1,0, 0,0,1);
        vertexBuffer.push(  0,0,0, 0,0, 0,0,1,
                            0,1,0, 0,1, 0,0,1,
                            1,1,0, 1,1, 0,0,1);

        // top of cube
        vertexBuffer.push(  0,1,0, 0,0, 0,1,0,
                            1,1,0, 1,0, 0,1,0,
                            0,1,1, 0,1, 0,1,0);
        vertexBuffer.push(  1,1,0, 1,0, 0,1,0,
                            0,1,1, 0,1, 0,1,0,
                            1,1,1, 1,1, 0,1,0);

        // left side of cube
        vertexBuffer.push(  0,0,0, 1,0, -1,0,0,
                            0,1,0, 1,1, -1,0,0,
                            0,0,1, 0,0, -1,0,0);
        vertexBuffer.push(  0,1,1, 0,1, -1,0,0,
                            0,1,0, 1,1, -1,0,0,
                            0,0,1, 0,0, -1,0,0);

        // right side of cube
        vertexBuffer.push(  1,0,0, 0,0, 1,0,0,
                            1,1,0, 0,1, 1,0,0,
                            1,0,1, 1,0, 1,0,0);
        vertexBuffer.push(  1,1,1, 1,1, 1,0,0,
                            1,1,0, 0,1, 1,0,0,
                            1,0,1, 1,0, 1,0,0);

        // back of cube
        vertexBuffer.push(  0,0,1, 1,0, 0,0,-1,
                            1,1,1, 0,1, 0,0,-1,
                            1,0,1, 0,0, 0,0,-1);
        vertexBuffer.push(  0,0,1, 1,0, 0,0,-1,
                            0,1,1, 1,1, 0,0,-1,
                            1,1,1, 0,1, 0,0,-1);

        //  bottom of cube
        vertexBuffer.push(  0,0,0, 0,1, 0,-1,0,
                            0,0,1, 0,0, 0,-1,0,
                            1,0,0, 1,1, 0,-1,0);
        vertexBuffer.push(  1,0,1, 1,0, 0,-1,0,
                            0,0,1,0,0, 0,-1,0,
                            1,0,0, 1,1, 0,-1,0);

        this.numVertices = 36;
        this.bindBuffer(vertexBuffer);
    }

    loadSphere()
    {
        const vertexBuffer = [];
        this.buffer = gl.createBuffer();

        const pi = Math.PI;
        const twoPi = 2*pi;

        let d = pi/10;

        for (let t=0; t < pi; t+=d) {
            for (let r=0; r < (twoPi); r+=d) {
                
                // vertices
                let v1 = [sin(t)*cos(r), sin(t)*sin(r), cos(t)];
                let v2 = [sin(t+d)*cos(r), sin(t+d)*sin(r), cos(t+d)];
                let v3 = [sin(t)*cos(r+d), sin(t)*sin(r+d), cos(t)];
                let v4 = [sin(t+d)*cos(r+d), sin(t+d)*sin(r+d), cos(t+d)];

                // uv
                let uv1 = [t/pi, r/twoPi];
                let uv2 = [(t+d)/pi, r/twoPi];
                let uv3 = [t/pi, (r+d)/twoPi];
                let uv4 = [(t+d)/pi, (r+d)/twoPi];

                // triangle one
                vertexBuffer.push(...v1, ...uv1, ...v1);
                vertexBuffer.push(...v2, ...uv2, ...v2);
                vertexBuffer.push(...v4, ...uv4, ...v4);

                // triangle two
                vertexBuffer.push(...v1, ...uv1, ...v1);
                vertexBuffer.push(...v4, ...uv4, ...v4);
                vertexBuffer.push(...v3, ...uv3, ...v3);
            }
        }

        this.numVertices = 1200;
        this.bindBuffer(vertexBuffer);
    }

    //#endregion
}

function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
