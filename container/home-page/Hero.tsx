'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { firefly1, naufal } from '@/public';

export default function Hero() {
	return (
		<section className="w-full h-screen sm:mb-[-10px] xm:mb-[-10px]" data-scroll data-scroll-speed="-.3">
			<div className="w-full h-full flex flex-col justify-between sm:justify-center xm:justify-center">
				<div />
				<div className="w-full flex flex-col justify-between h-[75vh] sm:h-[85vh] xm:h-[85vh]">
					<div className="w-full flex sm:flex-col xm:flex-col justify-between gap-[20px] pl-[50px] md:pl-[30px] sm:pl-[20px] xm:pl-[20px]">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
								Seamless <br />
								<div className="flex items-center gap-[5px]">
									<motion.span
										initial={{ width: 0 }}
										animate={{ width: 'auto' }}
										transition={{
											ease: [0.86, 0, 0.07, 0.995],
											duration: 1,
											delay: 1.5,
										}}
										className="leading-[130px]"
									>
										<Image
											width={120}
											height={50}
											src={firefly1}
											alt="img"
											className="w-auto h-[95px] lg:w-auto lg:h-auto md:w-[100px] md:h-[63px] sm:w-[74px] sm:h-[45px] xm:w-[64px] xm:h-[40px] object-cover xl:mt-[15px] mt-[10px] rounded-[10px]"
											unoptimized
										/>
									</motion.span>
									<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">Experiences</h1>
								</div>
								via Fullstack
							</h1>
						</div>
						<div>
							<Image src={naufal} alt="awwwards" width={60} height={60} className="w-fit h-fit" unoptimized />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
