'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Heading, RoundButton } from '@/components';
import { amikom, megadata } from '@/public';

export default function EducationAndExperience() {
	const [hovered, setHovered] = useState<string | null>(null);
	const [isTabletOrBelow, setIsTabletOrBelow] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsTabletOrBelow(window.innerWidth < 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<section className="w-full bg-about padding-y rounded-t-[20px] z-20 relative mt-[-15px]">
			<div className="pl-[50px] sm:px-[20px] xm:px-[20px]">
				<h2 className="sub-heading font-medium font-NeueMontreal text-secondry">
					The fastest path to growth is through
					<span className="sub-heading font-medium font-NeueMontreal link-flash"> trying </span>
					and
					<span className="sub-heading font-medium font-NeueMontreal link-flash"> failing.</span>
				</h2>
			</div>
			<div className="w-full border-b border-black my-[50px] py-[20px]"></div>
			<div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
				<div className="flex flex-col gap-[30px]">
					<Heading title="My Education" className="blend-target" />
					<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group" onMouseEnter={() => setHovered('amikom')} onMouseLeave={() => setHovered(null)}>
						<RoundButton href="https://home.amikom.ac.id/" title="UNIVERSITAS AMIKOM YOGYAKARTA" bgcolor="#35292E" className="bg-white text-black" style={{ color: '#E1E1E1' }} />
					</div>
					<div className="w-full">
						<div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
							<div>
								<div className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide mt-5">
									<span className="font-semibold">Associate&apos;s Degree in Informatics</span>
									<p className="italic">2023-Now</p>
								</div>
								<div className="sub-paragraph font-medium font-NeueMontreal text-secondry pt-[30px] tracking-wide mt-5">
									<span className="font-semibold block">AMCC (Amikom Computer Club)</span>
									<p className="ms-2">• Computer Network Coordinator AMCC 2024</p>
									<p className="ms-2">• KSK Coordinator of AGS 2025</p>
									<p className="ms-2">• Vice Chairperson of FirstMeet AMCC 2024</p>
									<p className="ms-2">• Chairperson of EXPO AMCC 2024</p>
									<p className="ms-2">• Moderator Competitive Programming of CODE AMCC 2024</p>
									<p className="ms-2">• Liaison Officer of CODE AMCC 2024</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`w-[50%] sm:w-full xm:w-full transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden ${hovered === 'amikom' && 'scale-[0.96]'}`}>
					<Image src={amikom} alt="universitas amikom yogyakarta" className={`w-full h-full transition transform duration-[2s] ease-[.215,.61,.355,1] ${hovered === 'amikom' && 'scale-[1.09]'}`} />
				</div>
			</div>
			<div className="w-full border-b border-black my-[50px] py-[20px]"></div>
			<div className="w-full flex justify-between padding-x sm:flex-col xm:flex-col gap-[30px]">
				{isTabletOrBelow ? (
					<>
						<div className="flex flex-col gap-[30px]">
							<Heading title="My Experience" className="blend-target" />
							<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group" onMouseEnter={() => setHovered('megadata')} onMouseLeave={() => setHovered(null)}>
								<RoundButton href="https://megadata.net.id/" title="MEGA ARTHA LINTAS DATA" bgcolor="#35292E" className="bg-white text-black" style={{ color: '#E1E1E1' }} />
							</div>
							<div className="w-full">
								<div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
									<div>
										<div className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide mt-5">
											<p className="font-semibold">Network Technician · Internship</p>
											<p className="font-semibold">PT. Mega Artha Lintas Data (MEGADATA ISP)</p>
											<p className="italic">Aug 2022 - Oct 2022 · 3 month</p>
											<p className="italic">Klaten Regency, Central Java, Indonesia · On-site</p>
										</div>
										<div className="sub-paragraph font-medium font-NeueMontreal text-secondry pt-[30px] tracking-wide mt-5">
											<span className="font-semibold block">As a Network Technician intern at PT. Mega Artha Lintas Data, I was responsible for:</span>
											<p className="ms-2">• Installing, configuring, and maintaining network devices and infrastructure.</p>
											<p className="ms-2">• Conducting routine inspections and troubleshooting to ensure network reliability.</p>
											<p className="ms-2">• Assisting in the setup and maintenance of client network systems.</p>
											<p className="ms-2">• Responding to technical issues on-site to provide swift and effective solutions.</p>
											<p className="ms-2">• Collaborating with team members to complete network deployment projects.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={`w-[50%] sm:w-full xm:w-full transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden ${hovered === 'megadata' && 'scale-[0.96]'}`}>
							<Image src={megadata} alt="mega artha lintas data" className={`w-full h-full transition transform duration-[2s] ease-[.215,.61,.355,1] ${hovered === 'megadata' && 'scale-[1.09]'}`} />
						</div>
					</>
				) : (
					<>
						<div className={`w-[50%] sm:w-full xm:w-full transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden ${hovered === 'megadata' && 'scale-[0.96]'}`}>
							<Image src={megadata} alt="mega artha lintas data" className={`w-full h-full transition transform duration-[2s] ease-[.215,.61,.355,1] ${hovered === 'megadata' && 'scale-[1.09]'}`} />
						</div>
						<div className="flex flex-col gap-[30px] w-[50%]">
							<Heading title="My Experience" className="blend-target" />
							<div className="w-fit flex items-center justify-between bg-secondry cursor-pointer rounded-full group" onMouseEnter={() => setHovered('megadata')} onMouseLeave={() => setHovered(null)}>
								<RoundButton href="https://megadata.net.id/" title="MEGA ARTHA LINTAS DATA" bgcolor="#35292E" className="bg-white text-black" style={{ color: '#E1E1E1' }} />
							</div>
							<div className="w-full">
								<div className="w-full flex gap-[30px] h-full items-end sm:items-start sm:flex-col xm:items-start xm:flex-col">
									<div>
										<div className="sub-paragraph font-medium font-NeueMontreal text-secondry tracking-wide mt-5">
											<p className="font-semibold">Network Technician · Internship</p>
											<p className="font-semibold">PT. Mega Artha Lintas Data (MEGADATA ISP)</p>
											<p className="italic">Aug 2022 - Oct 2022 · 3 month</p>
											<p className="italic">Klaten Regency, Central Java, Indonesia · On-site</p>
										</div>
										<div className="sub-paragraph font-medium font-NeueMontreal text-secondry pt-[30px] tracking-wide mt-5">
											<span className="font-semibold block">As a Network Technician intern at PT. Mega Artha Lintas Data, I was responsible for:</span>
											<p className="ms-2">• Installing, configuring, and maintaining network devices and infrastructure.</p>
											<p className="ms-2">• Conducting routine inspections and troubleshooting to ensure network reliability.</p>
											<p className="ms-2">• Assisting in the setup and maintenance of client network systems.</p>
											<p className="ms-2">• Responding to technical issues on-site to provide swift and effective solutions.</p>
											<p className="ms-2">• Collaborating with team members to complete network deployment projects.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
