'use client';

import { Curve, CvButton, LinksButton, LinksHead } from '@/components';
import { FollowerPointerCard } from '@/components/ui/following-pointer';
import Image from 'next/image';
import { useEffect } from 'react';

// Komponen Filter SVG yang akan kita tambahkan
const GooeyFilter = () => (
	<svg className="absolute w-0 h-0">
		<defs>
			<filter id="gooey">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
				<feBlend in="SourceGraphic" in2="gooey" />
			</filter>
		</defs>
	</svg>
);

export default function Links() {
	const author = {
		authorName: 'Muhana Naufal',
		authorAvatar: '/gif/firefly_sm.gif',
	};

	return (
		<Curve backgroundColor="#E1E1E1">
			<FollowerPointerCard title={<TitleComponent name={author.authorName} avatar={author.authorAvatar} />}>
				<div className="min-h-screen flex flex-col items-center justify-start pt-16 px-4 bg-white">
					<LinksHead />
					<CvButton />
					<LinksButton />
				</div>
			</FollowerPointerCard>
			<GooeyFilter /> {/* <-- TAMBAHKAN FILTER DI SINI */}
		</Curve>
	);
}

const TitleComponent = ({ name, avatar }: { name: string; avatar: string }) => (
	<div className="flex space-x-2 items-center">
		<Image src={avatar} height="25" width="25" alt="thumbnail" className="rounded-full border-2 border-white" unoptimized />
		<p>{name}</p>
	</div>
);
