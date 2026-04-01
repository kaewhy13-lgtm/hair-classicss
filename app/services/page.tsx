"use client";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion/variants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    category: "The Cut",
    items: [
      { name: "Signature Haircut", desc: "A tailored approach defining your natural texture." },
      { name: "Restyle Archive", desc: "Complete structural overhaul and silhouette design." },
      { name: "Clipper Craft", desc: "Precision grooming and architectural fading." }
    ]
  },
  {
    category: "The Color",
    items: [
      { name: "Balayage Canvas", desc: "Hand-painted, sun-kissed organic lightening." },
      { name: "Global Dimension", desc: "All-over bespoke color chemistry." },
      { name: "Gloss & Tone", desc: "Luminous demi-permanent finish." }
    ]
  },
  {
    category: "The Treatment",
    items: [
      { name: "Keratin Ritual", desc: "Deep structural reconstruction for fluid movement." },
      { name: "Scalp Detox", desc: "Purifying botanical scrub and massage." }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory pt-36 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center flex flex-col items-center"
        >
          <motion.span variants={fadeUpVariant} custom={0} className="font-label text-[10px] uppercase tracking-[0.3em] text-accent-gold mb-6">Capabilities</motion.span>
          <motion.h1 variants={fadeUpVariant} custom={1} className="font-headline text-5xl md:text-7xl font-light text-obsidian leading-tight mb-8">
            Curated Services
          </motion.h1>
          <motion.p variants={fadeUpVariant} custom={2} className="font-body text-base text-obsidian/70 max-w-lg leading-relaxed">
            Every appointment begins with an in-depth consultation to architect a look that aligns seamlessly with your lifestyle.
          </motion.p>
        </motion.div>

        {/* Services Menu */}
        <div className="flex flex-col gap-24">
          {services.map((section, sIdx) => (
            <motion.div 
              key={section.category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="grid grid-cols-1 md:grid-cols-12 gap-12"
            >
              <div className="md:col-span-4">
                <h2 className="font-headline text-3xl font-light text-obsidian border-b border-obsidian/10 pb-4">
                  {section.category}
                </h2>
              </div>
              
              <div className="md:col-span-8 flex flex-col gap-10 pt-2">
                {section.items.map((item, iIdx) => (
                  <div key={item.name} className="flex flex-col gap-2 group cursor-default">
                    <h3 className="font-headline text-2xl text-obsidian group-hover:text-accent-gold transition-colors duration-500">
                      {item.name}
                    </h3>
                    <p className="font-body text-sm tracking-wide text-obsidian/60">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="mt-32 pt-16 border-t border-obsidian/10 flex flex-col items-center text-center"
        >
          <h2 className="font-headline text-3xl font-light text-obsidian mb-8">Ready for your transformation?</h2>
          <Link href="/client/booking" className="inline-flex items-center gap-4 border border-obsidian px-10 py-4 hover:bg-obsidian hover:text-white transition-all duration-500">
            <span className="font-label uppercase text-[0.6rem] tracking-[0.2em]">Reserve Private Chair</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        
      </div>
    </div>
  );
}
