// components/ButtonContact.tsx

import Rounded from './Rounded';
import { ArrowUpRight } from 'lucide-react';

// PERBAIKAN 1: Ubah interface props agar bisa menerima semua properti standar tombol
interface ButtonContactProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	className?: string;
	bgcolor: string;
	style?: React.CSSProperties;
}

export default function ButtonContact({ title, className, bgcolor, style, ...props }: ButtonContactProps) {
	return (
		// PERBAIKAN 2: Gunakan {...props} untuk meneruskan semua prop tambahan (seperti type="submit")
		<button {...props} className="small-text uppercase font-normal font-NeueMontreal">
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
