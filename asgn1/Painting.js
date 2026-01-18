// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = u_Size;\n' +
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

function setUpWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
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

    // Get the storage location of u_Size
    u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    if (u_Size < 0) {
        console.log('Failed to get the storage location of u_Size');
        return;
    }

    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }
}

function main() {
  
  setUpWebGL();
  connectVariablesToGLSL();
  
  setUpClearButton();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = click;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = [];
var g_selectedType;

function click(ev) {

  if (ev.buttons != 1) return;

  let [x,y] = convertCoordinatesEventToGL(ev);

  g_points.push(new Point([x,y], readUserRGB(), readUserSize()));
 
  renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}

function renderAllShapes() {
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  g_points.forEach( (point) => {
    point.render();
  })
}

function readUserRGB() {
  let r = document.getElementById("red").value;
  let g = document.getElementById("green").value;
  let b = document.getElementById("blue").value;
  let a = 1.0;

  return ([r, g, b, a]);
}

function readUserSize() {
  return document.getElementById("size").value;
}

function setUpClearButton() {
  document.getElementById("clear").addEventListener("click", () => {
    g_points = [];
    renderAllShapes();
  });
}

function setUpShapeTypeButtons() {
  document.getElementById("point").addEventListener("click", () => {
    g_selectedType = POINT;
  });

  document.getElementById("triangle").addEventListener("click", () => {
    g_selectedType = TRIANGLE;
  });
}

function drawTriangle([x1, y1, x2, y2, x3, y3]) {

}