"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const QuoteWord = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.4em]">{children}</motion.span>;
};

export const ScrollQuote = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const quoteStr = "A sanctuary of quiet luxury, where every strand is treated with an architect’s precision and an artist’s touch.";
  const words = quoteStr.split(" ");

  return (
    <div ref={containerRef} className="py-48 max-w-4xl mx-auto px-6 text-center">
      <h2 className="font-body font-light text-4xl md:text-6xl text-obsidian tracking-tight leading-snug flex flex-wrap justify-center">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return (
            <QuoteWord key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </QuoteWord>
          );
        })}
      </h2>
      <motion.span 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ margin: "-100px", once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="block mt-16 font-label uppercase text-xs tracking-[0.3em] text-accent-gold"
      >
        The Hair Classic Promise
      </motion.span>
    </div>
  );
};
