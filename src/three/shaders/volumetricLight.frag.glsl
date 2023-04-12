#include <packing>
varying vec3 vNormal;
varying vec3 vWorldPosition;
uniform vec3 lightColor;
uniform vec3 spotPosition;
uniform float attenuation;
uniform float anglePower;
uniform sampler2D depth;
uniform vec2 resolution;
uniform float cameraNear;
uniform float cameraFar;
varying float vViewZ;
varying float vIntensity;
uniform float opacity;

float readDepth(sampler2D depthSampler, vec2 coord) {
  float fragCoordZ = texture2D(depthSampler, coord).x;
  float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
  return viewZ;
}

void main() {
  float d = 1.0;
  bool isSoft = resolution[0] > 0.0 && resolution[1] > 0.0;
  if(isSoft) {
    vec2 sUv = gl_FragCoord.xy / resolution;
    d = readDepth(depth, sUv);
  }
  float intensity = vIntensity;
  vec3 normal = vec3(vNormal.x, vNormal.y, abs(vNormal.z));
  float angleIntensity = pow(dot(normal, vec3(0.0, 0.0, 1.0)), anglePower);
  intensity *= angleIntensity;
  // fades when z is close to sampled depth, meaning the cone is intersecting existing geometry
  if(isSoft) {
    intensity *= smoothstep(0., 1., vViewZ - d);
  }
  gl_FragColor = vec4(lightColor, intensity * opacity);
  #include <tonemapping_fragment>
  #include <encodings_fragment>
}