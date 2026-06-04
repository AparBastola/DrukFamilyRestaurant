import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7A1620',
          deep: '#5A0E16',
        },
        saffron: '#F0A500',
        marigold: '#E2680B',
        gold: '#C9A227',
        jade: '#1F6B4F',
        lapis: '#1D4E89',
        parchment: '#FBF4E6',
        cream: '#FFFDF7',
        ink: {
          DEFAULT: '#241A12',
          soft: '#5A4D40',
        },
        hairline: '#E7DCC4',
        error: '#B3261E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Sintony', 'system-ui', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        control: '8px',
        card: '12px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 6px 20px rgba(90,14,22,0.08)',
        'card-hover': '0 10px 28px rgba(90,14,22,0.14)',
        focus: '0 0 0 2px #FBF4E6, 0 0 0 4px #C9A227',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s ease-out both',
        shimmer: 'shimmer 1.8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
