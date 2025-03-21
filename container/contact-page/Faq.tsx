'use client';
import { useState } from 'react';
import { FaqItems } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Faq() {
	const [activeAccordion, setActiveAccordion] = useState();
	const toggleAccordion = (itemId: any) => {
		setActiveAccordion((prev) => (prev === itemId ? null : itemId));
	};

	return (
		<section className="w-full padding-y mt-[-10px] bg-background z-30 relative rounded-t-[20px]">
			<h1 className="sub-heading padding-x font-medium font-NeueMontreal text-secondry pb-[50px] blend-target">
				A few things you <br />
				may want to ask us:
			</h1>
			{FaqItems.map((item) => (
				<div key={item.id} className={`w-full flex py-[10px] flex-col ${item.id == 1 ? 'border-y border-black' : 'border-b border-black'}`}>
					<div className="w-full flex items-center justify-between sm:gap-[15px] xm:gap-[15px] py-[10px] padding-x">
						<div className="w-[50%] sm:w-full xm:w-full">
							<h1 className="paragraph font-normal font-NeueMontreal text-secondry blend-target">{item.question}</h1>
						</div>
						<div className="w-[50%] sm:w-full xm:w-full flex items-center justify-between">
							<div>
								<h3 className="paragraph font-normal font-NeueMontreal text-secondry blend-target">{item.title}</h3>
							</div>
							<div className="flex items-end justify-end">
								<button
									className={`blend-target paragraph font-normal font-NeueMontreal uppercase transition-all duration-200 ease-in-out ${activeAccordion === item.id ? 'text-gray-300' : 'text-secondry link-flash'}`}
									onClick={() => toggleAccordion(item.id)}
								>
									{activeAccordion === item.id ? 'read' : 'read'}
								</button>
							</div>
						</div>
					</div>
					<div className="w-full flex justify-between padding-x">
						<div className="w-[50%] sm:hidden xm:hidden" />
						<div className="w-[50%] sm:w-full xm:w-full">
							<AnimatePresence>
								{activeAccordion === item.id && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										transition={{
											ease: [0.4, 0, 0.2, 1],
											duration: 1.3,
										}}
									>
										<div className="flex flex-col gap-[20px] py-[30px]">
											<div className="">
												<p className="paragraph tracking-wider font-normal font-NeueMontreal text-secondry blend-target">{item.description}</p>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			))}
		</section>
	);
}
