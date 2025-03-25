import { Config } from 'tailwindcss/types/config';

const config: Config = {
  theme: {
    extend: {
      colors: {
        customColor: '#ff6347',
      },
    },
  },
  plugins: [],
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // Adjust paths based on your project
  ],
};

export default config;
