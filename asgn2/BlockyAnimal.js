// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_GlobalRotateMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

// Global Variables
let canvas;
let gl;
let a_Position;
let u_Size;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

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

    // // Get the storage location of u_Size
    // u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    // if (u_Size < 0) {
    //     console.log('Failed to get the storage location of u_Size');
    //     return;
    // }

    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
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

    // set the initial value for this matrix to identity
    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
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

function main() {
  
  setUpWebGL();
  connectVariablesToGLSL();
  setUpHTMLElements();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = click;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  tick();
}

var g_points = [];
var g_selectedType = 0; // point
var g_globalAngle = 0;
var g_startTime = performance.now() / 1000;
var g_seconds = 0;
var g_animationPlaying = false;

 function click(ev) {
  console.log("click!");
}

//#region rendering

function renderAllShapes() {
  // check the time at the start of the function
  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // pass the global rotation into u_GlobalRotateMatrix
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  //draw the body cube
  // var body = new Cube();
  // body.rgba = [1.0,0.0,0.0,1.0];
  // body.matrix.translate(-0.25,-0.5,0.0);
  // body.matrix.scale(0.5,1,0.5);
  // body.render();

  setUpSheep();

  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration), "fps");
}

var g_bodyMat = new Matrix4();

function setUpSheep() {

  animation();

  var body = new Cube();
  body.rgba = [1,1,1,1];
  body.matrix = g_bodyMat;
  body.setScale(.2,1.2,0.5);
  body.setTranslate(0,0,0);
  body.setRotation(10);
  body.render();

}

function animation() {
  if (!g_animationPlaying) return;

  g_bodyMat.rotate(Math.sin(g_seconds), 0, 0, 1);
}

function tick() {
  g_seconds = (performance.now() / 1000) - g_startTime;
  renderAllShapes();
  requestAnimationFrame(tick);
}

//#endregion

//#region HTML setup

function sendTextToHTML(text, htmlID) {
  htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}

function setUpHTMLElements() {
  const slider = document.getElementById("rotation");
  slider.addEventListener("input", () => {
    g_globalAngle = slider.value;
  });

  const animationOn = document.getElementById("animationOn");
  animationOn.addEventListener("click", () => {
    g_animationPlaying = true;
  });

  const animationOff = document.getElementById("animationOff");
  animationOff.addEventListener("click", () => {
    g_animationPlaying = false;
  });
}

//#endregion