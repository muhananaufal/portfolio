'use client';

import { motion, Variants } from 'framer-motion';

const iconPathVariants: Variants = {
	initial: { pathLength: 0, pathOffset: 1 },
	animate: { pathLength: 1, pathOffset: 0, transition: { duration: 0.3, ease: 'easeOut' } },
	exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.2, ease: 'easeIn' } },
};

const SvgWrapper = ({ children }: { children: React.ReactNode }) => (
	<motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
		{children}
	</motion.svg>
);

export const PlayIcon = () => (
	<SvgWrapper>
		<motion.path d="M5 3l14 9-14 9V3z" variants={iconPathVariants} />
	</SvgWrapper>
);

export const PauseIcon = () => (
	<SvgWrapper>
		<motion.path d="M6 4h4v16H6zM14 4h4v16h-4z" variants={iconPathVariants} />
	</SvgWrapper>
);

export const PrevIcon = () => (
	<SvgWrapper>
		<motion.polygon points="19 20 9 12 19 4 19 20" variants={iconPathVariants} />
		<motion.line x1="5" x2="5" y1="19" y2="5" variants={iconPathVariants} />
	</SvgWrapper>
);

export const NextIcon = () => (
	<SvgWrapper>
		<motion.polygon points="5 4 15 12 5 20 5 4" variants={iconPathVariants} />
		<motion.line x1="19" x2="19" y1="5" y2="19" variants={iconPathVariants} />
	</SvgWrapper>
);
