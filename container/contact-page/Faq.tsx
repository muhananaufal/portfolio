'use client';
import { useState } from 'react';
import { FaqItems } from '@/constants';
import AccordionItem from '@/components/AccordionItem'; // ✨ Impor komponen baru

export default function Faq() {
	const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
	const [pinnedAccordion, setPinnedAccordion] = useState<number | null>(null);
	const [closingId, setClosingId] = useState<number | null>(null);

	const handleAccordionClick = (itemId: number) => {
		const newPinnedId = pinnedAccordion === itemId ? null : itemId;
		if (newPinnedId === null) {
			setClosingId(itemId);
		}
		setPinnedAccordion(newPinnedId);
		setActiveAccordion(newPinnedId);
	};

	const handleMouseEnter = (itemId: number) => {
		if (pinnedAccordion === null && closingId !== itemId) {
			setActiveAccordion(itemId);
		}
	};

	const handleMouseLeave = () => {
		setActiveAccordion(pinnedAccordion);
	};

	return (
		<section className="w-full padding-y mt-[-10px] bg-background z-30 relative rounded-t-[20px]">
			<div className="padding-x pb-[50px] sm:mt-5 mt-0">
				<h1 className="sub-heading font-medium font-NeueMontreal text-secondry blend-target w-fit">
					A few things you <br />
					may want to ask us:
				</h1>
			</div>
			{FaqItems.map((item) => (
				// ✨ Gunakan komponen AccordionItem dan kirim props yang dibutuhkan
				<AccordionItem
					key={item.id}
					item={item}
					isPinned={pinnedAccordion === item.id}
					isActive={activeAccordion === item.id}
					isFirst={item.id === 1}
					onClick={() => handleAccordionClick(item.id)}
					onMouseEnter={() => handleMouseEnter(item.id)}
					onMouseLeave={handleMouseLeave}
					onAnimationComplete={() => setClosingId(null)}
				/>
			))}
		</section>
	);
}
