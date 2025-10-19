/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Backgrounds
        dark: {
          900: '#0A0A0A',
          800: '#121212',
          700: '#1A1A1A',
          600: '#242424',
        },
        // Electric Purple Shades
        'electric-purple': {
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
        },
        // Professional Accent Colors
        accent: {
          purple: '#A855F7',
          'purple-dark': '#9333EA',
          green: '#10B981',
          blue: '#3B82F6',
        },
        // Keep original colors for compatibility
        purple: {
          50: '#F5E8FF',
          100: '#E8D5FF',
          200: '#D4AAFF',
          300: '#B980FF',
          400: '#9D55FF',
          500: '#8B3DFF',
          600: '#6B1BDB',
          700: '#5B17B5',
          800: '#4A1290',
          900: '#3A0E6B',
        },
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#9CA3AF', // Improved contrast from #A3A3A3
          500: '#6B7280', // Better mid-tone
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Enhanced typography scale for better hierarchy
        'display-2xl': ['4.5rem', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.04em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.03em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        // Clean professional shadows
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        // Subtle purple accent for primary CTAs only
        'purple-subtle': '0 4px 14px 0 rgba(147, 51, 234, 0.2)',
        'purple-hover': '0 6px 20px 0 rgba(147, 51, 234, 0.3)',
      },
      backgroundImage: {
        // Primary gradients with refined intensity
        'gradient-purple-electric': 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
        'gradient-purple-vibrant': 'linear-gradient(135deg, #BF40BF 0%, #9333EA 100%)',
        'gradient-green-electric': 'linear-gradient(135deg, #00FF7F 0%, #10B981 100%)',
        // Subtle background gradients
        'gradient-dark-radial': 'radial-gradient(ellipse at top, rgba(147, 51, 234, 0.05) 0%, #000000 50%)',
        'gradient-dark-subtle': 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)',
        // Overlay gradients with reduced opacity
        'gradient-hero-overlay': 'linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.15) 30%, rgba(0, 0, 0, 0.95) 100%)',
        'gradient-card-overlay': 'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, transparent 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
