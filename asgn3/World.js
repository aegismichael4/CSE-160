// TexturedQuad.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =`
    precision mediump float;

    attribute vec4 a_Position;
    attribute vec2 a_UV;

    varying vec2 v_UV;

    uniform mat4 u_ModelMatrix;
    uniform mat4 u_GlobalRotateMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;

    void main() {
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
      v_UV = a_UV;
    }`;

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;

    varying vec2 v_UV;

    uniform sampler2D u_Sampler;
    uniform vec4 u_FragColor;

    void main() {
      gl_FragColor = texture2D(u_Sampler, v_UV);
      //gl_FragColor = vec4(v_UV, 0, 1);
    }`;

// Global Variables
let canvas;
let gl;
let a_Position;
let a_UV;
let u_Sampler;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;

//#region webgl setup

function setUpWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // // Get the storage location of a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Get the storage location of a_UV
    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    if (a_UV < 0) {
        console.log('Failed to get the storage location of a_UV');
        return;
    }

    //get the storage location of u_ModelMatrix
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
      console.log("Failed to get the storage location of u_ModelMatrix");
      return;
    }

    //get the storage location of u_GlobalRotateMatrix
    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) {
      console.log("Failed to get the storage location of u_GlobalRotateMatrix");
      return;
    }

    //get the storage location of u_ViewMatrix
    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
      console.log("Failed to get the storage location of u_ViewMatrix");
      return;
    }

    //get the storage location of u_ProjectionMatrix
    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
      console.log("Failed to get the storage location of u_ProjectionMatrix");
      return;
    }

    // Get the storage location of u_Sampler
    u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    if (!u_Sampler) {
        console.log('Failed to get the storage location of u_Sampler');
        return false;
    }

    // set the initial value for all matrices to identity
    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, identityM.elements);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, identityM.elements);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, identityM.elements);
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}

//#endregion

//#region HTML Setup

function sendTextToHTML(text, htmlID) {
  htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}

//#endregion

// Global Variables
var g_globalAngle = 0;
var g_prevMouseX = 0;
var g_startTime = performance.now() / 1000;
var g_seconds = 0;

function main() {
  
  setUpWebGL();
  connectVariablesToGLSL();
  initTextures(gl, 3);
//   setUpHTMLElements();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = click;

  // Specify the color for clearing <canvas>
  gl.clearColor(1.0, 0.8, 0.75, 1.0);

  tick();
}

 function click(ev) {

  if (ev.buttons == 1) { // enforce click

    const deltaX = ev.clientX - g_prevMouseX;

    g_globalAngle -= deltaX;

  }

    g_prevMouseX = ev.clientX;
}

function tick() {
  g_seconds = (performance.now() / 1000) - g_startTime;
  renderAllShapes();
  requestAnimationFrame(tick);
}

function renderAllShapes() {
  // check the time at the start of the function
  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // pass the global rotation into u_GlobalRotateMatrix
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  makeCube([.5,.5,.5,1], [1,1,1], [0,0,0], [0,0,0,1]);

  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration), "fps");
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