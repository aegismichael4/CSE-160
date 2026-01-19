class Picture {

    pixelArray = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0,
        0, 2, 0, 1, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0,
        0, 2, 0, 1, 1, 1, 0, 2, 0, 0, 2, 0, 0, 2, 0,
        0, 2, 0, 0, 1, 1, 1, 2, 0, 0, 2, 0, 0, 2, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0,
        0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 2, 0,
        0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 2, 0,
        0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0,
        0, 2, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 2, 0,
        0, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 1, 2, 0,
        0, 2, 0, 0, 0, 1, 0, 2, 0, 0, 2, 0, 1, 1, 0,
        0, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0,
        0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    constructor() {
        console.log("picture time");

        let index = 224;
        for(let row = -1; row < .99; row+=.1333) {

            for (let col = 1; col > -.99; col-=.1333) {

                index--;
                switch(this.pixelArray[index]) {
                    case 1:
                        drawSquare([col-.2, row+.07], 0.1333, [1.0, 1.0, 1.0, 1.0]);
                        break;
                    case 2:
                        drawSquare([col-.2, row+.07], 0.1333, [.36, .43, .88, 1.0]);
                        break;
                }
            }
        }
    }
}

function drawSquare(center, width, rgba) {

    //Pass the size of a point to u_Size variable
    gl.uniform1f(u_Size, this.size);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    var halfLength = width/2;
    drawTriangle([center[0] - halfLength, center[1] - halfLength, center[0] - halfLength, center[1] + halfLength, center[0] + halfLength, center[1] - halfLength]); // top left triangle
    drawTriangle([center[0] + halfLength, center[1] + halfLength, center[0] - halfLength, center[1] + halfLength, center[0] + halfLength, center[1] - halfLength]); // bottom right triangle
}