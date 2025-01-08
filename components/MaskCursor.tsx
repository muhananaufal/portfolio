'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import gsap from 'gsap';

interface MaskCursorProps {
	isActive: boolean;
	onRendered?: () => void;
}

const MaskCursor: React.FC<MaskCursorProps> = ({ isActive, onRendered }) => {
	const circle = useRef<HTMLDivElement>(null);
	const [isBlended, setIsBlended] = useState(false);

	const moveCircle = (x: number, y: number) => {
		if (!isActive) return;

		gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });

		const elementUnderCursor = document.elementFromPoint(x, y) as HTMLElement;
		if (elementUnderCursor && elementUnderCursor.classList.contains('blend-target')) {
			setIsBlended(true);
		} else {
			setIsBlended(false);
		}
	};

	useMousePosition(moveCircle);
	const cursorSize = isBlended ? 120 : 50;
	useLayoutEffect(() => {
		if (onRendered) {
			onRendered();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isActive) {
		return null;
	}

	return (
		<div
			style={{
				zIndex: 7000,
				backgroundColor: '#BCE4F2',
				width: cursorSize,
				height: cursorSize,
				transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`,
			}}
			className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none"
			ref={circle}
		/>
	);
};

export default MaskCursor;
