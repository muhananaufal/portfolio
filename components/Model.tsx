// components/Model.tsx
'use client';

import { useGLTF, Text, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React from 'react'; // Impor React

// Definisikan tipe untuk props material
interface MaterialProps {
	thickness: number;
	ior: number;
	chromaticAberration: number;
	resolution: number;
}

export default function Model() {
	const { viewport } = useThree();
	const { nodes } = useGLTF('/medias/shards.glb');

	// Panggil useControls HANYA SEKALI di sini
	const materialProps = useControls({
		thickness: { value: 0.275, min: 0, max: 1, step: 0.01 },
		ior: { value: 1.8, min: 0, max: 3, step: 0.1 },
		chromaticAberration: { value: 0.75, min: 0, max: 1 },
		resolution: { value: 300 },
	});

	return (
		<group scale={viewport.width / 1.5}>
			{nodes.Scene.children.map((mesh, i) => (
				// Teruskan props ke setiap komponen Mesh
				<Mesh data={mesh} materialProps={materialProps} key={i} />
			))}
			<Font />
		</group>
	);
}

function Font() {
	const src = '/fonts/PPNeueMontreal-Regular.ttf';
	return (
		<group>
			<Text font={src} position={[0, 0, -0.1]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
				404
			</Text>
			<Text font={src} position={[0, -0.15, -0.1]} fontSize={0.03} color="white" anchorX="center" anchorY="middle">
				The link is broken
			</Text>
		</group>
	);
}

// Ubah komponen Mesh untuk menerima props
function Mesh({ data, materialProps }: { data: any; materialProps: MaterialProps }) {
	return (
		<Float>
			<mesh {...data}>
				{/* Gunakan props yang sudah diteruskan */}
				<MeshTransmissionMaterial roughness={0} transmission={0.99} {...materialProps} />
			</mesh>
		</Float>
	);
}
