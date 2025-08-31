
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
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					hover: 'hsl(var(--secondary-hover))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					hover: 'hsl(var(--accent-hover))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// TÜV SÜD Brand Colors - Lavender Theme
				'tuv-lavender': {
					50: 'hsl(var(--tuv-blue-50))',
					100: 'hsl(var(--tuv-blue-100))',
					200: 'hsl(var(--tuv-lavender-pale))',
					300: 'hsl(var(--tuv-lavender-light))',
					400: 'hsl(var(--tuv-blue-400))',
					500: 'hsl(var(--tuv-blue-500))',
					600: 'hsl(var(--tuv-blue-600))',
					700: 'hsl(var(--tuv-blue-700))',
					800: 'hsl(var(--tuv-blue-800))',
					900: 'hsl(var(--tuv-blue-900))',
					deep: 'hsl(var(--tuv-lavender-deep))',
				},
				// Keep the old name for backward compatibility
				'tuv-blue': {
					50: 'hsl(var(--tuv-blue-50))',
					100: 'hsl(var(--tuv-blue-100))',
					400: 'hsl(var(--tuv-blue-400))',
					500: 'hsl(var(--tuv-blue-500))',
					600: 'hsl(var(--tuv-blue-600))',
					700: 'hsl(var(--tuv-blue-700))',
					800: 'hsl(var(--tuv-blue-800))',
					900: 'hsl(var(--tuv-blue-900))',
				},
				'tuv-red': {
					DEFAULT: 'hsl(var(--tuv-red))',
					light: 'hsl(var(--tuv-red-light))',
				},
				'tuv-gray': {
					50: 'hsl(var(--tuv-gray-50))',
					100: 'hsl(var(--tuv-gray-100))',
					200: 'hsl(var(--tuv-gray-200))',
					300: 'hsl(var(--tuv-gray-300))',
					400: 'hsl(var(--tuv-gray-400))',
					500: 'hsl(var(--tuv-gray-500))',
					600: 'hsl(var(--tuv-gray-600))',
					700: 'hsl(var(--tuv-gray-700))',
					800: 'hsl(var(--tuv-gray-800))',
					900: 'hsl(var(--tuv-gray-900))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'fade-in': 'fade-in 0.8s ease-out forwards',
				'slide-in': 'slide-in 0.8s ease-out forwards'
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
			},
			spacing: {
				'xs': 'var(--space-xs)',
				'sm': 'var(--space-sm)',
				'md': 'var(--space-md)',
				'lg': 'var(--space-lg)',
				'xl': 'var(--space-xl)',
				'2xl': 'var(--space-2xl)',
				'3xl': 'var(--space-3xl)',
				'4xl': 'var(--space-4xl)',
				'5xl': 'var(--space-5xl)',
			},
			boxShadow: {
				'tuv-sm': 'var(--shadow-sm)',
				'tuv': 'var(--shadow)',
				'tuv-md': 'var(--shadow-md)',
				'tuv-lg': 'var(--shadow-lg)',
				'tuv-xl': 'var(--shadow-xl)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
