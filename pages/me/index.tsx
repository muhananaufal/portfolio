'use client';
import { Curve, LinksButton, LinksHead } from '@/components';
import { useEffect } from 'react';

export default function Links() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	return (
		<Curve backgroundColor={'#DBE2EF'}>
			<div className="min-h-screen flex flex-col items-center justify-start pt-16 px-4 bg-[#DBE2EF]">
				<LinksHead />
				<LinksButton />
			</div>
		</Curve>
	);
}
