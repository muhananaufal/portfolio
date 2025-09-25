// context/TransitionContext.tsx

'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface TransitionContextType {
	isTransitioning: boolean;
	transition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [isTransitioning, setIsTransitioning] = useState(false);

	const transition = (href: string) => {
		setIsTransitioning(true);
		// Beri waktu 750ms untuk animasi tirai menutup, baru pindah halaman
		setTimeout(() => {
			router.push(href);
			// Reset state setelah beberapa saat agar tirai bisa membuka di halaman baru
			setTimeout(() => {
				setIsTransitioning(false);
			}, 750);
		}, 750);
	};

	return <TransitionContext.Provider value={{ isTransitioning, transition }}>{children}</TransitionContext.Provider>;
};

export const useTransition = () => {
	const context = useContext(TransitionContext);
	if (!context) {
		throw new Error('useTransition must be used within a TransitionProvider');
	}
	return context;
};
