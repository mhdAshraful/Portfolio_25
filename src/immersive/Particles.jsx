import React from 'react'
import { SphereGeometry } from 'three'

const Particles = React.forwardRef((props, ref) => {
	const pointsRef = React.useRef(ref)

	const count = 64
	let sprade = 15
	const particlesPosition = new Float32Array(count * count * 3)
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			let k = i * count + j
			// console.log('this k', k)

			/***
 * This creates a grid of points:
Width: 15 units, Height: 15 units,
Spaced evenly across both dimensions
Aligned starting from (0,0,0) to (15,15,0)
It could be centered by subtracting 7.5 from both x and y if needed:
 */

			particlesPosition[k * 3 + 0] = (sprade * i) / (count - sprade * 0.5)
			particlesPosition[k * 3 + 1] = (sprade * j) / (count - sprade * 0.5)
			particlesPosition[k * 3 + 2] = 0
		}
	}
	const particleUV = new Float32Array(count * count * 2)
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			const k = i * count + j

			particleUV[k * 2 + 0] = i / (count - 1)
			particleUV[k * 2 + 1] = j / (count - 1)
		}
	}

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={particlesPosition.length / 3}
					itemSize={3}
					array={particlesPosition}
				/>
				<bufferAttribute
					attach="attributes-uv"
					count={particleUV.length / 2}
					itemSize={2}
					array={particleUV}
				/>
			</bufferGeometry>
			<renderMaterial />
		</points>
	)
})
