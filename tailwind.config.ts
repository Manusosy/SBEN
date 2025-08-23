
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
		fontFamily: {
			sans: ['Lato', 'sans-serif'],
		},
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
					DEFAULT: '#000080', // Navy Blue - Main brand color, representing trust and authority
					50: '#E6E6F2',
					100: '#CCCCE5',
					200: '#9999CB',
					300: '#6666B1',
					400: '#333397',
					500: '#000080', // Primary
					600: '#000066',
					700: '#00004D',
					800: '#000033',
					900: '#00001A',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#FF6600', // Logo Orange - Secondary brand color, representing energy and empowerment
					50: '#FFF2E6',
					100: '#FFE5CC',
					200: '#FFCB99',
					300: '#FFB166',
					400: '#FF9733',
					500: '#FF6600', // Secondary
					600: '#CC5200',
					700: '#993D00',
					800: '#662900',
					900: '#331400',
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#1E40AF', // Royal Blue - Complementary accent, representing excellence and achievement
					50: '#EFF6FF',
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#1E40AF', // Accent
					600: '#1E3A8A',
					700: '#1E3A8A',
					800: '#1E3A8A',
					900: '#1E3A8A',
					foreground: '#FFFFFF'
				},
				empowerment: {
					DEFAULT: '#DC2626', // Empowering Red - For calls-to-action and important elements
					50: '#FEF2F2',
					100: '#FEE2E2',
					200: '#FECACA',
					300: '#FCA5A5',
					400: '#F87171',
					500: '#DC2626', // Empowerment
					600: '#B91C1C',
					700: '#991B1B',
					800: '#7F1D1D',
					900: '#450A0A',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#059669', // Success Green - For positive actions and achievements
					50: '#ECFDF5',
					100: '#D1FAE5',
					200: '#A7F3D0',
					300: '#6EE7B7',
					400: '#34D399',
					500: '#059669', // Success
					600: '#047857',
					700: '#065F46',
					800: '#064E3B',
					900: '#022C22',
					foreground: '#FFFFFF'
				},
				warning: {
					DEFAULT: '#D97706', // Warning Orange - For alerts and important notices
					50: '#FFFBEB',
					100: '#FEF3C7',
					200: '#FDE68A',
					300: '#FCD34D',
					400: '#FBBF24',
					500: '#D97706', // Warning
					600: '#B45309',
					700: '#92400E',
					800: '#78350F',
					900: '#451A03',
					foreground: '#000000'
				},
				destructive: {
					DEFAULT: '#DC2626',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#6B7280',
					foreground: '#374151'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#111827'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#111827'
				},
				sidebar: {
					DEFAULT: '#F9FAFB',
					foreground: '#111827',
					primary: '#000080',
					'primary-foreground': '#FFFFFF',
					accent: '#FF6600',
					'accent-foreground': '#FFFFFF',
					border: '#E5E7EB',
					ring: '#000080'
				},
				// Specialized program colors that complement the new palette
				education: {
					DEFAULT: '#1E40AF', // Royal Blue - representing education and knowledge
					light: '#60A5FA',
					dark: '#1E3A8A'
				},
				health: {
					DEFAULT: '#059669', // Success Green - representing health and wellness
					light: '#34D399',
					dark: '#047857'
				},
				community: {
					DEFAULT: '#FF6600', // Logo Orange - representing community and value
					light: '#FF9733',
					dark: '#CC5200'
				},
				// Neutral grays for professional text and backgrounds
				neutral: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'space': ['Space Grotesk', 'sans-serif'],
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
				'slide-in': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'scale-in-out': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'scale-in-out': 'scale-in-out 3s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
