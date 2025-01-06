'use client';
import { useState } from 'react';
import { Marquee } from '@/components';
import { TextHover } from '@/animation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Motto() {
	return (
		<section className="w-full bg-marquee z-25 relative padding-y rounded-t-[20px] mt-[-20px]">
			<div className="w-[30%] sm:w-full xm:w-full ps-[50px] pb-[20px]">
				<h3 className="paragraph font-medium text-white font-NeueMontreal">My Motto</h3>
			</div>
			<Marquee
				title="Do the best"
				direction="right"
				className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[30px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
			/>{' '}
			<Marquee
				title="dont forget do the rest"
				direction="left"
				className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[30px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
			/>
		</section>
	);
}
