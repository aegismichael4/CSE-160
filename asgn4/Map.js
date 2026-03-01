function scene() {

    // load concrete texture (we draw it first)
    loadTexture(gl, 3, g_texture, u_Sampler, g_concreteImage);

    // world position
    const x = Math.floor(g_worldPos[0]);
    const z = Math.floor(g_worldPos[2]);

    lightEnabled(g_toggleLight);

    //#region cubes
    g_shape.loadCube();

    // draw walls
    setRoughness(.9);
    g_shape.setShape([-10,-8,-10], [20,.1,20], [.3,.3,.3, 1], 1); // floor
    g_shape.setShape([-10,0,-10], [20,.1,20], [.3,.3,.3, 1], 1); // ceiling
    g_shape.setShape([10,-8,-10], [.1,8,20], [1,.3,.3, 1], 1); // wall
    g_shape.setShape([-10,-8,-10], [.1,8,20], [1,.3,.3, 1], 1); // wall
    g_shape.setShape([-10,-8,-10], [20,8,.1], [1,.3,.3, 1], 1); // wall
    g_shape.setShape([-10,-8,10], [20,8,.1], [1,.3,.3, 1], 1); // wall


    // rope
    g_shape.setShape([0,0,0], [.1,-3.4,.1], [1,.7,.2,1], 0, ropeRotation(), [1,0,1]);

    //#endregion

    // eyeball
    g_shape.loadSphere();
    setRoughness(0);
    g_shape.setShape([2,-5,2]);

    // light bulb
    lightEnabled(false);
    setLightPosition();
    g_shape.setShape([g_lightPos[0]+.25, g_lightPos[1], g_lightPos[2]+.25], [.4,.3,.3], [...g_diffuseCol,1], 0);
    gl.uniform3f(u_LightPos, ...g_lightPos);
}

function setLightPosition() {

    let t = g_seconds;
    if (g_lightPosSetFlag) t = g_positionSlider;

    let x = sin(t) * Math.PI / 2;
    let y = sin(t*2 + 3*Math.PI/2) / 3  - 3;
    g_lightPos = [x-.2,y,-x-.2];
}

function ropeRotation() {
    return sin(g_lightPosSetFlag ? g_positionSlider : g_seconds) * 40;
}

function setRoughness(roughness) {
    gl.uniform1f(u_Roughness, roughness);
}

function lightEnabled(enabled) {
    gl.uniform1f(u_LightEnabled, enabled ? 1.0 : 0.0);
}