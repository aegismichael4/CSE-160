function setUpSheep() {

    animation();
    
    const body = makeCube([1,1,1,1], [.6,.3,.3], [-.1,g_bodyHeight,0], [g_bodyRot, 0, 0, 1]);
    
    const brThigh1 = makeCube([1,1,1,1], [.2,-.17,.15], [.06,.05,.05], [g_brThighRot - 5, 0, 0, 1], body);
    const brThigh2 = makeCube([1,1,1,1], [.12,-.22,.15], [.2,-.19,.08], [-60, 0, 0, 1], brThigh1);
    const brCalf = makeCube([1,1,1,1], [.12,-.22,.1], [.06,-.32,.08], [g_brCalfRot + 10, 0, 0, 1], brThigh1);
    const brHoof = makeCube([.3,.3,.3,1], [.15,-.1,.13], [0.06,-.25,.05], [-3, 0, 0, 1], brCalf);

    const blThigh1 = makeCube([.95,.95,.95,1], [.2,-.17,.15], [.06,.05,.25], [g_blThighRot - 5, 0, 0, 1], body);
    const blThigh2 = makeCube([.95,.95,.95,1], [.12,-.22,.15], [.2,-.19,.08], [-60, 0, 0, 1], blThigh1);
    const blCalf = makeCube([.95,.95,.95,1], [.12,-.22,.1], [.06,-.32,.08], [g_blCalfRot + 10, 0, 0, 1], blThigh1);
    const blHoof = makeCube([.2,.2,.2,1], [.15,-.1,.13], [0.06,-.25,.05], [-5, 0, 0, 1], blCalf);

    const frThigh1 = makeCube([1,1,1,1], [.15,-.22,.15], [.55,0,.05], [g_frThighRot - 40, 0, 0, 1], body);
    const frThigh2 = makeCube([1,1,1,1], [.1,-.15,.15], [.08,-.2,.075], [50, 0, 0, 1], frThigh1);
    const frCalf = makeCube([1,1,1,1], [.1,-.23,.1], [.17,-.3,.08], [g_frCalfRot + 35, 0, 0, 1], frThigh1);
    const frHoof = makeCube([.3,.3,.3,1], [.13,-.1,.13], [0.05,-.21,.05], [5, 0, 0, 1], frCalf);

    const flThigh1 = makeCube([.95,.95,.95,1], [.15,-.22,.15], [.55,0,.25], [g_flThighRot - 40, 0, 0, 1], body);
    const flThigh2 = makeCube([.95,.95,.95,1], [.1,-.15,.15], [.08,-.2,.075], [50, 0, 0, 1], flThigh1);
    const flCalf = makeCube([.95,.95,.95,1], [.1,-.23,.1], [.17,-.3,.08], [g_flCalfRot + 35, 0, 0, 1], flThigh1);
    const flHoof = makeCube([.2,.2,.2,1], [.13,-.1,.13], [0.05,-.21,.05], [5, 0, 0, 1], flCalf);

    const tail1 = makeCube([1,1,1,1], [.1,-.1,.13], [.05,.25,.15], [g_tail1Rot - 40, 0, 0, 1], body);
    const tail2 = makeCube([1,1,1,1], [.1,-.15,.13], [.05,-.14,.065], [g_tail2Rot + 10, 0, 0, 1], tail1);
    const tail3 = makeCube([1,1,1,1], [.1,-.2,.13], [.045,-.2,.065], [g_tail3Rot + 20, 0, 0, 1], tail2);

    const neck = makeCube([1,1,1,1], [.21,.23,.17], [.5,.3,0.16], [g_neckRot - 25, 0, 0, 1], body);
    
    const head = new LambHead();
    head.matrix = neck.getTranslatedMatrix();
    head.setScale(0.17,0.17,0.25);
    head.setTranslate(.19,.22,.08);
    head.setRotation(g_headRot + 25,0,0,1)
    head.render();

    const rEye = makeCube([.1,.1,.1,1], [.05,.05,.05], [.15,.15,0], [45, 0, 0, 1], head);
    const lEye = makeCube([.1,.1,.1,1], [.05,.05,.05], [.15,.15,.25], [45, 0, 0, 1], head);
    const nose = makeCube([0.8,.5,.5,1], [.05,.06,.08], [.35,.14,.13], [60, 0, 0, 1], head);
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

var g_brThighRot = 0;
var g_brCalfRot = 0;

var g_blThighRot = 0;
var g_blCalfRot = 0;

var g_frThighRot = 0;
var g_frCalfRot = 0;

var g_flThighRot = 0;
var g_flCalfRot = 0;

var g_tail1Rot = 0;
var g_tail2Rot = 0;
var g_tail3Rot = 0;

var g_neckRot = 0;
var g_headRot = 0;

var g_animSpeed = 8;

function animation() {
    if (!g_animationPlaying) return;

    const animTime = g_animSpeed * g_seconds;

    g_bodyRot = Math.sin(animTime ) * 12;
    g_bodyHeight = Math.sin(animTime) * .08;

    g_brThighRot = Math.sin(animTime + 2.5) * 20;
    g_brCalfRot = Math.sin(animTime + 3.5) * 30;

    g_blThighRot = Math.sin(animTime + 2.8) * 20;
    g_blCalfRot = Math.sin(animTime + 3.8) * 30;

    g_frThighRot = Math.sin(animTime + .5) * 20 + 20;
    g_frCalfRot = Math.sin(animTime + 1.2) * 30 + 10;

    g_flThighRot = Math.sin(animTime + 1) * 20 + 20;
    g_flCalfRot = Math.sin(animTime + 1.7) * 30 + 10;

    g_tail1Rot = Math.sin(animTime + 1.2) * -10;
    g_tail2Rot = Math.sin(animTime + 2.2) * -20 - 20;
    g_tail3Rot = Math.sin(animTime + 3.2) * -30 - 20;

    g_neckRot = Math.sin(animTime + .5) * 20 - 10;
    g_headRot = Math.sin(animTime + 1) * 10;
}