'use client';

import { usePlayerStore } from '@/store/usePlayerStore';

export interface Track {
	src: string;
	title: string;
	artist: string;
}

export const playlist: Track[] = [
	{ src: '/music/take_the_journey.mp3', title: 'Take the Journey ("Honkai: Star Rail" 2025 Concert)', artist: 'Anthony Lynch' },
	{ src: '/music/had_i_not_seen_the_sun.mp3', title: 'Had I Not Seen The Sun ("Honkai: Star Rail" 2025 Concert)', artist: 'Chevy' },
	{ src: '/music/hope_is_the_thing_with_feathers.mp3', title: 'Hope Is The Thing With Feathers ("Honkai: Star Rail" 2025 Concert)', artist: 'Chevy' },
	{ src: '/music/wildfire.mp3', title: 'Wildfire ("Honkai: Star Rail" 2025 Concert)', artist: 'Jonathan Steingard' },
	{ src: '/music/interstellar_journey.mp3', title: 'Interstellar Journey ("Honkai: Star Rail" 2025 Concert)', artist: 'Loger Chen' },
	{ src: '/music/nameless_faces_english_ver.mp3', title: 'Nameless Faces (English Ver.)', artist: 'Lilas Ikuta' },
];

export const useAudioPlayer = () => {
	const state = usePlayerStore();
	const currentTrack = playlist[state.trackIndex];

	return { ...state, currentTrack };
};
