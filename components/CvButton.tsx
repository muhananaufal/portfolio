import { linksTree } from '@/constants';
import { motion } from 'framer-motion';
import { HiDocumentDownload } from 'react-icons/hi';
import { toast } from 'sonner';
import { NeonGradientCard } from './ui/neon-gradient-card';

export default function CvButton() {
	// Function to handle the CV download
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = '/cv/CV_Muhana_Naufal.pdf';
		link.download = 'CV_Muhana_Naufal.pdf';
		link.click();
		toast.success('CV downloaded successfully!');
	};

	return (
		<NeonGradientCard className="w-full max-w-md ">
			<motion.button
				onClick={handleDownload}
				rel="noopener noreferrer"
				className="custom-hover w-full font-NeueMontreal relative flex items-center justify-between px-6 py-4 text-black rounded-lg transition-all duration-700 ease-out group overflow-hidden hover:shadow-lg cursor-none"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					delay: -1 * 0.15,
					duration: 0.8,
					ease: 'easeOut',
				}}
				whileHover={{ scale: 1.02 }}
			>
				<div className="absolute inset-0 bg-[#E1E1E1c9] transition-transform duration-700 ease-in-out transform origin-left group-hover:origin-right" />
				<div className="absolute inset-0 bg-black transform scale-x-0 transition-transform duration-700 ease-in-out origin-left group-hover:scale-x-100" />

				<div className="w-8 h-8 rounded-full bg-black group-hover:bg-[#E1E1E1] flex items-center justify-center transition-all duration-700 ease-in-out relative z-10 shadow-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-5 h-5 text-white group-hover:text-black transition-colors duration-700 lucide lucide-file-user"
					>
						<path d="M14 2v4a2 2 0 0 0 2 2h4" />
						<path d="M15 18a3 3 0 1 0-6 0" />
						<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
						<circle cx="12" cy="13" r="2" />
					</svg>
				</div>
				<span className="flex-1 text-center text-lg font-medium relative z-10 group-hover:text-white transition-all duration-700 ease-in-out ">Download CV</span>
			</motion.button>
		</NeonGradientCard>
	);
}
