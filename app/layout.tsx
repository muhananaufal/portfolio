import './global.css';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { DisableInteraction } from '@/components/DisableInteraction';
import { ClientLayout } from '@/components/ClientLayout';
import ToastContainer from '@/components/ui/ToastContainer';
import EasterEgg from '@/components/ui/EasterEgg';
import SmoothScroll from '@/components/SmoothScroll';
import { TransitionProvider } from '@/context/TransitionContext';

export const metadata: Metadata = {
	title: 'Muhana Naufal',
	description: 'A student from AMIKOM Yogyakarta University, web developer, cloud computing enthusiast, and anime enthusiast.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="select-none">
				<TransitionProvider>
					<Toaster
						position="top-right"
						richColors
						closeButton
						duration={3000}
						toastOptions={{
							classNames: {
								toast: 'group toast bg-white text-black border-2 border-black shadow-lg rounded-xl font-NeueMontreal',
								title: 'text-base font-medium',
								description: 'text-sm text-black/60',
								actionButton: 'group-[.toast]:bg-black group-[.toast]:text-white',
								cancelButton: 'group-[.toast]:bg-neutral-200 group-[.toast]:text-neutral-500',
								closeButton: 'group-[.toast]:border-black/20 group-[.toast]:bg-white group-[.toast]:text-black',
								error: '!bg-red-50 !border-red-200 !text-red-800',
								success: '!bg-green-50 !border-green-200 !text-green-800',
								warning: '!bg-yellow-50 !border-yellow-200 !text-yellow-800',
								info: '!bg-blue-50 !border-blue-200 !text-blue-800',
							},
						}}
					/>
					<ToastContainer />
					<EasterEgg />
					<DisableInteraction />
					<SmoothScroll />
					<ClientLayout>{children}</ClientLayout>
					<SpeedInsights />
					<Analytics />
				</TransitionProvider>
			</body>
		</html>
	);
}
