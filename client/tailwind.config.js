/** @type {import('tailwindcss').Config} */

// import type { Config } from "tailwindcss";
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28,571428%',
        '1/10': '10%',
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        '50%': '50%',
        16: '4rem',
      },
    },
  },
  plugins: [require('tailwindcss-line-clamp')],
});
