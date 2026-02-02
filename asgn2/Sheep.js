function setUpSheep() {

    animation();
    
    const body = makeCube([1,1,1,1], [.6,.3,.3], [-.2,0,0], [g_bodyRot, 0, 0, 1]);
    
    const backRightThigh = makeCube([1,1,1,1], [.2,-.22,.15], [.08,0,.05], [-10 + g_backThighRot, 0, 0, 1], body);
    const backRightCalf = makeCube([1,1,1,1], [.12,-.22,.1], [.13,-.3,.08], [13 + g_backCalfRot, 0, 0, 1], backRightThigh);

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

var g_animSpeed = 4;

function animation() {
    if (!g_animationPlaying) return;

    const animTime = g_animSpeed * g_seconds;

    g_bodyRot = Math.sin(animTime ) * 10;
    g_bodyHeight = Math.sin(animTime) * .05;

    g_backThighRot = Math.sin(animTime) * 20;
    g_backCalfRot = Math.sin(animTime) * 10;
}