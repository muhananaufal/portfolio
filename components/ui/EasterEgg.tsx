// components/ui/EasterEgg.tsx

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '@/store/useToastStore';

export default function EasterEgg() {
	const isVisible = useToastStore((state) => state.easterEggVisible);
	const hideEasterEgg = useToastStore((state) => state.hideEasterEgg);

	// Timer untuk menyembunyikan GIF setelah 10 detik
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				hideEasterEgg();
			}, 10000); // Durasi 10 detik

			return () => clearTimeout(timer);
		}
	}, [isVisible, hideEasterEgg]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#000]/80 backdrop-blur-md"
					// Animasi pop-in
					initial={{ opacity: 0, scale: 0.7 }}
					animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
					// Animasi pop-out
					exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.3, ease: 'easeOut' } }}
				>
					<div className="flex flex-col items-center gap-4">
						<Image
							src="/gif/firefly-provoking.gif" // Pastikan path ini benar
							alt="Easter Egg"
							width={800}
							height={800}
							unoptimized // Penting untuk GIF agar tidak dioptimasi statis
							className="rounded-lg shadow-2xl"
						/>
						<p className="font-NeueMontreal text-4xl font-semibold text-white/80">You really like clicking things, don&apos;t you?</p>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
