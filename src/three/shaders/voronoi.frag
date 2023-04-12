uniform vec3 u_points;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec3 v_position;

void main() {
  vec2 n = gl_FragCoord.xy/u_resolution.xy;
  n.x *= u_resolution.x / u_resolution.y;

  vec3 color = vec3(.0);

  // Cell points
  vec2 point[5];
  point[0] = vec2(0.83,0.75);
  point[1] = vec2(0.60,0.07);
  point[2] = vec2(0.28,0.64);
  point[3] =  vec2(0.31,0.26);
  point[4] =  vec2(0.11,0.76);
  point[4] =  u_mouse/u_resolution;

  float m_dist = 1.;

  for (int i; i<5; i++){
    float dist = distance(n, point[i]);
    m_dist = min(m_dist, dist);
  }

  color += m_dist;

  gl_FragColor = vec4(vec3(color), 1.0);
}