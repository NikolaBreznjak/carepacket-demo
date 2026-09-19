import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "var(--cp-brand-100)",
          600: "var(--cp-brand-600)",
          700: "var(--cp-brand-700)",
        },
        ink: {
          DEFAULT: "var(--cp-ink)",
          muted: "var(--cp-ink-muted)",
        },
        line: "var(--cp-line)",
        canvas: "var(--cp-canvas)",
        surface: "var(--cp-surface)",
        warm: {
          50: "var(--cp-warm-50)",
          200: "var(--cp-warm-200)",
        },
        accent: "var(--cp-accent-soft)",
        ok: "var(--cp-ok)",
        warn: "var(--cp-warn)",
        danger: "var(--cp-danger)",
        info: "var(--cp-info)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        notebook: "720px",
        dash: "1120px",
        provider: "1280px",
      },
      borderRadius: {
        parent: "12px",
        provider: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
