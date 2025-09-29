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

export const CommandIcon = () => (
	<SvgWrapper>
		<motion.path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" variants={iconPathVariants} />
	</SvgWrapper>
);

export const KeyboardIcon = () => (
	<SvgWrapper>
		<motion.path d="M10 8h.01" variants={iconPathVariants} />
		<motion.path d="M12 12h.01" variants={iconPathVariants} />
		<motion.path d="M14 8h.01" variants={iconPathVariants} />
		<motion.path d="M16 12h.01" variants={iconPathVariants} />
		<motion.path d="M18 8h.01" variants={iconPathVariants} />
		<motion.path d="M6 8h.01" variants={iconPathVariants} />
		<motion.path d="M7 16h10" variants={iconPathVariants} />
		<motion.path d="M12 16v4" variants={iconPathVariants} />
		<motion.path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" variants={iconPathVariants} />
	</SvgWrapper>
);

export const SearchIcon = () => (
	<SvgWrapper>
		<motion.circle cx="11" cy="11" r="8" variants={iconPathVariants} />
		<motion.path d="m21 21-4.3-4.3" variants={iconPathVariants} />
	</SvgWrapper>
);

export const ToolsIconPath = () => (
	<>
		<motion.path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" variants={iconPathVariants} />
		<motion.path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" variants={iconPathVariants} />
		<motion.path d="M12 2v2" variants={iconPathVariants} />
		<motion.path d="M12 20v2" variants={iconPathVariants} />
		<motion.path d="m4.93 4.93 1.41 1.41" variants={iconPathVariants} />
		<motion.path d="m17.66 17.66 1.41 1.41" variants={iconPathVariants} />
		<motion.path d="M2 12h2" variants={iconPathVariants} />
		<motion.path d="M20 12h2" variants={iconPathVariants} />
		<motion.path d="m4.93 19.07 1.41-1.41" variants={iconPathVariants} />
		<motion.path d="m17.66 6.34 1.41-1.41" variants={iconPathVariants} />
	</>
);

export const CloseIconPath = () => (
	<>
		<motion.path d="M18 6 6 18" variants={iconPathVariants} />
		<motion.path d="m6 6 12 12" variants={iconPathVariants} />
	</>
);
