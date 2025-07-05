import { Canvas, useThree } from '@react-three/fiber'
import React, { useMemo } from 'react'
import SceneController from './SceneController'
import SceneCleanup from './SceneCleanUp'
import { Environment, OrbitControls } from '@react-three/drei'

const CanvasContainer = (props) => {
	return (
		<div className="canvas_wrapper">
			<Canvas orthographic camera={{ position: [0, 0, 100], zoom: 50 }}>
				<color attach={'background'} args={['#fffff2']} />
				<SceneCleanup />
				<ambientLight color={'#fffff2'} intensity={1} />

				{/* <Environment preset="studio"> */}
				{/* <SceneController /> */}
				{/* </Environment> */}
				<OrbitControls />
			</Canvas>
		</div>
	)
}

export default CanvasContainer
