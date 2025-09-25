// components/SmoothScroll.tsx

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll() {
	const pathname = usePathname();

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();

			return () => {
				if (locomotiveScroll) locomotiveScroll.destroy();
			};
		})();
	}, [pathname]);

	return null;
}
