'use client';
import { useEffect } from 'react';
import { Curve, MaskCursor, Ready } from '@/components';
import { HeroProjects, ListsProjects } from '@/container';

export default function Projects() {
	return (
		<>
			<Curve backgroundColor={'#E1E1E1'}>
				<MaskCursor />
				<HeroProjects />
				<ListsProjects />
				<Ready />
			</Curve>
		</>
	);
}
