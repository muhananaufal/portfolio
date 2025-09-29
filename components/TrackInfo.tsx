'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Track } from '@/hooks/useAudioPlayer';

interface TrackInfoProps {
	track: Track;
	duration: number;
	progress: number;
	isVisible: boolean;
}

const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function TrackInfo({ track, duration, progress, isVisible }: TrackInfoProps) {
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					className="fixed xm:bottom-28 sm:bottom-28 bottom-12 xm:left-4 sm:left-8 left-12 xm:w-[180px] sm:w-[280px] w-[550px] p-4 rounded-xl shadow-2xl overflow-hidden bg-gradient-to-t from-black/80 to-black/50 backdrop-blur-md z-[7000]"
				>
					<div className="text-white font-NeueMontreal">
						<p className="text-lg font-bold truncate">{track.title}</p>
						<p className="text-sm opacity-70 truncate">{track.artist}</p>
						<div className="mt-3">
							<div className="w-full h-1 bg-white/20 rounded-full">
								<motion.div className="h-1 bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${(progress / duration) * 100}%` }} transition={{ duration: 1, ease: 'linear' }} />
							</div>
							<div className="flex justify-between text-xs opacity-70 mt-1">
								<span>{formatTime(progress)}</span>
								<span>{formatTime(duration)}</span>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
