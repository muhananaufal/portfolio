'use client';
import { Curve, MouseImageGallery } from '@/components';
import { listImage2023 } from '@/constants/images';
import { Gallery } from '@/container';
import { useEffect } from 'react';

export default function Rewinds2023() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	const images = listImage2023;

	return (
		<>
			<Curve backgroundColor={'#DBE2EF'}>
				<MouseImageGallery images={images} />
				<Gallery />
			</Curve>
		</>
	);
}
