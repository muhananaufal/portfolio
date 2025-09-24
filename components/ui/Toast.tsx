// components/ui/Toast.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ToastMessage, useToastStore } from '@/store/useToastStore';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const toastConfig = {
	success: { icon: <CheckCircle />, className: 'bg-[#2F6877]' },
	error: { icon: <XCircle />, className: 'bg-[#ED901E]' },
	info: { icon: <Info />, className: 'bg-blue-600' },
	warning: { icon: <AlertTriangle />, className: 'bg-yellow-500' },
};

const revealVariants: Variants = {
	initial: { clipPath: `circle(150% at 50% 50%)`, transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.7 } },
	hovering: { clipPath: `circle(0% at 50% 50%)`, transition: { duration: 0.4, ease: 'easeInOut' } },
};

const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

interface ToastProps {
	toast: ToastMessage;
}

export default function Toast({ toast }: ToastProps) {
	const removeToast = useToastStore((state) => state.removeToast);
	const { icon, className } = toastConfig[toast.type];
	const [isVisible, setIsVisible] = useState(true);

	const [randomRotate] = useState(() => getRandomValue(-8, 8));

	// PERBAIKAN: Hapus pengecekan `isCenterBottom`
	// const isCenterBottom = toast.position.bottom === '2.5rem' && toast.position.left === '50%';

	const handleClose = () => setIsVisible(false);

	useEffect(() => {
		const timer = setTimeout(handleClose, 4000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isVisible) {
			const timer = setTimeout(() => removeToast(toast.id), 400);
			return () => clearTimeout(timer);
		}
	}, [isVisible, removeToast, toast.id]);

	return (
		<motion.div
			className="absolute"
			style={{ ...toast.position, pointerEvents: 'auto' }}
			variants={{
				initial: { opacity: 0, scale: 0.7, rotate: 0 },
				animate: {
					opacity: 1,
					scale: 1,
					// PERBAIKAN: Terapkan rotasi acak ke semua toast tanpa terkecuali
					rotate: randomRotate,
					transition: { type: 'spring', stiffness: 300, damping: 25 },
				},
				exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3, ease: 'easeOut' } },
			}}
			initial="initial"
			animate={isVisible ? 'animate' : 'exit'}
			whileHover="hovering"
		>
			<div className={`group relative flex items-center justify-between w-auto min-w-[360px] px-8 py-5 rounded-full shadow-lg font-NeueMontreal overflow-hidden`}>
				<div className="absolute inset-0 w-full h-full bg-white border-2 border-black rounded-full" />
				<motion.div className={`absolute inset-0 w-full h-full rounded-full ${className}`} variants={revealVariants} />
				<div className="relative z-10 flex items-center w-full justify-between">
					<div className="flex items-center gap-3">
						{React.cloneElement(icon, { className: 'text-white group-hover:text-black transition-colors duration-300 ease-in-out' })}
						<p className="text-lg font-medium text-white group-hover:text-black transition-colors duration-300 ease-in-out">{toast.message}</p>
					</div>
					<button onClick={handleClose} className="relative z-10 p-1 rounded-full text-white group-hover:text-black hover:bg-black/10 transition-colors duration-200">
						<X size={18} />
					</button>
				</div>
			</div>
		</motion.div>
	);
}
