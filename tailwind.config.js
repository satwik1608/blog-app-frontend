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
      },
    },
  },
  darkMode: "class",

  plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin")],
};
