import React from "react";
import { Canvas } from "@react-three/fiber";
import SceneCleanup from "./SceneCleanUp";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";

import { Suspense } from "react";

const CanvasContainer = (props) => {
	return (
		<Canvas
			camera={{ position: [0, 0, 30], fov: 45 }}
			style={{ pointerEvents: "auto" }}
		>
			<SceneCleanup />
			<color attach="background" args={["#fffff2"]} />
			<ambientLight intensity={Math.PI} />

			<Environment>
				<Lightformer
					intensity={2}
					color="white"
					position={[0, -1, 5]}
					rotation={[0, 0, Math.PI / 3]}
					scale={[100, 0.1, 1]}
				/>

				<Lightformer
					intensity={3}
					color="white"
					position={[-1, -1, 1]}
					rotation={[0, 0, Math.PI / 3]}
					scale={[100, 0.1, 1]}
				/>
				<Lightformer
					intensity={3}
					color="white"
					position={[1, 1, 1]}
					rotation={[0, 0, Math.PI / 3]}
					scale={[100, 0.1, 1]}
				/>
				<Lightformer
					intensity={10}
					color="white"
					position={[-10, 0, 14]}
					rotation={[0, Math.PI / 2, Math.PI / 3]}
					scale={[100, 10, 1]}
				/>
			</Environment>

			<OrbitControls />
		</Canvas>
	);
};

export default CanvasContainer;
