// components/Footer.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { motion } from 'framer-motion';
import { LinkHover, TextMask, LinkPreview } from '@/animation';
import { footerItems } from '@/constants';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollProgressCircle from './ui/ScrollProgressCircle';

gsap.registerPlugin(ScrollTrigger);

const routeOrder = ['/', '/about', '/projects', '/certifications', '/rewinds', '/contact', '/me'];

// Komponen kecil untuk konten marquee yang menerima ref
const MarqueeContent = ({ pageName, forwardedRef }: { pageName: string; forwardedRef?: React.Ref<HTMLDivElement> }) => (
	<div ref={forwardedRef} className="flex shrink-0">
		<h3 className="blend-target text-secondry font-NeueMontreal text-6xl font-semibold uppercase py-4 px-8 shrink-0">Scroll to Discover • {pageName} PAGE</h3>
		<h3 className="blend-target text-secondry font-NeueMontreal text-6xl font-semibold uppercase py-4 px-8 shrink-0">Scroll to Discover • {pageName} PAGE</h3>
		<h3 className="blend-target text-secondry font-NeueMontreal text-6xl font-semibold uppercase py-4 px-8 shrink-0">Scroll to Discover • {pageName} PAGE</h3>
		<h3 className="blend-target text-secondry font-NeueMontreal text-6xl font-semibold uppercase py-4 px-8 shrink-0">Scroll to Discover • {pageName} PAGE</h3>
	</div>
);

export default function Footer() {
	const phrase = ['get-', 'in-', 'touch'];
	const phrase1 = ['more links'];
	const router = useRouter();
	const pathname = usePathname();

	const [progress, setProgress] = useState(0);
	const [nextPageName, setNextPageName] = useState('...');
	const progressRef = useRef(0);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const depleteAnimationRef = useRef<gsap.core.Tween | null>(null);
	const isNavigating = useRef(false);

	const marqueeRef = useRef<HTMLDivElement>(null);
	const [marqueeWidth, setMarqueeWidth] = useState(0);

	useLayoutEffect(() => {
		if (marqueeRef.current) {
			setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
		}
	}, [nextPageName]);

	useEffect(() => {
		gsap.set(indicatorRef.current, { scale: 0, opacity: 0 });
		setProgress(0);
		progressRef.current = 0;
		isNavigating.current = false;

		const currentIndex = routeOrder.indexOf(pathname);
		let nextPage: string;

		if (currentIndex === -1) {
			setNextPageName('Home');
			nextPage = '/';
		} else {
			const nextIndex = (currentIndex + 1) % routeOrder.length;
			nextPage = routeOrder[nextIndex];
			const formattedName = nextPage === '/' ? 'Home' : nextPage.replace('/', '').charAt(0).toUpperCase() + nextPage.slice(2);
			setNextPageName(formattedName);
		}

		let observer: Observer | null = null;
		const ctx = gsap.context(() => {
			observer = ScrollTrigger.observe({
				type: 'wheel,touch',
				target: window,
				tolerance: 5,
				onDown: () => {
					if (ScrollTrigger.maxScroll(window) - window.scrollY < 1 && !isNavigating.current) {
						if (depleteAnimationRef.current) {
							depleteAnimationRef.current.kill();
						}
						gsap.to(indicatorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
						progressRef.current += 1;
						if (progressRef.current > 100) {
							progressRef.current = 100;
						}
						setProgress(progressRef.current);
						if (progressRef.current >= 100 && !isNavigating.current) {
							isNavigating.current = true;
							const tl = gsap.timeline();
							tl.to(indicatorRef.current, {
								scale: 1.1,
								duration: 0.2,
								ease: 'power2.out',
							}).to(indicatorRef.current, {
								scale: 0,
								opacity: 0,
								duration: 0.3,
								ease: 'power2.in',
								onComplete: () => {
									router.push(nextPage);
								},
							});
						}
					}
				},
				onStop: () => {
					if (isNavigating.current) return;
					depleteAnimationRef.current = gsap.to(progressRef, {
						current: 0,
						duration: 0.5,
						ease: 'power1.out',
						onUpdate: () => setProgress(progressRef.current),
						onComplete: () => {
							gsap.to(indicatorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
						},
					});
				},
			});
		});

		return () => {
			if (observer) {
				observer.kill();
			}
			ctx.revert();
		};
	}, [pathname, router]);

	return (
		<>
			<footer className="w-full padding-x z-30 relative pt-[40px] bg-white flex flex-col justify-between rounded-t-[20px] mt-[-20px] overflow-hidden">
				<div className="w-full flex justify-between sm:flex-col xm:flex-col">
					<div className="flex flex-col justify-between sm:w-full xm:w-full w-1/2">
						<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase blend-target">
							<TextMask>{phrase}</TextMask>
						</h1>
					</div>
					<div className="h-full flex flex-col justify-between sm:w-full xm:w-full w-1/2">
						<div>
							<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase blend-target">
								<TextMask>{phrase1}</TextMask>
							</h1>
							<div className="pt-[50px]">
								<h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">Social Media:</h1>
								{footerItems.map((item) => (
									<LinkPreview
										title={item.title}
										url={item.url}
										key={item.id}
										imageSrc={item.imageSrc as unknown as string}
										className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
									/>
								))}
							</div>
							<div className="pt-[50px] flex gap-x-[20px]">
								<h1 className="paragraph font-medium font-NeueMontreal text-secondry">Email:</h1>
								<LinkHover title="muhananaufal8@gmail.com" href="https://mail.google.com/mail/?view=cm&to=muhananaufal8@gmail.com" className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px]" />
							</div>
						</div>
					</div>
				</div>
				<div className="w-full pt-[40px] pb-[30px] flex justify-between sm:flex-col xm:flex-col sm:gap-[20px] xm:gap-[20px]">
					<div className="w-1/2 sm:w-full xm:w-full">
						<Link href={'/'}>
							<Image src={logo} alt="logo" width={200} height={200} />
						</Link>
					</div>
					<div className="w-1/2 h-full flex gap-[10px] justify-between items-end sm:w-full xm:w-full sm:flex-col xm:flex-col sm:items-start xm:items-start">
						<div className="flex sm:flex-col xm:flex-col gap-[10px]">
							<h1 className="paragraph font-medium font-NeueMontreal text-secondry">2025 © All Rights Reserved.</h1>
						</div>
					</div>
				</div>
				<div className="w-full border-t border-black/10 overflow-hidden p-16">
					<motion.div
						className="flex whitespace-nowrap"
						animate={{ x: [0, -marqueeWidth] }}
						transition={{
							duration: marqueeWidth > 0 ? marqueeWidth / 100 : 10,
							repeat: Infinity,
							repeatType: 'loop',
							ease: 'linear',
						}}
					>
						<MarqueeContent pageName={nextPageName} forwardedRef={marqueeRef} />
						<MarqueeContent pageName={nextPageName} />
					</motion.div>
				</div>
			</footer>
			<ScrollProgressCircle ref={indicatorRef} progress={progress} />
		</>
	);
}
