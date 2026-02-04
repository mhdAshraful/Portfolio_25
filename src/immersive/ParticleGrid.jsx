import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PARTICLE_COUNT_X = 200;
const PARTICLE_COUNT_Y = 200;

const ParticleGrid = ({
	currentSection = "interaction",
	z = 40,
	width = 20,
	height = 10,
}) => {
	const pointsRef = useRef();
	const mouseRef = useRef(new THREE.Vector2(0, 0));
	const targetMouseRef = useRef(new THREE.Vector2(0, 0));
	const raycasterRef = useRef(new THREE.Raycaster());
	const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -z));

	const { size, camera } = useThree();

	const isVisible = currentSection === "interaction";

	useGSAP(
		() => {
			if (!pointsRef.current) return;

			gsap.killTweensOf(pointsRef.current.scale);
			if (isVisible) {
				pointsRef.current.visible = true;
			}
			gsap.to(pointsRef.current.scale, {
				x: isVisible ? 1 : 0,
				y: isVisible ? 1 : 0,
				z: isVisible ? 1 : 0,
				duration: 0.5,
				ease: isVisible ? "power4.inOut" : "power4.inOut",
				onComplete: () => {
					if (!isVisible && pointsRef.current) {
						pointsRef.current.visible = false;
					}
				},
			});
			gsap.to(pointsRef.current.scale, {
				x: isVisible ? 1 : 0,
				y: isVisible ? 1 : 0,
				z: isVisible ? 1 : 0,
				duration: 0.5,
				ease: isVisible ? "power4.inOut" : "power4.inOut",
				onComplete: () => {
					if (!isVisible && pointsRef.current) {
						pointsRef.current.visible = false;
					}
				},
			});
		},
		{ dependencies: [isVisible] },
	);

	const { positions, basePositions } = useMemo(() => {
		const total = PARTICLE_COUNT_X * PARTICLE_COUNT_Y;
		const positionsArray = new Float32Array(total * 3);
		const baseArray = new Float32Array(total * 3);

		let i = 0;
		for (let y = 0; y < PARTICLE_COUNT_Y; y++) {
			for (let x = 0; x < PARTICLE_COUNT_X; x++) {
				const px = (x / (PARTICLE_COUNT_X - 1) - 0.5) * width;
				const py = (y / (PARTICLE_COUNT_Y - 1) - 0.5) * height;
				const pz = z;

				positionsArray[i * 3] = px;
				positionsArray[i * 3 + 1] = py;
				positionsArray[i * 3 + 2] = pz;

				baseArray[i * 3] = px;
				baseArray[i * 3 + 1] = py;
				baseArray[i * 3 + 2] = pz;

				i += 1;
			}
		}

		return { positions: positionsArray, basePositions: baseArray };
	}, [height, width, z]);

	const materialRef = useRef();
	const shader = useMemo(
		() => ({
			uniforms: {
				uTime: { value: 0 },
				uMouseWorld: { value: new THREE.Vector3(0, 0, z) },
				uIntensity: { value: 1.0 },
				uPointSize: { value: 5.0 },
			},
			vertexShader: `
precision highp float;

uniform float uTime;
uniform vec3 uMouseWorld;
uniform float uIntensity;
uniform float uPointSize;

varying vec2 vUv;
varying float vDistort;

// Simplex noise (3D)
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
	vec4 x = x_ * ns.x + ns.yyyy;
	vec4 y = y_ * ns.x + ns.yyyy;
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
	vec3 pos = position;
	vUv = position.xy;

	float dist = distance(pos.xy, uMouseWorld.xy);
	float radius = 5.;
	float influence = max(0.0, 1.0 - dist / radius);

	float freq = .2;
	float speed = 2.0;
	float amp = .83;
	float wave = sin(dist * freq - uTime * speed) * amp * influence;
	float noise = snoise(vec3(pos.xy * 0.3, uTime )) * 0.25;
	 wave += noise * influence;

	vDistort = wave;
	pos.z += wave * uIntensity;

	vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
	gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = uPointSize;
}
`,
			fragmentShader: `
precision highp float;

varying vec2 vUv;
varying float vDistort;

uniform float uIntensity;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
	return a + b * cos(6.28318 * (c * t + d));
}

void main() {
	float distort = vDistort * uIntensity;

	vec3 brightness = vec3(0.25, 0.35, 0.35);
	vec3 contrast = vec3(0.8, 0.5, 0.8);
	vec3 oscilation = vec3(1.0, 1.0, 1.0);
	vec3 phase = vec3(0.0, 0.1, 0.2);

	vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);

	float alpha = 1.0;
	vec2 p = gl_PointCoord - 0.5;
	float d = length(p);
	alpha *= smoothstep(0.5, 0.2, d);

	gl_FragColor = vec4(color, alpha);
}
`,
			transparent: true,
			depthWrite: false,
		}),
		[z],
	);

	useEffect(() => {
		const handleMouseMove = (event) => {
			targetMouseRef.current.x = (event.clientX / size.width) * 2 - 1;
			targetMouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [size.width, size.height]);

	useFrame((state) => {
		if (!pointsRef.current || !isVisible) return;

		mouseRef.current.lerp(targetMouseRef.current, 0.9);

		raycasterRef.current.setFromCamera(mouseRef.current, camera);
		const intersectionPoint = new THREE.Vector3();
		raycasterRef.current.ray.intersectPlane(
			planeRef.current,
			intersectionPoint,
		);

		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
			materialRef.current.uniforms.uMouseWorld.value.copy(intersectionPoint);
		}
	});

	return (
		<points ref={pointsRef} visible={false} scale={0} renderOrder={0}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					array={positions}
					count={positions.length / 3}
					itemSize={3}
				/>
			</bufferGeometry>
			<shaderMaterial ref={materialRef} attach="material" {...shader} />
		</points>
	);
};

export default ParticleGrid;
