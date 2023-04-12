uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

const int MAX = 64;
const int GRID_SIZE = 3; // Total cells = GRID_SIZE * GRID_SIZE

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
  vec2 n = gl_FragCoord.xy / u_resolution.xy;
  //n.x *= u_resolution.x / u_resolution.y;

  vec3 color = vec3(.0);

  // Cell points
  vec2 point[MAX];
  float unit = 1. / float(GRID_SIZE);
  float h_unit = unit / 2.;
  float attenuate_offset = .9;

  // Columns
  int i = 0;
  for(int col = 0; col < GRID_SIZE; col++) {
    // Rows
    for(int row = 0; row < GRID_SIZE; row++) {
      float offsetX = sin(u_time * random(vec2(float(i)))) * h_unit * attenuate_offset;
      float offsetY = cos(u_time * random(vec2(float(i)))) * h_unit * attenuate_offset;
      point[i] = vec2((offsetX + unit * float(row)) + h_unit, (offsetY + unit * float(col)) + h_unit);
      i+=1;
    }
  }

  //point[0] = u_mouse / u_resolution;

  float m_dist = 1.;

  for(int i=0; i < GRID_SIZE*GRID_SIZE; i++) {
    float dist = distance(n, point[i]);
    m_dist = min(m_dist, dist);
  }

  color += m_dist;

  gl_FragColor = vec4(vec3(color), 1.0);
}