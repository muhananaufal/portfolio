// src/components/AccordionItem.tsx

import { useRef, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HoverableText from './HoverableText';

// Definisikan tipe untuk 'item' agar lebih rapi
interface ItemProps {
	id: number;
	question: string;
	title: string;
	description: string;
}

// Definisikan tipe untuk props komponen ini
interface AccordionItemProps {
	item: ItemProps;
	isPinned: boolean;
	isActive: boolean;
	isFirst: boolean;
	onClick: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	onAnimationComplete: () => void;
}

export default function AccordionItem({ item, isPinned, isActive, isFirst, onClick, onMouseEnter, onMouseLeave, onAnimationComplete }: AccordionItemProps) {
	// ✨ 1. State untuk menyimpan koordinat asal animasi
	const [originCoords, setOriginCoords] = useState({ x: '95%', y: '50%' });

	// ✨ 2. Ref untuk menandai kontainer utama dan kontainer teks
	const containerRef = useRef<HTMLDivElement>(null);
	const textOriginRef = useRef<HTMLDivElement>(null);

	// ✨ 3. Lakukan pengukuran posisi setelah render, sebelum browser paint
	useLayoutEffect(() => {
		if (containerRef.current && textOriginRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			const textRect = textOriginRef.current.getBoundingClientRect();

			// Hitung pusat dari teks 'READ'
			const textCenterX = textRect.left + textRect.width / 2;
			const textCenterY = textRect.top + textRect.height / 2 + 65;

			// Hitung posisi relatif terhadap kontainer utama
			const relativeX = textCenterX - containerRect.left;
			const relativeY = textCenterY - containerRect.top;

			// Konversi ke persentase
			const xPercent = (relativeX / containerRect.width) * 100;
			const yPercent = (relativeY / containerRect.height) * 100;

			setOriginCoords({ x: `${xPercent}%`, y: `${yPercent}%` });
		}
		// Lakukan pengukuran ulang jika status aktif berubah (misal: saat membuka)
	}, [isActive]);

	// ✨ 4. Buat varian menjadi dinamis berdasarkan koordinat
	const backgroundVariants = {
		initial: {
			clipPath: `circle(0% at ${originCoords.x} ${originCoords.y})`,
		},
		pinned: {
			clipPath: `circle(150% at ${originCoords.x} ${originCoords.y})`,
		},
	};

	return (
		<div
			ref={containerRef} // Tandai kontainer utama
			className={`relative w-full flex py-[10px] flex-col overflow-hidden ${isFirst ? 'border-y border-black' : 'border-b border-black'}`}
		>
			<motion.div className="absolute inset-0 bg-black -z-10" variants={backgroundVariants} initial="initial" animate={isPinned ? 'pinned' : 'initial'} transition={{ duration: 1, ease: 'easeInOut' }} />
			<div className="relative z-10">
				<div className="w-full flex items-center justify-between sm:gap-[15px] xm:gap-[15px] py-[10px] padding-x cursor-pointer" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
					<div className="w-[50%] sm:w-full xm:w-full flex items-center justify-between">
						<h1 className={`sm:max-w-[15rem] max-w-full paragraph font-normal font-NeueMontreal blend-target transition-colors duration-500 ${isPinned ? 'text-white' : 'text-secondry'}`}>{item.question}</h1>
					</div>
					<div className="w-[50%] sm:w-full xm:w-full flex items-center justify-between">
						<div>
							<h3 className={`paragraph font-normal font-NeueMontreal blend-target transition-colors duration-500 ${isPinned ? 'text-white' : 'text-secondry'}`}>{item.title}</h3>
						</div>
						<div
							ref={textOriginRef} // Tandai kontainer teks
							className="flex items-center justify-end font-normal font-NeueMontreal uppercase paragraph blend-target"
						>
							<HoverableText key={isPinned ? 'close' : isActive ? 'pin' : 'read'} text={isPinned ? 'CLOSE' : isActive ? 'PIN' : 'READ'} isParentPinned={isPinned} />
						</div>
					</div>
				</div>
				<div className="w-full flex justify-between padding-x">
					<div className="w-[50%] sm:hidden xm:hidden" />
					<div className="w-[50%] sm:w-full xm:w-full">
						<AnimatePresence>
							{isActive && (
								<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ ease: [0.4, 0, 0.2, 1], duration: 1.3 }} onAnimationComplete={onAnimationComplete}>
									<div className="flex flex-col gap-[20px] py-[30px]">
										<div>
											<p className={`paragraph tracking-wider font-normal font-NeueMontreal blend-target transition-colors duration-500 ${isPinned ? 'text-white' : 'text-secondry'}`}>{item.description}</p>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	);
}
