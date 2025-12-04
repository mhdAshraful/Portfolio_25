import { Canvas, useThree } from '@react-three/fiber'
import React, { useMemo } from 'react'
import SceneController from './SceneController'
import SceneCleanup from './SceneCleanUp'
import { Environment, OrbitControls } from '@react-three/drei'

const CanvasContainer = (props) => {
	return (
		<div className="canvas_wrapper">
			<Canvas camera={{ position: [0, 0, 100], zoom: 5 }}>
				<color attach={'background'} args={['#fffff2']} />
				<SceneCleanup />
				<ambientLight color={'#ffffff'} intensity={1} />
				{/* <gridHelper
					args={[20, 20, '#f67070', '#ed6161']}
					rotation={[Math.PI / 2, 0, 0]}
				/> */}
				<Environment preset="city" />
				<SceneController />

				<OrbitControls />
			</Canvas>
		</div>
	)
}

export default CanvasContainer
