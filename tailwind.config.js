/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#030712",
          card: "#0b0f19",
          border: "#1f293d",
          cyan: "#00f3ff",
          purple: "#9d4edd",
          pink: "#ff007f",
          yellow: "#ffe600",
          green: "#00ff66",
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 10px rgba(0, 243, 255, 0.4), 0 0 20px rgba(0, 243, 255, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 243, 255, 0.8), 0 0 40px rgba(0, 243, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
