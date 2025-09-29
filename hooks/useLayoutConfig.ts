'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useLayoutConfig() {
	const pathname = usePathname();
	const [isNotFound, setIsNotFound] = useState(false);

	useEffect(() => {
		// cek apakah ada elemen not-found
		if (document.getElementById('__not_found__')) {
			setIsNotFound(true);
		} else {
			setIsNotFound(false);
		}
	}, [pathname]);

	const routesWithoutAddons = ['/articles', '/rewinds/2023', '/rewinds/2024', '/rewinds/2025', '/me'];

	const shouldShowLayout = !routesWithoutAddons.includes(pathname) && !isNotFound;
	const shouldShowChat = !routesWithoutAddons.includes(pathname) && !isNotFound;

	return { shouldShowLayout };
}
