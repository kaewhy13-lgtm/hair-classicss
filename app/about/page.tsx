"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: i * 0.15 }
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory pt-36 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* ── Section 1: Philosophy Split ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row gap-16 items-center mb-32"
        >
          <motion.div variants={fadeUp} custom={0} className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[0.5px] bg-accent-gold/40" />
              <span className="font-label text-[10px] uppercase tracking-widest text-accent-gold">Our Philosophy</span>
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl font-light text-obsidian leading-none">
              A Sanctuary For<br />
              <em className="text-accent-gold font-light not-italic">the senses.</em>
            </h1>

            <p className="font-body text-obsidian/70 text-sm leading-relaxed max-w-md">
              At Hair Classic, we believe hair is the ultimate organic canvas. We merge architectural precision with fluid movement, creating styles that are distinctly yours.
            </p>

            <p className="font-body text-obsidian/50 text-xs leading-relaxed max-w-md italic border-l border-accent-gold/30 pl-4">
              "We provide a calm space away from the noise, focusing on slow beauty and tailored care."
            </p>
          </motion.div>

          {/* Image */}
          <motion.div 
            variants={fadeUp} 
            custom={1}
            className="flex-1 relative aspect-[4/5] bg-stone-100 overflow-hidden shadow-sm rounded-sm"
          >
            <img 
              src="/images/about_interior.png" 
              alt="Linen minimalist salon interior" 
              className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </motion.div>

        {/* ── Section 2: Craft Detail Split ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row-reverse gap-16 items-center mb-32"
        >
          <motion.div variants={fadeUp} custom={2} className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[0.5px] bg-accent-gold/40" />
              <span className="font-label text-[10px] uppercase tracking-widest text-accent-gold">The Craft</span>
            </div>

            <h2 className="font-headline text-4xl md:text-5xl font-light text-obsidian">
              Sustainable Luxury.
            </h2>

            <p className="font-body text-obsidian/70 text-sm leading-relaxed max-w-md">
              We exclusively utilize organic, paraben-free formulations that respect hair health. Our treatments provide deep reconstruction and effortless radiance without structural compromise.
            </p>

            <div className="pt-4 flex">
              <Link href="/client/booking" className="btn-primary flex items-center gap-2 text-xs">
                Book An Experience
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            variants={fadeUp} 
            custom={3}
            className="flex-1 relative aspect-[4/5] bg-stone-100 overflow-hidden shadow-sm rounded-sm"
          >
            <img 
              src="/images/about_detail.png" 
              alt="Organic salon products with cast shadow" 
              className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </motion.div>

        {/* ── CTA Banner ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mt-32 bg-sand/30 border border-obsidian/10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm shadow-sm"
          >
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-accent-gold mb-3">Reserve</p>
              <h2 className="font-headline text-3xl font-light text-obsidian leading-tight">
                Ready to meet your artist?
              </h2>
          </div>
          
          <Link href="/client/booking" className="btn-primary flex items-center gap-2">
            Reserve Your Chair
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
