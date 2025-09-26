// components/chat/StreamingText.tsx

'use client';

import { motion } from 'framer-motion';

interface StreamingTextProps {
	text: string;
	children: (text: string) => React.ReactNode;
}

const StreamingText = ({ text, children }: StreamingTextProps) => {
	// Pisahkan teks menjadi kata-kata
	const words = text.split(' ');

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.02, // Jeda antar animasi kata (makin kecil makin cepat)
			},
		},
	};

	const wordVariants = {
		hidden: { opacity: 0, y: 5 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			// Render konten utama setelah animasi selesai
			onAnimationComplete={() => children(text)}
		>
			{words.map((word, index) => (
				<motion.span key={index} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>
					{word}
				</motion.span>
			))}
		</motion.div>
	);
};

export default StreamingText;
