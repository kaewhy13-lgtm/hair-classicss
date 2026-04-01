"use client";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion/variants";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const HeroImmersive = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">
      {/* Background Video/Image Placeholder */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/80" />
        <img
          src="/images/hero_linen.png"
          alt="Immersive quiet luxury hair salon aesthetic"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
        <motion.h1
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className="font-display text-6xl md:text-8xl lg:text-[7.5rem] font-light tracking-tight"
        >
          Effortless Elegance
        </motion.h1>
        
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mt-6 max-w-2xl font-body text-xl font-light tracking-wide text-ivory/80"
        >
          Experience hair care elevated to an art form. Rooted in tradition, refined for the modern world.
        </motion.p>
        
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-12"
        >
          <MagneticButton className="bg-ivory text-obsidian hover:bg-gold hover:text-white px-10 py-5 text-sm uppercase tracking-[0.2em]">
            Book an Appointment
          </MagneticButton>
        </motion.div>
      </div>

    </section>
  );
};
