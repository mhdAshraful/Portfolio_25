import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { useLayoutTrackerContext } from "../utils/SecitonContext";
import { useTouchDevice } from "/src/utils/deviceDetector";

export function Model({ currentSection = "home" }) {
	const { nodes, materials } = useGLTF("/assets/3d/Ring1.glb");
	const ringRef = useRef();
	const { domElmPos } = useLayoutTrackerContext();
	const { size, camera } = useThree();
	// const texture = useTexture(textureUrl);
	const mouseRef = useRef(new THREE.Vector2(0, 0));
	const targetMouseRef = useRef(new THREE.Vector2(0, 0));

	const isVisible = currentSection === "interaction";
	const isTouch = useTouchDevice();

	useEffect(() => {
		const handleMouseMove = (event) => {
			targetMouseRef.current.x = (event.clientX / size.width) * 2 - 1;
			targetMouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [size.width, size.height]);

	useGSAP(
		() => {
			if (!ringRef.current) return;

			gsap.killTweensOf(ringRef.current.scale);
			if (isVisible) {
				ringRef.current.visible = true;
			}
			gsap.to(ringRef.current.scale, {
				x: isVisible ? 1 : 0,
				y: isVisible ? 1 : 0,
				z: isVisible ? 1 : 0,
				duration: 0.6,
				ease: isVisible ? "power3.out" : "power2.in",
				onComplete: () => {
					if (!isVisible && ringRef.current) {
						ringRef.current.visible = false;
					}
				},
			});
		},
		{ dependencies: [isVisible] },
	);

	useFrame(() => {
		if (!ringRef.current || !isVisible) return;

		const target = domElmPos.interaction;
		if (!target) return;

		const centerX = target.x + target.width / 2;
		const centerY = target.y + target.height / 2;

		const normaliseDeviceCoordinateX = (centerX / size.width) * 2 - 1;
		const normaliseDeviceCoordinateY = -(centerY / size.height) * 2 + 1;

		mouseRef.current.lerp(targetMouseRef.current, 0.8);
		const mouseOffsetX = mouseRef.current.x * 0.42;
		const mouseOffsetY = mouseRef.current.y * 0.42;
		// const mouseOffsetZ = Math.abs(mouseRef.current.y) * 0.5;

		const vec = new THREE.Vector3(
			normaliseDeviceCoordinateX + mouseOffsetX + 4,
			normaliseDeviceCoordinateY + mouseOffsetY,
			0.5,
		).unproject(camera);
		vec.z = 45;

		ringRef.current.position.lerp(vec, 0.1);
		// ringRef.current.rotation.z += 0.003;
		ringRef.current.rotation.y += 0.004;
		// ringRef.current.rotation.x += 0.002;
	});

	return (
		<group
			ref={ringRef}
			visible={false}
			scale={isTouch ? 0.7 : 1}
			dispose={null}
		>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Circle.geometry}
				material={materials["Material.001"]}
			></mesh>
		</group>
	);
}

useGLTF.preload("/assets/3d/Ring1.glb");
