'use client';
import { TextMask } from '@/animation';
import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Eyes } from '@/components';

export default function Socials() {
	const [rotate, setRotate] = useState(0);
	const phrase = ['github', 'linkedin', 'instagram', 'medium'];
	useEffect(() => {
		window.addEventListener('mousemove', (e) => {
			let mouseX = e.clientX;
			let mouseY = e.clientY;

			let deltaX = mouseX - window.innerWidth / 2;
			let deltaY = mouseY - window.innerHeight / 2;

			var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
			setRotate(angle - 280);
		});
	}, []);
	const container = useRef(null);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end start'],
	});

	const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);
	return (
		<section className="w-full min-h-screen sm:h-screen xm:h-screen bg-about padding-y relative" ref={container}>
			<div className="w-full h-full flex justify-center gap-[50px] items-center flex-col">
				<div className="flex flex-col gap-[10px] pb-[50px]">
					<h1 className="text-[277px] leading-[207px] lg:text-[230px] lg:leading-[170px] md:text-[150px] md:leading-[100px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] text-center font-bold font-FoundersGrotesk text-secondry uppercase pointer-events-none">
						<TextMask>{phrase}</TextMask>
					</h1>
				</div>
			</div>
			<motion.div className="w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center" style={{ y: mq }}>
				<Eyes className="w-[230px] h-[230px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
			</motion.div>
		</section>
	);
}
