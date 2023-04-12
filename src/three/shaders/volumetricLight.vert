varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying float vViewZ;
      varying float vIntensity;
      uniform vec3 spotPosition;
      uniform float attenuation;      
      void main() {
        // compute intensity
        vNormal = normalize( normalMatrix * normal );
        vec4 worldPosition	= modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;
        vec4 viewPosition = viewMatrix * worldPosition;
        vViewZ = viewPosition.z;
        float intensity	= distance(worldPosition.xyz, spotPosition) / attenuation;
        intensity	= 1.0 - clamp(intensity, 0.0, 1.0);
        vIntensity = intensity;        
        // set gl_Position
        gl_Position	= projectionMatrix * viewPosition;
      }