'use client';
import { useEffect } from 'react';
import { Curve, Ready } from '@/components';
import { HeroCertification, PublicationCertification } from '@/container';

export default function Insights() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<Curve backgroundColor={'#DBE2EF'}>
				<HeroCertification />
				<PublicationCertification />
				<Ready />
			</Curve>
		</>
	);
}
