/** @type {import('tailwindcss').Config} */

// import type { Config } from "tailwindcss";
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});
