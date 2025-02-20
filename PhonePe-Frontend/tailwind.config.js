/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          darkAmethyst: '#6C3483',
          deepPurple: '#512E5F',
          midnightPlum: '#4A235A',
          regalViolet: '#5B2C6F',
          mysticGrape: '#7D3C98'
        },
        secondary: {
          duskyLavender: '#8E44AD',
          shadowPurple: '#2C003E',
          royalEggplant: '#3B0A45',
          blackcurrant: '#1E0E40',
          darkMulberry: '#341634'
        },
        neutral: {
          background: '#F8F9FA',
          card: '#FFFFFF',
          text: '#1A1A1A',
        }
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'premium-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '600': '600ms',
      },
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [],
}