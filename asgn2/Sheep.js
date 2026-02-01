var g_bodyRot = 0;

function setUpSheep() {

    animation();

    // var butt = new Cube();
    // butt.rgba = [1,1,1,1];
    // butt.setScale(0.4,0.4,0.4);
    // butt.setTranslate(0,-.1,0);
    // butt.setRotation(45 + g_bodyRot, 0, 0, 1);
    // butt.render();
    
    makeCube([1,1,1,1], [.4,.4,.4], [0,-.1,0], [45 + g_bodyRot, 0, 0, 1]); // butt

    const lowerBody = makeCube([1,1,1,1], [.96,.28,.4], [0,-.16,0], [0,0,0,1]);
    const upperBody = makeCube([1,1,1,1], [.68,.33,.4], [0.14,.1,0], [0,0,0,1]); 
}

function makeCube(rgba, scale, translate, rotation) {

    var cube = new Cube();
    cube.rgba = rgba;
    cube.setScale(scale[0], scale[1], scale[2]);
    cube.setTranslate(translate[0], translate[1], translate[2]);
    cube.setRotation(rotation[0], rotation[1], rotation[2], rotation[3]);
    cube.render();

    return cube;
}


function animation() {
    if (!g_animationPlaying) return;

    g_bodyRot = 45 * Math.sin(g_seconds);
}