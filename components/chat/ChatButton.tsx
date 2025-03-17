'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Zap } from 'lucide-react';
import gsap from 'gsap';

interface ChatButtonProps {
	onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
	const iconRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (iconRef.current) {
			gsap.to(iconRef.current, {
				opacity: isHovered ? 0 : 1,
				duration: 0.3,
				ease: 'power2.inOut',
				color: '#E1E1E1',
			});
		}
	}, [isHovered]);

	return (
		<motion.div className="fixed bottom-6 right-6 z-[8000]" initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
			<button
				onClick={onClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="relative w-14 h-14 md:w-15 md:h-15 lg:w-16 xl:w-16 lg:h-16 xl:h-16 bg-black rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
				aria-label='chat button'
			>
				<div ref={iconRef} className="absolute">
					<Zap className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-8 xl:h-8 text-white " />
				</div>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
					<MessageCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-8 xl:h-8 text-white" />
				</motion.div>
			</button>
		</motion.div>
	);
};
