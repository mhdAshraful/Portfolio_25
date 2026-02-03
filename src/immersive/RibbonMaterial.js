import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import ribbonVertex from "../glsl/ribbon.vert";
import ribbonFragment from "../glsl/ribbon.frag";

/**
 * RibbonMaterial - Custom shader material for the floating ribbon
 * Features:
 * - Unrolling animation from top to bottom
 * - Organic wave animation with simplex noise
 * - Mouse repulsion with ripple effects
 * - Double-sided rendering with different textures/colors
 * - Metallic front / matte patterned back
 * - Section-based visibility
 */
export const RibbonMaterial = shaderMaterial(
	{
		uTime: 0,
		uMouse: new THREE.Vector2(0, 0),
		uMouseRadius: 0.4,
		uScrollProgress: 0,
		uEntranceProgress: 0,
		uUnrollProgress: 0, // 0 = rolled up, 1 = fully unrolled
		uWaveIntensity: 4, // Controls wave animation intensity
		uResolution: new THREE.Vector2(1920, 1080),
		uFrontTexture: null,
		uBackTexture: null,
		uFrontColor: new THREE.Color(0.9, 0.85, 0.75),
		uBackColor: new THREE.Color(0.15, 0.14, 0.13),
		uMetalness: 0.8,
		uRoughness: 0.2,
	},
	ribbonVertex,
	ribbonFragment,
	(material) => {
		material.side = THREE.DoubleSide;
		material.transparent = true;
		material.depthWrite = true;
	},
);

extend({ RibbonMaterial });

export default RibbonMaterial;
