class Sphere {

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

        //this.loadSphere();
    }

    setSphere(translate = [0,0,0],
            scale = [1,1,1],
            rgba = [1,1,1,1],
            texColorWeight = 1) {

        this.translate = translate;
        this.scale = scale;
        this.rgba = rgba;
        this.texColorWeight = texColorWeight;

        this.render();
    }

    loadSphere()
    {
        const vertexUVBuffer = [];

        let d = Math.PI/10;
        let dd = Math.PI/100;

        for (let t=0; t < Math.PI; t+=d) {
            for (let r=0; r < (2*Math.PI); t+=d) {
                let p1 = [sin(t)*cos(r), sin(t)*sin(r), cos(t)];
                let p2 = [sin(t+dd)*cos(r), sin(t+dd)*sin(r), cos(t+dd)];
                let p3 = [sin(t)*cos(r+dd), sin(t)*sin(r+dd), cos(t)];
                let p4 = [sin(t+dd)*cos(r+dd), sin(t+dd)*sin(r+dd), cos(t+dd)];

                vertexUVBuffer.push([...p1, 0,0, 1,0,0]);
                vertexUVBuffer.push([...p2, 0,0, 1,0,0]);
                vertexUVBuffer.push([...p3, 0,0, 1,0,0]);
                vertexUVBuffer.push([...p4, 0,0, 1,0,0]);
            }
        }

        // bind vertex and uv data to this.buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexUVBuffer), gl.STATIC_DRAW);

        const FSIZE = 4;

        // position
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 8, 0);
        gl.enableVertexAttribArray(a_Position);

        // uv
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, FSIZE * 8, FSIZE * 3);
        gl.enableVertexAttribArray(a_UV);

        // normal
        // uv
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, FSIZE * 8, FSIZE * 5);
        gl.enableVertexAttribArray(a_Normal);

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

function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }


