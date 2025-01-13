'use client';

import { Curve, CvButton, LinksButton, LinksHead } from '@/components';
import { FollowerPointerCard } from '@/components/ui/following-pointer';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Links() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	const author = {
		authorName: 'Muhana Naufal',
		authorAvatar: '/gif/firefly_sm.gif',
	};

	return (
		<Curve backgroundColor="#F4F4F2">
			<FollowerPointerCard title={<TitleComponent name={author.authorName} avatar={author.authorAvatar} />}>
				<div className="min-h-screen flex flex-col items-center justify-start pt-16 px-4 bg-white">
					<LinksHead />
					<CvButton />
					<LinksButton />
				</div>
			</FollowerPointerCard>
		</Curve>
	);
}

const TitleComponent = ({ name, avatar }: { name: string; avatar: string }) => (
	<div className="flex space-x-2 items-center">
		<Image src={avatar} height="25" width="25" alt="thumbnail" className="rounded-full border-2 border-white" />
		<p>{name}</p>
	</div>
);
