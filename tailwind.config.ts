import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F0',
        ink: '#161616',
        lime: {
          DEFAULT: '#C1F73A',
          dark: '#9FD91E',
        },
        violet: {
          DEFAULT: '#6C4CE0',
          dark: '#5636B8',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0 0 #161616',
        'brutal-sm': '2px 2px 0 0 #161616',
        'brutal-lg': '8px 8px 0 0 #161616',
      },
    },
  },
  plugins: [],
} satisfies Config;
