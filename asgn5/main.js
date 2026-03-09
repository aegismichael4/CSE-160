import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from "three/addons/loaders/MTLLoader.js";

//#region Rendering

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

//#endregion

//#region Textures

const textureLoader = new THREE.TextureLoader();

function loadTexture(path) {
    const tex = textureLoader.load(path, () => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.colorSpace = THREE.SRGBColorSpace;
    });
    return tex;
}

// macro flour
const mfAO = loadTexture('../resources/macro-flour/macro_flour_ao_2k.jpg');
const mfDiff = loadTexture( '../resources/macro-flour/macro_flour_diff_2k.jpg');
const mfDisp = loadTexture( '../resources/macro-flour/macro_flour_disp_2k.jpg');
const mfNorm = loadTexture( '../resources/macro-flour/macro_flour_nor_gl_2k.jpg');
const mfRough = loadTexture( '../resources/macro-flour/macro_flour_rough_2k.jpg');

// background
const backgroundTex = loadTexture('../resources/marcy-playground-background.jpg');

//#endregion

//#region Materials

const wallMaterial = new THREE.MeshStandardMaterial({

    color: 0xFF0000,
    map: mfDiff,

    aoMap: mfAO,

    displacementBias: -.03,
    displacementScale: .1,
    displacementMap: mfDisp,

    normalMap: mfNorm,

    roughness: 0,
    roughnessMap: mfRough,
});

const backgroundMaterial = new THREE.MeshBasicMaterial({
    map: backgroundTex,
});

//#endregion

//#region Lights

// ambient light
const ambientLightColor = 0xFFFFFF;
const ambientLightIntensity = 1;
const ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
scene.add(ambientLight);

// hemisphere light
const skyColor = 0xc3e0e9;
const groundColor = 0x270909;
const hemisphereLightIntensity = 3;
const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, hemisphereLightIntensity);
scene.add(hemisphereLight);

// point light
const pointLightColor = 0xFFFFFF;
const pointLightIntensity = 10;
const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity);
pointLight.position.set(-1, 1, 0);
scene.add(pointLight);

//#endregion

//#region OBJ File

const mtlLoader = new MTLLoader();
mtlLoader.load('../resources/marcy-playground-model/marcy-playground.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
})
const objLoader = new OBJLoader();
objLoader.load('../resources/marcy-playground-model/marcy-playground.obj', (root) => {
    scene.add(root);
});

//#endregion

//#region Scene

addCube(4, .1, 4, 0, 2, 0, wallMaterial); // ceiling
addCube(4, .1, 4, 0, -2, 0, wallMaterial); // floor
addCube(.1, 4, 4, -2, 0, 0, wallMaterial); // left wall
addCube(.1, 4, 4, 2, 0, 0, wallMaterial); // left wall

addCube(5, 5, .1, 0, .25, -2.5, backgroundMaterial, 1, 1, 1); // background


function addCube(width, height, depth, x, y, z, material, wS = 100, hS = 100, dS = 100) {
    const geometry = new THREE.BoxGeometry( width, height, depth, wS, hS, dS );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    scene.add( cube );
}

for (let i = 0; i < 20; i++) {
    addCube(1, 1, 1, i*2 - 20, 0, 10);
}

// sphere
const geometry = new THREE.SphereGeometry( 1,  );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(x, y, z);
scene.add( cube );

camera.position.z = 3;

function animate( time ) {
    //cube.rotation.x = time / 2000;
    //cube.rotation.y = time / 1000;
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

//#endregion

