'use client';
import { useEffect } from 'react';
import { Curve, MaskCursor, Ready } from '@/components';
import { HeroProjects, ListsProjects } from '@/container';

export default function Projects() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<Curve backgroundColor={'#DBE2EF'}>
				<MaskCursor />
				<HeroProjects />
				<ListsProjects />
				<Ready />
			</Curve>
		</>
	);
}
