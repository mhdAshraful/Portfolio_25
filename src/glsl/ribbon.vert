precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseRadius;
uniform float uScrollProgress;
uniform float uEntranceProgress;
uniform float uUnrollProgress;
uniform float uWaveIntensity;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vWave;
varying float vMouseInfluence;
varying float vUnrollMask;

// Simplex noise function for organic movement
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  vec3 pos = position;
  
  // === UNROLL ANIMATION ===
  // UV.y goes from 1 (top) to 0 (bottom) after geometry translate
  // We want to reveal from top to bottom
  float verticalPos = 1.0 - uv.y; // 0 at top, 1 at bottom
  
  // Create unroll reveal mask - parts below the unroll line are hidden
  float unrollLine = uUnrollProgress; // 0 to 1 as it unrolls
  float unrollMask = smoothstep(unrollLine - 0.1, unrollLine, verticalPos);
  vUnrollMask = 1.0 - unrollMask; // 1 = visible, 0 = hidden
  
  // Roll effect - vertices above the unroll line curl up
  float rollAmount = unrollMask * (1.0 - uUnrollProgress);
  
  // Curl the ribbon - creates a rolled up effect at the unroll edge
  float rollRadius = 0.5;
  float rollAngle = rollAmount * 3.14159 * 2.0; // Full rotation when rolled
  
  // Apply curl deformation
  pos.z += sin(rollAngle) * rollRadius * rollAmount;
  pos.y += (1.0 - cos(rollAngle)) * rollRadius * rollAmount * 0.5;
  
  // Squash vertices that are rolled up toward the unroll line
  float squashFactor = max(0.0, verticalPos - unrollLine);
  pos.y += squashFactor * (1.0 - uUnrollProgress) * 2.0;
  
  // === WAVE ANIMATION (only for unrolled parts) ===
  float hangFactor = verticalPos; // 0 at top, 1 at bottom
  hangFactor = pow(hangFactor, 1.5);
  
  // Only apply waves to visible/unrolled portions
  float waveMultiplier = vUnrollMask * uWaveIntensity;
  
  // Primary wave animation
  float waveSpeed = 0.6;
  float waveFreq = 2.0;
  
  float wave1 = sin(uv.y * waveFreq * 3.14159 + uTime * waveSpeed) * 0.3;
  float wave2 = sin(uv.y * waveFreq * 2.0 + uTime * waveSpeed * 0.7 + 1.0) * 0.15;
  float wave3 = snoise(vec3(uv * 3.0, uTime * 0.3)) * 0.1;
  
  float totalWave = (wave1 + wave2 + wave3) * hangFactor * waveMultiplier;
  vWave = totalWave;
  
  // Apply wave to X and Z for 3D movement
  pos.x += totalWave * 0.8;
  pos.z += sin(uv.y * 4.0 + uTime * 0.5) * hangFactor * 0.2 * waveMultiplier;
  
  // === MOUSE REPULSION ===
  vec2 mouseNDC = uMouse;
  vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
  
  vec4 clipPos = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
  vec2 screenPos = clipPos.xy / clipPos.w;
  
  float mouseDist = length(screenPos - mouseNDC);
  float mouseInfluence = smoothstep(uMouseRadius, 0.0, mouseDist) * vUnrollMask * uWaveIntensity;
  vMouseInfluence = mouseInfluence;
  
  if (mouseInfluence > 0.0) {
    vec2 repelDir = normalize(screenPos - mouseNDC);
    float ripple = sin(mouseDist * 30.0 - uTime * 5.0) * 0.5 + 0.5;
    
    pos.x += repelDir.x * mouseInfluence * ripple * 0.5 * hangFactor;
    pos.z += mouseInfluence * ripple * 0.3 * hangFactor;
    
    float perpWave = sin(uv.y * 10.0 - uTime * 3.0) * mouseInfluence * 0.2;
    pos.x += perpWave * hangFactor;
  }
  
  // Final position
  vPosition = pos;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
