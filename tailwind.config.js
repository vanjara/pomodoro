/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tomato': {
          50: '#fef7f7',
          100: '#fdeaea',
          200: '#fadada',
          300: '#f6c1c1',
          400: '#f09999',
          500: '#e76f70',
          600: '#d54545',
          700: '#c53030',
          800: '#9c2626',
          900: '#7f2626',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
} 