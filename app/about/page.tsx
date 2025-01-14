'use client';
import { HeroAbout, MySkills, Motto, EducationAndExperience } from '@/container';
import { useEffect } from 'react';
import { Curve, MaskCursor, Ready } from '@/components';

export default function About() {
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
				<HeroAbout />
				<MySkills />
				<EducationAndExperience />
				<Motto />
				<Ready />
			</Curve>
		</>
	);
}
