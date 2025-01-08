import '@/styles/globals.css';
import { Footer, Navbar } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useDisableInteractions } from '@/hooks/useDisableInteractions';
import MaskCursor from '@/components/MaskCursor';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) {
	useDisableInteractions();

	const routesWithDisabledCursor = ['/articles', '/rewinds/2023', '/rewinds/2024', '/rewinds/2025'];
	const isActive = !routesWithDisabledCursor.includes(router.route);
	const routesWithoutNavbarAndFooter = ['/articles', '/rewinds/2023', '/rewinds/2024', '/rewinds/2025'];

	const shouldShowLayout = !routesWithoutNavbarAndFooter.includes(router.route);

	return (
		<div className="select-none">
			<Toaster richColors closeButton expand={true} />

			{shouldShowLayout && <Navbar />}

			<AnimatePresence mode="wait">
				<MaskCursor isActive={isActive} />
				<Component key={router.route} {...pageProps} />
				<SpeedInsights />
				<Analytics />
			</AnimatePresence>

			{shouldShowLayout && <Footer />}
		</div>
	);
}
