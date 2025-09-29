'use client';

import { useToastStore } from '@/store/useToastStore';
import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

export default function ToastContainer() {
	const toasts = useToastStore((state) => state.toasts);

	// Filter untuk menemukan toast yang bertumpuk
	const stackedToasts = toasts.filter((t) => t.isStacked);

	return (
		<div className="fixed inset-0 z-[9998] pointer-events-none">
			<AnimatePresence>
				{toasts.map((toast) => {
					const stackIndex = toast.isStacked ? stackedToasts.findIndex((t) => t.id === toast.id) : -1;

					return <Toast key={toast.id} toast={toast} stackIndex={stackIndex} stackCount={stackedToasts.length} />;
				})}
			</AnimatePresence>
		</div>
	);
}
