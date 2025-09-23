// components/CvButton.tsx

import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { NeonGradientCard } from './ui/neon-gradient-card';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import FluidBackground from './FluidBackground'; // 1. Impor komponen FluidBackground

export default function CvButton() {
	const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect<HTMLButtonElement>();

	const handleDownload = () => {
		/* ... (fungsi tidak berubah) ... */
	};

	return (
		<NeonGradientCard className="w-full max-w-md" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			<motion.button
				ref={ref}
				onClick={handleDownload}
				rel="noopener noreferrer"
				className="custom-hover w-full font-NeueMontreal relative flex items-center justify-between px-6 py-5 bg-[#E1E1E1c9] text-black rounded-full transition-all duration-700 ease-out group overflow-hidden hover:shadow-lg cursor-none" // Tambahkan bg awal di sini
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: -1 * 0.15, duration: 0.8, ease: 'easeOut' }}
				whileHover={{ scale: 1.02 }}
				style={{ x, y }}
			>
				{/* 2. Ganti background lama dengan FluidBackground */}
				<FluidBackground blobColor="bg-black" />

				{/* Ikon dan Teks (pastikan z-10) */}
				<div className="w-8 h-8 rounded-full bg-black group-hover:bg-[#E1E1E1] flex items-center justify-center transition-all duration-700 ease-in-out relative z-10 shadow-md">
					<motion.div animate={{ rotate: 0 }} whileHover={{ rotate: 30 }} transition={{ duration: 0.3 }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="w-5 h-5 text-white group-hover:text-black transition-colors duration-700 lucide lucide-file-user"
						>
							<path d="M14 2v4a2 2 0 0 0 2 2h4" />
							<path d="M15 18a3 3 0 1 0-6 0" />
							<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
							<circle cx="12" cy="13" r="2" />
						</svg>
					</motion.div>
				</div>
				<div className="flex-1 text-center text-lg font-medium relative z-10 h-6 overflow-hidden">
					<motion.div className="absolute inset-0" whileHover={{ y: '-100%' }} transition={{ duration: 0.3, ease: 'easeOut' }}>
						<span className="h-6 flex items-center justify-center text-black">{`Download CV`}</span>
						<span className="h-6 flex items-center justify-center text-white">{`Download CV`}</span>
					</motion.div>
				</div>
			</motion.button>
		</NeonGradientCard>
	);
}
