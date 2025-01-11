import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export const FollowerPointerCard = ({ children, className, title }: { children: React.ReactNode; className?: string; title?: string | React.ReactNode }) => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const ref = React.useRef<HTMLDivElement>(null);
	const [isInside, setIsInside] = useState<boolean>(false);
	const [isCustomHover, setIsCustomHover] = useState<boolean>(false); // New state

	useEffect(() => {
		const customHoverElements = document.querySelectorAll('.custom-hover');
		const handleMouseEnter = () => setIsCustomHover(true);
		const handleMouseLeave = () => setIsCustomHover(false);

		customHoverElements.forEach((element) => {
			element.addEventListener('mouseenter', handleMouseEnter);
			element.addEventListener('mouseleave', handleMouseLeave);
		});

		return () => {
			customHoverElements.forEach((element) => {
				element.removeEventListener('mouseenter', handleMouseEnter);
				element.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		x.set(e.clientX); // Posisi kursor relatif ke viewport
		y.set(e.clientY);
	};

	const handleMouseLeave = () => {
		setIsInside(false);
	};

	const handleMouseEnter = () => {
		setIsInside(true);
	};

	return (
		<div
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			style={{
				cursor: 'none',
			}}
			ref={ref}
			className={cn('relative', className)}
		>
			<AnimatePresence>{isInside && <FollowPointer x={x} y={y} title={title} isCustomHover={isCustomHover} />}</AnimatePresence>
			{children}
		</div>
	);
};

export const FollowPointer = ({ x, y, title, isCustomHover }: { x: any; y: any; title?: string | React.ReactNode; isCustomHover: boolean }) => {
	const colors = ['var(--sky-500)', 'var(--neutral-500)', 'var(--teal-500)', 'var(--green-500)', 'var(--blue-500)', 'var(--red-500)', 'var(--yellow-500)'];
	return (
		<motion.div
			className="h-4 w-4 rounded-full z-50 fixed" // Tetap gunakan posisi fixed
			style={{
				top: y,
				left: x,
				pointerEvents: 'none',
			}}
			initial={{
				scale: 1,
				opacity: 1,
			}}
			animate={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: 0,
				opacity: 0,
			}}
		>
			<motion.svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="1"
				viewBox="0 0 16 16"
				className="h-6 w-6 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px]"
				height="1em"
				width="1em"
				animate={{
					color: isCustomHover ? 'var(--dark)' : 'var(--white)',
					stroke: isCustomHover ? 'var(--white)' : 'var(--black)',
				}}
				transition={{
					duration: 0.3,
					ease: 'easeInOut',
				}}
			>
				<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
			</motion.svg>

			<motion.div
				style={{
					backgroundColor: colors[Math.floor(Math.random() * colors.length)],
				}}
				initial={{
					scale: 0.5,
					opacity: 0,
				}}
				animate={{
					scale: 1,
					opacity: 1,
				}}
				exit={{
					scale: 0.5,
					opacity: 0,
				}}
				className={'ps-2 pe-3 py-2 bg-neutral-200 text-white font-NeueMontreal whitespace-nowrap min-w-max text-sm rounded-full'}
			>
				{title || `Muhana Naufal`}
			</motion.div>
		</motion.div>
	);
};
