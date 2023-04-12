uniform vec3 u_light_pos;
varying vec3 v_position;
varying vec3 v_normal;
varying vec3 v_light;
varying vec2 v_uv;

void main() {
  v_uv = uv;
  vec4 n = vec4(normalMatrix * normal, 1.0) * modelViewMatrix;
  vec4 l = vec4(normalMatrix * u_light_pos, 1.0) * modelViewMatrix;
  v_light = normalize(l.xyz);
  v_normal = normalize(n.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_position = gl_Position.xyz;
}