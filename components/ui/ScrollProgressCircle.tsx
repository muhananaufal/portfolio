// components/ui/ScrollProgressCircle.tsx

'use client';

import { forwardRef, useEffect } from 'react'; // PERUBAHAN 1: Impor useEffect
import { motion, useSpring } from 'framer-motion';

interface ScrollProgressCircleProps {
	progress: number;
}

const ScrollProgressCircle = forwardRef<HTMLDivElement, ScrollProgressCircleProps>(({ progress }, ref) => {
	const radius = 55;

	// PERUBAHAN 2: Inisialisasi useSpring dengan nilai awal 0
	const smoothProgress = useSpring(0, { damping: 20, stiffness: 200 });

	// PERUBAHAN 3: Gunakan useEffect untuk meng-update spring saat progress berubah
	useEffect(() => {
		// Perintahkan spring untuk bergerak ke nilai progress yang baru (antara 0 dan 1)
		smoothProgress.set(progress / 100);
	}, [progress, smoothProgress]);

	return (
		<motion.div
			ref={ref}
			className="fixed bottom-8 left-1/2 w-32 h-32 z-50 bg-black/10 backdrop-blur-md rounded-full"
			style={{ x: '-50%' }}
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: progress > 0 ? 1 : 0, opacity: progress > 0 ? 1 : 0 }}
			transition={{
				scale: { type: 'spring', stiffness: 200, damping: 20 },
				opacity: { duration: 0.3 },
			}}
		>
			<svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
				{/* Lingkaran Latar Belakang */}
				<motion.circle
					cx="60"
					cy="60"
					r={radius}
					stroke="#E1E1E1"
					strokeWidth="5"
					fill="transparent"
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: progress > 0 ? 1 : 0, opacity: progress > 0 ? 1 : 0 }}
					transition={{
						scale: { type: 'spring', stiffness: 200, damping: 20, delay: 0.1 },
						opacity: { duration: 0.2, delay: 0.1 },
					}}
				/>
				{/* Lingkaran Progres yang terisi */}
				<motion.circle cx="60" cy="60" r={radius} stroke="#35292E" strokeWidth="5" strokeLinecap="round" fill="transparent" transform="rotate(-90 60 60)" strokeDasharray="1" style={{ pathLength: smoothProgress }} />
			</svg>
			{/* Teks persentase */}
			<motion.div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black" initial={{ opacity: 0 }} animate={{ opacity: progress > 0 ? 1 : 0 }} transition={{ duration: 0.2, delay: 0.2 }}>
				{Math.round(progress)}%
			</motion.div>
		</motion.div>
	);
});

ScrollProgressCircle.displayName = 'ScrollProgressCircle';
export default ScrollProgressCircle;
