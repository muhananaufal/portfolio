'use client';
import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import gsap from 'gsap';

const MaskCursor: React.FC = () => {
	const circle = useRef<HTMLDivElement>(null);

	const moveCircle = (x: number, y: number) => {
		if (!circle.current) return;

		gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });

		const elementUnderCursor = document.elementFromPoint(x, y) as HTMLElement;
		if (elementUnderCursor && elementUnderCursor.classList.contains('blend-target')) {
			gsap.to(circle.current, {
				width: 120,
				height: 120,
				duration: 0.3,
				ease: 'power3.out',
			});
		} else {
			gsap.to(circle.current, {
				width: 50,
				height: 50,
				duration: 0.3,
				ease: 'power3.out',
			});
		}
	};

	useMousePosition(moveCircle);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			gsap.killTweensOf(circle.current);
		};
	}, []);

	return (
		<div
			style={{
				zIndex: 7000,
				backgroundColor: '#BCE4F2',
				width: 50,
				height: 50,
			}}
			className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none"
			ref={circle}
		/>
	);
};

export default MaskCursor;
