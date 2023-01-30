module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "regal-grey": "#374151",
        primary: "rgb(29 78 216)",
      },
    },
  },
  darkMode: "light",

  plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin")],
};
