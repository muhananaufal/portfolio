'use client';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Image from 'next/image';
import { encode } from 'qss';
import React from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LinkPreviewProps = {
	children: React.ReactNode;
	url: string;
	className?: string;
	width?: number;
	height?: number;
	quality?: number;
	layout?: string;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

export const LinkView = ({ children, url, className, width = 200, height = 125, quality = 75, isStatic = false, imageSrc = '' }: LinkPreviewProps) => {
	let src;
	if (!isStatic) {
		const params = encode({
			url,
			screenshot: true,
			meta: false,
			embed: 'screenshot.url',
			colorScheme: 'dark',
			'viewport.isMobile': true,
			'viewport.deviceScaleFactor': 1,
			'viewport.width': width * 3,
			'viewport.height': height * 3,
		});
		src = `https://api.microlink.io/?${params}`;
	} else {
		src = imageSrc;
	}

	const [isOpen, setOpen] = React.useState(false);

	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useSpring(useMotionValue(0), springConfig);
	const rotateY = useSpring(useMotionValue(0), springConfig);

	const translateX = useSpring(x, springConfig);
	const translateY = useSpring(y, springConfig);

	const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		const target = event.target as HTMLElement;
		const rect = target.getBoundingClientRect();
		const { clientX, clientY } = event;

		const mouseX = clientX - rect.left;
		const mouseY = clientY - rect.top;

		const xPct = mouseX / rect.width - 0.5;
		const yPct = mouseY / rect.height - 0.5;

		x.set(xPct * 20);
		y.set(yPct * 20);
		rotateY.set(xPct * 25);
		rotateX.set(-yPct * 25);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
		rotateY.set(0);
		rotateX.set(0);
	};

	return (
		<>
			{isMounted ? (
				<div className="hidden">
					<Image src={src} width={width} height={height} quality={quality} priority alt="hidden image" />
				</div>
			) : null}

			<HoverCardPrimitive.Root
				openDelay={50}
				closeDelay={100}
				onOpenChange={(open) => {
					setOpen(open);
				}}
			>
				<HoverCardPrimitive.Trigger asChild onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
					<a href={url} className={cn('text-black', className)}>
						{children}
					</a>
				</HoverCardPrimitive.Trigger>

				{isMounted && (
					<HoverCardPrimitive.Content asChild forceMount className="[transform-origin:var(--radix-hover-card-content-transform-origin)]" side="top" align="center" sideOffset={12}>
						<AnimatePresence onExitComplete={() => setIsMounted(false)}>
							{isOpen && (
								<motion.div
									initial={{
										opacity: 0,
										clipPath: 'inset(50% 50% 50% 50% round 12px)',
									}}
									animate={{
										opacity: 1,
										clipPath: 'inset(0% 0% 0% 0% round 12px)',
										transition: {
											duration: 0.4,
											ease: [0.76, 0, 0.24, 1],
										},
									}}
									exit={{
										opacity: 0,
										clipPath: 'inset(50% 50% 50% 50% round 12px)',
										transition: {
											duration: 0.3,
											ease: [0.76, 0, 0.24, 1],
										},
									}}
									style={{
										x: translateX,
										y: translateY,
										rotateX,
										rotateY,
									}}
									className="shadow-2xl rounded-xl"
								>
									<Link href={url} className="block p-1 bg-black/20 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl" style={{ fontSize: 0 }}>
										<Image src={isStatic ? imageSrc : src} width={width} height={height} quality={quality} priority={true} className="rounded-lg" alt="preview image" />
									</Link>
								</motion.div>
							)}
						</AnimatePresence>
					</HoverCardPrimitive.Content>
				)}
			</HoverCardPrimitive.Root>
		</>
	);
};
