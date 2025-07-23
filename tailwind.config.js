/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Mistica Blue', 'Inter', 'system-ui', 'sans-serif'],
        'mistica': ['Mistica Blue', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Custom earth-tone palette
        earth: {
          50: '#f9f7f6',
          100: '#f0ebe8',
          200: '#D2AB99', // Warm beige
          300: '#BDBEA9', // Sage green
          400: '#8DB38B', // Medium green
          500: '#56876D', // Forest green
          600: '#04724D', // Deep forest
          700: '#036140',
          800: '#024f33',
          900: '#013d26',
        },
        // Individual color utilities
        'warm-beige': '#D2AB99',
        'sage-green': '#BDBEA9',
        'medium-green': '#8DB38B',
        'forest-green': '#56876D',
        'deep-forest': '#04724D',
        'cv-green': {
          light: '#1a4d4d',
          DEFAULT: '#0a3d3d',
          dark: '#042f2f'
        },
        'cv-teal': {
          light: '#4FD1C5',
          DEFAULT: '#38B2AC',
          dark: '#319795'
        }
      },
      backgroundImage: {
        'cv-gradient': 'linear-gradient(to bottom, #0a3d3d, #042f2f, #021f1f)',
        'hero-gradient': 'linear-gradient(to bottom right, #38B2AC, #2C7A7B)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
};