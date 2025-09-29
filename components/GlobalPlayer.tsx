'use client';

import { useEffect, useState } from 'react';
import TrackInfo from '@/components/TrackInfo';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export default function GlobalPlayer() {
	const { isPlaying, currentTrack, duration, trackProgress } = useAudioPlayer();
	const [showTrackInfo, setShowTrackInfo] = useState(false);

	// Logika untuk menampilkan/menyembunyikan info lagu
	useEffect(() => {
		if (isPlaying) {
			setShowTrackInfo(true);
			const timer = setTimeout(() => {
				setShowTrackInfo(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isPlaying, currentTrack]); // Dipicu saat isPlaying atau lagunya berubah

	return <TrackInfo track={currentTrack} duration={duration} progress={trackProgress} isVisible={showTrackInfo} />;
}
