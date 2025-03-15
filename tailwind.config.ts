
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyberBlue: {
					DEFAULT: '#0084ff',
					50: '#e6f2ff',
					100: '#cce5ff',
					200: '#99cbff',
					300: '#66b2ff',
					400: '#3399ff',
					500: '#0084ff',
					600: '#0066cc',
					700: '#004d99',
					800: '#003366',
					900: '#001a33',
				},
				cyberDark: {
					DEFAULT: '#141721',
					50: '#f2f3f5',
					100: '#e6e7eb',
					200: '#cccfd7',
					300: '#b3b7c3',
					400: '#999faf',
					500: '#80879b',
					600: '#666d7f',
					700: '#4d5263',
					800: '#333647',
					900: '#141721',
				},
				cyberGreen: {
					DEFAULT: '#00ff84',
					50: '#e6fff2',
					100: '#ccffe5',
					200: '#99ffcb',
					300: '#66ffb2',
					400: '#33ff98',
					500: '#00ff84',
					600: '#00cc6a',
					700: '#00994f',
					800: '#006635',
					900: '#00331a',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scan-line': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'blur-in': {
					'0%': { filter: 'blur(5px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'gradient-shift': 'gradient-shift 15s ease infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'scan-line': 'scan-line 2s linear infinite',
				'blur-in': 'blur-in 0.8s ease-out forwards'
			},
			backgroundImage: {
				'cyber-grid': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234d5263' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 20h40v1H0v-1zm0-19h40v1H0V1zM0 39h40v1H0v-1z'/%3E%3Cpath d='M20 0v40h1V0h-1zm19 0v40h1V0h-1zM1 0v40h1V0H1z'/%3E%3C/g%3E%3C/svg%3E\")",
				'cyber-gradient': 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(224, 71%, 4%) 100%)',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
