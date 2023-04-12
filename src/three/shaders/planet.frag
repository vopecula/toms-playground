uniform vec3 u_light_pos;
varying vec3 v_position;
varying vec3 v_normal;
varying vec3 v_light;
varying vec2 v_uv;
uniform sampler2D u_albedo_map;
uniform sampler2D u_specular_map;
uniform sampler2D u_clouds_map;
uniform sampler2D u_night_map;

void main() {
  vec3 albedo = texture2D(u_albedo_map, v_uv).xyz;
  vec3 specular = texture2D(u_albedo_map, v_uv).xyz;
  vec3 clouds = texture2D(u_clouds_map, v_uv).xyz;
  vec3 night = texture2D(u_night_map, v_uv).xyz;

  float brightness = dot(v_light, v_normal);
  float nightLightStrength = 2.0; // 1.0 default
  float dayNightBorderHardness = 3.0; // 1.0 default

  vec3 nightLight = clamp(night * nightLightStrength, 0.0, 1.0) * (1.0 - clamp((brightness * dayNightBorderHardness + 1.0) / 2.0, 0.0, 1.0));
  nightLight = nightLight * (1.0 - clouds.z); // Add clouds to the night sky too
  vec3 daylight = ((albedo * (1.0 - clouds.z)) + clouds) * brightness;

  //gl_FragColor = vec4(vec3(clamp(brightness, 0.0, 1.0)  * 2.0), 1.0);
  gl_FragColor = vec4((daylight + nightLight), 1.0);
}