import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import {
	BallCollider,
	CuboidCollider,
	RigidBody,
	useRopeJoint,
	useSphericalJoint,
} from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/assets/3d/newCARD.glb')
useTexture.preload('/assets/3d/bp.webp')

function Band({ maxSpeed = 50, minSpeed = 30 }) {
	const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
	const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
	const segmentProps = {
		type: 'dynamic',
		canSleep: true,
		colliders: false,
		angularDamping: 2,
		linearDamping: 2,
	}
	const { nodes, materials } = useGLTF('/assets/3d/newCARD.glb')
	const texture = useTexture('/assets/3d/bp.webp')
	const { width, height } = useThree((state) => state.size)
	const [curve] = useState(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
			])
	)
	const [dragged, drag] = useState(false)
	const [hovered, hover] = useState(false)
	const scaller = 3

	/***
	 * The useRopeJoint and useSphericalJoint calls define joint positions (e.g., [[0, 0, 0], [0, 0, 0], 1] for rope joints
	 * and [[0, 0, 0], [0, 1.45, 0]] for the spherical joint). The third parameter in rope joints (1) is the rest length,
	 * and the second vector in the spherical joint ([0, 1.45, 0]) is the pivot point offset. Scale these distances by 3.
	 */

	useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.5 * scaller]) // prettier-ignore
	useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.5 * scaller]) // prettier-ignore
	useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.5 * scaller]) // prettier-ignore
	useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45 * scaller, 0]]) // prettier-ignore

	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = dragged ? 'grabbing' : 'grab'
			return () => void (document.body.style.cursor = 'auto')
		}
	}, [hovered, dragged])
	// width * 0.0009
	const [groupPosition, setGroupPosition] = useState([15, 18, 0])

	useFrame((state, delta) => {
		const newX = groupPosition[0]
		const newY = groupPosition[1] + scrollY * delta * 3
		const newZ = groupPosition[2]
		fixed.current.setTranslation({ x: newX, y: newY, z: newZ }, true)
	})

	useFrame((state, delta) => {
		if (dragged || window.scroll) {
			vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
			dir.copy(vec).sub(state.camera.position).normalize()
			vec.add(dir.multiplyScalar(state.camera.position.length()))
			;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
			card.current?.setNextKinematicTranslation({
				x: vec.x - dragged.x,
				y: vec.y - dragged.y,
				z: vec.z - dragged.z,
			})
		}
		if (fixed.current) {
			// Fix most of the jitter when over pulling the card
			;[j1, j2].forEach((ref) => {
				if (!ref.current.lerped)
					ref.current.lerped = new THREE.Vector3().copy(
						ref.current.translation()
					)
				const clampedDistance = Math.max(
					0.1,
					Math.min(
						1,
						ref.current.lerped.distanceTo(ref.current.translation())
					)
				)
				ref.current.lerped.lerp(
					ref.current.translation(),
					delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
				)
			})
			// Calculate catmul curve
			curve.points[0].copy(j3.current.translation())
			curve.points[1].copy(j2.current.lerped)
			curve.points[2].copy(j1.current.lerped)
			curve.points[3].copy(fixed.current.translation())
			band.current.geometry.setPoints(curve.getPoints(100))
			// Tilt it back towards the screen
			ang.copy(card.current.angvel())
			rot.copy(card.current.rotation())
			card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
		}
	})

	curve.curveType = 'chordal'
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping

	return (
		<>
			<group position={groupPosition}>
				<RigidBody
					// position={[0, 20, 0]}
					ref={fixed}
					{...segmentProps}
					type="fixed"
				/>
				<RigidBody
					position={[0.5 * scaller, 0, 0]}
					ref={j1}
					{...segmentProps}
				>
					<BallCollider args={[0.12 * scaller]} />
				</RigidBody>
				<RigidBody
					position={[1 * scaller, 0, 0]}
					ref={j2}
					{...segmentProps}
				>
					<BallCollider args={[0.12 * scaller]} />
				</RigidBody>
				<RigidBody
					position={[1.5 * scaller, 0, 0]}
					ref={j3}
					{...segmentProps}
				>
					<BallCollider args={[0.12 * scaller]} />
				</RigidBody>
				<RigidBody
					position={[2 * scaller, 0, 0]}
					ref={card}
					{...segmentProps}
					type={dragged ? 'kinematicPosition' : 'dynamic'}
				>
					{/* The CuboidCollider for the card has args={[0.8, 1.125, 0.01]} (half-width, half-height, half-depth). Scale each dimension by 3. */}
					<CuboidCollider
						args={[0.8 * scaller, 1.125 * scaller, 0.01 * scaller]}
					/>
					<group
						scale={2.25 * scaller}
						position={[0, -1.2 * scaller, -0.05 * scaller]}
						onPointerOver={() => hover(true)}
						onPointerOut={() => hover(false)}
						onPointerUp={(e) => (
							e.target.releasePointerCapture(e.pointerId), drag(false)
						)}
						onPointerDown={(e) => (
							e.target.setPointerCapture(e.pointerId),
							drag(
								new THREE.Vector3()
									.copy(e.point)
									.sub(vec.copy(card.current.translation()))
							)
						)}
					>
						<mesh geometry={nodes.card.geometry}>
							<meshPhysicalMaterial
								map={materials.base.map}
								map-anisotropy={16}
								clearcoat={1}
								clearcoatRoughness={0.15}
								roughness={0.5}
								metalness={0.5}
							/>
						</mesh>
						<mesh
							geometry={nodes.clip.geometry}
							material={materials.metal}
							material-roughness={0.3}
						/>
						<mesh
							geometry={nodes.clamp.geometry}
							material={materials.metal}
						/>
					</group>
				</RigidBody>
			</group>
			<mesh ref={band}>
				<meshLineGeometry />
				<meshLineMaterial
					color="white"
					depthTest={true}
					resolution={[width, height]}
					useMap
					map={texture}
					repeat={[-2.5 * scaller, 1]}
					lineWidth={1 * scaller}
				/>
			</mesh>
		</>
	)
}
export default Band
