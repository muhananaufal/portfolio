import { motion } from 'framer-motion';

// Varian untuk container, mengatur stagger (jeda) antar huruf
const containerVariants = {
	hidden: { opacity: 0 },
	visible: (i = 1) => ({
		opacity: 1,
		transition: { staggerChildren: 0.04, delayChildren: 0.04 * i },
	}),
	exit: {
		opacity: 0,
		transition: { staggerChildren: 0.04, staggerDirection: -1 },
	},
};

// Varian untuk setiap huruf, mengatur animasi naik & fade
const letterVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
	},
};

interface AnimatedTextProps {
	text: string;
}

export default function AnimatedText({ text }: AnimatedTextProps) {
	return (
		<motion.div
			className="overflow-hidden" // Mencegah teks keluar dari container saat animasi
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			{text.split('').map((char, index) => (
				<motion.span
					key={index}
					variants={letterVariants}
					style={{ display: 'inline-block' }} // Diperlukan agar transform Y bekerja
				>
					{char}
				</motion.span>
			))}
		</motion.div>
	);
}
