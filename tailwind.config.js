/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ['"Monomaniac One"', "monospace"],
        "mono-code": ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        offwhite: {
          950: "#878477",
          500: "#E0D9CC",
          400: "#EDE7DF",
          300: "#F5F0E9",
          200: "#FAFAFA",
          100: "#FDFCFA",
        },

        gray: {
          950: "#0D0D0D",
          900: "#303030",
          800: "#333333",
          700: "#444444",
          600: "#767676",
          500: "#999999",
          400: "#A3A3A3",
          300: "#D4D4D4",
          200: "#EEEEEE",
          100: "#F0F0F0",
        },

        primary: {
          600: "#FF4D1C",
          500: "#FF4D1D", // Principal
          400: "#FF6A37",
          300: "#FF8A5C",
          200: "#FFBFA0",
          100: "#FFE6D9",
        },

        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },

      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 8s linear infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
