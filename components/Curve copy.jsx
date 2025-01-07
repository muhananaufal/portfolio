'use client';
import { AnimatePresence, motion } from 'framer-motion';
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

const anim = (variants) => {
	return {
		variants,
		initial: 'initial',
		animate: 'enter',
		exit: 'exit',
	};
};

export default function Curve({ children, backgroundColor }) {
	const router = useRouter();
	const [dimensions, setDimensions] = useState({
		width: null,
		height: null,
	});

	const [currentGreeting, setCurrentGreeting] = useState(0);
	const [allGreetingsShown, setAllGreetingsShown] = useState(false);

	useEffect(() => {
		function resize() {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		resize();
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	useEffect(() => {
		if (router.route === '/') {
			let count = 0;
			const interval = setInterval(() => {
				setCurrentGreeting((prev) => {
					if (count >= greetings.length - 1) {
						clearInterval(interval);
						setAllGreetingsShown(true);
						return prev;
					}
					count++;
					return prev + 1;
				});
			}, 200);

			return () => {
				clearInterval(interval);
				setCurrentGreeting(0); // Reset saat route berubah
				setAllGreetingsShown(false); // Reset flag
			};
		} else {
			setCurrentGreeting(0);
			setAllGreetingsShown(false);
		}
	}, [router.route]);

	return (
		<div style={{ backgroundColor }}>
			<div
				style={{ opacity: dimensions.width == null ? 1 : 0 }}
				className="fixed h-full w-full pointer-events-none
                    left-0 top-0 z-50 bg-black"
			/>
			<AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
				{router.route === '/' ? (
					<motion.p className="absolute left-1/2 top-[40%] text-white text-[50px] z-[60] -translate-x-1/2 text-center" {...anim(text)} key={currentGreeting}>
						{greetings[currentGreeting]}
					</motion.p>
				) : (
					<motion.p className="absolute left-1/2 top-[40%] text-white text-[50px] z-[60] -translate-x-1/2 text-center" {...anim(text)}>
						{routes[router.route]}
					</motion.p>
				)}
			</AnimatePresence>
			{dimensions.width != null && <SVG {...dimensions} triggerExit={router.route === '/' ? allGreetingsShown : true} />}
			{children}
		</div>
	);
}

const SVG = ({ height, width, triggerExit }) => {
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

	useEffect(() => {
		// Cleanup ketika SVG berubah
		return () => {
			// Tambahkan animasi reset atau perhitungan lain di sini jika perlu
		};
	}, [width, height]);

	return (
		<motion.svg
			className="fixed h w-full pointer-events-none
                left-0 top-0 z-50"
			{...anim(translate)}
			animate={triggerExit ? 'enter' : 'initial'}
		>
			<motion.path {...anim(curve(initialPath, triggerExit ? targetPath : initialPath))} />
		</motion.svg>
	);
};
