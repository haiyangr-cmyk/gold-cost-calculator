import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        luxury: {
          black: '#101010',
          panel: '#171717',
          gold: '#D8B45A',
          gold2: '#F3D98B',
          cream: '#FFF8E8',
          line: 'rgba(216, 180, 90, 0.28)'
        }
      },
      boxShadow: {
        gold: '0 18px 60px rgba(216, 180, 90, 0.16)'
      }
    }
  },
  plugins: []
} satisfies Config;
