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

	// ✨ 1. Tentukan warna background secara dinamis
	// Jika parent di-pin, background hover jadi putih. Jika tidak, tetap hitam.
	const bgColor = isParentPinned ? 'bg-white' : 'bg-black';

	// ✨ 2. Tentukan warna teks secara dinamis berdasarkan 4 kondisi
	const textColor =
		isHovered && isParentPinned
			? 'text-black' // Di-hover DAN di-pin -> teks hitam
			: isHovered || isParentPinned
			? 'text-white' // Di-hover ATAU di-pin -> teks putih
			: 'text-secondry'; // Default -> teks secondry (hitam)

	return (
		<motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} className="relative cursor-pointer">
			{/* Background yang dianimasikan */}
			<motion.div
				// Gunakan variabel bgColor yang sudah kita tentukan
				className={`absolute inset-0 rounded-full ${bgColor}`}
				initial={{ scale: 0 }}
				// Logika scale tetap sama: muncul hanya saat di-hover
				animate={{ scale: isHovered ? 1 : 0 }}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			/>

			{/* Teks di atas background */}
			<div className="relative px-4 py-1">
				{/* Gunakan variabel textColor yang sudah kita tentukan */}
				<div className={textColor}>
					<AnimatedText text={text} />
				</div>
			</div>
		</motion.div>
	);
}
