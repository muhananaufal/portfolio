/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Check, Clipboard, QrCode } from 'lucide-react';
import { toast } from 'sonner';

export default function LinksHead() {
	const profileRef = useRef(null);
	const [copied, setCopied] = useState(false);
	const [downloaded, setDownloaded] = useState(false);

	useEffect(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

		tl.from(profileRef.current, {
			y: 100,
			opacity: 0,
			duration: 1.2,
			delay: 0.5,
		});
	}, []);

	const handleCopy = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			setCopied(true);
			toast.info('Link copied to clipboard.');
			setTimeout(() => setCopied(false), 2000);
		});
	};

	const handleQr = () => {
		const link = document.createElement('a');
		link.href = '/cv/Muhana_Naufal.png';
		link.download = 'Muhana_Naufal.png';
		link.click();
		setDownloaded(true);
		toast.success('QR Code downloaded successfully!');
		setTimeout(() => setDownloaded(false), 2000);
	};

	return (
		<>
			<div>
				<div className="absolute top-[3.5rem] z-10 custom-hover cursor-none">
					<motion.button
						onClick={handleCopy}
						className={`custom-hover cursor-none flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 border-2 border-black ${copied ? 'bg-black text-[#E1E1E1]' : 'bg-[#E1E1E1] text-black'}`}
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						whileTap={{ scale: 0.9 }}
						transition={{
							type: 'ease',
							stiffness: 200,
							damping: 20,
							duration: 0.5,
						}}
						whileHover={{
							scale: 1.3,
							backgroundColor: '#35292E',
							color: '#E1E1E1',
							transition: {
								type: 'ease',
								stiffness: 500,
								damping: 10,
							},
						}}
					>
						{copied ? <Check className="w-6 h-6" /> : <Clipboard className="w-6 h-6" />}
					</motion.button>
				</div>
				<div className="ms-44 absolute top-[20.7rem] z-10 custom-hover cursor-none">
					<motion.button
						onClick={handleQr}
						className={`custom-hover cursor-none flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 border-2 border-black ${copied ? 'bg-black text-[#E1E1E1]' : 'bg-[#E1E1E1] text-black'}`}
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						whileTap={{ scale: 0.9 }}
						transition={{
							type: 'ease',
							stiffness: 200,
							damping: 20,
							duration: 0.5,
						}}
						whileHover={{
							scale: 1.3,
							backgroundColor: '#35292E',
							color: '#E1E1E1',
							transition: {
								type: 'ease',
								stiffness: 500,
								damping: 10,
							},
						}}
					>
						{downloaded ? <Check className="w-6 h-6" /> : <QrCode className="w-6 h-6" />}
					</motion.button>
				</div>
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 20,
						duration: 1.5,
					}}
					whileHover={{
						scale: 1.12,
						transition: {
							type: 'spring',
							stiffness: 400,
							damping: 10,
						},
					}}
					className="relative w-56 h-56 mb-14 mt-10"
				>
					<img src="/gif/profile.gif" alt="Profile" className="object-cover scale-150 " />
				</motion.div>
			</div>

			<div className="text-center mb-12 mt-6">
				<motion.h1
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 20,
						duration: 1.5,
					}}
					whileHover={{
						scale: 1.1,
						transition: {
							type: 'spring',
							stiffness: 400,
							damping: 10,
						},
					}}
					className="text-3xl font-bold text-black mb-2 font-NeueMontreal "
				>
					Muhana Naufal
				</motion.h1>

				<motion.p
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						type: 'spring',
						stiffness: 200,
						damping: 20,
						duration: 1.5,
					}}
					whileHover={{
						scale: 1.1,
						transition: {
							type: 'spring',
							stiffness: 400,
							damping: 10,
						},
					}}
					className=" text-black/80 font-NeueMontreal "
				>
					Web Developer | Cloud Computing
				</motion.p>
			</div>
		</>
	);
}
