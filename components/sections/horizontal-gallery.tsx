"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const HorizontalGallery = () => {
    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Panning X axis from 0% down to -65%
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    const galleryImages = [
        "/images/about_interior.png",
        "/images/balayage_linen.png",
        "/images/bridal_linen.png",
        "/images/cut_linen.png",
        "/images/about_detail.png",
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-surface">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="w-full absolute top-[15%] left-0 z-10 px-12 md:px-24">
                  <span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-4">The Atelier</span>
                  <h2 className="font-headline text-5xl md:text-6xl font-light text-stone-900 border-b border-accent-gold/20 pb-8 max-w-xs">
                    Our Spaces
                  </h2>
                </div>
                
                <motion.div style={{ x }} className="flex gap-8 pl-[30vw] md:pl-[40vw] pt-20">
                    {galleryImages.map((src, idx) => (
                        <div key={idx} className="relative h-[50vh] md:h-[60vh] w-[70vw] md:w-[40vw] shrink-0 overflow-hidden rounded-editorial shadow-soft-lg">
                            <div className="absolute inset-0 bg-black/10 z-10" />
                            <img src={src} alt={`Gallery image ${idx}`} className="h-full w-full object-cover" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
