import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { LinkHover, TextMask, LinkPreview } from '@/animation';
import { footerItems } from '@/constants';

export default function Footer() {
	const phrase = ['get-', 'in-', 'touch'];
	const phrase1 = ['more links'];
	return (
		<footer className="w-full padding-x z-30 relative pt-[40px] bg-[#C9CED4] flex flex-col justify-between rounded-t-[20px] mt-[-20px]">
			<div className="w-full flex justify-between sm:flex-col xm:flex-col">
				<div className="flex flex-col justify-between sm:w-full xm:w-full w-1/2">
					<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase blend-target">
						<TextMask>{phrase}</TextMask>
					</h1>
				</div>
				<div className="h-full flex flex-col justify-between sm:w-full xm:w-full w-1/2">
					<div>
						<h1 className="text-[150px] leading-[115px] lg:text-[130px] lg:leading-[98px] md:text-[100px] md:leading-[75px] sm:text-[74px] sm:leading-[68px] xm:text-[64px] xm:leading-[48px] font-semibold font-FoundersGrotesk text-secondry uppercase">
							<TextMask>{phrase1}</TextMask>
						</h1>
						<div className="pt-[50px]">
							<h1 className="paragraph font-medium font-NeueMontreal text-secondry pb-[20px]">Social Media:</h1>
							{footerItems.map((item) => (
								<LinkPreview
									title={item.title}
									url={item.url}
									key={item.id}
									imageSrc={item.imageSrc as unknown as string}
									className="before:h-[1px] after:h-[1px] w-fit paragraph font-medium text-secondry capitalize flex flex-col before:bottom-[1px] after:bottom-[1px]"
								/>
							))}
						</div>

						<div className="pt-[50px] flex gap-x-[20px]">
							<h1 className="paragraph font-medium font-NeueMontreal text-secondry">Email:</h1>
							<LinkHover title="muhananaufal8@gmail.com" href="https://mail.google.com/mail/?view=cm&to=muhananaufal8@gmail.com" className="before:h-[1px] after:h-[1px] paragraph font-medium before:bottom-[-3px] after:bottom-[-3px]" />
						</div>
					</div>
				</div>
			</div>
			<div className="w-full pt-[40px] pb-[30px] flex justify-between sm:flex-col xm:flex-col sm:gap-[20px] xm:gap-[20px]">
				<div className="w-1/2 sm:w-full xm:w-full">
					<Link href={'/'}>
						<Image src={logo} alt="logo" width={200} height={200} />
					</Link>
				</div>
				<div className="w-1/2 h-full flex gap-[10px] justify-between items-end sm:w-full xm:w-full sm:flex-col xm:flex-col sm:items-start xm:items-start">
					<div className="flex sm:flex-col xm:flex-col gap-[10px]">
						<h1 className="paragraph font-medium font-NeueMontreal text-secondry opacity-40">2025 © All Rights Reserved.</h1>
					</div>
				</div>
			</div>
		</footer>
	);
}
