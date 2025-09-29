'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChatButton } from './chat/ChatButton';
import { ChatModal } from './chat/ChatModal';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { InteractiveButton } from './ui/InteractiveButton';
import { PlayIcon, PauseIcon, PrevIcon, NextIcon } from './ui/MusicIcons';
import { CloseIconPath, CommandIcon, KeyboardIcon, ToolsIconPath } from './ui/UtilityIcons';
import TrackInfo from './TrackInfo';
import { useCommandStore } from '@/store/useCommandStore';
import { CommandButton } from './CommandButton';

const iconPathVariants: Variants = {
	initial: { pathLength: 0, pathOffset: 1 },
	animate: { pathLength: 1, pathOffset: 0, transition: { duration: 0.3, ease: 'easeOut', delay: 0.1 } },
	exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.2, ease: 'easeIn' } },
	hover: {
		pathLength: [1, 0, 1],
		pathOffset: [0, 1, 0],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const mainButtonVariants: Variants = {
	open: { rotate: 45, scale: 1 },
	closed: { rotate: 0, scale: 1 },
};

const menuItemVariants = (x: number, y: number): Variants => ({
	open: {
		opacity: 1,
		scale: 1,
		x: x,
		y: y,
		transition: { type: 'spring', stiffness: 300, damping: 15, delay: 0.2 },
	},
	closed: {
		opacity: 0,
		scale: 0,
		x: 0,
		y: 0,
		transition: { duration: 0.2 },
	},
});

export default function ToolsMenu() {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isChatOpen, setChatOpen] = useState(false);
	const [isMainButtonHovered, setIsMainButtonHovered] = useState(false);
	const [showTrackInfo, setShowTrackInfo] = useState(false);

	const { isPlaying, togglePlayPause, nextTrack, prevTrack, currentTrack, duration, trackProgress } = useAudioPlayer();
	const { onToggle: onCommandPaletteToggle } = useCommandStore();

	const toggleMenu = () => setMenuOpen(!isMenuOpen);
	const toggleChat = () => {
		setChatOpen(!isChatOpen);
		setMenuOpen(false);
	};

	useEffect(() => {
		if (isPlaying) {
			setShowTrackInfo(true);
			const timer = setTimeout(() => {
				setShowTrackInfo(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isPlaying, currentTrack]);

	return (
		<>
			<div className="fixed bottom-6 right-6 z-[8000]">
				<motion.div className="relative w-16 h-16 flex items-center justify-center" initial="closed" animate={isMenuOpen ? 'open' : 'closed'}>
					<AnimatePresence>
						{isMenuOpen && (
							<>
								<motion.div className="absolute" variants={menuItemVariants(57, -40)}>
									<CommandButton />
								</motion.div>
								<motion.div className="absolute" variants={menuItemVariants(0, -88)}>
									<ChatButton onClick={toggleChat} />
								</motion.div>
								<motion.div className="absolute flex items-center gap-3" variants={menuItemVariants(-158, 0)}>
									<InteractiveButton onClick={prevTrack} icon={<PrevIcon />} iconKey="prev" ariaLabel="Previous Track" />
									<InteractiveButton onClick={togglePlayPause} icon={isPlaying ? <PauseIcon /> : <PlayIcon />} iconKey={isPlaying ? 'pause' : 'play'} ariaLabel="Play/Pause Track" size="large" />
									<InteractiveButton onClick={nextTrack} icon={<NextIcon />} iconKey="next" ariaLabel="Next Track" />
								</motion.div>
							</>
						)}
					</AnimatePresence>

					<motion.button
						onClick={toggleMenu}
						onMouseEnter={() => setIsMainButtonHovered(true)}
						onMouseLeave={() => setIsMainButtonHovered(false)}
						className={`group relative rounded-full flex items-center justify-center cursor-pointer overflow-hidden shadow-2xl z-10 bg-black border-2 border-white ${isMenuOpen ? 'w-12 h-12' : 'w-16 h-16'}`}
						aria-label="Toggle Tools Menu"
						variants={mainButtonVariants}
						transition={{ type: 'spring', stiffness: 400, damping: 15 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<motion.div
							className="absolute inset-0 bg-white rounded-full"
							initial={{ clipPath: 'circle(0% at 50% 50%)' }}
							animate={{ clipPath: !isMenuOpen && isMainButtonHovered ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)' }}
							transition={{ type: 'spring', stiffness: 200, damping: 20 }}
						/>

						<div className="relative z-10">
							<AnimatePresence mode="wait">
								{isMenuOpen ? (
									<motion.svg key="close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
										<CloseIconPath />
									</motion.svg>
								) : isMainButtonHovered ? (
									<motion.svg key="command" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<ToolsIconPath />
									</motion.svg>
								) : (
									<motion.svg key="tools" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
										<CommandIcon />
									</motion.svg>
								)}
							</AnimatePresence>
						</div>
					</motion.button>
				</motion.div>
			</div>
			<TrackInfo track={currentTrack} duration={duration} progress={trackProgress} isVisible={showTrackInfo} />
			<ChatModal isOpen={isChatOpen} onClose={toggleChat} />
		</>
	);
}
