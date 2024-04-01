import type { Config } from 'tailwindcss';
// import withMT from '@material-tailwind/react/utils/withMT';

import withMT from '@material-tailwind/react/utils/withMT';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // transitionProperty: {
      //   all: 'all',
      // },
      // transitionDuration: {
      //   '200': '200ms',
      // },
      // spacing: {
      //   '12': '3rem',
      //   '8': '2rem',
      // },
      // fontSize: {
      //   base: '14px',
      // },
      // outline: {
      //   none: ['2px solid transparent', '2px'],
      // },
      // boxSizing: {
      //   border: 'border-box',
      // },
    },
  },
  plugins: [],
};

export default withMT(config);
// export default config;
