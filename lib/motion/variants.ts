import { easings } from "./easings";

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: easings.luxury,
      delay: customDelay,
    },
  }),
};

export const revealVariant = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: easings.luxury },
  },
};
