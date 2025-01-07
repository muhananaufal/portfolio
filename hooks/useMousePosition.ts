import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useMousePosition = (callback: (x: number, y: number) => void) => {
	const mouse = useRef({ x: 0, y: 0 });
	const delayedMouse = useRef({ x: 0, y: 0 });
	const rafId = useRef<number | null>(null);

	const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

	const manageMouseMove = (e: MouseEvent) => {
		const { clientX, clientY } = e;

		mouse.current = {
			x: clientX,
			y: clientY,
		};
	};

	const animate = () => {
		const { x, y } = delayedMouse.current;

		delayedMouse.current = {
			x: lerp(x, mouse.current.x, 0.075),
			y: lerp(y, mouse.current.y, 0.075),
		};

		callback(delayedMouse.current.x, delayedMouse.current.y);

		rafId.current = window.requestAnimationFrame(animate);
	};

	useEffect(() => {
		animate();
		window.addEventListener('mousemove', manageMouseMove);
		return () => {
			window.removeEventListener('mousemove', manageMouseMove);
			if (rafId.current) window.cancelAnimationFrame(rafId.current);
		};
	}, []);

	return { mouse, delayedMouse };
};
