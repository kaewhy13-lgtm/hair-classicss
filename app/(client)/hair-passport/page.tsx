"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, Scissors, Clock, ChevronDown, ChevronRight,
  Camera, BookOpen, AlertCircle, Sparkles, Star, Edit2
} from "lucide-react";
import { staggerContainer, slideUp, fadeIn } from "@/styles/animations";

// ─── Mock data ────────────────────────────────────────────────
const hairProfile = {
  hair_type:       "Fine, Straight",
  hair_texture:    "Silky",
  current_color:   "Warm Ash Blonde",
  last_formula:    "Wella 9/1 + 9/16 — 1:2 with 20vol, toned Olaplex 4-P",
  allergies:       ["PPD (p-Phenylenediamine)", "Resorcinol"],
  sensitivities:   ["Sulphates", "Strong fragrances"],
  style_preferences: ["Natural", "Low-maintenance", "Editorial for events"],
  lifestyle_notes: "Works in finance. Prefers wash-and-go styles. Travels frequently — likes products that are easy to take on flights.",
};

const treatmentHistory = [
  {
    date: "12 Mar 2026",
    service: "Balayage & Toner",
    stylist: "Isabelle M.",
    notes: "Hand-painted balayage, mid-lengths to ends. Toned with Olaplex 4-P shampoo 15 min. Client loved the warmth.",
    before: "#7B6245",
    after: "#D4B87A",
    formula: "Wella BlondorPlex + Toner 10/81 10vol",
    rating: 5,
  },
  {
    date: "15 Jan 2026",
    service: "Precision Cut",
    stylist: "James T.",
    notes: "Removed 2.5cm. Kept length below shoulder. Subtle face-framing layers added.",
    before: null,
    after: null,
    formula: null,
    rating: 5,
  },
  {
    date: "4 Nov 2025",
    service: "Keratin Treatment",
    stylist: "Isabelle M.",
    notes: "Cezanne full keratin treatment. Blow-dry and flat iron at 230°C. Advised to wait 72h before washing.",
    before: null,
    after: null,
    formula: null,
    rating: 4,
  },
];

function ColorSwatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-10 w-10 rounded-full border border-gold/20 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        style={{ background: hex }}
      />
      <p className="text-[10px] text-muted/70 text-center tracking-wide">{label}</p>
    </div>
  );
}

function TreatmentCard({ treatment }: { treatment: typeof treatmentHistory[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gold/10 rounded-sm bg-espresso-light/15 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-espresso-light/10 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-sm border border-gold/15 flex items-center justify-center shrink-0">
            <Scissors className="h-3.5 w-3.5 text-gold/60" />
          </div>
          <div>
            <p className="text-cream font-medium text-sm">{treatment.service}</p>
            <p className="text-muted/60 text-[11px] mt-0.5">
              {treatment.date} · {treatment.stylist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-0.5">
            {Array.from({ length: treatment.rating }).map((_, i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-gold text-gold" />
            ))}
          </div>
          <ChevronDown className={`h-4 w-4 text-muted/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-gold/5 pt-4 space-y-4">
              {/* Color swatches if colour treatment */}
              {treatment.before && treatment.after && (
                <div className="flex items-center gap-4">
                  <ColorSwatch hex={treatment.before} label="Before" />
                  <ChevronRight className="h-4 w-4 text-muted/30 mt-2" />
                  <ColorSwatch hex={treatment.after} label="After" />
                </div>
              )}

              {/* Notes */}
              <div>
                <p className="text-[10px] tracking-[0.15em] text-muted/50 uppercase mb-1.5">Stylist Notes</p>
                <p className="text-cream/70 text-sm leading-relaxed">{treatment.notes}</p>
              </div>

              {/* Formula */}
              {treatment.formula && (
                <div className="bg-espresso-dark/40 rounded-sm px-4 py-3 border border-gold/8">
                  <p className="text-[10px] tracking-[0.15em] text-gold/50 uppercase mb-1">Formula Applied</p>
                  <p className="text-cream/80 text-sm font-mono">{treatment.formula}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HairPassportPage() {
  return (
    <div className="min-h-screen bg-espresso-dark pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-3 mb-5">
            <span className="gold-bar" />
            <span className="text-[11px] tracking-[0.25em] text-gold/60 uppercase">Your Record</span>
          </motion.div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <motion.h1 variants={slideUp} className="font-display text-4xl sm:text-5xl font-light text-cream">
                Hair Passport
              </motion.h1>
              <motion.p variants={slideUp} className="text-cream/40 mt-2 text-sm leading-relaxed max-w-md">
                A living record of every formula, treatment, and preference — yours to keep, ours to honour.
              </motion.p>
            </div>
            <button className="shrink-0 flex items-center gap-2 border border-gold/20 hover:border-gold/40 px-4 py-2 rounded-sm text-[12px] tracking-wide uppercase text-cream/60 hover:text-cream transition-all duration-300">
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>
        </motion.div>

        {/* ── Profile Grid ─────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {/* Hair type card */}
          <motion.div variants={slideUp} className="border border-gold/10 rounded-sm bg-espresso-light/15 p-5 hover:border-gold/20 transition-colors duration-400">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-4 w-4 text-gold/50" />
              <p className="text-[10px] tracking-[0.15em] text-muted/70 uppercase">Hair Profile</p>
            </div>
            <p className="font-display text-xl text-cream font-light">{hairProfile.hair_type}</p>
            <p className="text-cream/50 text-sm mt-1">{hairProfile.hair_texture}</p>
          </motion.div>

          {/* Current colour */}
          <motion.div variants={slideUp} className="border border-gold/10 rounded-sm bg-espresso-light/15 p-5 hover:border-gold/20 transition-colors duration-400">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-4 w-4 text-gold/50" />
              <p className="text-[10px] tracking-[0.15em] text-muted/70 uppercase">Current Colour</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full" style={{ background: "#D4B87A" }} />
              <div>
                <p className="font-display text-lg text-cream font-light">{hairProfile.current_color}</p>
                <p className="text-muted/50 text-[11px] font-mono">#D4B87A</p>
              </div>
            </div>
          </motion.div>

          {/* Treatments count */}
          <motion.div variants={slideUp} className="border border-gold/10 rounded-sm bg-espresso-light/15 p-5 hover:border-gold/20 transition-colors duration-400">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-gold/50" />
              <p className="text-[10px] tracking-[0.15em] text-muted/70 uppercase">Visit History</p>
            </div>
            <p className="font-display text-3xl text-cream font-light">{treatmentHistory.length}</p>
            <p className="text-cream/50 text-sm mt-1">Treatments recorded</p>
          </motion.div>
        </motion.div>

        {/* ── Last Formula ───────────────────────────────────────── */}
        <motion.div variants={slideUp} initial="hidden" animate="visible" className="mb-8">
          <div className="border border-gold/15 bg-espresso-light/10 rounded-sm p-5 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gold-gradient-h opacity-40" />
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-gold/60" />
              <p className="text-[10px] tracking-[0.15em] text-gold/60 uppercase">Last Colour Formula</p>
            </div>
            <p className="text-cream font-mono text-sm">{hairProfile.last_formula}</p>
          </div>
        </motion.div>

        {/* ── Allergies & Sensitivities ─────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          <motion.div variants={slideUp} className="border border-red-500/10 bg-red-500/[0.04] rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-red-400/60" />
              <p className="text-[10px] tracking-[0.15em] text-red-400/50 uppercase">Allergies</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {hairProfile.allergies.map((a) => (
                <span key={a} className="text-[12px] px-2.5 py-1 rounded-sm border border-red-400/15 text-red-300/80 bg-red-400/5">
                  {a}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideUp} className="border border-amber-500/10 bg-amber-500/[0.03] rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-amber-400/60" />
              <p className="text-[10px] tracking-[0.15em] text-amber-400/50 uppercase">Sensitivities</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {hairProfile.sensitivities.map((s) => (
                <span key={s} className="text-[12px] px-2.5 py-1 rounded-sm border border-amber-400/15 text-amber-300/70 bg-amber-400/5">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Style Preferences ─────────────────────────────────── */}
        <motion.div variants={slideUp} initial="hidden" animate="visible" className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-4 w-4 text-gold/50" />
            <p className="text-[11px] tracking-[0.15em] text-cream/50 uppercase">Style Preferences</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {hairProfile.style_preferences.map((p) => (
              <span key={p} className="text-[12px] px-3 py-1.5 rounded-sm border border-gold/15 text-cream/70 bg-espresso-light/20 hover:border-gold/30 transition-colors">
                {p}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Lifestyle Notes ───────────────────────────────────── */}
        <motion.div variants={slideUp} initial="hidden" animate="visible" className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-gold/50" />
            <p className="text-[11px] tracking-[0.15em] text-cream/50 uppercase">Lifestyle Notes</p>
          </div>
          <div className="border border-gold/8 rounded-sm p-5 bg-espresso-light/10">
            <p className="text-cream/65 text-sm leading-relaxed">{hairProfile.lifestyle_notes}</p>
          </div>
        </motion.div>

        {/* ── Treatment History ─────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-3 mb-5">
            <span className="gold-bar" />
            <h2 className="text-[11px] tracking-[0.25em] text-gold/60 uppercase">Treatment History</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-3">
            {treatmentHistory.map((t, i) => (
              <motion.div key={i} variants={slideUp}>
                <TreatmentCard treatment={t} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
