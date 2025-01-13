'use client';
import { useEffect, useState } from 'react';
import { Curve, MaskCursor } from '@/components';
import { HeroRewinds, Video, Years } from '@/container';

export default function Rewinds() {
	const [isTabletOrBelow, setIsTabletOrBelow] = useState(false);

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();

		const handleResize = () => {
			setIsTabletOrBelow(window.innerWidth < 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<Curve backgroundColor={'#E1E1E1'}>
				<MaskCursor />
				<HeroRewinds />
				{isTabletOrBelow ? (
					<>
						<Video />
						<Years />
					</>
				) : (
					<>
						<Years />
						<Video />
					</>
				)}
			</Curve>
		</>
	);
}
