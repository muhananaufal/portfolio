import '@/styles/globals.css';
import { Footer, Navbar } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

export default function App({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) {
	useEffect(() => {
		const disableContextMenu = (event: MouseEvent) => {
			event.preventDefault();
			console.log('Right-click is disabled globally.');
		};

		document.addEventListener('contextmenu', disableContextMenu);

		return () => {
			document.removeEventListener('contextmenu', disableContextMenu);
		};
	}, []);

	return (
		<>
			<Toaster richColors closeButton expand={true} />
			<Navbar />
			<AnimatePresence mode="wait">
				<Component key={router.route} {...pageProps} />
			</AnimatePresence>
			<Footer />
		</>
	);
}
