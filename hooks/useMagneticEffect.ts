// hooks/useMagneticEffect.ts

import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

// Hook ini akan menerima elemen HTML sebagai generic type
export const useMagneticEffect = <T extends HTMLElement>() => {
	const ref = useRef<T>(null);

	// Menggunakan useMotionValue untuk performa yang lebih baik
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Menggunakan useSpring untuk membuat animasi lebih halus
	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouseX = useSpring(mouseX, smoothOptions);
	const smoothMouseY = useSpring(mouseY, smoothOptions);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!ref.current) return;

		const { clientX, clientY } = e;
		const { width, height, left, top } = ref.current.getBoundingClientRect();

		// Hitung posisi mouse relatif ke tengah elemen
		const x = clientX - (left + width / 2);
		const y = clientY - (top + height / 2);

		// Update MotionValues
		mouseX.set(x);
		mouseY.set(y);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return {
		ref,
		x: smoothMouseX,
		y: smoothMouseY,
		handleMouseMove,
		handleMouseLeave,
	};
};
