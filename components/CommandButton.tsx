// components/chat/CommandButton.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandStore } from '@/store/useCommandStore';
import { KeyboardIcon, SearchIcon } from './ui/UtilityIcons';

export const CommandButton = () => {
	const [isHovered, setIsHovered] = useState(false);
	const { onToggle } = useCommandStore();

	return (
		<motion.div className="fixed bottom-24 right-6 z-[8000]" initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.6 }}>
			<motion.button
				onClick={onToggle}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="group relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden shadow-xl"
				aria-label="Open Command Palette"
				whileTap={{ scale: 0.95 }}
			>
				<div className="absolute inset-0 bg-black border-2 border-white rounded-full" />

				<motion.div
					className="absolute inset-0 bg-white rounded-full"
					initial={{ clipPath: 'circle(0% at 50% 50%)' }}
					animate={{ clipPath: isHovered ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)' }}
					transition={{ type: 'spring', stiffness: 200, damping: 20 }}
				/>

				<div className="relative z-10">
					<AnimatePresence mode="wait">
						{isHovered ? (
							<motion.div key="search" initial="initial" animate="animate" exit="exit" className="text-black">
								<SearchIcon />
							</motion.div>
						) : (
							<motion.div key="keyboard" initial="initial" animate="animate" exit="exit" className="text-white">
								<KeyboardIcon />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.button>
		</motion.div>
	);
};
