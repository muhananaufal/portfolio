import type { Config } from 'tailwindcss';
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const config: Config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './animation/**/*.{js,ts,jsx,tsx,mdx}', './container/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				black: '#35292E',
				white: '#E1E1E1',
				background: 'hsl(var(--background))',
				secondry: '#35292E',
				marquee: '#02354B',
				about: '#4497AD',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
			maskImage: {
				svgMask: 'url("/svg/mask.svg")',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			animation: {
				'background-position-spin': 'background-position-spin 3000ms infinite alternate',
			},
			keyframes: {
				'background-position-spin': {
					'0%': {
						backgroundPosition: 'top center',
					},
					'100%': {
						backgroundPosition: 'bottom center',
					},
				},
			},
		},
		fontFamily: {
			FoundersGrotesk: ['FoundersGrotesk', 'sans-serif'],
			NeueMontreal: ['NeueMontreal', 'sans-serif'],
		},
		screens: {
			xm: {
				max: '400px',
			},
			sm: {
				min: '401px',
				max: '768px',
			},
			md: {
				min: '769px',
				max: '1024px',
			},
			lg: {
				min: '1025px',
				max: '1490px',
			},
			xl: {
				min: '1491px',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

	addBase({
		':root': newVars,
	});
}

export default config;
