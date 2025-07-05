import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import vertex from '../glsl/render.vert'
import fragment from '../glsl/render.frag'
import * as THREE from 'three'

export const RenderMaterial = shaderMaterial(
	{
		uTime: 0,
		uMouse: new THREE.Vector2(0, 0),
	},
	vertex,
	fragment
)
extend({ RenderMaterial })

export const SimulationMaterial = shaderMaterial(
	{
		uTime: 0,
	},
	vertex,
	fragment
)
extend({ SimulationMaterial })
