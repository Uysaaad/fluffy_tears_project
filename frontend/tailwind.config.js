/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        babyPinkColor: "#FFEBEB",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        babyBlueColor: "#DAF7EE",
        beigeColor: "#FCFBEC",
        transparent_white: "rgba(255, 255, 255, 0.3)",
        white: "#ffffff",
        white_translucent: "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        custom: "4px 4px 60px rgba(0, 0, 0, 0.2)",
        custom_hover: "4px 4px 60px 8px rgba(0, 0, 0, 0.2)",
        button_shadow: "0px 17px 10px -10px rgba(0,0,0,0.4)",
      },
      backdropBlur: {
        5: "5px",
        10: "10px",
      },
      borderRadius: {
        xl: "5000px",
        lg: "10px",
      },
      textShadow: {
        custom: "20px 20px 20px rgba(0, 0, 0, 1)",
        placeholder: "2px 2px 4px rgba(0, 0, 0, 0.4)",
      },
      transitionTimingFunction: {
        "ease-in-out": "ease-in-out",
      },
      fontFamily: {
        torcing: ["Torcing", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        nighty: ["Nighty", "serif"],
        graydesign: ["GrayDesign", "serif"],
        queens: ["Queens", "sans-serif"],
        riesling:["Riesling", "serif"]
      },
      backgroundImage: {
        tears:
          "url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3B1aXl6cGVybnNwemgxd3pyMTF4eG9zMHZtM2lkZ2Y5ZnAycGo1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/tsgPJ5y0MrklJWst2N/giphy.gif')",
        login: "url('./src/assets/images/square.gif')",
        diary:"url('./src/assets/images/diary_cover.jpg)"
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-custom": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        },
        ".text-shadow-placeholder": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
        },
      });
    },
  ],
};
