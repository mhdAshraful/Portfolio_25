import React, { use, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { RenderMaterial } from './Materials'
import { useLayoutTrackerContext } from '../utils/SecitonContext'
import card from '/assets/3d/card.glb'
// logic for when to chagnge which scene
const SceneController = () => {
	const location = window.location.hash.split('#')

	return (
		<>
			<Particles />
			
			<CardBadge />
		</>
	)
}

export default SceneController

const Particles = (props) => {
	const { domElmPos } = useLayoutTrackerContext()
	const useWorldPosition = (key) => {
		const { size, viewport } = useThree()
		const { domElmPos } = useLayoutTrackerContext()
		const dom = domElmPos[key]

		return useMemo(() => {
			if (!dom) return new THREE.Vector3(0, 0, 0)

			const x = dom.left + dom.width / 2
			const y = dom.top + dom.height / 2

			const worldX = (x / size.width) * viewport.width - viewport.width / 2
			const worldY =
				viewport.height / 2 - (y / size.height) * viewport.height
			return new THREE.Vector3(worldX, worldY, 0)
		}, [dom, size, viewport])
	}

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
		<points position={[0, 0, 0]}>
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
}

const CardBadge = (props) => {
	const { nodes, materials } = useGLTF(card)

	const idMat = new THREE.MeshBasicMaterial({
		color: '#ff0000',
		side: THREE.DoubleSide,
	})

	return (
		<group
			{...props}
			dispose={null}
			position={[8, 0, 0]}
			scale={60}
			rotation-y={Math.PI / 2}
		>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.ID.geometry}
				material={idMat}
				rotation={[0, 0, -Math.PI / 2]}
				scale={[0.167, 0.002, 0.104]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.clasp.geometry}
				material={nodes.clasp.material}
				position={[0, 0.066, 0]}
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				scale={[0.011, 0.01, 0.01]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.ribbon.geometry}
				material={materials['Material.001']}
				position={[0.001, -0.013, -0.01]}
				rotation={[0, 0, -0.034]}
			/>
		</group>
	)
}
useGLTF.preload(card)

// const Box = (props) => {
// 	const { nodes, materials } = useGLTF('/assets/3d/Boxed.glb')
// 	const material = new THREE.MeshBasicMaterial({ color: 0xa30200 })
// 	const mat2 = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// 	const cubeRef = useRef(null)
// 	const groupRef = useRef(null)

// 	useFrame((state, dt) => {})

// 	return (
// 		<group {...props} dispose={null} ref={groupRef}>
// 			<mesh
// 				castShadow
// 				receiveShadow
// 				ref={cubeRef}
// 				geometry={nodes.Cube.geometry}
// 				material={material}
// 				// material={nodes.Cube.material}
// 			/>
// 			<mesh
// 				castShadow
// 				receiveShadow
// 				geometry={nodes.Text001.geometry}
// 				material={mat2}
// 				// material={nodes.Text001.material}
// 			/>
// 			<mesh
// 				castShadow
// 				receiveShadow
// 				geometry={nodes.Text002.geometry}
// 				material={mat2}
// 				// material={nodes.Text002.material}
// 			/>
// 			<mesh
// 				castShadow
// 				receiveShadow
// 				geometry={nodes.Text003.geometry}
// 				material={mat2}
// 				// material={nodes.Text003.material}
// 			/>
// 			<mesh
// 				castShadow
// 				receiveShadow
// 				geometry={nodes.Text004.geometry}
// 				material={mat2}
// 				// material={nodes.Text004.material}
// 			/>
// 			<mesh
// 				castShadow
// 				receiveShadow
// 				geometry={nodes.Text005.geometry}
// 				material={mat2}
// 				// material={nodes.Text005.material}
// 			/>
// 			<mesh
// 				castShadow
// 				receiveShadow
// 				geometry={nodes.Text006.geometry}
// 				material={mat2}
// 				// material={nodes.Text006.material}
// 			/>
// 		</group>
// 	)
// }
// useGLTF.preload('/assets/3d/Boxed.glb')

// const Hand = () => {
// 	return null
// }
