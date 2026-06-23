/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0f14",
          900: "#10151d",
          800: "#18202b",
          700: "#273244",
        },
        sand: {
          50: "#faf7f1",
          100: "#f4eee4",
          200: "#e8dcc5",
          300: "#d5c2a3",
        },
        ember: {
          500: "#d97c4c",
          600: "#b75d2f",
        },
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0, 0, 0, 0.22)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(233, 164, 112, 0.16), transparent 28%), radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 24%), linear-gradient(135deg, #0b0f14 0%, #111823 55%, #1c2532 100%)",
      },
    },
  },
  plugins: [],
};

