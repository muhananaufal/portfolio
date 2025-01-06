'use client';
import { HeroArticles } from '@/container';
import { useEffect } from 'react';

export default function Articles() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<HeroArticles />
		</>
	);
}
