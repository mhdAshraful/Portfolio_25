import React, { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import Band from "./Card";

// logic for when to chagnge which scene
const SceneController = () => {
	return (
		<>
			{/* <Particles /> */}
			<Suspense>
				<Physics
					interpolate
					gravity={[0, -40, 0]}
					timeStep={1 / 60}
					debug={true}
				>
					<Band />
				</Physics>
			</Suspense>
		</>
	);
};

export default SceneController;
