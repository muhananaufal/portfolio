export default function Hero() {
	return (
		<section className="w-full min-h-screen">
			<div className="w-full flex flex-col justify-between">
				<div className="w-full flex flex-col">
					<div className="w-full margin padding-x">
						<div className="gap-y-6 grid">
							<h1 className="w-fit heading tracking-[-1.3px] text-black font-semibold font-FoundersGrotesk uppercase blend-target">ABOUT ME</h1>
							<h1 className="text-xl font-NeueMontreal text-secondry">
								Officially Part of{' '}
								<a
									href="https://www.instagram.com/amccamikom/"
									target="_blank"
									className="group relative inline-flex flex-col justify-end overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-current after:transition-all after:duration-300 hover:after:w-0"
								>
									<span className="transition-transform duration-300 ease-in-out group-hover:-translate-y-full">@amccamikom</span>
									<span className="absolute left-0 top-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full">@amccamikom</span>
								</a>{' '}
								&{' '}
								<a
									href="https://www.instagram.com/googleindonesia/"
									target="_blank"
									className="group relative inline-flex flex-col justify-end overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-current after:transition-all after:duration-300 hover:after:w-0"
								>
									<span className="transition-transform duration-300 ease-in-out group-hover:-translate-y-full">@googleindonesia</span>
									<span className="absolute left-0 top-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full">@googleindonesia</span>
								</a>
							</h1>
						</div>
					</div>
					<div className="w-full border-t border-black">
						<div className="w-[80%] sm:w-full xm:w-full sub-heading font-normal padding-x font-NeueMontreal text-secondry padding-y grid gap-y-6">
							<p className="tracking-wider">
								A <span className="font-bold blend-target">Web Developer</span> and <span className="font-bold blend-target">Cloud Computing</span> enthusiast passionate about designing APIs, ensuring seamless system integration, and
								building scalable solutions.
							</p>
							<p className="tracking-wider">
								Outside of work, I enjoy immersing myself in anime, exploring diverse music genres, and discovering new places through traveling. I have limited working proficiency in <span className="font-bold blend-target">English</span>{' '}
								and native or bilingual proficiency in <span className="font-bold blend-target">Indonesian</span>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
