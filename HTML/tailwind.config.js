/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        purple: {
          500: "#816BFF",
        },
        cyan: {
          500: "#1FCEC9",
        },
        blue: {
          500: "#4B97D3",
          600: "#6576FF",
        },
        black: {
          500: "#3B4747",
        },
        warning: "#FFBB5A",
        overlay: "#11121B8C",
        border: "#DBDFEA",
        titleText: "#364A63",
        descriptionText: "#8091A7",
      },
      spacing: {
        "4.5": "18px",
        "10.5": "42px",
        "15": "60px",
        "30": "120px",
        "128.5": "514px",
        "157.5": "630px",
        "162.5": "650px",
        "330": "1320px",
      },
      fontSize: {
        "10": "40px",
        "5.5": "22px",
      },
      boxShadow: {
        button: "0px 0px 15px 5px #0000001A",
      },
      borderRadius: {
        "5": "20px",
      }
    },
  },
  plugins: [],
}
