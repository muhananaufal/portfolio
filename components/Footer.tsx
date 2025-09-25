// components/Footer.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { motion } from 'framer-motion';
import { LinkHover, TextMaskSmallContainer, LinkPreview } from '@/animation';
import { footerItems } from '@/constants';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollProgressCircle from './ui/ScrollProgressCircle';
import Icon from '@mdi/react';
import { mdiStarFourPoints } from '@mdi/js';
import TransitionLink from './TransitionLink';

gsap.registerPlugin(ScrollTrigger);

const routeOrder = ['/', '/about', '/projects', '/certifications', '/rewinds', '/contact', '/me'];

function useResponsiveSize() {
	const [size, setSize] = useState(1);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 769) setSize(1); // mobile
			else if (window.innerWidth < 1025) setSize(1.5); // tablet
			else setSize(3); // desktop
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return size;
}

// Komponen kecil untuk konten marquee yang menerima ref
const MarqueeContent = ({ pageName, forwardedRef }: { pageName: string; forwardedRef?: React.Ref<HTMLDivElement> }) => {
	const size = useResponsiveSize();

	return (
		<div ref={forwardedRef} className="flex shrink-0">
			<div className="flex justify-center items-center">
				<h3 className="blend-target tracking-widest text-white font-NeueMontreal sm:text-xl md:text-3xl text-6xl font-semibold uppercase py-4 px-6 shrink-0">Scroll to Discover {pageName} PAGE</h3>
				<Icon path={mdiStarFourPoints} size={size} className="mx-16 w-5 h-10" />
			</div>

			<div className="flex justify-center items-center">
				<h3 className="blend-target tracking-widest text-white font-NeueMontreal sm:text-xl md:text-3xl text-6xl font-semibold uppercase py-4 px-6 shrink-0">Scroll to Discover {pageName} PAGE</h3>
				<Icon path={mdiStarFourPoints} size={size} className="mx-16 w-5 h-10" />
			</div>

			<div className="flex justify-center items-center">
				<h3 className="blend-target tracking-widest text-white font-NeueMontreal sm:text-xl md:text-3xl text-6xl font-semibold uppercase py-4 px-6 shrink-0">Scroll to Discover {pageName} PAGE</h3>
				<Icon path={mdiStarFourPoints} size={size} className="mx-16 w-5 h-10" />
			</div>

			<div className="flex justify-center items-center">
				<h3 className="blend-target tracking-widest text-white font-NeueMontreal sm:text-xl md:text-3xl text-6xl font-semibold uppercase py-4 px-6 shrink-0">Scroll to Discover {pageName} PAGE</h3>
				<Icon path={mdiStarFourPoints} size={size} className="mx-16 w-5 h-10" />
			</div>
		</div>
	);
};

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
			<footer className="w-full padding-x z-30 relative sm:pt-[40px] md:pt-[60px] pt-[110px] bg-white flex flex-col justify-between rounded-t-[20px] mt-[-20px] overflow-hidden">
				<div className="w-full flex justify-between sm:flex-col xm:flex-col">
					<div className="flex flex-col justify-between sm:w-full xm:w-full w-1/2">
						<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase blend-target">
							<TextMaskSmallContainer>{phrase}</TextMaskSmallContainer>
						</h1>
					</div>
					<div className="h-full flex flex-col justify-between sm:w-full xm:w-full w-1/2">
						<div>
							<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase blend-target">
								<TextMaskSmallContainer>{phrase1}</TextMaskSmallContainer>
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
							<div className="pt-[50px] flex gap-x-[5px]">
								<h1 className="paragraph font-medium font-NeueMontreal text-secondry">Email:</h1>
								<LinkHover title="" href="" className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px]" />
								<a
									href="https://mail.google.com/mail/?view=cm&to=muhananaufal8@gmail.com"
									target="_blank"
									className="paragraph font-medium font-NeueMontreal text-secondry group relative inline-flex flex-col justify-end overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-current after:transition-all after:duration-300 hover:after:w-0"
								>
									<span className="transition-transform duration-300 ease-in-out group-hover:-translate-y-full">muhananaufal8@gmail.com</span>
									<span className="absolute left-0 top-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full normal-case">Let&apos;s Connect!</span>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full pt-[40px] sm:pb-[40px] md:pb-[60px] pb-[110px] flex justify-between sm:flex-col xm:flex-col sm:gap-[20px] xm:gap-[20px]">
					<div className="w-1/2 sm:w-full xm:w-full">
						<TransitionLink href={'/'}>
							<Image src={logo} alt="logo" width={200} height={200} />
						</TransitionLink>
					</div>
					<div className="w-1/2 h-full flex gap-[10px] justify-between items-end sm:w-full xm:w-full sm:flex-col xm:flex-col sm:items-start xm:items-start">
						<div className="flex sm:flex-col xm:flex-col gap-[10px]">
							<h1 className="paragraph font-medium font-NeueMontreal text-secondry">2025 © All Rights Reserved.</h1>
						</div>
					</div>
				</div>
				<div className="text-white overflow-hidden px-16 py-[5.5rem] sm:py-6 md:py-10 mx-[-50px] w-fit bg-black">
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
