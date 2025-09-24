'use client';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/Scene'), {
	ssr: false,
});

export default function NotFound() {
	return (
		<main className="relative h-screen w-full bg-black" id="__not_found__">
			<Scene />
		</main>
	);
}
