// ─────────────────────────────────────────────────────────────
// Hair Classic — Framer Motion Animation Library
// Quiet Luxury: slow, purposeful, emotionally resonant
// ─────────────────────────────────────────────────────────────

import type { Variants } from "framer-motion";

const EASE_SILK    = [0.4, 0, 0.1, 1]  as const;
const EASE_SPRING  = [0.34, 1.56, 0.64, 1] as const;
const EASE_EDITORIAL = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Basic entrance animations ────────────────────────────────

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_SILK } },
};

export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_SILK } },
};

export const slideUpFast: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SILK } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EASE_EDITORIAL } },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: EASE_EDITORIAL } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.8, ease: EASE_SILK } },
};

// ─── Editorial reveal (clip-path) ─────────────────────────────

export const revealUp: Variants = {
  hidden:  { clipPath: "inset(100% 0 0 0)" },
  visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.0, ease: EASE_EDITORIAL } },
};

export const revealRight: Variants = {
  hidden:  { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: EASE_EDITORIAL } },
};

// ─── Stagger containers ────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

// ─── Hover interactions ────────────────────────────────────────

export const cardHover: Variants = {
  initial: { y: 0,  boxShadow: "0 2px 20px rgba(26, 15, 10, 0.5)" },
  hover:   { y: -6, boxShadow: "0 20px 60px rgba(26, 15, 10, 0.7), 0 0 0 1px rgba(184,151,90,0.15)", transition: { duration: 0.4, ease: EASE_SILK } },
};

export const buttonTap: Variants = {
  initial: { scale: 1   },
  tap:     { scale: 0.97, transition: { duration: 0.1, ease: EASE_SILK } },
  hover:   { scale: 1.02, transition: { duration: 0.25, ease: EASE_SILK } },
};

export const imageZoom: Variants = {
  initial: { scale: 1,    filter: "brightness(0.8)" },
  hover:   { scale: 1.06, filter: "brightness(1)",  transition: { duration: 0.7, ease: EASE_SILK } },
};

// ─── Booking step transitions ──────────────────────────────────

export const stepTransition: Variants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_EDITORIAL } },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40,
    transition: { duration: 0.3, ease: EASE_SILK } }),
};

// ─── Parallax helper ──────────────────────────────────────────
export const parallaxY = (offset: number, duration = 0.8): Variants => ({
  hidden:  { opacity: 0, y: offset },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_EDITORIAL } },
});

// ─── Gold shimmer text helper ─────────────────────────────────
export const goldShimmer: Variants = {
  animate: {
    backgroundPosition: ["200% center", "-200% center"],
    transition: { duration: 3, repeat: Infinity, ease: "linear" },
  },
};
