#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  vec2 uv = p * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  float zoom = 2.0;
  vec3 camPos = vec3(0.0, 0.0, -zoom);
  vec3 lightPos = vec3(3.0, 2.0, -0.2);
  vec3 rayDir = normalize(vec3(uv, zoom));

  vec3 spherePos = vec3(0.0, 0.0, 0.0);
  vec3 sphere2Pos = vec3(0.0, 0.5, 0.0);
  float sphereRadius = 0.5;

  float t = 0.0;
  for(int i = 0; i < 5; i++) {
    vec3 pos = camPos + t * rayDir;
    float dist = length(pos - spherePos) - sphereRadius;
    float dist2 = length(pos - sphere2Pos) - .3;
    float dist_m = min(dist, dist2);
    if(dist_m < 0.01) {
      gl_FragColor = vec4(vec3(dot(rayDir, lightPos)), 1.0);
      return;
    }
    t += dist_m;
  }

  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
