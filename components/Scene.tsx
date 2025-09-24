// components/Scene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from './Model';

export default function Scene() {
	return (
		<Canvas orthographic style={{ background: 'black' }} camera={{ position: [0, 0, 1], zoom: 800 }}>
			<Model />
			<directionalLight intensity={3} position={[0, 0.1, 1]} />
			<Environment preset="city" />
		</Canvas>
	);
}
