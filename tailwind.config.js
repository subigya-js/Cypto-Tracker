/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('/public/banner.jpg')",
      },
    },
    fontFamily: {
      whole: "Ubuntu",
    },
  },
  plugins: [],
};
