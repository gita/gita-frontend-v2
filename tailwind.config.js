/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Latin/English fonts
        inter: ["var(--font-inter)", "sans-serif"],
        crimson: ["var(--font-crimson)", "Georgia", "serif"],

        // Sanskrit font (for classical verses)
        sanskrit: [
          "var(--font-sanskrit)",
          "var(--font-devanagari-serif)",
          "serif",
        ],

        // Devanagari fonts (Hindi, Sanskrit, Marathi)
        "devanagari-serif": ["var(--font-devanagari-serif)", "serif"],
        "devanagari-sans": ["var(--font-devanagari-sans)", "sans-serif"],

        // Tamil fonts
        "tamil-serif": ["var(--font-tamil-serif)", "serif"],

        // Telugu fonts
        "telugu-serif": ["var(--font-telugu-serif)", "serif"],

        // Gujarati fonts
        "gujarati-serif": ["var(--font-gujarati-serif)", "serif"],

        // Legacy aliases (for backward compatibility)
        dev: ["var(--font-devanagari-sans)", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        intro: ["30px", "45px"],
        paragraph: ["18px", "32px"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom theme colors
        "prakash-bg": "hsl(var(--prakash-bg))",
        "prakash-primary": "hsl(var(--prakash-primary))",
        "nisha-bg": "hsl(var(--nisha-bg))",
        "nisha-primary": "hsl(var(--nisha-primary))",
        "adhyayan-bg": "hsl(var(--adhyayan-bg))",
        "sanskrit-text": "hsl(var(--sanskrit-text))",
        "commentary-text": "hsl(var(--commentary-text))",
        // Verse page design colors
        verse: {
          "dark-text": "var(--verse-dark-text)",
          "medium-text": "var(--verse-medium-text)",
          "muted-text": "var(--verse-muted-text)",
          "light-text": "var(--verse-light-text)",
          "grey-text": "var(--verse-grey-text)",
          "warm-brown": "var(--verse-warm-brown)",
          "dash-color": "var(--verse-dash-color)",
          "divider-dots": "var(--verse-divider-dots)",
          "banner-bg": "var(--verse-banner-bg)",
          border: "var(--verse-border)",
          "light-border": "var(--verse-light-border)",
          "progress-bg": "var(--verse-progress-bg)",
          "progress-fill": "var(--verse-progress-fill)",
          "progress-handle": "var(--verse-progress-handle)",
          "verse-count": "var(--verse-verse-count)",
          "card-bg": "var(--verse-card-bg)",
        },
        // Legacy colors (keeping for backward compatibility during migration)
        "my-orange": "#F57903",
        "lead-text": "#FEDF89",
        "box-bg": "#FFFAEC",
        "box-stroke": "#FFE9B1",
        "nav-hover": "#FFF4D8",
        "light-bg": "#F7F7FC",
        "yellow-bg": "#FFF4D8",
        "dark-bg": "#1a1a1a",
        "light-orange": "#FFE9D5",
        "auth-bg": "#F5E4D4A1",
        "copyright-bg": "#0A0A0A",
        dark: {
          100: "#252525",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      dropShadow: {
        card: "0px 8px 16px rgba(22, 34, 51, 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
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
