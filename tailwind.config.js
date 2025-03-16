/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#3f7f1f", // Custom main color
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"], // Poppins font family
        montserrat: ['"Montserrat"', "sans-serif"], // Montserrat font family
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400", // Regular weight
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [],
};
