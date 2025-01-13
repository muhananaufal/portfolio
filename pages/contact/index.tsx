'use client';
import { useEffect } from 'react';
import { Curve, MaskCursor } from '@/components';
import { HeroContact, Form, FAQ, Socials } from '@/container';

export default function Contact() {
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
				<HeroContact />
				<Form />
				<Socials />
				<FAQ />
			</Curve>
		</>
	);
}
