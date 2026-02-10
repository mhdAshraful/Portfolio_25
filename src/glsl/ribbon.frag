precision highp float;

uniform float uTime;
uniform sampler2D uFrontTexture;
uniform sampler2D uBackTexture;
uniform vec3 uFrontColor;
uniform vec3 uBackColor;
uniform float uMetalness;
uniform float uRoughness;
uniform float uEntranceProgress;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vWave;
varying float vMouseInfluence;
varying float vUnrollMask;

// Fresnel effect for metallic sheen
float fresnel(vec3 viewDir, vec3 normal, float power) {
  return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
}

void main() {
  // Discard pixels that are still rolled up
  if (vUnrollMask < 0.01) {
    discard;
  }
  
  // Determine if we're viewing front or back face
  bool isFrontFace = gl_FrontFacing;
  
  vec3 viewDir = normalize(-vPosition);
  vec3 normal = normalize(vNormal);
  
  // Flip normal for back face
  if (!isFrontFace) {
    normal = -normal;
  }
  
  vec3 baseColor;
  float textureAlpha = 1.0;
  
  
    // Front face: Sample from front texture
    vec4 texColor = texture2D(uFrontTexture, vUv);
    baseColor = texColor.rgb;
    textureAlpha = texColor.a;
    
    // Add metallic shimmer based on wave
    float shimmer = sin(vWave * 5.0 + uTime * 2.0) * 0.5 + 0.5;
    baseColor += shimmer * 0.35 * vec3(1.0, 0.95, 0.8);
    
    // Fresnel highlight for metallic/shiny look
    float fres = fresnel(viewDir, normal, 3.0);
    baseColor += fres * 0.2 * vec3(1.0, 0.498, 0.395);
    
    // Specular highlights
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 20.0);
    baseColor += spec * 0.3 * vec3(1.0);
    
  
  
  // Mouse interaction glow
  if (vMouseInfluence > 0.0) {
    vec3 glowColor = isFrontFace ? vec3(1.0, 0.9, 0.7) : vec3(0.4, 0.35, 0.3);
    baseColor += vMouseInfluence * 0.022 * glowColor;
  }
  
  // Combined alpha from entrance progress, unroll mask, and texture alpha
  float alpha = uEntranceProgress * vUnrollMask * textureAlpha;
  
  // Soft edge at the unroll line
  float unrollEdge = smoothstep(0.0, 0.15, vUnrollMask);
  alpha *= unrollEdge;
  
  // Edge softening
  float edgeFade = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
  alpha *= edgeFade;
  
  gl_FragColor = vec4(baseColor, alpha);
}
