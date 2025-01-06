export default function HeroAbout() {
	return (
		<section className="w-full min-h-screen">
			<div className="w-full flex flex-col justify-between">
				<div className="w-full flex flex-col">
					<div className="w-full margin padding-x">
						<div>
							<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">ABOUT ME</h1>
						</div>
					</div>
					<div className="w-full border-t border-[#21212155]">
						<div className="w-[80%] sm:w-full xm:w-full sub-heading font-normal padding-x font-NeueMontreal text-secondry padding-y">
							<p className="pb-4 tracking-wider">
								A <span className="font-bold cursor-pointer">Web Developer</span> and <span className="font-bold cursor-pointer">Cloud Computing</span> enthusiast passionate about designing APIs, ensuring seamless system integration, and
								building scalable solutions.
							</p>
							<p className="tracking-wider">Outside of work, I enjoy immersing myself in anime, exploring diverse music genres, and discovering new places through traveling.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
