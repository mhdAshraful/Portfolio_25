import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import SceneController from "./SceneController";
import SceneCleanup from "./SceneCleanUp";
import { Environment } from "@react-three/drei";
import { useSectionContext } from "../utils/SecitonContext";

const CanvasContainer = () => {
	const { currentSection } = useSectionContext();

	return (
		<div className="canvas_wrapper">
			<Canvas
				camera={{ position: [0, 0, 50], fov: 50, near: 0.1, far: 1000 }}
				dpr={[1, 2]}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance",
				}}
			>
				<color attach={"background"} args={["#fffff2"]} />
				<SceneCleanup />
				<ambientLight color={"#ffffff"} intensity={0.8} />
				<directionalLight
					position={[5, 10, 5]}
					intensity={1}
					color="#fffaf0"
				/>
				<directionalLight
					position={[-5, 5, 3]}
					intensity={0.4}
					color="#e8e4dc"
				/>
				<Environment preset="city" background={false} />
				<Suspense fallback={null}>
					<SceneController currentSection={currentSection} />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default CanvasContainer;
