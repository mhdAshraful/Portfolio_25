import React, { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import Band from "./Card";
import FloatingRibbon, { MultiRibbon } from "./FloatingRibbon";
import { Model as Ring } from "./Ring";
import ParticleGrid from "./ParticleGrid";

/**
 * SceneController - Manages which 3D elements are visible based on current section
 * Uses section context to show/hide elements as user scrolls
 */
const SceneController = ({ currentSection }) => {
	// Determine which elements should be visible based on section
	const showRibbon = currentSection === "webgl";
	currentSection === "webgl";

	// const showBand = currentSection === "webgl";

	return (
		<>
			{/* Physics-based Band (existing) */}
			{/* {showBand && (
				<Physics
					interpolate
					gravity={[0, -60, 0]}
					timeStep={1 / 60}
					// debug={true}
				>
					<Band />
				</Physics>
			)} */}

			{/* Floating Ribbon for webgl section */}
			<Suspense fallback={null}>
				<MultiRibbon
					count={1}
					isVisible={showRibbon}
					currentSection={currentSection}
				/>
				<ParticleGrid currentSection={currentSection} />
				<Ring currentSection={currentSection} />
			</Suspense>
		</>
	);
};

export default SceneController;
