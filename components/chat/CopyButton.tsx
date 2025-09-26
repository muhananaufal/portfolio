// components/chat/CopyButton.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { toast } from 'sonner';

// Ikon kustom (tidak berubah)
const CopyIcon = () => (
	<motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
		<motion.path
			d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
			variants={{
				initial: { pathLength: 0, pathOffset: 1 },
				animate: { pathLength: 1, pathOffset: 0, transition: { duration: 0.3, ease: 'easeOut' } },
				exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.2, ease: 'easeIn' } },
			}}
		/>
		<motion.rect
			width="8"
			height="4"
			x="8"
			y="2"
			rx="1"
			ry="1"
			variants={{
				initial: { opacity: 0 },
				animate: { opacity: 1, transition: { delay: 0.2 } },
				exit: { opacity: 0, transition: { duration: 0.1 } },
			}}
		/>
	</motion.svg>
);

const CheckIcon = () => (
	<motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
		<motion.path
			d="M20 6L9 17l-5-5"
			variants={{
				initial: { pathLength: 0, pathOffset: 1 },
				animate: { pathLength: 1, pathOffset: 0, transition: { duration: 0.3, ease: 'easeOut', delay: 0.1 } },
				exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.2, ease: 'easeIn' } },
			}}
		/>
	</motion.svg>
);

// Variants untuk background hover
const backgroundVariants: Variants = {
	rest: { opacity: 0, transition: { duration: 0.3 } },
	hover: { opacity: 1, transition: { duration: 0.3 } },
};

interface CopyButtonProps {
	textToCopy: string;
	className?: string;
}

export const CopyButton = ({ textToCopy, className }: CopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		if (isCopied) return;
		navigator.clipboard.writeText(textToCopy);
		toast.info('Message copied!');
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<motion.button
			onClick={handleCopy}
			className={`text-black/90 hover:text-white group absolute w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-300 shadow-xl border border-gray-200 overflow-hidden ${className} bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0`}
			initial="rest"
			whileHover="hover"
			transition={{ type: 'spring', stiffness: 300, damping: 20 }}
		>
			<div className="relative z-10 hover:text-white">
				<AnimatePresence mode="wait">
					{isCopied ? (
						<motion.div key="check" initial="initial" animate="animate" exit="exit" className="text-green-500">
							<CheckIcon />
						</motion.div>
					) : (
						<motion.div key="copy" initial="initial" animate="animate" exit="exit" className="text-black/90 hover:text-white transition-colors duration-200">
							<CopyIcon />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.button>
	);
};
