import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        spanish: "#798372",
        pastel: "#C4D0BB",
        cultured: "#F5F6F4",
        ochre: "#C89B6A",
        sand: "#E3CDB5",
        seashell: "#FAF5F0",
        ink: "#2F332B"
      },
      fontFamily: {
        title: ["var(--font-alice)", "serif"],
        heading: ["var(--font-bree)", "Georgia", "serif"],
        body: ["var(--font-roboto)", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(47, 51, 43, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
