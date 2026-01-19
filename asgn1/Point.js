class Point {
  xy;
  rgba;
  size;

  constructor(xy, rgba, size) {
    this.xy = xy;
    this.rgba = rgba;
    this.size = size;
  }

  render() {

    //Quit using the buffer to send the attribute
    gl.disableVertexAttribArray(a_Position);
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, this.xy[0], this.xy[1], 0.0);
    //Pass the size of a point to u_Size variable
    gl.uniform1f(u_Size, this.size);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}