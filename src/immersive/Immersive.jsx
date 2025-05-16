import { Canvas } from "@react-three/fiber";
import React from "react";
import SceneController from "./SceneController";
import SceneCleanup from "./SceneCleanUp";

const CanvasContainer = () => {
	return (
		<div className="canvas_wrapper">
			<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
				<SceneCleanup />
				<ambientLight intensity={0.5} />
				<SceneController />
			</Canvas>
		</div>
	);
};

export default CanvasContainer;
