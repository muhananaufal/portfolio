'use client';
import { Curve, Marquee, MaskCursor, Ready } from '@/components';
import { Hero } from '@/container';

export default function Home() {
	return (
		<Curve backgroundColor={'#E1E1E1'}>
			<MaskCursor />
			<Hero />
			<div className="w-full bg-marquee z-10 relative rounded-t-[20px] padding-y">
				<Marquee
					title="muhana naufal"
					className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
				/>
			</div>
			<Ready />
		</Curve>
	);
}
