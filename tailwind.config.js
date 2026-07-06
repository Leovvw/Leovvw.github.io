/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "PingFang SC",
          "HarmonyOS Sans SC",
          "MiSans",
          "Noto Sans CJK SC",
          "Source Han Sans SC",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "PingFang SC",
          "HarmonyOS Sans SC",
          "MiSans",
          "Noto Sans CJK SC",
          "Source Han Sans SC",
          "Microsoft YaHei",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        studio: {
          paper: "#f5dfdc",
          surface: "#fff2ee",
          surface2: "#ead0ca",
          ink: "#2a201f",
          muted: "#5f4a47",
          coral: "#c87560",
          amber: "#b88a62",
          teal: "#d7b9b4",
          lilac: "#9aa7bc",
        },
      },
      boxShadow: {
        soft: "0 18px 46px rgba(116, 69, 57, 0.14)",
        lift: "0 28px 90px rgba(116, 69, 57, 0.22)",
      },
    },
  },
  plugins: [],
};
