import { useRef } from 'react';
import { Text3d } from '@/components';

export default function Years() {
	const plane = useRef<HTMLDivElement>(null);
	const maxRotate = 45;

	const manageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (plane.current) {
			const x = e.clientX / window.innerWidth;
			const y = e.clientY / window.innerHeight;
			const perspective = window.innerWidth * 4;
			const rotateX = maxRotate * x - maxRotate / 2;
			const rotateY = (maxRotate * y - maxRotate / 2) * -1;

			plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
		}
	};

	return (
		<div onMouseMove={manageMouseMove} className="pt-[10%] pb-[12%] bg-about">
			<div className=" sm:w-full xm:w-full padding-x pb-[20px] w-max">
				<h3 className="paragraph font-medium text-white font-NeueMontreal">Take a trip back in time! Pick a year</h3>
			</div>

			<div ref={plane}>
				<Text3d primary="2023" secondary="2023" href="/rewinds/2023" />
				<Text3d primary="2024" secondary="2024" href="/rewinds/2024" />
				<Text3d primary="2025" secondary="2025" href="/rewinds/2025" />
			</div>
		</div>
	);
}
