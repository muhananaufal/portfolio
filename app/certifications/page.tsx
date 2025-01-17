'use client';
import { useEffect } from 'react';
import { Curve, MaskCursor, Ready } from '@/components';
import { HeroCertification, PublicationCertification } from '@/container';

export default function Certification() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<Curve backgroundColor={'#E1E1E1'}>
				<MaskCursor />
				<HeroCertification />
				<PublicationCertification />
				<Ready />
			</Curve>
		</>
	);
}
