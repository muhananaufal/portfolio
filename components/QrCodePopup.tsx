// components/QrCodePopup.tsx

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Download, X } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const popupVariants = {
	hidden: { scale: 0.5, opacity: 0 },
	visible: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
	exit: { scale: 0.5, opacity: 0, transition: { duration: 0.2 } },
};

interface QrCodePopupProps {
	qrImageUrl: string;
	onClose: () => void;
}

export default function QrCodePopup({ qrImageUrl, onClose }: QrCodePopupProps) {
	const popupRef = useRef<HTMLDivElement | null>(null);

	const handleSave = (e: React.MouseEvent) => {
		e.stopPropagation();
		const link = document.createElement('a');
		link.href = qrImageUrl;
		link.download = 'Muhana_Naufal_QRCode.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success('QR Code has been saved!');
	};

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline();
			tl.from('.qr-image', {
				duration: 0.8,
				scale: 0,
				rotation: -45,
				opacity: 0,
				ease: 'elastic.out(1, 0.75)',
				delay: 0.2,
			})
				.from(
					'.qr-text',
					{
						duration: 0.5,
						y: 20,
						opacity: 0,
						ease: 'power3.out',
					},
					'-=0.5'
				)
				.from(
					'.save-button',
					{
						duration: 0.5,
						y: 20,
						opacity: 0,
						ease: 'power3.out',
						// === INI PERBAIKANNYA ===
						clearProps: 'all', // Hapus inline style setelah animasi selesai
					},
					'-=0.4'
				);
		}, popupRef);

		return () => ctx.revert();
	}, []);

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	return (
		<motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
			<motion.div ref={popupRef} variants={popupVariants} className="relative flex flex-col items-center p-8 bg-white/90 rounded-3xl shadow-2xl border border-gray-200" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
				{/* <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black transition-colors">
					<X size={24} />
				</button> */}
				<Image src={qrImageUrl} alt="QR Code Muhana Naufal" className="qr-image w-64 h-64 md:w-96 md:h-96 rounded-xl object-cover" width={500} height={500} />
				<p className="qr-text mt-4 font-semibold text-gray-800 font-NeueMontreal">Scan to connect!</p>
				<button onClick={handleSave} className="save-button group mt-5 flex items-center gap-2 bg-black text-white font-NeueMontreal text-sm py-3 px-6 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
					<Download size={16} className="transition-transform duration-300 group-hover:-rotate-12" />
					Save My QR Code
				</button>
			</motion.div>
		</motion.div>
	);
}
