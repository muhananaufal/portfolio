'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface MouseImageGalleryProps {
	images: string[];
}

const MouseImageGallery: React.FC<MouseImageGalleryProps> = ({ images }) => {
	const refs = useRef<HTMLImageElement[]>([]);
	const currentIndex = useRef<number>(0);
	const steps = useRef<number>(0);
	const numberOfImages = useRef<number>(0);
	const maxNumberOfImages = 8;

	const manageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { clientX, clientY, movementX, movementY } = e;
		steps.current += Math.abs(movementX) + Math.abs(movementY);

		if (steps.current >= currentIndex.current * 150) {
			moveImage(clientX, clientY);
			if (numberOfImages.current === maxNumberOfImages) {
				removeImage();
			}
		}

		if (currentIndex.current === refs.current.length) {
			currentIndex.current = 0;
			steps.current = -150;
		}
	};

	const moveImage = (x: number, y: number) => {
		const currentImage = refs.current[currentIndex.current];
		if (!currentImage) return;

		currentImage.style.left = `${x}px`;
		currentImage.style.top = `${y}px`;
		currentImage.style.display = 'block';

		currentIndex.current++;
		numberOfImages.current++;
		setZIndex();
	};

	const getCurrentImages = () => {
		const images: HTMLImageElement[] = [];
		const indexOfFirst = currentIndex.current - numberOfImages.current;

		for (let i = indexOfFirst; i < currentIndex.current; i++) {
			let targetIndex = i;
			if (targetIndex < 0) targetIndex += refs.current.length;
			images.push(refs.current[targetIndex]);
		}

		return images;
	};

	const removeImage = () => {
		const images = getCurrentImages();
		if (images[0]) {
			images[0].style.display = 'none';
			numberOfImages.current--;
		}
	};

	const setZIndex = () => {
		const images = getCurrentImages();
		images.forEach((image, i) => {
			if (image) {
				image.style.zIndex = `${i}`;
			}
		});
	};

	return (
		<div onMouseMove={manageMouseMove} className="imageGallery">
			{images.map((src, index) => (
				<Image
					key={index}
					ref={(el) => {
						if (el) refs.current[index] = el;
					}}
					src={src}
					alt={`Image ${index}`}
					style={{ display: 'none', position: 'absolute' }}
					width={250}
					height={250}
					priority={true}
				/>
			))}
		</div>
	);
};

export default MouseImageGallery;
