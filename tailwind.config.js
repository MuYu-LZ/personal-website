/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 浅色主题色板
        "light-bg": {
          DEFAULT: "#F7F7FB",
          secondary: "#F3F6FF",
        },
        accent: {
          purple: "#C9B6FF",
          blue: "#A3D5FF",
          mint: "#A7F3D0",
          pink: "#FBD3E9",
          primary: "#6D5EF0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-soft": "float-soft 8s ease-in-out infinite",
        "rainbow-edge": "rainbow-edge 4s ease-in-out infinite",
        "grain-shift": "grain-shift 8s steps(10) infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.6" },
          "33%": {
            transform: "translate(30px, -30px) scale(1.1)",
            opacity: "0.8",
          },
          "66%": {
            transform: "translate(-30px, 30px) scale(0.9)",
            opacity: "0.7",
          },
        },
        "rainbow-edge": {
          "0%": {
            boxShadow:
              "0 0 20px rgba(109, 94, 241, 0.2), inset 0 0 20px rgba(201, 182, 255, 0.1)",
          },
          "25%": {
            boxShadow:
              "0 0 25px rgba(163, 213, 255, 0.25), inset 0 0 25px rgba(167, 243, 208, 0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(251, 211, 233, 0.3), inset 0 0 30px rgba(201, 182, 240, 0.2)",
          },
          "75%": {
            boxShadow:
              "0 0 25px rgba(167, 243, 208, 0.25), inset 0 0 25px rgba(163, 213, 255, 0.15)",
          },
          "100%": {
            boxShadow:
              "0 0 20px rgba(109, 94, 241, 0.2), inset 0 0 20px rgba(201, 182, 255, 0.1)",
          },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      backgroundSize: {
        "200%": "200%",
      },
    },
  },
  plugins: [],
};
