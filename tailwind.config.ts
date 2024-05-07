import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-grey": "#d9d9d9",
        "dark-grey": "#8f8f8f",
        "kairon-green": "#3AD58A",
      },
      fontFamily: {
        sans: ['"Inter"'],
      },
    },
  },
  plugins: [],
};
export default config;
