precision highp float;

attribute vec3 position;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float dist;

void main() {
  dist = length(position.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
