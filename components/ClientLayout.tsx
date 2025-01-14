'use client';

import { useLayoutConfig } from '@/hooks/useLayoutConfig';
import Navbar from './Navbar';
import { AnimatePresence } from 'framer-motion';
import { Chat } from './Chat';
import Footer from './Footer';
import React from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
	const { shouldShowLayout, shouldShowChat } = useLayoutConfig();

	return (
		<>
			{shouldShowLayout && <Navbar />}
			<AnimatePresence mode="wait">
				{children}
				{shouldShowChat && <Chat />}
			</AnimatePresence>
			{shouldShowLayout && <Footer />}
		</>
	);
}
