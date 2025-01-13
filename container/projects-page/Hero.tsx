import { Eyes } from '@/components';
import { projectsItem } from '@/constants';

export default function Hero() {
	return (
		<section className="w-full padding-x bg-about sticky top-0 h-[65vh]">
			<div className="w-full pt-[170px] pb-[20px]">
				<div className="w-fit relative">
					<h1 className="heading tracking-[-1.3px] text-black font-semibold font-FoundersGrotesk uppercase blend-target">
						Projects
						<sup className="paragraph font-normal absolute top-[20px] ml-[10px] font-NeueMontreal">({projectsItem.length})</sup>
					</h1>
				</div>
			</div>
			<Eyes className="w-[300px] h-[300px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
		</section>
	);
}
