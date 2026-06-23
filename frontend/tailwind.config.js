/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A0A0F",
          card: "rgba(13, 13, 23, 0.45)",
          cardHover: "rgba(20, 20, 35, 0.6)",
        },
        electric: {
          violet: "#8B5CF6",
          cyan: "#06B6D4",
          magenta: "#D946EF",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      animation: {
        "blob-one": "blob-one 25s infinite ease-in-out",
        "blob-two": "blob-two 30s infinite ease-in-out",
        "blob-three": "blob-three 22s infinite ease-in-out",
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 45s linear infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "border-glow": "border-glow 6s infinite linear",
      },
      keyframes: {
        "blob-one": {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(120px, -180px) scale(1.3)",
          },
          "66%": {
            transform: "translate(-100px, 150px) scale(0.8)",
          },
        },
        "blob-two": {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1.1)",
          },
          "33%": {
            transform: "translate(-180px, 100px) scale(0.9)",
          },
          "66%": {
            transform: "translate(150px, -120px) scale(1.25)",
          },
        },
        "blob-three": {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(0.9)",
          },
          "50%": {
            transform: "translate(100px, 120px) scale(1.4)",
          },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(139, 92, 246, 0.3)" },
          "33%": { borderColor: "rgba(6, 182, 212, 0.3)" },
          "66%": { borderColor: "rgba(217, 70, 239, 0.3)" },
        }
      },
    },
  },
  plugins: [],
}
