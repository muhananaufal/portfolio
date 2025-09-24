// components/ClientLayout.tsx
'use client';

import { useLayoutConfig } from '@/hooks/useLayoutConfig';
import Navbar from './Navbar';
import { AnimatePresence } from 'framer-motion';
import { Chat } from './Chat';
import Footer from './Footer';
import React from 'react';

// Buat komponen baru untuk membungkus bagian yang dinamis
function DynamicLayoutElements() {
	const { shouldShowLayout, shouldShowChat } = useLayoutConfig();

	return (
		<>
			{shouldShowLayout && <Navbar />}
			<AnimatePresence mode="wait">{shouldShowChat && <Chat />}</AnimatePresence>
			{shouldShowLayout && <Footer />}
		</>
	);
}

// ClientLayout sekarang hanya bertugas menyusun layout
export function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DynamicLayoutElements />
			{children}
		</>
	);
}
