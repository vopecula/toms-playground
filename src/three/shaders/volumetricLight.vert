uniform vec3 u_cone_tip_vec3;
varying vec3 v_position;
varying vec3 v_tip;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_position = gl_Position.xyz;
  v_tip = (projectionMatrix * modelViewMatrix * vec4(v_tip, 1.0)).xyz;
}