import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        basic: 'rgba(30, 159, 210, 0.48) 0px 0px 0px 2px',
      },
      colors: {
        white: '#ffffff',
        primary: {
          DEFAULT: '#1E9FD2',
          100: '#F0FDFF',
          16: 'rgba(30, 159, 210, 0.16)',
        },
        black: {
          DEFAULT: '#262626',
          300: '#595959',
          200: '#8C8C8C',
          100: '#BFBFBF',
        },
      },
    },
  },
  plugins: [],
};
export default config;
