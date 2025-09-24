// components/ui/ToastContainer.tsx

'use client';

import { useToastStore } from '@/store/useToastStore';
import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

export default function ToastContainer() {
	const toasts = useToastStore((state) => state.toasts);

	return (
		// PERBAIKAN: Kontainer sekarang full-screen dan tidak mengganggu klik
		<div className="fixed inset-0 z-[9999] pointer-events-none">
			<AnimatePresence>
				{/* Hapus 'ul' karena setiap toast akan diposisikan secara independen */}
				{toasts.map((toast) => (
					<Toast key={toast.id} toast={toast} />
				))}
			</AnimatePresence>
		</div>
	);
}
