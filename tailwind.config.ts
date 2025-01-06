import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './animation/**/*.{js,ts,jsx,tsx,mdx}', './container/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				background: '#F9F7F7',
				secondry: '#212121',
				marquee: '#112D4E',
				about: '#3F72AF',
			},
		},
		fontFamily: {
			FoundersGrotesk: ['FoundersGrotesk', 'sans-serif'],
			NeueMontreal: ['NeueMontreal', 'sans-serif'],
		},
		screens: {
			xm: { max: '400px' },
			sm: { min: '401px', max: '768px' },
			md: { min: '769px', max: '1024px' },
			lg: { min: '1025px', max: '1490px' },
			xl: { min: '1491px' },
		},
	},
	plugins: [],
};
export default config;
