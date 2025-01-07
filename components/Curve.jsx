'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { text, curve, translate } from '@/motion';

const routes = {
	'/': 'Home',
	'/about': 'About',
	'/articles': 'Articles',
	'/projects': 'Projects',
	'/certifications': 'Certifications',
	'/contact': 'Contact Us',
};

const greetings = ['Welcome', 'Selamat datang', 'Bienvenido', 'Bienvenue', 'Willkommen', 'Benvenuto', 'ようこそ', '환영합니다', '欢迎', 'أهلاً وسهلاً', 'Добро пожаловать', 'Bem-vindo', 'स्वागत है', 'Hoş geldiniz', 'ยินดีต้อนรับ'];

const anim = (variants) => ({
	variants,
	initial: 'initial',
	animate: 'enter',
	exit: 'exit',
});

export default function Curve({ children, backgroundColor }) {
	const router = useRouter();
	const [dimensions, setDimensions] = useState({ width: null, height: null });
	const [currentGreeting, setCurrentGreeting] = useState(0);

	useEffect(() => {
		const resize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
		resize();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, []);

	const greetingsDuration = 200;

	useEffect(() => {
		if (router.route === '/' && greetings.length > 1) {
			const interval = setInterval(() => {
				setCurrentGreeting((prev) => (prev + 1 < greetings.length ? prev + 1 : prev));
			}, greetingsDuration);
			return () => clearInterval(interval);
		}
	}, [router.route]);

	const totalGreetingDuration = (greetings.length * greetingsDuration) / 1000;

	return (
		<div style={{ backgroundColor }}>
			<div style={{ opacity: dimensions.width == null ? 1 : 0 }} className="fixed h w-full pointer-events-none left-0 top-0 z-50 bg-black" />
			<motion.p className="absolute left-1/2 top-[40%] text-white text-[50px] z-[60] -translate-x-1/2 text-center" {...anim(text(router.route === '/' ? totalGreetingDuration : 0))}>
				{router.route === '/' ? greetings[currentGreeting] : routes[router.route]}
			</motion.p>

			{dimensions.width != null && <SVG width={dimensions.width} height={dimensions.height} route={router.route} totalGreetingDuration={totalGreetingDuration} />}
			{children}
		</div>
	);
}

const SVG = ({ height, width, route, totalGreetingDuration }) => {
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
		<motion.svg className="fixed h w-full pointer-events-none left-0 top-0 z-50" {...anim(translate(route === '/' ? totalGreetingDuration : 0))}>
			<motion.path {...anim(curve(initialPath, targetPath, route === '/' ? totalGreetingDuration : 0))} />
		</motion.svg>
	);
};
