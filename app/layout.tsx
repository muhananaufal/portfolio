import './global.css';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { DisableInteraction } from '@/components/DisableInteraction';
import { ClientLayout } from '@/components/ClientLayout';

export const metadata: Metadata = {
	title: 'Muhana Naufal',
	description: 'A student from AMIKOM Yogyakarta University, web developer, cloud computing enthusiast, and anime enthusiast.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="select-none">
				<Toaster richColors closeButton expand={true} />
				<DisableInteraction />
				<ClientLayout>{children}</ClientLayout>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
