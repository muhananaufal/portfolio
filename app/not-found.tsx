'use client';
import Balatro from '@/components/Balatro';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/Scene'), {
	ssr: false,
});

export default function NotFound() {
	return (
		<main className="relative h-screen w-full bg-black" id="__not_found__">
			<Balatro isRotate={false} mouseInteraction={true} pixelFilter={2000} />
			<div className="absolute inset-0 z-10">
				<Scene />
			</div>
		</main>
	);
}
