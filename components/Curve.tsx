'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { text, curve, translate } from '@/motion';
import { usePathname } from 'next/navigation';
import { useTransition } from '@/context/TransitionContext';

const routes = {
	'/': 'Home',
	'/about': 'About',
	'/articles': 'Articles',
	'/projects': 'Projects',
	'/certifications': 'Certifications',
	'/rewinds': 'Rewinds',
	'/rewinds/2023': 'Rewinds 2023',
	'/rewinds/2024': 'Rewinds 2024',
	'/rewinds/2025': 'Rewinds 2025',
	'/contact': 'Contact Us',
	'/me': 'LinkTree',
};

const greetings = ['Welcome', 'Selamat datang', 'Bienvenido', 'Bienvenue', 'Willkommen', 'Benvenuto', 'ようこそ', '환영합니다', '欢迎', 'أهلاً وسهلاً', 'Добро пожаловать', 'Bem-vindo', 'स्वागत है', 'Hoş geldiniz', 'ยินดีต้อนรับ'];

interface CurveProps {
	children: React.ReactNode;
	backgroundColor: string;
}

export default function Curve({ children, backgroundColor }: CurveProps) {
	const router = usePathname();
	const [dimensions, setDimensions] = useState({ width: null, height: null });
	const [currentGreeting, setCurrentGreeting] = useState(0);
	const [isBlocking, setIsBlocking] = useState(false);

	const { isTransitioning } = useTransition();

	useEffect(() => {
		const resize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
		resize();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, []);

	const greetingsDuration = 200;

	useEffect(() => {
		if (router === '/' && greetings.length > 1) {
			const interval = setInterval(() => {
				setCurrentGreeting((prev) => (prev + 1 < greetings.length ? prev + 1 : prev));
			}, greetingsDuration);
			return () => clearInterval(interval);
		}
	}, [router]);

	useEffect(() => {
		const preventScroll = (e: Event) => {
			e.preventDefault();
			e.stopPropagation();
			return false;
		};

		if (isTransitioning) {
			document.body.style.pointerEvents = 'none';

			// blok semua aksi scroll
			window.addEventListener('wheel', preventScroll, { passive: false });
			window.addEventListener('touchmove', preventScroll, { passive: false });
			window.addEventListener('keydown', preventScroll, { passive: false });
		} else {
			document.body.style.pointerEvents = 'auto';

			window.removeEventListener('wheel', preventScroll);
			window.removeEventListener('touchmove', preventScroll);
			window.removeEventListener('keydown', preventScroll);
		}

		return () => {
			window.removeEventListener('wheel', preventScroll);
			window.removeEventListener('touchmove', preventScroll);
			window.removeEventListener('keydown', preventScroll);
			document.body.style.pointerEvents = 'auto';
		};
	}, [isTransitioning]);

	const totalGreetingDuration = (greetings.length * greetingsDuration) / 1000;

	return (
		<div style={{ backgroundColor }}>
			{dimensions.width == null && <div className={`fixed inset-0 z-[8999] bg-black ${isBlocking ? 'pointer-events-auto' : 'pointer-events-none'}`} />}
			<motion.p className="absolute left-1/2 top-[40%] text-white text-[50px] z-[9989] -translate-x-1/2 text-center" variants={text(router === '/' ? totalGreetingDuration : 0)} animate={isTransitioning ? 'exit' : 'enter'} initial="initial">
				{router === '/' ? greetings[currentGreeting] : routes[router]}
			</motion.p>

			{dimensions.width != null && (
				<SVG width={dimensions.width} height={dimensions.height} route={router} totalGreetingDuration={totalGreetingDuration} isTransitioning={isTransitioning} isBlocking={isBlocking} setIsBlocking={setIsBlocking} />
			)}

			{children}
		</div>
	);
}

interface SVGProps {
	height: number | null;
	width: number | null;
	route: string;
	totalGreetingDuration: number;
	isTransitioning: any;
	isBlocking: any;
	setIsBlocking: any;
}

const SVG = ({ height, width, route, totalGreetingDuration, isTransitioning, isBlocking, setIsBlocking }: SVGProps) => {
	const initialPath = `
		M0 300 
		Q${width / 2} 0 ${width} 300
		L${width} ${height + 300}
		Q${width / 2} ${height + 600} 0 ${height + 300}
		L0 0
	`;

	const targetPath = `
		M0 300
		Q${width / 2} 0 ${width} 300
		L${width} ${height}
		Q${width / 2} ${height} 0 ${height}
		L0 0
	`;

	return (
		<motion.svg
			className={`fixed h w-full left-0 top-0 z-[8999] ${isBlocking ? 'pointer-events-auto' : 'pointer-events-none'}`}
			variants={translate(route === '/' ? totalGreetingDuration : 0)}
			animate={isTransitioning ? 'exit' : 'enter'}
			initial="initial"
			onAnimationStart={() => setIsBlocking(true)}
			onAnimationComplete={() => setIsBlocking(false)}
		>
			<motion.path variants={curve(initialPath, targetPath, route === '/' ? totalGreetingDuration : 0)} animate={isTransitioning ? 'exit' : 'enter'} initial="initial" />
		</motion.svg>
	);
};
