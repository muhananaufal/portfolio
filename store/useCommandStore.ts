import { create } from 'zustand';

interface CommandState {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onToggle: () => void;
}

export const useCommandStore = create<CommandState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
