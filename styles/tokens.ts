// ─────────────────────────────────────────────────────────────
// Hair Classic — Quiet Luxury Design Tokens
// Palette: warm espresso · burnished gold · ivory cream
// Aesthetic: editorial · sculptural · emotionally resonant
// ─────────────────────────────────────────────────────────────

export const tokens = {
  colors: {
    espresso:   { DEFAULT: "#1A0F0A", light: "#2C1A12", dark: "#0F0906" },
    cream:      { DEFAULT: "#F9F5EE", light: "#FDF9F3", dark: "#EDE5D8" },
    sand:       { DEFAULT: "#D9CCBA", mid: "#C4B49A",   deep: "#A89A88" },
    gold:       { DEFAULT: "#B8975A", light: "#D4B07A", pale: "#EDD89A", deep: "#8B6A3A" },
    copper:     { DEFAULT: "#8B5A3A", light: "#A8714F"                  },
    blush:      { DEFAULT: "#C4927A", muted: "#B07E6A"                  },
    muted:      { DEFAULT: "#7A6458", light: "#9A8272"                  },
  },

  fonts: {
    display:  "'Cormorant Garamond', Georgia, serif",
    serif:    "'DM Serif Display', Georgia, serif",
    body:     "'DM Sans', system-ui, sans-serif",
  },

  shadows: {
    "gold-sm":  "0 0 16px rgba(184, 151, 90, 0.10)",
    "gold":     "0 0 32px rgba(184, 151, 90, 0.18), 0 0 80px rgba(184, 151, 90, 0.06)",
    "card":     "0 2px 20px rgba(26, 15, 10, 0.6), 0 0 0 1px rgba(184,151,90,0.06)",
    "warm-lg":  "0 20px 80px rgba(26, 15, 10, 0.8)",
  },

  gradients: {
    gold:       "linear-gradient(135deg, #D4B07A 0%, #B8975A 50%, #EDD89A 100%)",
    goldH:      "linear-gradient(90deg, #B8975A 0%, #D4B07A 50%, #B8975A 100%)",
    warm:       "linear-gradient(160deg, #2C1A12 0%, #1A0F0A 100%)",
    cream:      "linear-gradient(160deg, #FDF9F3 0%, #D9CCBA 100%)",
    espresso:   "linear-gradient(180deg, #0F0906 0%, #1A0F0A 100%)",
    vignette:   "radial-gradient(ellipse at center, transparent 40%, rgba(15,9,6,0.85) 100%)",
    surface:    "linear-gradient(180deg, rgba(44,26,18,0.0) 0%, rgba(44,26,18,0.6) 100%)",
  },

  radius: {
    xs:  "4px",
    sm:  "6px",
    md:  "8px",
    lg:  "16px",
    xl:  "24px",
    pill: "100px",
  },

  transitions: {
    silk:   "cubic-bezier(0.4, 0, 0.1, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    fast:   "200ms",
    mid:    "400ms",
    slow:   "700ms",
  },
} as const;

// Membership tier display config
export const membershipConfig = {
  none:     { label: "Standard",  emoji: "",   color: "text-muted-DEFAULT" },
  gold:     { label: "Gold",      emoji: "✦",  color: "text-gold-DEFAULT"  },
  platinum: { label: "Platinum",  emoji: "✦✦", color: "text-sand-DEFAULT"  },
  diamond:  { label: "Diamond",   emoji: "✦✦✦",color: "text-cream-DEFAULT" },
} as const;

export type MembershipTier = keyof typeof membershipConfig;
