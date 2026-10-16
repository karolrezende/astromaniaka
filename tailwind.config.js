/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "sans-serif"],
      },
      colors: {
        // Fundo do espaço profundo
        space: {
          950: "#05040B",
          900: "#0A0815",
          850: "#100D20",
          800: "#161230",
          700: "#221C45",
        },
        // Acento principal: nebulosa violeta
        nebula: {
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        // Acento secundário: poeira estelar rosa
        stardust: {
          400: "#F0ABFC",
          500: "#E879F9",
          600: "#D946EF",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent":
          "linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(167,139,250,0.25), 0 8px 32px -8px rgba(139,92,246,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 40px -24px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(-8px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "toast-in": "toast-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
