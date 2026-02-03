import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RibbonMaterial } from "./RibbonMaterial";

gsap.registerPlugin(ScrollTrigger);

/**
 * FloatingRibbon - A floating ribbon mesh that hangs from top of viewport
 * Features:
 * - Unrolling animation from top to bottom
 * - Organic sine-wave animation (hangs from top)
 * - Mouse repulsion with elegant ripple effect
 * - Double-sided with different front/back appearance
 * - Section-based visibility using context
 * - Responsive sizing
 */
const FloatingRibbon = ({
	segments = { x: 64, y: 256 },
	isVisible = true,
	currentSection = "webgl",
	delay = 0,
}) => {
	const meshRef = useRef();
	const materialRef = useRef();
	const mouseRef = useRef(new THREE.Vector2(0, 0));
	const targetMouseRef = useRef(new THREE.Vector2(0, 0));
	const texture1 = useMemo(
		() => new THREE.TextureLoader().load("/assets/images/r1.png"),
		[],
	);
	const texture2 = useMemo(
		() => new THREE.TextureLoader().load("/assets/images/r2.png"),
		[],
	);
	// Animation state refs
	const animationRef = useRef({
		unrollProgress: 0, // 0 = fully rolled up, 1 = fully unrolled
		entranceProgress: 0, // Overall visibility/opacity
		waveIntensity: 0, // How much the ribbon waves
	});

	const prevSectionRef = useRef(currentSection);
	const hasAnimatedRef = useRef(false);

	const { viewport, size } = useThree();

	// Calculate responsive dimensions based on viewport
	const dimensions = useMemo(() => {
		const vw = viewport.width;
		const vh = viewport.height;

		return {
			width: vw * 0.05, // Ribbon width
			height: vh * 1.14, // Taller than viewport
			posX: vw * 0.3, // Position to the right side
			posY: vh * 0.6, // Anchor at top of viewport
		};
	}, [viewport.width, viewport.height]);

	// Create the ribbon geometry
	const geometry = useMemo(() => {
		const geo = new THREE.PlaneGeometry(
			dimensions.width,
			dimensions.height,
			segments.x,
			segments.y,
		);

		// Shift geometry so top edge is at y=0 (ribbon hangs down)
		geo.translate(0, -dimensions.height / 2, 0);
		geo.computeVertexNormals();

		return geo;
	}, [dimensions.width, dimensions.height, segments.x, segments.y]);

	// Mouse move handler
	useEffect(() => {
		const handleMouseMove = (event) => {
			targetMouseRef.current.x = (event.clientX / size.width) * 2 - 1;
			targetMouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [size.width, size.height]);

	// Section-based animation trigger
	useEffect(() => {
		const anim = animationRef.current;

		// Check if we should animate in
		const shouldShow = isVisible && currentSection === "webgl";

		if (shouldShow && !hasAnimatedRef.current) {
			// Unroll animation - ribbon unfolds from top to bottom
			hasAnimatedRef.current = true;

			// Kill any existing animations
			gsap.killTweensOf(anim);

			// Master timeline for entrance
			const tl = gsap.timeline({ delay: delay });

			// Phase 1: Fade in and start unroll
			tl.to(anim, {
				entranceProgress: 1,
				duration: 0.6,
				ease: "power4.out",
			});

			// Phase 2: Unroll from top to bottom (main visual effect)
			tl.to(
				anim,
				{
					unrollProgress: 1,
					duration: 1,
					ease: "power4.inOut",
				},
				"-=0.2",
			);

			// Phase 3: Bring in wave movement
			tl.to(
				anim,
				{
					waveIntensity: 9,
					duration: 1,
					ease: "power2.inOut",
				},
				"-=0.2",
			);
		} else if (!shouldShow && hasAnimatedRef.current) {
			// Roll up animation when leaving section
			hasAnimatedRef.current = false;

			gsap.killTweensOf(anim);

			const tl = gsap.timeline();

			// Reduce wave intensity
			tl.to(anim, {
				waveIntensity: 0,
				duration: 0.2,
				ease: "power2.in",
			});

			// Roll back up
			tl.to(
				anim,
				{
					unrollProgress: 0,
					duration: 1,
					ease: "power2.inOut",
				},
				"-=0.2",
			);

			// Fade out
			tl.to(
				anim,
				{
					entranceProgress: 0,
					duration: 0.3,
					ease: "power2.in",
				},
				"-=0.2",
			);
		}

		prevSectionRef.current = currentSection;
	}, [currentSection, isVisible, delay]);

	// Animation frame update
	useFrame((state) => {
		if (!materialRef.current) return;

		const anim = animationRef.current;

		// Update time uniform
		materialRef.current.uTime = state.clock.elapsedTime;

		// Smooth mouse interpolation
		mouseRef.current.lerp(targetMouseRef.current, 0.1);
		materialRef.current.uMouse.copy(mouseRef.current);

		// Update animation uniforms
		materialRef.current.uEntranceProgress = anim.entranceProgress;
		materialRef.current.uUnrollProgress = anim.unrollProgress;
		materialRef.current.uWaveIntensity = anim.waveIntensity;
		materialRef.current.uFrontTexture = texture1;
		materialRef.current.uBackTexture = texture2;

		// Update resolution
		materialRef.current.uResolution.set(size.width, size.height);
	});

	// Position ribbon
	const ribbonPosition = useMemo(() => {
		return [dimensions.posX, dimensions.posY, 0];
	}, [dimensions.posX, dimensions.posY]);

	// Always render but control visibility via shader
	return (
		<mesh
			ref={meshRef}
			geometry={geometry}
			position={ribbonPosition}
			frustumCulled={false}
		>
			<ribbonMaterial
				ref={materialRef}
				key={RibbonMaterial.key}
				attach="material"
				uFrontColor={new THREE.Color(0.9, 0.85, 0.75)}
				uBackColor={new THREE.Color(0.15, 0.14, 0.13)}
				transparent
				depthWrite={true}
				side={THREE.DoubleSide}
			/>
		</mesh>
	);
};

/**
 * MultiRibbon - Creates multiple ribbons for a fuller effect
 */
export const MultiRibbon = ({
	count = 3,
	isVisible = true,
	currentSection = "webgl",
}) => {
	const { viewport } = useThree();

	const ribbonConfigs = useMemo(() => {
		const configs = [];
		const spacing = viewport.width * 0.1;

		for (let i = 0; i < count; i++) {
			configs.push({
				id: i,
				offsetX: (i - (count - 1) / 2) * spacing,
				offsetZ: (i - (count - 1) / 2) * -0.3, // Depth variation
				scale: 1 - Math.abs(i - (count - 1) / 2) * 0.08,
				delay: i * 0.1, // Staggered unroll
			});
		}
		return configs;
	}, [count, viewport.width]);

	return (
		<group>
			{ribbonConfigs.map((config) => (
				<group
					key={config.id}
					position={[config.offsetX, 0, config.offsetZ]}
					scale={[config.scale, config.scale, 1]}
				>
					<FloatingRibbon
						isVisible={isVisible}
						currentSection={currentSection}
						delay={config.delay}
					/>
				</group>
			))}
		</group>
	);
};

export default FloatingRibbon;
