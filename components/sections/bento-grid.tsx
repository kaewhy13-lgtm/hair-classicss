"use client";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion/variants";

export const BentoGrid = () => {
  return (
    <section className="bg-ivory py-32 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl mb-16 px-4">
        <span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-4">Curated Offerings</span>
        <h2 className="font-headline text-5xl md:text-6xl font-light text-stone-900 border-b border-accent-gold/20 pb-8">
          The Art of Detail
        </h2>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 px-4"
      >
        {/* Large Signature Tile */}
        <motion.div 
          variants={fadeUpVariant}
          custom={0}
          className="group relative overflow-hidden rounded-editorial bg-sand md:col-span-8 md:row-span-2 min-h-[500px] md:min-h-[700px]"
        >
          <div className="absolute inset-0 bg-black/20 transition-colors duration-700 group-hover:bg-black/10 z-10" />
          <img 
            src="/images/craftsmanship.png" 
            alt="Signature Service" 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
          />
          <div className="absolute bottom-10 left-10 z-20 pr-10">
            <h3 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight mb-4">The Signature Cut</h3>
            <p className="font-body text-white/80 max-w-sm font-light tracking-wide leading-relaxed">
              Precision meets fluidity. A tailored approach designed to define your natural texture and elevate your aesthetic.
            </p>
          </div>
        </motion.div>

        {/* Top Right Editorial Tile */}
        <motion.div 
          variants={fadeUpVariant}
          custom={0.2}
          className="flex flex-col justify-center rounded-editorial bg-espresso p-10 md:col-span-4 min-h-[300px]"
        >
          <h4 className="font-display text-3xl text-ivory font-light mb-6">Philosophy</h4>
          <p className="font-body text-sm font-light leading-relaxed text-ivory/70 mb-8">
            We believe that less is fundamentally more. Our approach centers on enhancing your natural texture rather than masking it, creating effortless elegance.
          </p>
          <a href="/about" className="text-accent-gold uppercase font-label tracking-[0.2em] text-xs hover:text-white transition-colors self-start pb-1 border-b border-accent-gold">
            Discover More
          </a>
        </motion.div>

        {/* Bottom Right Product Tile */}
        <motion.div 
          variants={fadeUpVariant}
          custom={0.4}
          className="group relative overflow-hidden rounded-editorial bg-sand/20 md:col-span-4 min-h-[300px]"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
           <img 
            src="/images/service_nails.png" 
            alt="Botanical Oils" 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
          <div className="absolute bottom-8 left-8 z-20">
            <h4 className="font-display text-2xl text-white font-light">Refined Elements</h4>
            <span className="font-label text-xs uppercase text-accent-gold tracking-[0.1em]">Luxury Care Lines</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
