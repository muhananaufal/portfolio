// store/useToastStore.ts

import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastPosition = {
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
	transform?: string;
};

export interface ToastMessage {
	id: number;
	message: string;
	type: ToastType;
	position: ToastPosition;
}

interface ToastState {
	toasts: ToastMessage[];
	// 'positionIndex' tidak lagi diperlukan
	addToast: (message: string, type: ToastType) => void;
	removeToast: (id: number) => void;
	easterEggCount: number;
	easterEggVisible: boolean;
	easterEggTimer: NodeJS.Timeout | null;
	showEasterEgg: () => void;
	hideEasterEgg: () => void;
}

const positions: ToastPosition[] = [
	// --- Area Bawah ---
	{ bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)' },
	{ bottom: '2.5rem', left: '2.5rem' },
	{ bottom: '2.5rem', right: '2.5rem' },
	{ bottom: '8rem', left: '15%' },
	{ bottom: '8rem', right: '20%' },
	{ bottom: '25%', left: '10%' },
	{ bottom: '25%', right: '3.5rem' },
	{ bottom: '15%', left: '30%' },
	{ bottom: '15%', right: '30%' },

	// --- Area Tengah ---
	{ top: '50%', left: '2.5rem', transform: 'translateY(-50%)' },
	{ top: '50%', right: '2.5rem', transform: 'translateY(-50%)' },
	{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
	{ top: '35%', left: '35%' },
	{ top: '65%', left: '25%' },
	{ bottom: '40%', left: '20%' },

	// --- Area Atas ---
	{ top: '2.5rem', left: '50%', transform: 'translateX(-50%)' }, 
	{ top: '2.5rem', left: '2.5rem' }, 
	{ top: '2.5rem', right: '2.5rem' },
	{ top: '8rem', left: '15%' },
	{ top: '8rem', right: '15%' },
	{ top: '25%', right: '10%' },
	{ top: '25%', left: '10%' },
	{ top: '15%', right: '30%' },
	{ top: '15%', left: '30%' },

	// --- Sisa Koordinat yang Tersebar ---
	{ top: '75%', right: '15%' },
	{ top: '75%', left: '15%' },
	{ top: '35%', right: '5rem' },
	{ bottom: '35%', right: '5rem' },
	{ top: '35%', left: '5rem' },
	{ bottom: '35%', left: '5rem' },
	{ top: '2.5rem', right: '35%' },
	{ top: '2.5rem', left: '35%' },
	{ bottom: '2.5rem', right: '35%' },
	{ bottom: '2.5rem', left: '35%' },
];

const MAX_TOASTS = 40;

export const useToastStore = create<ToastState>((set, get) => ({
	toasts: [],
	easterEggCount: 0,
	easterEggVisible: false,
	easterEggTimer: null,

	showEasterEgg: () => set({ easterEggVisible: true }),
	hideEasterEgg: () => set({ easterEggVisible: false }),

	addToast: (message, type) => {
		const id = Date.now();

		// Logika Easter Egg (tidak berubah)
		const { easterEggTimer, easterEggCount } = get();
		if (easterEggTimer) clearTimeout(easterEggTimer);
		const newCount = easterEggCount + 1;
		let showEgg = false;
		if (newCount >= 50) {
			showEgg = true;
		}
		const newTimer = setTimeout(() => {
			set({ easterEggCount: 0 });
		}, 15000);

		set((state) => {
			// --- PERBAIKAN: Logika baru untuk posisi unik ---

			// 1. Dapatkan semua posisi yang sedang digunakan
			const occupiedPositions = new Set(state.toasts.map((t) => t.position));

			// 2. Filter untuk mendapatkan posisi yang masih tersedia
			const availablePositions = positions.filter((p) => !occupiedPositions.has(p));

			// 3. Jika ada posisi tersedia, pilih acak dari situ. Jika tidak, pilih acak dari semua posisi (sebagai fallback).
			const selectionPool = availablePositions.length > 0 ? availablePositions : positions;
			const randomIndex = Math.floor(Math.random() * selectionPool.length);
			const position = selectionPool[randomIndex];

			const newToast: ToastMessage = { id, message, type, position };

			let newToasts = [...state.toasts, newToast];
			if (newToasts.length > MAX_TOASTS) {
				newToasts.shift();
			}

			return {
				toasts: newToasts,
				easterEggVisible: showEgg ? true : state.easterEggVisible,
				easterEggCount: showEgg ? 0 : newCount,
				easterEggTimer: showEgg ? null : newTimer,
			};
		});
	},

	removeToast: (id) => {
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		}));
	},
}));
