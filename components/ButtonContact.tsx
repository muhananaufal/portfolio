import Rounded from './Rounded';
import { ArrowUpRight } from 'lucide-react';

interface ButtonContactProps {
	title: string;
	className?: string;
	bgcolor: string;
	style?: React.CSSProperties;
	onClick?: () => void; // Added onClick as an optional property
}

export default function ButtonContact({ title, className, bgcolor, style, onClick }: ButtonContactProps) {
	return (
		<button
			className="small-text uppercase font-normal font-NeueMontreal"
			type="button"
			onClick={onClick} // Added onClick handler
		>
			<Rounded className="py-[6px]" backgroundColor={bgcolor}>
				<p className="z-10 px-[10px] ml-[15px] py-[6px] text-white" style={style}>
					{title}
				</p>
				<div className={`p-[10px] rounded-full scale-[0.3] mr-[10px] group-hover:scale-[0.9] transition-all z-10 transform duration-[0.3s] ease-[.215,.61,.355,1] ${className}`}>
					<ArrowUpRight strokeWidth={1.5} size={30} className="scale-[0] group-hover:scale-[1]" />
				</div>
			</Rounded>
		</button>
	);
}
