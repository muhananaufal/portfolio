'use client';

import { usePathname } from 'next/navigation';

export function useLayoutConfig() {
	const pathname = usePathname();

	const routesWithoutNavbarAndFooter = ['/articles', '/rewinds/2023', '/rewinds/2024', '/rewinds/2025', '/me'];
	const routesWithoutChat = ['/articles', '/rewinds/2023', '/rewinds/2024', '/rewinds/2025'];

	const shouldShowLayout = !routesWithoutNavbarAndFooter.includes(pathname);
	const shouldShowChat = !routesWithoutChat.includes(pathname);

	return { shouldShowLayout, shouldShowChat };
}
