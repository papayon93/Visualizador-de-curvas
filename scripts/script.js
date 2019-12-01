'use strict';
const gl = document.querySelector('#c').getContext('webgl2');

const vs = `#version 300 es

in vec4 a_color;
in vec4 a_position;

out vec4 v_color;

void main() {
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
  gl_PointSize = 10.0;

  // Pass the vertex color to the fragment shader.
  v_color = a_color;
}
`;

const fs = `#version 300 es
precision mediump float;

// Passed in from the vertex shader.
in vec4 v_color;

out vec4 outColor;

void main() {
  // outColor = v_color * vec4(0.5, 1, 0.5, 1);
  // outColor = vec4(0.5, 0, 0.5, 1);
  outColor = v_color;
}
`;

let program;
let posicionesIniciais = [];
let posicionesOrdenadas = [];
let colorInicial = [];
let colores = {
  ponto: [ 1, 1, 1, 1 ],
  desenho: [ 1, 0, 0, 1 ],
  desenho2: [ 0, 0, 1, 1 ],
  escolherPonto: [ 1, 0, 1, 1 ],
  pontoEscolhido: [ 0, 1, 0, 1 ],
  tangente: [ 1, 0.5, 0, 1 ],
}
let verticeSeleccionado = -1;
let verticeProcurado = -1;

let primitiveType;
let count;
let tipoColor = 0;
let grau = 2;

function main() {
  // Get A WebGL context
  
  // Link the two shaders into a program
  program = webglUtils.createProgramFromSources(gl, [vs, fs]);

  // posicionesIniciais = [[ -0.9, 0.9, 0, 1 ],[ 0.9, 0.9, 0, 1 ]];
  posicionesIniciais = [
    [ -0.3, -0.2, 0, 1 ],
    [ -0.2, -0.2, 0, 1 ],
    [ -0.1, -0.2, 0, 1 ],
    [ 0.0, 0.5, 0, 1 ],
    [ 0.1, -0.2, 0, 1 ],
    [ 0.2, -0.2, 0, 1 ],
    [ 0.3, -0.2, 0, 1 ],
  ];
  colorInicial.push(colores.ponto)
  colorInicial.push(colores.ponto)
  colorInicial.push(colores.ponto)
  colorInicial.push(colores.ponto)
  colorInicial.push(colores.ponto)
  colorInicial.push(colores.ponto)
  colorInicial.push(colores.ponto)
  // colorInicial.push(colores.tangente)
  // look up where the vertex data needs to go.
  // const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  // const colorAttributeLocation = gl.getAttribLocation(program, "a_color");

  // // Create a buffer
  // const positionBuffer = gl.createBuffer();

  // // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // // // Set Geometry.

  // gl.bufferData(
  //     gl.ARRAY_BUFFER,
  //     new Float32Array(posiciones),
  //     gl.STATIC_DRAW);

  // // Create a vertex array object (attribute state)
  // vao = gl.createVertexArray();

  // // and make it the one we're currently working with
  // gl.bindVertexArray(vao);

  // // Turn on the attribute
  // gl.enableVertexAttribArray(positionAttributeLocation);

  // // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  // const size = 4;          // 3 components per iteration
  // const type = gl.FLOAT;   // the data is 32bit floats
  // const normalize = false; // don't normalize the data
  // const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  // const offset = 0;        // start at the beginning of the buffer
  // gl.vertexAttribPointer(
  //     positionAttributeLocation, size, type, normalize, stride, offset);  
  // draw
  drawScene()
}

function drawPoints(vao,pos,colors){
  // and make it the one we're currently working with
  gl.bindVertexArray(vao);

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position"); 

  // lookup uniforms
  const colorLocation = gl.getUniformLocation(program, "a_color");

  const positionBuffer = gl.createBuffer();  

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);  

  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(toPoints(pos)),
      gl.STATIC_DRAW);  

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  gl.vertexAttribPointer(positionAttributeLocation, 4, gl.FLOAT, false, 0, 0); 

  const colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

 gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(toPoints(colors)),
    gl.STATIC_DRAW);  

  gl.enableVertexAttribArray(colorLocation);

  gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0); 
}

function drawScene() {    
  // Create a vertex array object (attribute state)
  let vao = gl.createVertexArray();
  drawPoints(vao,posicionesIniciais,colorInicial)
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Limpar o canvas
  gl.clearColor(212/255, 212/255, 212/255, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Bind the attribute/buffer set we want.
  gl.bindVertexArray(vao);

  // Draw the geometry.
  const primitiveType = gl.POINTS;
  var count = posicionesIniciais.length;
  gl.drawArrays(primitiveType, 0, count);
}

function drawSceneNotErase(pos,color) {
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
 
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Limpar o canvas
  gl.clearColor(212/255, 212/255, 212/255, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  let vao1 = gl.createVertexArray();
  if(curva == 3)
    drawPoints(vao1,posicionesIniciais,colorInicial)
  else
    drawPoints(vao1,posicionesIniciais,colorInicial)

  let vao2 = gl.createVertexArray();
  drawPoints(vao2,pos,color)

  gl.bindVertexArray(vao1);
  // Draw the geometry.
  if(curva == 1)
    primitiveType = gl.LINE_STRIP;
  else if(curva == 2)
    primitiveType = gl.LINES;
  else if(curva == 3)
    primitiveType = gl.LINE_STRIP;
  else if(curva == 4)
    primitiveType = gl.LINE_STRIP;
  else if(curva == 5)
    primitiveType = gl.LINE_STRIP;
  count = posicionesIniciais.length;
  gl.drawArrays(primitiveType, 0, count);  

  gl.bindVertexArray(vao1);
  // Draw the geometry.
  primitiveType = gl.POINTS;
  count = posicionesIniciais.length;
  gl.drawArrays(primitiveType, 0, count);  

  gl.bindVertexArray(vao2);
  // Draw the geometry.
  primitiveType = gl.LINE_STRIP;
  count = pos.length;
  gl.drawArrays(primitiveType, 0, count);
}

main()