'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface MouseImageGalleryProps {
	images: string[];
}

const MouseImageGallery: React.FC<MouseImageGalleryProps> = ({ images }) => {
	const galleryRef = useRef<HTMLDivElement>(null);
	const imageRefs = useRef<HTMLImageElement[]>([]);
	const currentIndex = useRef<number>(0);
	const steps = useRef<number>(0);
	const visibleImagesCount = useRef<number>(0);
	const maxVisibleImages = 8;

	const zIndexCounter = useRef<number>(0);

	useLayoutEffect(() => {
		gsap.set(imageRefs.current, { opacity: 0, scale: 0 });
	}, []);

	const manageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { clientX, clientY, movementX, movementY } = e;
		steps.current += Math.abs(movementX) + Math.abs(movementY);

		if (steps.current >= 150) {
			steps.current = 0;
			moveImage(clientX, clientY);
			if (visibleImagesCount.current >= maxVisibleImages) {
				removeImage();
			}
		}
	};

	const moveImage = (x: number, y: number) => {
		const currentImage = imageRefs.current[currentIndex.current];
		if (!currentImage) return;

		visibleImagesCount.current++;

		zIndexCounter.current++;
		gsap.set(currentImage, { zIndex: zIndexCounter.current });

		gsap.fromTo(
			currentImage,
			{
				display: 'block',
				opacity: 0,
				scale: 0.5,
				rotation: gsap.utils.random(-15, 15),
				x: x,
				y: y,
				xPercent: -50,
				yPercent: -50,
			},
			{
				opacity: 1,
				scale: 1,
				rotation: 0,
				duration: 0.7,
				ease: 'elastic.out(1, 0.6)',
			}
		);

		currentIndex.current = (currentIndex.current + 1) % imageRefs.current.length;
	};

	const removeImage = () => {
		const oldestImageIndex = (currentIndex.current - visibleImagesCount.current + imageRefs.current.length) % imageRefs.current.length;
		const oldestImage = imageRefs.current[oldestImageIndex];

		if (!oldestImage) return;

		gsap.to(oldestImage, {
			opacity: 0,
			scale: 0.8,
			y: '+=50',
			duration: 0.4,
			ease: 'power2.in',
			onComplete: () => {
				gsap.set(oldestImage, { display: 'none' });
				visibleImagesCount.current--;
			},
		});
	};

	return (
		<div ref={galleryRef} onMouseMove={manageMouseMove} className="imageGallery w-full h-screen">
			{images.map((src, index) => (
				<Image
					key={index}
					ref={(el) => {
						if (el) imageRefs.current[index] = el;
					}}
					src={src}
					alt={`Image ${index}`}
					style={{ position: 'absolute' }}
					width={250}
					height={250}
					priority={true}
					className="object-cover rounded-lg shadow-xl"
				/>
			))}
		</div>
	);
};

export default MouseImageGallery;
