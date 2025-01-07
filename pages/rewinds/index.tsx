'use client';
import { useEffect } from 'react';
import { Curve } from '@/components';
import { HeroRewinds, Years } from '@/container';

export default function Rewinds() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<Curve backgroundColor={'#DBE2EF'}>
				<HeroRewinds />
				<Years/>
			</Curve>
		</>
	);
}
