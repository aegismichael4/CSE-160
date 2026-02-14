const boatTop = [
    [0,0,0,1,0,0,0],
    [0,0,0,1,0,0,0],
    [0,0,0,1,0,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
];

const boatBottom = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
]

function scene() {

    // load water texture (we draw it first)
    loadTexture(gl, 3, g_texture, u_Sampler, g_waterImage);

    // world position
    const x = Math.floor(g_worldPos[0]);
    const z = Math.floor(g_worldPos[2]);

    //colors
    let skyRGBA;
    let waterRGBA;
    let woodRGBA;
    let sailRGBA;

    // sun (moves up with sky
    if (g_sun) {
        g_cube.setCube([-5,g_chunkSize/2-5,-20], [10,10,10], [1,1,0.8,1], 0);

        // colors
        skyRGBA = [0.5,0.5,0.9,1];
        waterRGBA = [0,.5,.8,1];
        woodRGBA = [0.5, 0.3, 0.25, 1];
        sailRGBA = [.9,.9,.9,1];
    } else {

        // colors
        skyRGBA = [0.1, 0.1, .3, 1];
        waterRGBA = [0,.1,.3,1];
        woodRGBA = [0.1,.03,.01,1];
        sailRGBA = [.5,.5,.5,1];
    }

    //sky (moves with camera)
    g_cube.setCube([x - (g_chunkSize), -g_chunkSize/2, z - (g_chunkSize)],
        [g_chunkSize*2, g_chunkSize, g_chunkSize*2],
        skyRGBA,0);

    const seconds = performance.now() / 1000;

    for (let cubeX = x - g_chunkSize; cubeX < x + g_chunkSize; cubeX++) {
        for (let cubeZ = z - g_chunkSize; cubeZ < z + g_chunkSize; cubeZ++) {

            const cubeY = waveHeight(seconds, cubeX, cubeZ);

            //draw waves
            g_cube.setCube([cubeX, cubeY, cubeZ], [1,1,1], waterRGBA, 0.2);

            if (g_sun) continue;

            //generate lanterns
            const hash = simpleHash(`${cubeX * 0.3} im hashing!!! ${cubeZ * 0.1}`);
            if (hash % 10 == 1) {
                g_cube.setCube([cubeX, lanternHeight(seconds, hash), cubeZ], [.5,.5,.5], lanternColor(seconds, hash), 0);
            }
        }
    }

    // load water texture (we draw it first)
    loadTexture(gl, 3, g_texture, u_Sampler, g_woodImage);

    // boat body
    for (let boatX = 0; boatX < boatTop.length; boatX++) {
        for (let boatZ = 0; boatZ < boatTop[0].length; boatZ++) {
            if (boatBottom[boatX][boatZ]) {
                g_cube.setCube([boatX*.25, boatHeight(seconds)+.75, boatZ*.25 -5], [.25,.25,.25], woodRGBA, .2);
                g_cube.setCube([boatX * .25, boatHeight(seconds) + 1, boatZ * .25 - 5], [.25, .25, .25], woodRGBA, .2);
            }
            if (boatTop[boatX][boatZ]) {
                g_cube.setCube([boatX * .25, boatHeight(seconds) + 1.25, boatZ * .25 - 5], [.25, .25, .25], woodRGBA, .2);
            }
        }
    }

    for (let sailY = 1; sailY < 11; sailY++) {
        //mast
        g_cube.setCube([2.5, sailY*.25 + boatHeight(seconds) + 1.25, -4.25], [.25, .25, .25], woodRGBA, .2);

        if (sailY <=2 || sailY == 10) continue;
        for (let sailZ = -1; sailZ < 1; sailZ +=0.25) {
            const sailX = 2 + Math.abs(sailY - 6)*.1;
            g_cube.setCube([sailX, sailY*.25 + boatHeight(seconds) + 1.25, -4.25 + sailZ], [.25, .25, .25], sailRGBA, 0);
        }
    }
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash >>> 0; // Ensure unsigned 32-bit result
}

function lanternColor(seconds, hash) {
    const t = Math.sin(seconds * 3 + (hash % 100)) / 5 + 0.85;
    return [t, 0.6*t, 0.25*t, 1];
}

function lanternHeight(seconds, hash) {
    return Math.sin(seconds + (hash % 100)) + 10;
}

function waveHeight(seconds, x, z) {
    return  Math.sin(seconds * 0.8 + x * 50) * 0.4 +
            Math.sin(seconds * 0.8 + z * 50) * 0.4;
}

function boatHeight(seconds) {
    return Math.sin(seconds * 0.8 + 100) * 0.4 +
        Math.sin(seconds * 0.8 + -150) * 0.4;
}