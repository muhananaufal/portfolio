'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AwwwardsButtonProps {
	onClick: () => void;
	icon: React.ReactNode;
	hoverIcon?: React.ReactNode;
	ariaLabel: string;
	size?: 'small' | 'large';
}

export const AwwwardsButton = ({ onClick, icon, hoverIcon, ariaLabel, size = 'small' }: AwwwardsButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const buttonSize = size === 'small' ? 'w-14 h-14' : 'w-16 h-16';

	return (
		<motion.button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`group relative ${buttonSize} rounded-full flex items-center justify-center cursor-pointer overflow-hidden shadow-xl`}
			aria-label={ariaLabel}
			whileTap={{ scale: 0.95 }}
		>
			<div className="absolute inset-0 bg-black border-2 border-white rounded-full" />
			<motion.div
				className="absolute inset-0 bg-white rounded-full"
				initial={{ clipPath: 'circle(0% at 50% 50%)' }}
				animate={{ clipPath: isHovered ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)' }}
				transition={{ type: 'spring', stiffness: 200, damping: 20 }}
			/>
			<div className="relative z-10 text-white group-hover:text-black transition-colors duration-200">
				<AnimatePresence mode="wait">
					{isHovered && hoverIcon ? (
						<motion.div key="hover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							{hoverIcon}
						</motion.div>
					) : (
						<motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							{icon}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.button>
	);
};
