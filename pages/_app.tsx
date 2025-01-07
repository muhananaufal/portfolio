import '@/styles/globals.css';
import { Footer, Navbar } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function App({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) {
	useEffect(() => {
		// Disable right-click context menu
		const disableContextMenu = (event: MouseEvent) => {
			event.preventDefault();
		};

		// Disable keyboard shortcuts for DevTools
		const disableDevToolsShortcuts = (event: KeyboardEvent) => {
			if (
				(event.ctrlKey && event.shiftKey && ['I', 'J', 'C', 'U'].includes(event.key.toUpperCase())) || // Ctrl+Shift+I/J/C/U
				event.key === 'F12' // F12
			) {
				event.preventDefault();
			}
		};

		// Disable text/image dragging
		const disableDrag = (event: DragEvent) => {
			event.preventDefault();
		};

		document.addEventListener('contextmenu', disableContextMenu);
		document.addEventListener('keydown', disableDevToolsShortcuts);
		document.addEventListener('dragstart', disableDrag);

		return () => {
			document.removeEventListener('contextmenu', disableContextMenu);
			document.removeEventListener('keydown', disableDevToolsShortcuts);
			document.removeEventListener('dragstart', disableDrag);
		};
	}, []);

	return (
		<div className="select-none">
			<SpeedInsights />
			<Toaster richColors closeButton expand={true} />
			<Navbar />
			<AnimatePresence mode="wait">
				<Component key={router.route} {...pageProps} />
			</AnimatePresence>
			<Footer />
		</div>
	);
}
