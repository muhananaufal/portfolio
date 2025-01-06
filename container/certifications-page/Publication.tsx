import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationsItems } from '@/constants';
import { RoundButton } from '@/components';
import Link from 'next/link';

export default function Publication() {
	const ITEMS_PER_ROW = 3;
	const MAX_VISIBLE_ROWS = 2;
	const [showAll, setShowAll] = useState(false);

	const sortedItems = [...certificationsItems].sort((a, b) => b.id - a.id);
	const visibleItemsCount = showAll ? sortedItems.length : MAX_VISIBLE_ROWS * ITEMS_PER_ROW;
	const visibleItems = sortedItems.slice(0, visibleItemsCount);

	// Split items into rows
	const rows = [];
	for (let i = 0; i < visibleItems.length; i += ITEMS_PER_ROW) {
		rows.push(visibleItems.slice(i, i + ITEMS_PER_ROW));
	}

	return (
		<section className="w-full bg-marquee padding-y rounded-t-[20px]">
			<div className="pl-[50px] sm:px-[20px] xm:px-[20px]">
				<h2 className="sub-heading font-medium font-NeueMontreal text-white">
					Get closer to my
					<Link href="https://www.cloudskillsboost.google/public_profiles/3a633293-2b34-40d7-a7e0-cc2413ec4fad" className="sub-heading font-medium font-NeueMontreal dark link-flash cursor-pointer">
						{' '}
						Google Cloud Profile:{' '}
					</Link>
				</h2>
			</div>
			<div className="w-full border-b border-[#21212155] md:my-[25px] md:py-[10px] lg:my-[50px] lg:py-[20px] xl:my-[50px] xl:py-[20px]"></div>
			<motion.div
				className="w-full padding-x py-[30px]"
				layout
				initial={{ opacity: 1, height: 'auto' }}
				animate={{ opacity: 1, height: 'auto' }}
				exit={{ opacity: 0, height: 0 }}
				transition={{
					layout: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
					opacity: { duration: 0.5 },
				}}
			>
				<div className="w-full flex flex-col gap-[20px]">
					<h3 className="paragraph font-medium text-white font-NeueMontreal">Latest certifications:</h3>
					<motion.div
						className="w-full flex flex-col gap-[20px]"
						layout
						transition={{
							layout: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
						}}
					>
						<AnimatePresence>
							{rows.map((row, rowIndex) => (
								<motion.div
									className="w-full flex justify-around gap-[10px] flex-wrap overflow-hidden"
									key={`row-${rowIndex}`}
									layout
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{
										duration: 0.6,
										ease: [0.4, 0, 0.2, 1],
									}}
								>
									{row.map((item) => (
										<motion.div
											className="w-[20%] flex gap-[10px] rounded-[10px] flex-col sm:w-full xm:w-full"
											key={item.id}
											layout
											initial={{ opacity: 0, scale: 0.95 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{
												duration: 0.6,
												ease: [0.4, 0, 0.2, 1],
											}}
										>
											<div className="group overflow-hidden rounded-[10px]">
												<Image src={item.src} alt="img" className="w-full h-full group-hover:scale-[1.05] transform duration-[1s] ease-[.4,0,.2,1]" />
											</div>
											<div className="flex gap-[5px] items-center">
												<span className="w-[8px] h-[8px] rounded-full bg-white" />
												<h4 className="paragraph uppercase font-medium font-NeueMontreal text-white text-sm">{item.title}</h4>
											</div>
										</motion.div>
									))}
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
					<motion.div className="flex justify-center mt-[20px]" layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
						<motion.button onClick={() => setShowAll(!showAll)} className="group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
							<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group">
								<RoundButton className="bg-white text-black" bgcolor="#000" title={showAll ? 'Show Less' : 'Show More'} href={showAll ? '#show-less' : '#show-more'} style={{ color: '#fff' }} />
							</div>
						</motion.button>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
