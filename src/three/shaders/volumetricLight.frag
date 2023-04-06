uniform vec3 u_cone_tip_vec3;
varying vec3 v_position;
varying vec3 v_tip;

void main() {
  float d = distance(v_position, v_tip);
  float dMax = 4.0;
  gl_FragColor = vec4(vec3(0.9 - (d / dMax)), 1.0);
}