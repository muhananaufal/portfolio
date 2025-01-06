'use client';
import Image from 'next/image';
import { useState } from 'react';
import { LinkHover } from '@/animation';
import { footerItems } from '@/constants';
import { Heading, RoundButton } from '@/components';
import Amikom from '@/public/Amikom.jpg';

export default function Education() {
	const [hovered, setHovered] = useState(false);

	return (
		<section className="w-full bg-about padding-y rounded-t-[20px] z-20 relative mt-[-15px]">
			<div className="pl-[50px] sm:px-[20px] xm:px-[20px]">
				<h2 className="sub-heading font-medium font-NeueMontreal text-secondry">
					The fastest path to growth is through
					<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer"> trying </span>
					and
					<span className="sub-heading font-medium font-NeueMontreal link-flash cursor-pointer"> failing.</span>
				</h2>
			</div>
			<div className="w-full border-b border-[#21212155] my-[50px] py-[20px]"></div>
			<div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
				<div className="flex flex-col gap-[30px]">
					<Heading title="My Education" />
					<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
						<RoundButton href="https://home.amikom.ac.id/" title="UNIVERSITAS AMIKOM YOGYAKARTA" bgcolor="#000" className="bg-white text-black" style={{ color: '#fff' }} />
					</div>
					<div className="w-full">
						<div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
							<div>
								<p className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide mt-5">
									<span className="font-semibold">Associate&apos;s Degree in Informatics</span>
									<br />
									2023-Now
								</p>
								<div className="sub-paragraph font-medium font-NeueMontreal text-secondry pt-[30px] tracking-wide mt-5">
									<span className="font-semibold block">AMCC (Amikom Computer Club)</span>
									<p className="ms-2">• Chairperson of EXPO AMCC 2024</p>
									<p className="ms-2">• Vice Chairperson of FIRSTMEET AMCC 2024</p>
									<p className="ms-2">• Computer Network Coordinator AMCC 2024</p>
									<p className="ms-2">• KSK Coordinator of AGS 2024</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`w-[50%] sm:w-full xm:w-full transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden ${hovered && 'scale-[0.96]'}`}>
					<Image src={Amikom} alt="universitas amikom yogyakarta" className={`w-full h-full transition transform duration-[2s] ease-[.215,.61,.355,1] ${hovered && 'scale-[1.09]'}`} />
				</div>
			</div>
		</section>
	);
}
