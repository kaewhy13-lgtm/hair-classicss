"use client";
import { HeroImmersive } from "@/components/sections/hero-immersive";
import { BentoGrid } from "@/components/sections/bento-grid";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion/variants";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <HeroImmersive />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 max-w-3xl mx-auto px-6 text-center"
      >
        <motion.h2 variants={fadeUpVariant} custom={0} className="font-headline font-light text-4xl md:text-5xl text-obsidian tracking-tight leading-snug">
          "A sanctuary of quiet luxury, where every strand is treated with an architect’s precision and an artist’s touch."
        </motion.h2>
        <motion.span variants={fadeUpVariant} custom={0.2} className="block mt-12 font-label uppercase text-xs tracking-[0.3em] text-accent-gold">
          The Hair Classic Promise
        </motion.span>
      </motion.div>

      <BentoGrid />
      
      {/* Footer pre-cap / CTA area */}
      <section className="bg-obsidian py-32 text-center text-ivory flex flex-col items-center">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          className="flex flex-col items-center"
        >
          <motion.span variants={fadeUpVariant} custom={0} className="font-label uppercase text-[0.6rem] tracking-[0.4em] text-accent-gold mb-8">
            Begin Your Journey
          </motion.span>
          <motion.h2 variants={fadeUpVariant} custom={0.2} className="font-headline text-5xl md:text-7xl font-light tracking-tight mb-12 max-w-2xl px-6 leading-tight">
            Reserve Your Chair.
          </motion.h2>
          <motion.a variants={fadeUpVariant} custom={0.4} href="/client/booking" className="inline-flex items-center justify-center font-label uppercase text-xs tracking-[0.25em] text-obsidian bg-ivory hover:bg-accent-gold hover:text-white transition-all duration-500 px-12 py-5 rounded-full">
            Book Appointment
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
