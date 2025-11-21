import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0ff',
          100: '#ede5ff',
          200: '#ddd0ff',
          300: '#c5adff',
          400: '#a87fff',
          500: '#8a52ff',
          600: '#663399', // Main brand purple
          700: '#5a2d88',
          800: '#4d2670',
          900: '#3d1e59',
        },
        secondary: {
          50: '#f8f7f8',
          100: '#eeecef',
          200: '#d9d6dc',
          300: '#b8b3bd',
          400: '#928b9a',
          500: '#70657b',
          600: '#52495a', // Brand secondary
          700: '#47404f',
          800: '#3d3642',
          900: '#302a35',
        },
        info: '#263db5',
        success: '#4caf50',
        danger: '#d22346',
        warning: '#ffc107',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
