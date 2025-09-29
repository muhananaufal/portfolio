'use client';
import { Curve, MouseImageGallery } from '@/components';
import { listImage2023 } from '@/constants/images';
import { Gallery } from '@/container';
import { useEffect } from 'react';

export default function Rewinds2023() {
	const images = listImage2023;

	return (
			<Curve backgroundColor={'#E1E1E1'}>
				<MouseImageGallery images={images} />
				<Gallery />
			</Curve>
	);
}
