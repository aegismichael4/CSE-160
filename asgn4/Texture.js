let g_texture;
let g_waterImage;
let g_woodImage;
let g_concreteImage;

function initTextures(gl) {

  // gl texture
  g_texture = gl.createTexture();   // Create a texture object
  if (!g_texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // water
  g_waterImage = new Image();  // Create the image object
  if (!g_waterImage) {
    console.log('Failed to create the image object');
    return false;
  }
  g_waterImage.src = '../resources/water.jpg';


  // wood
  g_woodImage = new Image();  // Create the image object
  if (!g_woodImage) {
    console.log('Failed to create the image object');
    return false;
  }
  g_woodImage.src = '../resources/wood.jpg';

  // concrete
  g_concreteImage = new Image();  // Create the image object
  if (!g_concreteImage) {
    console.log('Failed to create the image object');
    return false;
  }
  g_concreteImage.src = '../resources/concrete.jpg';

  return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler, 0);
}