import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        linen:      { DEFAULT: "#EAE3D9", deep: "#DED4C6", darker: "#CEC0AE" },
        dark:       { DEFAULT: "#1C1410", mid: "#2E2018", light: "#3D2E27" },
        taupe:      { DEFAULT: "#8B7B72", light: "#A8998F", dark: "#5A4A40"  },
        gold:       { DEFAULT: "#A0845A", light: "#C4A878", pale: "#D8C4A0", deep: "#7A6040" },
        blush:      { DEFAULT: "#C8ADA6", light: "#E2D0CC", dark: "#A88880" },
        sage:       { DEFAULT: "#9AAF9A", light: "#BDD0BD"                  },
        // compat aliases
        cream:      { DEFAULT: "#FAF8F5", light: "#FFFFFF", dark: "#EAE3D9" },
        sand:       { DEFAULT: "#EAE3D9", mid: "#DED4C6", deep: "#CEC0AE"   },
        espresso:   { DEFAULT: "#2E2018", light: "#3D2E27", dark: "#1C1410" },
        muted:      { DEFAULT: "#8B7B72", light: "#A8998F", dark: "#5A4A40" },
        charcoal:   "#3D2E27",
        obsidian:   "#1C1410",
        ivory:      "#FAF8F5",
        champagne:  "#D8C4A0",
        copper:     { DEFAULT: "#A0845A", light: "#C4A878" },
        border:     { DEFAULT: "rgba(139,123,114,0.18)", warm: "rgba(160,132,90,0.22)" },
        surface:    { DEFAULT: "rgba(243,237,230,0.85)", warm: "#FFFFFF" },
      },

      // ─── Typography ──────────────────────────────────────
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        serif:   ["'Playfair Display'", "Georgia", "serif"],
        body:    ["'Jost'", "system-ui", "sans-serif"],
        sans:    ["'Jost'", "system-ui", "sans-serif"],
      },

      // ─── Spacing ─────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },

      // ─── Border Radius ────────────────────────────────────
      borderRadius: {
        "xs":        "4px",
        "editorial": "2px",
        DEFAULT:     "8px",
      },

      // ─── Box Shadows ─────────────────────────────────────
      boxShadow: {
        "soft-sm":   "0 2px 12px rgba(28, 20, 16, 0.06)",
        "soft":      "0 4px 24px rgba(28, 20, 16, 0.08)",
        "soft-lg":   "0 8px 48px rgba(28, 20, 16, 0.10)",
        "gold-sm":   "0 0 16px rgba(160, 132, 90, 0.10)",
        "gold":      "0 0 32px rgba(160, 132, 90, 0.15)",
        "warm-md":   "0 8px 40px rgba(28, 20, 16, 0.08)",
        "warm-lg":   "0 20px 80px rgba(28, 20, 16, 0.12)",
        "editorial": "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)",
        "card":      "0 2px 16px rgba(28, 20, 16, 0.06), 0 0 0 1px rgba(160,132,90,0.08)",
        // compat
        "gold-lg":   "0 0 60px rgba(160, 132, 90, 0.18)",
      },

      // ─── Gradients ───────────────────────────────────────
      backgroundImage: {
        "gold-gradient":     "linear-gradient(135deg, #A0845A 0%, #C4A878 50%, #8B6A3A 100%)",
        "gold-gradient-h":   "linear-gradient(90deg, #A0845A 0%, #C4A878 50%, #A0845A 100%)",
        "warm-gradient":     "linear-gradient(160deg, #F3EDE6 0%, #FAF8F5 100%)",
        "cream-gradient":    "linear-gradient(160deg, #FAF8F5 0%, #EAE3D9 100%)",
        "parchment-gradient":"linear-gradient(180deg, #FAF8F5 0%, #F3EDE6 100%)",
        "espresso-gradient": "linear-gradient(180deg, #1C1410 0%, #2E2018 100%)",
        "vignette":          "radial-gradient(ellipse at center, transparent 40%, rgba(28,20,16,0.12) 100%)",
        "surface-gradient":  "linear-gradient(180deg, rgba(243,237,230,0.0) 0%, rgba(243,237,230,0.8) 100%)",
      },

      // ─── Animations ──────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center"  },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)"    },
          "50%":      { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(160, 132, 90, 0)"       },
          "50%":      { boxShadow: "0 0 24px 4px rgba(160, 132, 90, 0.12)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)"    },
          "100%": { transform: "translateX(-50%)" },
        },
        reveal: {
          "0%":   { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)"   },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.7s cubic-bezier(0.4, 0, 0.1, 1) both",
        "fade-in":    "fade-in 0.6s ease both",
        shimmer:      "shimmer 1.8s ease-in-out infinite",
        float:        "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee:      "marquee 28s linear infinite",
        reveal:       "reveal 1s cubic-bezier(0.4, 0, 0.1, 1) both",
      },
    },
  },
  safelist: [
    // Core bg colors
    "bg-parchment", "bg-parchment-mid", "bg-parchment-deep",
    "bg-linen", "bg-linen-deep", "bg-linen-darker",
    "bg-dark", "bg-dark-mid", "bg-dark-light",
    "bg-espresso-dark", "bg-espresso-light", "bg-espresso",
    "bg-cream", "bg-cream-light", "bg-cream-dark",
    "bg-gold", "bg-gold-light", "bg-gold-pale", "bg-gold-deep",
    "bg-sand", "bg-sand-mid", "bg-sand-deep",
    "bg-blush", "bg-blush-light",
    "bg-taupe", "bg-taupe-light", "bg-taupe-dark",
    "bg-sage", "bg-sage-light",
    "bg-white",
    // Text colors
    "text-dark", "text-dark-mid", "text-dark-light",
    "text-parchment", "text-linen",
    "text-cream", "text-cream-light", "text-cream-dark",
    "text-gold", "text-gold-light", "text-gold-pale",
    "text-taupe", "text-taupe-light", "text-taupe-dark",
    "text-muted", "text-muted-light",
    "text-blush", "text-sage",
    "text-espresso-dark", "text-espresso-light",
    // Border
    "border-gold", "border-gold-light",
    "border-taupe", "border-linen",
    "border-dark", "border-parchment",
    // Background images
    "bg-gold-gradient", "bg-gold-gradient-h",
    "bg-warm-gradient", "bg-cream-gradient",
    "bg-parchment-gradient", "bg-espresso-gradient",
    // Shadows
    "shadow-soft", "shadow-soft-sm", "shadow-soft-lg",
    "shadow-gold", "shadow-gold-sm", "shadow-card",
    "shadow-warm-md", "shadow-warm-lg", "shadow-editorial",
    // Font families
    "font-display", "font-serif", "font-body",
    // Text fluid
    "text-fluid-xl", "text-fluid-lg", "text-fluid-md",
    // Opacity variants
    { pattern: /^(bg|text|border)-(gold|parchment|linen|dark|taupe|cream|blush|sage|espresso|muted)\/(10|15|20|25|30|40|50|60|70|80)$/ },
    // Layout utilities
    "hidden", "block", "flex", "inline-flex",
    "md:hidden", "md:block", "md:flex", "md:inline-flex",
    "sm:hidden", "sm:block", "sm:flex", "sm:inline-flex",
    "items-center", "justify-between", "gap-4", "gap-6", "gap-8",
    "py-3", "py-5", "py-2.5", "py-4",
    "px-5", "px-6", "px-7", "px-10",
    "tracking-widest", "tracking-wider", "tracking-wide",
    "backdrop-blur-xl", "backdrop-blur-sm",
    "border-b", "border-t", "border-y",
    "top-0", "inset-x-0", "inset-0", "inset-y-0",
    "h-px", "h-7", "h-8", "h-full", "w-full", "max-w-7xl",
    "z-50", "z-40", "z-10",
    "translate-x-1", "-translate-x-1/2",
    "transition-all", "transition-colors", "transition-transform",
    "duration-300", "duration-400", "duration-500",
    "origin-left", "scale-x-0", "group-hover:scale-x-100",
    "group-hover:w-full", "group-hover:text-parchment",
    "group-hover:border-gold", "group-hover:translate-x-1",
    "opacity-0", "opacity-40", "opacity-60",
    "rounded-sm", "rounded-full",
    "fixed", "absolute", "relative", "sticky",
    "overflow-hidden", "overflow-x-hidden",
    "min-h-screen", "flex-1", "flex-col",
    // White bg for cards
    "bg-white", "text-white",
  ],
  plugins: [],
};

export default config;
