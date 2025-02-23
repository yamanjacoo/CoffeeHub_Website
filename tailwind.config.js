const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F5F1E9", // Light cream (latte foam-inspired background)
        foreground: "#3A2E2A", // Dark coffee brown (main text)
        primary: {
          DEFAULT: "#4A2C2A", // Rich coffee brown (buttons, headers)
          foreground: "#FFFFFF", // White (text on primary backgrounds)
        },
        secondary: {
          DEFAULT: "#D4A373", // Warm latte beige (accents, highlights)
          foreground: "#3A2E2A", // Dark coffee brown (text on secondary)
        },
        destructive: {
          DEFAULT: "#8B0000", // Deep red (errors, warnings - subtle coffee roast vibe)
          foreground: "#FFFFFF", // White (text on destructive)
        },
        muted: {
          DEFAULT: "#8B5A2B", // Medium espresso brown (subtle elements, borders)
          foreground: "#3A2E2A", // Dark coffee brown (text on muted backgrounds)
        },
        accent: {
          DEFAULT: "#A67B5B", // Caramel brown (hover effects, icons)
          foreground: "#FFFFFF", // White (text on accent)
        },
        popover: {
          DEFAULT: "#EDE4D9", // Soft off-white (dropdowns, tooltips)
          foreground: "#3A2E2A", // Dark coffee brown (text on popover)
        },
        card: {
          DEFAULT: "#F8E8D8", // Pale latte (cards, containers)
          foreground: "#3A2E2A", // Dark coffee brown (text on cards)
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};