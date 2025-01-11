import '@/styles/globals.css';
import { Footer, Navbar } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useDisableInteractions } from '@/hooks/useDisableInteractions';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Head from 'next/head';

export default function App({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) {

	const routesWithoutNavbarAndFooter = ['/articles', '/rewinds/2023', '/rewinds/2024', '/rewinds/2025', '/me'];
	const shouldShowLayout = !routesWithoutNavbarAndFooter.includes(router.route);

	return (
		<div className="select-none">
			<Head>
				<title>Muhana Naufal</title>
				<meta name="google-site-verification" content="m2sljs2hmb6YARyu67zlv2RU0yFhMcVDsQg4Y-nX5xo" />
			</Head>
			<Toaster richColors closeButton expand={true} />
			{shouldShowLayout && <Navbar />}
			<AnimatePresence mode="wait">
				<Component key={router.route} {...pageProps} />
				<SpeedInsights />
				<Analytics />
			</AnimatePresence>

			{shouldShowLayout && <Footer />}
		</div>
	);
}
