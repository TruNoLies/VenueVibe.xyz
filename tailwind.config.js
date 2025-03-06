/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0f',
          100: '#1a1a23',
          200: '#252532',
        },
        light: {
          DEFAULT: '#ffffff',
          100: '#f3f4f6',
          200: '#e5e7eb',
        },
        neon: {
          primary: '#8B5CF6',
          secondary: '#EC4899',
          accent: '#10B981',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #0a0a0f, #1a1a23)',
        'gradient-light': 'linear-gradient(to bottom, #ffffff, #f3f4f6)',
      },
    },
  },
  plugins: [],
};