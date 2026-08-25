import type { Config } from "tailwindcss";

// نظام تصميم بيت المطاعم — Charcoal / Deep Restaurant Red / Warm Gold
// استُبدل الأخضر بالكامل بهذا النظام في مرحلة إعادة التصميم البصري (أغسطس 2026).
// راجع docs/DESIGN_SYSTEM.md لشرح كل توكن وسبب اختياره.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // محايد دافئ (نصوص + قطاعات داكنة) — Primary Charcoal #151515 كأساس
        ink: {
          950: "#151515",
          900: "#1e1c1b",
          800: "#322f2d",
          700: "#4c4845",
          600: "#6b6660", // Secondary Gray — نصوص ثانوية
          500: "#8c877f",
          400: "#aba597",
          300: "#c7c0b0",
          200: "#ddd6c8",
          100: "#efebe2",
        },
        // خلفية دافئة فاتحة — Warm Off White #F8F5EF
        sand: {
          50: "#f8f5ef",
          100: "#f1ebdf",
          200: "#e4ddcb",
          300: "#d8ceb5",
        },
        // اللون الأساسي للعلامة — Deep Restaurant Red
        ember: {
          800: "#5c1216",
          700: "#6e171c",
          600: "#8b1e24", // Primary
          500: "#a32832",
          100: "#f5e1e1",
        },
        // Warm Gold Accent — يُستخدم باعتدال فقط (Dividers / Icons / تفاصيل صغيرة)
        gold: {
          700: "#9c7e3f",
          600: "#b08a44",
          500: "#c8a45d", // Primary accent
          400: "#d6bc85",
          300: "#e8d9b8",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-arabic)",
          "var(--font-latin)",
          "IBM Plex Sans Arabic",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        btn: "10px", // أزرار: 8-12px بدل rounded-full في كل مكان
        card: "16px", // كروت: 12-18px
        cardLg: "20px",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgb(21 21 21 / 0.04), 0 1px 3px 0 rgb(21 21 21 / 0.06)",
        card: "0 2px 8px 0 rgb(21 21 21 / 0.06)",
        cardHover: "0 12px 28px -8px rgb(21 21 21 / 0.16)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
