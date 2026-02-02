function setUpSheep() {

    animation();
    
    const body = makeCube([1,1,1,1], [.6,.3,.3], [-.2,g_bodyHeight,0], [g_bodyRot, 0, 0, 1]);
    
    const brThigh1 = makeCube([1,1,1,1], [.2,-.22,.15], [.08,0,.05], [g_backThighRot - 30, 0, 0, 1], body);
    // const brThigh2 = makeCube([1,1,1,1], [.15,-.22,.15], [.2,0,.05], [0, 0, 0, 1], brThigh1);
    // const brCalf = makeCube([1,1,1,1], [.12,-.22,.1], [.13,-.3,.08], [g_backCalfRot + 70, 0, 0, 1], brThigh1);
    // const brHoof = makeCube([.3,.3,.3,1], [.15,-.1,.13], [0.06,-.25,.05], [-3, 0, 0, 1], brCalf);

    // const blThigh = makeCube([.95,.95,.95,1], [.2,-.22,.15], [.08,0,.25], [g_backThighRot - 10, 0, 0, 1], body);
    // const blCalf = makeCube([.95,.95,.95,1], [.12,-.22,.1], [.13,-.3,.07], [g_backCalfRot + 13, 0, 0, 1], blThigh);
    // const blHoof = makeCube([.2,.2,.2,1], [.15,-.1,.13], [0.06,-.25,.05], [-3, 0, 0, 1], blCalf);

    const frThigh1 = makeCube([1,1,1,1], [.15,-.22,.15], [.55,0,.05], [g_frontThighRot - 40, 0, 0, 1], body);
    const frThigh2 = makeCube([1,1,1,1], [.1,-.15,.15], [.08,-.2,.075], [50, 0, 0, 1], frThigh1);
    const frCalf = makeCube([1,1,1,1], [.1,-.23,.1], [.17,-.3,.08], [g_frontCalfRot + 35, 0, 0, 1], frThigh1);
    const frHoof = makeCube([.3,.3,.3,1], [.13,-.1,.13], [0.05,-.21,.05], [5, 0, 0, 1], frCalf);

}

function makeCube(rgba, scale, translate, rotation, parent) {

    var cube = new Cube();
    cube.rgba = rgba;

    if (parent) cube.matrix = new Matrix4(parent.getTranslatedMatrix());
    
    cube.setScale(scale[0], scale[1], scale[2]);
    cube.setTranslate(translate[0], translate[1], translate[2]);
    cube.setRotation(rotation[0], rotation[1], rotation[2], rotation[3]);
    cube.render();

    return cube;
}

var g_bodyRot = 0;
var g_bodyHeight = 0;

var g_backThighRot = 0;
var g_backCalfRot = 0;

var g_frontThighRot = 0;
var g_frontCalfRot = 0;

var g_animSpeed = 8;

function animation() {
    if (!g_animationPlaying) return;

    const animTime = g_animSpeed * g_seconds;

    g_bodyRot = Math.sin(animTime ) * 10;
    g_bodyHeight = Math.sin(animTime) * .05;

    g_backThighRot = Math.sin(animTime + 2.5) * 20;
    g_backCalfRot = Math.sin(animTime + 3.5) * 20;

    g_frontThighRot = Math.sin(animTime + .8) * 20;
    g_frontCalfRot = Math.sin(animTime + 1.8) * 20;
}