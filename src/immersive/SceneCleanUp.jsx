import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function SceneCleanup() {
	const { gl, scene } = useThree();
	useEffect(() => {
		// anything that is in retur statement in useEffect will run when component dismounts
		return () => {
			// Dispose the scene manually
			scene.traverse((object) => {
				if (object.geometry) object.geometry.dispose();
				if (object.material) {
					if (Array.isArray(object.material)) {
						object.material.forEach((m) => m.dispose());
					} else {
						object.material.dispose();
					}
				}
			});

			// Dispose renderer
			gl.dispose();
		};
	}, []);
}
export default SceneCleanup;
