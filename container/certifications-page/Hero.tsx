import Link from 'next/link';
import Image from 'next/image';
import { certificationsItems } from '@/constants';

export default function Hero() {

	return (
		<section className="w-full bg-[#DBE2EF]">
			<div className="w-full flex flex-col justify-between">
				<div className="w-full flex flex-col ">
					<div className="w-full margin padding-x">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">CERTIFICATIONS</h1>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
