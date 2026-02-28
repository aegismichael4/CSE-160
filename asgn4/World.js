// TexturedQuad.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =`
    precision mediump float;

    attribute vec4 a_Position;
    attribute vec2 a_UV;
    attribute vec3 a_Normal;

    varying vec2 v_UV;
    varying vec3 v_Normal;
    varying vec4 v_VertPos;

    uniform mat4 u_ModelMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;

    void main() {
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
      
      v_UV = a_UV;
      v_Normal = a_Normal;
      v_VertPos = u_ModelMatrix * a_Position;
    }`;

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;

    varying vec2 v_UV;
    varying vec3 v_Normal;
    varying vec4 v_VertPos;

    uniform sampler2D u_Sampler;
    uniform vec4 u_FragColor;
    uniform float u_TexColorWeight;
    uniform vec3 u_LightPos;

    void main() {
        float t = u_TexColorWeight;
        gl_FragColor = (1.0 - t) * u_FragColor +  t * texture2D(u_Sampler, v_UV);
        //gl_FragColor = vec4(v_UV, 0, 1);
        
        vec3 lightVector = vec3(v_VertPos) - u_LightPos;
        float r = 1.0 - length(lightVector) / 15.0;
        gl_FragColor = vec4(r,r,r,1);
        
        //gl_FragColor = vec4(v_Normal, 1);
    }`;

// Global Variables
let canvas;
let gl;
let a_Position;
let a_UV;
let a_Normal;
let u_Sampler;
let u_FragColor;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_TexColorWeight;
let u_LightPos;

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

    // Get the storage location of a_Normal
    a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
    if (a_Normal < 0) {
        console.log('Failed to get the storage location of a_Normal');
        return;
    }

    //get the storage location of u_ModelMatrix
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
      console.log("Failed to get the storage location of u_ModelMatrix");
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

    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return false;
    }

    // Get the storage location of u_TexColorWeight
    u_TexColorWeight = gl.getUniformLocation(gl.program, 'u_TexColorWeight');
    if (!u_TexColorWeight) {
        console.log('Failed to get the storage location of u_TexColorWeight');
        return false;
    }

    // Get the storage location of u_LightPos
    u_LightPos = gl.getUniformLocation(gl.program, 'u_LightPos');
    if (!u_LightPos) {
        console.log('Failed to get the storage location of u_LightPos');
        return false;
    }

    // set the initial value for all matrices to identity
    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, identityM.elements);

    // set the projection matrix
    const projMat = new Matrix4();
    projMat.setPerspective(60, canvas.width/canvas.height, 0.1, 300);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);
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

function setUpHTMLElements() {
    const chunkSize = document.getElementById("chunk-size");
    chunkSize.addEventListener("input", () => {
        g_chunkSize = parseInt(chunkSize.value);
    });
    g_chunkSize = parseInt(chunkSize.value);

    document.getElementById("add-sun").addEventListener("click", () => {
       g_sun = true;
    });

    document.getElementById("remove-sun").addEventListener("click", () => {
        g_sun = false;
    });
}

//#endregion

//#region input handling

function click(ev) {

    if (ev.buttons == 1) { // enforce click

        const deltaX = ev.clientX - g_prevMouseX;
        const deltaY = ev.clientY - g_prevMouseY;

        g_camera.panHorizontal(-0.5 * deltaX);
        g_camera.panVertical( 0.5 * deltaY);

    }

    g_prevMouseX = ev.clientX;
    g_prevMouseY = ev.clientY;
}

function cameraSetUp() {
    g_camera = new Camera();
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'w':
                g_camera.moveForwardBackward(.3);
                break;
            case 'a':
                g_camera.moveSide(.3);
                break;
            case 's':
                g_camera.moveForwardBackward(-.3);
                break;
            case 'd':
                g_camera.moveSide(-.3);
                break;
            case 'q':
                g_camera.panHorizontal(3);
                break;
            case 'e':
                g_camera.panHorizontal(-3);
                break;
        }
    });
}

//#endregion

// Global Variables
let g_startTime = performance.now() / 1000;
let g_seconds = 0;
let g_camera;
let g_shape;
let g_prevMouseX;
let g_prevMouseY;
let g_worldPos;
let g_lightPos;

function main() {
  
    setUpWebGL();
    connectVariablesToGLSL();
    initTextures(gl);
    setUpHTMLElements();

    canvas.onmousedown = click;
    canvas.onmousemove = click;

    // Specify the color for clearing <canvas>
    gl.clearColor(1.0, 0.8, 0.75, 1.0);

    //camera
    cameraSetUp();

    // set up cube
    g_shape = new Shape();

    tick();
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
    const viewMatrix = g_camera.getViewMatrix();
   // console.log(viewMatrix);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

    const invView = viewMatrix.invert();
    g_worldPos = [ invView.elements[12], invView.elements[13], invView.elements[14] ];
    sendTextToHTML("x: " + g_worldPos[0].toPrecision(2) +
                        ", y: " + g_worldPos[1].toPrecision(2) +
                        ", z: " + g_worldPos[2].toPrecision(2),
                 "xyz");

    scene();

    var duration = performance.now() - startTime;
    sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration), "fps");
}