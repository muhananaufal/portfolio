import '@/styles/globals.css';
import { Footer, Navbar } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useDisableInteractions } from '@/hooks/useDisableInteractions';

export default function App({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) {
	useDisableInteractions();
	return (
		<div className="select-none">
			<Toaster richColors closeButton expand={true} />
			<Navbar />
			<AnimatePresence mode="wait">
				<Component key={router.route} {...pageProps} />
			</AnimatePresence>
			<Footer />
		</div>
	);
}
