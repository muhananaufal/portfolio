'use client';
import { HeroAbout, MySkills, Motto, EducationAndExperience } from '@/container';
import { useEffect } from 'react';
import { Curve, MaskCursor, Ready } from '@/components';

export default function About() {
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
