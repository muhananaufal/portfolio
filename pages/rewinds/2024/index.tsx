'use client';
import { MouseImageGallery } from '@/components';
import { listImage2024 } from '@/constants/images';
import { Gallery } from '@/container';
import { useEffect } from 'react';

export default function Rewinds2024() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	const images = listImage2024;

	return (
		<>
			<MouseImageGallery images={images} />
			<Gallery />
		</>
	);
}
