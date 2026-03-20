
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/*  HERO SECTION  */}
<section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
<div className="absolute inset-0 z-0">
<img className="w-full h-full object-cover brightness-95" data-alt="Airy and calm luxury hair salon interior with soft natural light" src="/images/hero_linen.png"/>
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
</div>
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
  className="relative z-10 text-center px-6"
>
<span className="block font-label uppercase text-[0.7rem] tracking-[0.4rem] text-accent-gold mb-6">EST. SILIGURI · 2024</span>
<h1 className="font-headline text-6xl md:text-8xl font-light text-white tracking-tighter leading-tight mb-12">
                Hair Classic:<br/>
<span className="italic font-light opacity-90">Quiet Elegance</span>
</h1>
<Link className="inline-block glass-cta text-white font-label uppercase text-[0.75rem] tracking-[0.25rem] px-10 py-5 hover:bg-white hover:text-stone-900 transition-all duration-700" href="/client/booking">
                RESERVE YOUR CHAIR
            </Link>
</motion.div>
<div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
<span className="material-symbols-outlined text-white/50 font-extralight">keyboard_double_arrow_down</span>
</div>
</section>
{/*  MARQUEE BAND  */}
<div className="w-full bg-surface-container-low py-4 overflow-hidden border-y-[0.5px] border-accent-gold/20">
<div className="marquee-container">
<div className="marquee-content animate-scroll flex gap-12 items-center"><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BESPOKE COLOUR</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">PRECISION CUTS</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">KERATIN TREATMENTS</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BALAYAGE</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BRIDAL STYLING</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">CONSULTATION</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">NAILS</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">SILIGURI</span></div>
{/*  Duplicate for infinite effect  */}
<div aria-hidden="true" className="marquee-content animate-scroll flex gap-12 items-center"><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BESPOKE COLOUR</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">PRECISION CUTS</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">KERATIN TREATMENTS</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BALAYAGE</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BRIDAL STYLING</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">CONSULTATION</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">NAILS</span><span className="w-1 h-1 rounded-full bg-accent-gold/30"></span><span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">SILIGURI</span></div>
</div>
</div>
{/*  SPLIT SECTION  */}
<section className="grid grid-cols-1 md:grid-cols-2 min-h-[819px]">
<div className="bg-surface-container-low flex items-center justify-center p-12 md:p-24 lg:p-32">
<div className="max-w-md">
<span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-8">The Art of Detail</span>
<h2 className="font-headline text-5xl font-light text-stone-900 leading-tight mb-8">Craftsmanship Without Compromise</h2>
<p className="text-on-surface-variant font-body text-lg leading-relaxed mb-10">
                    We believe hair is the ultimate canvas. At Hair Classic, we merge architectural precision with organic fluidity to create styles that aren't just seen—they are experienced.
                </p>
<Link className="group inline-flex items-center font-label uppercase text-[0.75rem] tracking-[0.2rem] text-stone-900" href="/stylists">
                    DISCOVER OUR STYLISTS
                    <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-400">→</span>
</Link>
</div>
</div>
<div className="relative min-h-[500px] md:min-h-full">
<img className="absolute inset-0 w-full h-h-full object-cover" data-alt="Editorial close up of textured hair styling in progress" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmrPgy9EtnQJhuZH_IbEravgLdmoc5fI-Ue9gLh1zSCRzTzsrzfLg__1Ij-4GF7RvVFHHP_ssEaaSU31RX91Oy7CupfzfXUhQhIt0c2sObQKLX3cg3KDHpv_HZY3RN0evXuPX-RpXP3KNOsVnohs7Kr0Wan0OfoeioJYG7R8ijoFVBzcZmXTQWbQrhRcBa_-YuBmypCANEEi21cG1iuNI5XAGKzT_M2j2pNNaC4dbOoPh_sy6df_OmeWT9EXjQDIYM-P3KLMWe-Bw"/>
</div>
</section>
{/*  SERVICES GRID  */}
<section id="services" className="py-32 px-8 max-w-screen-2xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
<div>
<span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-4">Curated Offerings</span>
<h2 className="font-headline text-6xl font-light text-stone-900">Our Services</h2>
</div>
<Link className="font-label uppercase text-[0.75rem] tracking-[0.25rem] border-b border-accent-gold pb-2 hover:text-accent-gold transition-colors" href="/client/booking">BOOK NOW →</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border-[0.5px] border-accent-gold/20">
{/*  Card 1  */}
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0 }}
  className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500"
>
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Soft subtle balayage blonde hair highlights" src="/images/balayage_linen.png"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Balayage &amp; Colour</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £280</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Hand-painted transitions that mimic natural sunlight and depth.</p>
</motion.div>
{/*  Card 2  */}
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.15 }}
  className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500"
>
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Sleek precision hair cut bob style" src="/images/cut_linen.png"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Precision Cut</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £95</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Architectural sculpting tailored to your unique facial geometry.</p>
</motion.div>
{/*  Card 3  */}
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
  className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500"
>
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Healthy smooth hair after keratin treatment" src="/images/keratin_linen.png"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Keratin Treatment</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £240</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Long-lasting silkiness and reconstruction for effortless radiance.</p>
</motion.div>
{/*  Card 4  */}
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.45 }}
  className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500"
>
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Elegant minimalist bridal hair styling" src="/images/bridal_linen.png"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Bridal Styling</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £160</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Bespoke bridal artistry for your most significant moments.</p>
</motion.div>
{/*  Card 5 - Nails  */}
<motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
  className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500"
>
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Minimalist luxury design gel nails" src="/images/service_nails.png"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Manicure & Nail Artistry</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £45</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Minimalist definition and high-end gel extensions crafted with editorial exactitude.</p>
</motion.div>
</div>
</section>
{/*  DARK STATS BAND  */}
<section className="bg-surface-container py-24 border-y-[0.5px] border-accent-gold/10">
<div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
<div className="flex flex-col items-center">
<span className="font-headline text-5xl md:text-6xl text-stone-900 font-light mb-4">4,200+</span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.3rem] text-accent-gold">Satisfied Clients</span>
</div>
<div className="flex flex-col items-center">
<span className="font-headline text-5xl md:text-6xl text-stone-900 font-light mb-4">12+</span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.3rem] text-accent-gold">Years of Mastery</span>
</div>
<div className="flex flex-col items-center">
<span className="font-headline text-5xl md:text-6xl text-stone-900 font-light mb-4">★ 5.0</span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.3rem] text-accent-gold">Google Rating</span>
</div>
</div>
</section>
{/*  TESTIMONIALS  */}
<section className="py-32 px-8 bg-surface-container">
<div className="max-w-screen-2xl mx-auto">
<div className="text-center mb-24">
<span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-4">The Experience</span>
<h2 className="font-headline text-5xl font-light text-stone-900">Salon Diaries</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-16">
{/*  Testimonial 1  */}
<div className="flex flex-col items-center text-center">
<p className="font-headline italic text-2xl text-stone-800 leading-relaxed mb-8">
                        "The atmosphere is a sanctuary. My stylist understood exactly what I needed without me saying a word. Truly bespoke."
                    </p>
<div className="mt-auto">
<span className="block font-label uppercase text-[0.75rem] tracking-[0.1rem] text-stone-900 font-bold mb-1">Eleanor Vance</span>
<span className="block font-label text-[0.65rem] tracking-[0.1rem] text-stone-500 uppercase">Balayage Client</span>
</div>
</div>
{/*  Testimonial 2  */}
<div className="flex flex-col items-center text-center">
<p className="font-headline italic text-2xl text-stone-800 leading-relaxed mb-8">
                        "Finally found a place that treats hair cutting like fine sculpture. The precision is unmatched in all of London."
                    </p>
<div className="mt-auto">
<span className="block font-label uppercase text-[0.75rem] tracking-[0.1rem] text-stone-900 font-bold mb-1">Julian Thorne</span>
<span className="block font-label text-[0.65rem] tracking-[0.1rem] text-stone-500 uppercase">Precision Cut Client</span>
</div>
</div>
{/*  Testimonial 3  */}
<div className="flex flex-col items-center text-center">
<p className="font-headline italic text-2xl text-stone-800 leading-relaxed mb-8">
                        "The gel manicures here are absolute perfection. My extensions lasted 4 weeks with zero lifting. A masterclass in durability and form."
                    </p>
<div className="mt-auto">
<span className="block font-label uppercase text-[0.75rem] tracking-[0.1rem] text-stone-900 font-bold mb-1">Sienna Blake</span>
<span className="block font-label text-[0.65rem] tracking-[0.1rem] text-stone-500 uppercase">Nail Atelier Client</span>
</div>
</div>
</div>
</div>
</section>
{/*  FOOTER  */}
    </div>
  );
}
