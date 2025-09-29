'use client';

import { motion, Variants } from 'framer-motion';

const iconPathVariants: Variants = {
	initial: { pathLength: 0, pathOffset: 1 },
	animate: { pathLength: 1, pathOffset: 0, transition: { duration: 0.3, ease: 'easeOut' } },
	exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.2, ease: 'easeIn' } },
};

const SvgWrapper = ({ children }: { children: React.ReactNode }) => (
	<motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
		{children}
	</motion.svg>
);

export const CommandIcon = () => (
	<SvgWrapper>
		<motion.path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" variants={iconPathVariants} />
	</SvgWrapper>
);
