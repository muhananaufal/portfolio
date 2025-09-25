// src/components/HoverableText.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface HoverableTextProps {
	text: string;
	isParentPinned: boolean;
}

export default function HoverableText({ text, isParentPinned }: HoverableTextProps) {
	const [isHovered, setIsHovered] = useState(false);

	const bgColor = isParentPinned ? 'bg-white' : 'bg-black';

	const textColor =
		isHovered && isParentPinned
			? 'text-black'
			: isHovered || isParentPinned
			? 'text-white'
			: 'text-secondry';

	return (
		<motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} className="relative cursor-pointer">
			<motion.div
				className={`absolute inset-0 rounded-full ${bgColor}`}
				initial={{ scale: 0 }}
				animate={{ scale: isHovered ? 1 : 0 }}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			/>

			<div className="relative px-4 py-1">
				<div className={textColor}>
					<AnimatedText text={text} />
				</div>
			</div>
		</motion.div>
	);
}
