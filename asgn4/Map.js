function scene() {

    // load concrete texture (we draw it first)
    loadTexture(gl, 3, g_texture, u_Sampler, g_concreteImage);

    // world position
    const x = Math.floor(g_worldPos[0]);
    const z = Math.floor(g_worldPos[2]);

    // draw cubes
    g_shape.loadCube();
    g_shape.setShape([-10,-8,-10], [20,.1,20], [.3,.3,.3, 1], 1); // floor
    g_shape.setShape([-10,0,-10], [20,.1,20], [.3,.3,.3, 1], 1); // ceiling
    g_shape.setShape([10,-8,-10], [.1,8,20], [1,.3,.3, 1], 1); // wall
    g_shape.setShape([-10,-8,-10], [.1,8,20], [1,.3,.3, 1], 1); // wall
    g_shape.setShape([-10,-8,-10], [20,8,.1], [1,.3,.3, 1], 1); // wall
    g_shape.setShape([-10,-8,10], [20,8,.1], [1,.3,.3, 1], 1); // wall

    // rope
    g_shape.setShape([0,0,0], [.1,-3.4,.1], [1,1,1,1], 0, ropeRotation(), [1,0,1]);

    // light bulb
    g_shape.loadSphere();
    setLightPosition();
    g_shape.setShape(g_lightPos, [.4,.3,.3]);
    gl.uniform3f(u_LightPos, ...g_lightPos);
}

function setLightPosition() {
    let x = sin(g_seconds) * Math.PI / 2;
    let y = sin(g_seconds*2 + 3*Math.PI/2) / 3 - 3;
    g_lightPos = [x,y,-x];
}

function ropeRotation() {
    return sin(g_seconds) * 40;
}