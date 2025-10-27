import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'rgb(15 23 42 / <alpha-value>)',
          secondary: 'rgb(30 41 59 / <alpha-value>)',
        },
        text: {
          primary: 'rgb(248 250 252 / <alpha-value>)',
          secondary: 'rgb(148 163 184 / <alpha-value>)',
        },
        accent: {
          primary: 'rgb(139 92 246 / <alpha-value>)',
        },
        border: {
          primary: 'rgb(51 65 85 / <alpha-value>)',
          accent: 'rgb(139 92 246 / <alpha-value>)',
        },
      },
      backgroundImage: {
        'bubble-gradient': 'linear-gradient(to right, rgb(139 92 246), rgb(59 130 246))',
      },
      boxShadow: {
        'neon-accent': '0 0 6px rgb(139 92 246), 0 0 10px rgb(139 92 246)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
