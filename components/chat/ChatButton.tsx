// components/chat/ChatButton.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatButtonProps {
	onClick: () => void;
}

// 1. Kita buat komponen ikon kustom dari path SVG mentah agar bisa dianimasikan
const ZapIcon = () => (
	<motion.svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<motion.path
			d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
			variants={{
				initial: { pathLength: 0, pathOffset: 1 },
				animate: { pathLength: 1, pathOffset: 0, transition: { duration: 0.4, ease: 'easeOut' } },
				exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.3, ease: 'easeIn' } },
			}}
		/>
	</motion.svg>
);

const MessageIcon = () => (
	<motion.svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<motion.path
			d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
			variants={{
				initial: { pathLength: 0, pathOffset: 1 },
				animate: { pathLength: 1, pathOffset: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 } },
				exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.3, ease: 'easeIn' } },
			}}
		/>
	</motion.svg>
);

export const ChatButton = ({ onClick }: ChatButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="group relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden shadow-xl"
			aria-label="chat button"
			whileTap={{ scale: 0.95 }}
		>
			{/* LAPISAN 1: Background Awal (Hitam) */}
			<div className="absolute inset-0 bg-black border-2 border-white rounded-full" />

			{/* LAPISAN 2: Background Hover (Putih) dengan animasi Circular Reveal */}
			<motion.div
				className="absolute inset-0 bg-white rounded-full"
				initial={{ clipPath: 'circle(0% at 50% 50%)' }}
				animate={{ clipPath: isHovered ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)' }}
				transition={{ type: 'spring', stiffness: 200, damping: 20 }}
			/>

			{/* LAPISAN 3: Ikon */}
			<div className="relative z-10 text-black group-hover:text-black transition-colors duration-200">
				<AnimatePresence mode="wait">
					{isHovered ? (
						<motion.div
							key="message"
							initial="initial"
							animate="animate"
							exit="exit"
							className="text-black" // Ikon saat hover (background putih)
						>
							<MessageIcon />
						</motion.div>
					) : (
						<motion.div
							key="zap"
							initial="initial"
							animate="animate"
							exit="exit"
							className="text-white" // Ikon default (background hitam)
						>
							<ZapIcon />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.button>
	);
};
