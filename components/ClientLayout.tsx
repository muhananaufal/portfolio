'use client';

import { useLayoutConfig } from '@/hooks/useLayoutConfig';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from './Footer';
import React from 'react';
import { usePathname } from 'next/navigation';
import ToolsMenu from './ToolsMenu';
import GlobalPlayer from './GlobalPlayer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
	const { shouldShowLayout, shouldShowChat } = useLayoutConfig();
	const pathname = usePathname();

	return (
		<>
			{shouldShowLayout && <Navbar />}
			<AnimatePresence mode="wait">
				<motion.div key={pathname}>{children}</motion.div>
				{shouldShowChat && (
					<>
						<ToolsMenu />
						<GlobalPlayer />
					</>
				)}
			</AnimatePresence>
			{shouldShowLayout && <Footer />}
		</>
	);
}
