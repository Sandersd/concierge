/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Dancing Script', 'cursive'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'concierge': {
          'black': '#0B0B0D',
          'charcoal': '#111217',
          'charcoal-light': '#14151A',
          'white': '#EDEDED',
          'silver': '#C0C0C0',
        }
      },
      keyframes: {
        'micro-sway': {
          '0%, 100%': { transform: 'rotateY(-0.015rad)' },
          '50%': { transform: 'rotateY(0.015rad)' },
        }
      },
      animation: {
        'micro-sway': 'micro-sway 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}