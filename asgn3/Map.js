function scene() {

    const x = Math.floor(g_worldPos[0]);
    const y = Math.floor(g_worldPos[1]);
    const z = Math.floor(g_worldPos[2]);

    //sky (moves with camera)
    g_cube.setCube([x - (g_chunkSize), -g_chunkSize/2, z - (g_chunkSize)],
                  [g_chunkSize*2, g_chunkSize, g_chunkSize*2],
                    [0.11, 0.1, .3, 1], 0);

    //ground (moves with camera)
    g_cube.setCube([x - 25, -1, z - 25], [50, 1, 50], [0.25, 0.05, 0.05, 1], 0);

    //test
    //g_cube.setCube([0,0,0], [.5,.5,.5], [1,0,0,1], 0.5);

    for (let cubeX = x - g_chunkSize; cubeX < x + g_chunkSize; cubeX++) {
        for (let cubeZ = z - g_chunkSize; cubeZ < z + g_chunkSize; cubeZ++) {

            const hash = simpleHash(`${cubeX * 0.3} im hashing!!! ${cubeZ * 0.1}`);

            //draw random ground
            let numberOfCubesVertically = hash % 3;
            for (let cubeY = 0; cubeY < numberOfCubesVertically; cubeY++) {
                 g_cube.setCube([cubeX, cubeY, cubeZ], [1,1,1], [1,1,1,1], 1);
            }

            //generate lanterns
            if (hash % 10 == 1) {
                g_cube.setCube([cubeX, lanternHeight(hash), cubeZ], [.5,.5,.5], lanternColor(hash), 0);
            }
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

function lanternColor(hash) {
    const t = Math.sin(performance.now()/300 + (hash % 100)) / 5 + 0.85;
    return [t, 0.6*t, 0.25*t, 1];
}

function lanternHeight(hash) {
    return Math.sin(performance.now()/1000 + (hash % 100)) + 10;
}