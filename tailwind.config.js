import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        surface: '#050505',
        primary: '#F5F5F5',
        secondary: 'rgba(255,255,255,0.55)',
        accent: '#FF0000',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        syncopate: ['Syncopate', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        cinematic: '0 0 80px rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
