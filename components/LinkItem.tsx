// components/LinkItem.tsx

'use client';

import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import FluidBackground from './FluidBackground';
import { ElementType } from 'react'; // Impor ElementType untuk tipe ikon

// Definisikan tipe untuk props
interface LinkItemProps {
	link: {
		name: string;
		url: string;
		icon: ElementType; // Tipe yang benar untuk komponen ikon
	};
	index: number;
}

export default function LinkItem({ link, index }: LinkItemProps) {
	// Panggil hook di level teratas komponen, ini sudah benar
	const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect<HTMLAnchorElement>();
	const bgColor = index % 3 === 0 ? 'bg-marquee' : index % 3 === 1 ? 'bg-fire' : 'bg-[#35292E]';

	return (
		<motion.a
			key={link.name}
			ref={ref}
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={`font-NeueMontreal relative flex items-center justify-between px-6 py-5 text-white border-2 border-black rounded-full transition-all duration-700 ease-out group overflow-hidden hover:shadow-lg custom-hover cursor-none ${bgColor}`}
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: index * 0.15, duration: 0.8, ease: 'easeOut' }}
			whileHover={{ scale: 1.02 }}
			style={{ x, y }}
		>
			<FluidBackground blobColor="bg-white" />

			<div className="w-8 h-8 rounded-full bg-white group-hover:bg-black flex items-center justify-center transition-all duration-700 ease-in-out relative z-10 shadow-md">
				<motion.div animate={{ rotate: 0 }} whileHover={{ rotate: -30 }} transition={{ duration: 0.3 }}>
					<link.icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-700" />
				</motion.div>
			</div>
			<div className="flex-1 text-center text-lg font-medium relative z-10 h-6 overflow-hidden">
				<motion.div className="absolute inset-0" whileHover={{ y: '-100%' }} transition={{ duration: 0.3, ease: 'easeOut' }}>
					<span className="h-6 flex items-center justify-center">{link.name}</span>
					<span className="h-6 flex items-center justify-center text-black">{link.name}</span>
				</motion.div>
			</div>
		</motion.a>
	);
}
