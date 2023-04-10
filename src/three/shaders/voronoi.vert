uniform vec3 u_points;
varying vec3 v_position;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}