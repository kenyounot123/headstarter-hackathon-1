import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-color': '#8A58FF',
        'primary-text-color': '#FFFFFF',
        'primary-accent-color': '#360F50',
        'secondary-accent-color': "#FFCD80",
        'hover-color': "#FFED86",
      },
    },
  },
  plugins: [],
};
export default config;
