'use client';
import { HeroAbout, MySkills, Motto, Education } from '@/container';
import { useEffect } from 'react';
import { Curve, Ready } from '@/components';

export default function Services() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<Curve backgroundColor={'#DBE2EF'}>
				<HeroAbout />
				<MySkills />
				<Education />
				<Motto />
				<Ready />
			</Curve>
		</>
	);
}
