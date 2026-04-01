"use client";
import * as React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Award, ArrowRight, Instagram, MapPin } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const defaultAccents = ["#1A1814", "#4A4440", "#8A7F78"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.1, 1], delay: i * 0.12 }
  }),
};

export default function StylistsPage() {
  const [stylists, setStylists] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchStylists() {
      const supabase = createClient();
      const { data } = await supabase
        .from("stylists")
        .select("*, profiles!inner(full_name)")
        .eq("is_active", true);

      if (data && data.length > 0) {
        setStylists(
          data.map((s, i) => ({
            id: s.id,
            name: (s as any).profiles?.full_name || "Stylist",
            role: "Stylist",
            experience: s.years_experience || 0,
            specializations: s.specializations || [],
            bio: s.bio || "A talented artist dedicated to bringing your vision to life.",
            rating: 5.0,
            reviews: 0,
            awards: s.certifications || [],
            work: ["/images/cut_linen.png", "/images/bridal_linen.png"]
          }))
        );
      } else {
        // Fallback for visual testing and portfolios look
        setStylists([
          {
            id: 'stylist-1',
            name: 'Niraj Zimba',
            role: 'Senior Stylist Architect & Highlight Expert',
            experience: 12,
            specializations: ['Highlights', 'Precision Cut', 'Bespoke Color'],
            bio: 'With over a decade of prestigious salon residency, Niraj merges architectural exactitude with organic movement, creating statements that aren\'t just seen—they are lived.',
            rating: 5.0,
            reviews: 142,
            awards: ['Global Stylist Elite 2024'],
            work: ['/images/cut_linen.png', '/images/bridal_linen.png']
          },
          {
            id: 'stylist-2',
            name: 'Abhishek',
            role: 'Hair Stylist',
            experience: 8,
            specializations: ['Textured Styling', 'Scalp Care', 'Editorial Styling'],
            bio: 'Abhishek channels high-fashion texture framing with seamless fluidity, making cinematic statement volumes wearable for everyday luxury rituals.',
            rating: 4.8,
            reviews: 115,
            awards: ['Styling Award 2024'],
            work: ['/images/bridal_linen.png', '/images/about_detail.png']
          }
        ]);
      }
      setLoading(false);
    }
    fetchStylists();
  }, []);

  return (
    <div className="min-h-screen bg-ivory pt-36 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
            <div className="w-6 h-[0.5px] bg-accent-gold/40" />
            <span className="font-label text-[10px] uppercase tracking-widest text-accent-gold">Our Artists</span>
          </motion.div>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
            <motion.h1 variants={fadeUp} custom={1} className="font-headline text-5xl md:text-7xl font-light text-obsidian leading-none">
              Meet the<br />
              <em className="text-accent-gold font-light not-italic">visionaries.</em>
            </motion.h1>
            
            <motion.div variants={fadeUp} custom={2} className="flex items-center gap-2 pb-3">
              <MapPin className="w-4 h-4 text-accent-gold" />
              <span className="font-label text-xs uppercase tracking-wider text-obsidian/60">Road Checkpost · Siliguri</span>
            </motion.div>
          </div>

          <motion.p variants={fadeUp} custom={3} className="font-body text-base text-obsidian/70 max-w-lg leading-relaxed">
            Our stylists merge architectural exactitude with organic movement, creating statements that aren't just seen — they are lived.
          </motion.p>
        </motion.div>

        {/* ── Stylists Portfolio List (Asymmetric) ── */}
        {loading ? (
          <p className="font-label text-sm text-obsidian/40 text-center py-12">Loading artists...</p>
        ) : (
          <div className="flex flex-col gap-32">
            {stylists.map((stylist, idx) => (
              <motion.div
                key={stylist.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                className={`flex flex-col md:flex-row gap-16 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* 1. Profile / Text Side */}
                <motion.div variants={fadeUp} custom={idx} className="flex-1 space-y-8">
                  <div className="space-y-2">
                    <span className="font-label text-[10px] uppercase tracking-[0.25em] text-accent-gold">
                      {stylist.role}
                    </span>
                    <h2 className="font-headline text-4xl font-light text-obsidian">{stylist.name}</h2>
                    <div className="flex items-center gap-2 pt-1 border-b border-obsidian/10 pb-4">
                      <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
                      <span className="font-label text-xs text-obsidian/80 font-medium">{stylist.rating}</span>
                      <span className="font-label text-[11px] text-obsidian/40">({stylist.reviews}+ Bookings)</span>
                    </div>
                  </div>

                  <p className="font-body text-obsidian/70 text-sm leading-relaxed max-w-md">
                    {stylist.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {stylist.specializations?.map((s: string) => (
                      <span key={s} className="font-label text-[9px] uppercase tracking-widest border border-accent-gold/20 px-4 py-2 bg-ivory text-obsidian/60 shadow-sm">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-6">
                    <Link href="/client/booking" className="btn-primary flex items-center gap-2 text-xs tracking-wider">
                      Book {stylist.name.split(" ")[0]}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <button className="p-3 border border-obsidian/10 hover:border-accent-gold/40 rounded-full transition-colors">
                      <Instagram className="w-4 h-4 text-obsidian/70" />
                    </button>
                  </div>
                </motion.div>

                {/* 2. Portfolio Gallery Side (Grid inside) */}
                <motion.div 
                  variants={fadeUp} 
                  custom={idx + 1} 
                  className="flex-1 w-full grid grid-cols-2 gap-4"
                >
                  {stylist.work?.map((img: string, i: number) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group relative overflow-hidden aspect-[3/4] bg-stone-100 shadow-sm border border-obsidian/5"
                    >
                      <img 
                        src={img} 
                        alt="Stylist Portfolio creation" 
                        className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-700"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Awards Banner ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-36 bg-sand/30 border border-obsidian/10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm shadow-sm"
        >
          <div>
            <p className="font-label text-[10px] uppercase tracking-widest text-accent-gold mb-3">Recognition</p>
            <h2 className="font-headline text-3xl font-light text-obsidian leading-tight">
              Award-winning art,<br />every year since 2018.
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
