'use client';

import { socialLinks } from '@/constants';
import { motion } from 'framer-motion';

export default function LinksButton() {
	return (
		<div className="w-full max-w-md space-y-4">
			{socialLinks.map((link, index) => (
				<motion.a
					key={link.name}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="relative flex items-center justify-between px-6 py-4 text-white border-2 border-black rounded-lg transition-all duration-700 ease-out group overflow-hidden hover:shadow-lg"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						delay: index * 0.15,
						duration: 0.8,
						ease: 'easeOut',
					}}
					whileHover={{ scale: 1.02 }}
				>
					{/* Background */}
					<div className="absolute inset-0 bg-black transition-transform duration-700 ease-in-out transform origin-left group-hover:origin-right" />
					<div className="absolute inset-0 bg-white transform scale-x-0 transition-transform duration-700 ease-in-out origin-left group-hover:scale-x-100" />

					{/* Icon */}
					<div className="w-8 h-8 rounded-full bg-white group-hover:bg-black flex items-center justify-center transition-all duration-700 ease-in-out relative z-10 shadow-md">
						<link.icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-700" />
					</div>
					<span className="flex-1 text-center font-medium relative z-10 group-hover:text-black transition-all duration-700 ease-in-out">{link.name}</span>
				</motion.a>
			))}
		</div>
	);
}
