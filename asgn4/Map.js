function scene() {

    // load water texture (we draw it first)
    loadTexture(gl, 3, g_texture, u_Sampler, g_concreteImage);

    // world position
    const x = Math.floor(g_worldPos[0]);
    const z = Math.floor(g_worldPos[2]);

    g_cube.loadCube();

    g_cube.setCube([-10,0,-10], [20,.1,20], [.3,.3,.3, 1], 1); // floor
    g_cube.setCube([-10,7.5,-10], [20,.1,20], [.3,.3,.3, 1], 1); // ceiling
    g_cube.setCube([10,0,-10], [.1,7.5,20], [1,.3,.3, 1], 1); // wall
    g_cube.setCube([-10,0,-10], [.1,7.5,20], [1,.3,.3, 1], 1); // wall
    g_cube.setCube([-10,0,-10], [20,7.5,.1], [1,.3,.3, 1], 1); // wall
    g_cube.setCube([-10,0,10], [20,7.5,.1], [1,.3,.3, 1], 1); // wall

    //g_cube.setCube();

    g_sphere.loadSphere();

    g_sphere.setSphere();
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