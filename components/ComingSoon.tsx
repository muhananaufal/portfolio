import FallingText from './FallingText';
import FuzzyText from './FuzzyText';

export default function ComingSoon() {
	return (
		<section className="fixed top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-2xl overflow-hidden">
			<div className="text-center absolute z-10">
				<div className="heading tracking-[-1.3px] text-black font-semibold font-FoundersGrotesk uppercase">
					<div className="grid justify-items-center justify-center gap-y-5">
						<FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
							COMING SOON!
						</FuzzyText>
						<FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} fontSize="clamp(0.5rem, 2vw, 2rem)">
							Stay Tuned.
						</FuzzyText>
					</div>
				</div>
			</div>
			<FallingText
				text={`This is not just a placeholder… it’s a little interactive teaser! Drag me around, play a bit, and stay tuned. The real portfolio magic is coming very soon.`}
				highlightWords={['placeholder…', 'interactive', 'Drag', 'play', 'portfolio', 'magic', 'soon']}
				trigger="hover"
				backgroundColor="transparent"
				wireframes={false}
				gravity={0.56}
				fontSize="4rem"
				mouseConstraintStiffness={0.9}
			/>
		</section>
	);
}
