'use client';

import { create } from 'zustand';
import { Track, playlist } from '@/hooks/useAudioPlayer';

// Variabel untuk menampung satu instance audio saja
let audioInstance: HTMLAudioElement | null = null;

interface PlayerState {
	trackIndex: number;
	isPlaying: boolean;
	duration: number;
	trackProgress: number;

	// Fungsi-fungsi untuk mengontrol player
	init: () => void;
	togglePlayPause: () => void;
	nextTrack: () => void;
	prevTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
	trackIndex: 0,
	isPlaying: false,
	duration: 0,
	trackProgress: 0,

	// Fungsi inisialisasi yang hanya berjalan sekali
	init: () => {
		if (audioInstance) return; // Jika sudah ada, jangan buat lagi

		const audio = new Audio(playlist[get().trackIndex].src);
		audioInstance = audio;

		audio.addEventListener('loadedmetadata', () => {
			set({ duration: audio.duration });
		});
		audio.addEventListener('timeupdate', () => {
			set({ trackProgress: audio.currentTime });
		});
		audio.addEventListener('ended', () => {
			get().nextTrack(); // Panggil aksi 'nextTrack' dari store
		});
	},

	togglePlayPause: () => {
		const { init, isPlaying } = get();
		if (!audioInstance) {
			init(); // Buat audio player jika belum ada
		}

		if (isPlaying) {
			audioInstance?.pause();
			set({ isPlaying: false });
		} else {
			audioInstance?.play().catch((e) => console.error('Audio play failed', e));
			set({ isPlaying: true });
		}
	},

	nextTrack: () => {
		set((state) => {
			const newIndex = (state.trackIndex + 1) % playlist.length;
			if (audioInstance) {
				audioInstance.src = playlist[newIndex].src;
				if (state.isPlaying) {
					audioInstance.play();
				}
			}
			return { trackIndex: newIndex };
		});
	},

	prevTrack: () => {
		set((state) => {
			const newIndex = (state.trackIndex - 1 + playlist.length) % playlist.length;
			if (audioInstance) {
				audioInstance.src = playlist[newIndex].src;
				if (state.isPlaying) {
					audioInstance.play();
				}
			}
			return { trackIndex: newIndex };
		});
	},
}));
