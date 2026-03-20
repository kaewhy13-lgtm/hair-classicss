"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Animation variants ──────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1.0, ease: [0.4, 0, 0.1, 1], delay: i * 0.13 }
  }),
};

// ─── Marquee items ─────────────────────────────────────
const marqueeItems = [
  "BESPOKE COLOUR", "·", "PRECISION CUTS", "·",
  "KERATIN TREATMENTS", "·", "BALAYAGE", "·",
  "BRIDAL STYLING", "·", "AI CONSULTATION", "·",
  "HAIR PASSPORTS", "·", "LONDON", "·",
];

// ─── FAQ accordion ────────────────────────────────────
const faqs = [
  { q: "How long does an appointment take?",   a: "Most appointments take 60–90 minutes. Colour services such as balayage can take 2.5–3 hours." },
  { q: "What products do you use?",            a: "We work exclusively with professional-grade, salon-quality products chosen for performance and hair health." },
  { q: "Do you offer a consultation?",         a: "Yes — every new client receives a complimentary consultation. Our AI Consultation is available online 24/7." },
  { q: "Can I reschedule my booking?",         a: "You can reschedule up to 24 hours before your appointment through your dashboard or by calling us." },
  { q: "What is the Hair Passport?",           a: "Your digital Hair Passport stores every formula, cut, and treatment — so every visit builds on the last." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(26,24,20,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "26px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "20px",
          fontFamily: "'Jost', system-ui, sans-serif",
        }}
      >
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "17px",
          fontWeight: 300,
          color: "#1A1814",
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        <span style={{
          fontSize: "18px",
          color: "#A08060",
          flexShrink: 0,
          lineHeight: 1,
          fontWeight: 300,
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          display: "inline-block",
        }}>
          +
        </span>
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontSize: "14px",
            color: "#4A4440",
            lineHeight: 1.9,
            paddingBottom: "26px",
            maxWidth: "540px",
            fontFamily: "'Jost', system-ui, sans-serif",
          }}
        >
          {a}
        </motion.p>
      )}
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#ECEAE4", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — full viewport, image fills background
          ══════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "96px",
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800&auto=format&fit=crop&q=85")`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
        }} />
        {/* Refined gradient overlay — richer depth */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.58) 100%)" }} />

        {/* Subtle grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.4,
          pointerEvents: "none",
        }} />

        {/* Centered hero text */}
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px", width: "100%" }}>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "rgba(200,180,155,0.85)",
              marginBottom: "22px",
            }}
          >
            Est. London · 2018
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(44px, 7.5vw, 96px)",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              marginBottom: "48px",
            }}
          >
            Hair Classic:<br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.88)" }}>Quiet Elegance</em>
          </motion.h1>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <Link href="/booking" className="btn-aura-inv"
              style={{
                padding: "18px 44px",
                fontSize: "10px",
                letterSpacing: "0.30em",
              }}
            >
              RESERVE YOUR CHAIR
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontFamily: "'Jost'", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            Scroll
          </span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MARQUEE
          ══════════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid rgba(26,24,20,0.07)",
        borderBottom: "1px solid rgba(26,24,20,0.07)",
        padding: "18px 0",
        overflow: "hidden",
        background: "#ECEAE4",
      }}>
        <div className="marquee-track" style={{ display: "flex", gap: "48px", whiteSpace: "nowrap" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: item === "·" ? "#C4A878" : "#8A7F78",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SPLIT 1 — "The Art of Precision" — text left / image right
          ══════════════════════════════════════════════════════════ */}
      <section className="grid-split">
        {/* Left — text on base cream */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="split-text-pad"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#ECEAE4",
          }}
        >
          <motion.p variants={fadeUp} custom={0} className="label" style={{ marginBottom: "32px" }}>
            The Art of Detail
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 3.5vw, 56px)",
            fontWeight: 300,
            color: "#1A1814",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            marginBottom: "28px",
          }}>
            Craftsmanship<br />Without Compromise
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} style={{
            fontSize: "14px",
            color: "#4A4440",
            lineHeight: 1.9,
            maxWidth: "400px",
            marginBottom: "44px",
          }}>
            A curation of essential techniques defined by extraordinary precision. From the subtlest balayage to a flawless blunt cut, every service is crafted to transcend the ordinary.
          </motion.p>
          <motion.div variants={fadeUp} custom={3}>
            <Link href="/stylists" className="link-underline">
              DISCOVER OUR STYLISTS
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — image */}
        <div style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1527799820374-87891c6b5b37?w=900&auto=format&fit=crop&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }} />
      </section>

      {/* ══════════════════════════════════════════════════════════
          SPLIT 2 — "Purity of Method" — image left / text right
          ══════════════════════════════════════════════════════════ */}
      <section className="grid-split">
        {/* Left — image */}
        <div style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
          order: 0,
        }} />

        {/* Right — text on slightly deeper tone */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="split-text-pad"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#E5E2DB",
            order: 1,
          }}
        >
          <motion.p variants={fadeUp} custom={0} className="label" style={{ marginBottom: "32px" }}>
            The Essence
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 3.5vw, 56px)",
            fontWeight: 300,
            color: "#1A1814",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            marginBottom: "28px",
          }}>
            Purity of<br />Method
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} style={{
            fontSize: "14px",
            color: "#4A4440",
            lineHeight: 1.9,
            maxWidth: "400px",
            marginBottom: "44px",
          }}>
            We work exclusively with professional-grade products chosen for performance and hair health. Every formula in your Hair Passport is curated specifically for you.
          </motion.p>
          <motion.div variants={fadeUp} custom={3}>
            <Link href="/booking" className="btn-aura"
              style={{ padding: "14px 32px", fontSize: "10px", letterSpacing: "0.26em" }}
            >
              OUR APPROACH
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES — header + row of services
          ══════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "#ECEAE4" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* Section header */}
          <div className="section-header-row" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "72px",
            paddingBottom: "28px",
            borderBottom: "1px solid rgba(26,24,20,0.07)",
          }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <motion.p variants={fadeUp} custom={0} className="label" style={{ marginBottom: "14px" }}>
                Our Services
              </motion.p>
              <motion.h2
                variants={fadeUp} custom={1}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 3vw, 46px)",
                  fontWeight: 300,
                  color: "#1A1814",
                  letterSpacing: "-0.01em",
                }}
              >
                Curated Artistry
              </motion.h2>
            </motion.div>
            <Link href="/booking" className="link-underline">
              BOOK NOW
            </Link>
          </div>

          {/* 4-col service list */}
          <div className="grid-services">
            {[
              { name: "Balayage & Colour", price: "From £280", desc: "Hand-painted luminosity tailored to your tone and lifestyle.", img: "https://images.unsplash.com/photo-1527799820374-87891c6b5b37?w=500&auto=format&fit=crop&q=80" },
              { name: "Precision Cut",     price: "From £95",  desc: "Architectural cuts sculpted to your face shape and bone structure.", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80" },
              { name: "Keratin Treatment", price: "From £240", desc: "Professional smoothing that lasts four months. Frizz, redefined.", img: "https://images.unsplash.com/photo-1519699564370-04a4813a2b9a?w=500&auto=format&fit=crop&q=80" },
              { name: "Bridal Styling",    price: "From £160", desc: "Your most important day, elevated by our finest artists.", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80" },
            ].map(({ name, price, desc, img }, i) => (
              <motion.div
                key={name}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="service-card-wrap"
                style={{
                  borderLeft: i === 0 ? "1px solid rgba(26,24,20,0.07)" : "none",
                  borderRight: "1px solid rgba(26,24,20,0.07)",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                {/* Image with zoom on hover */}
                <div style={{ overflow: "hidden" }}>
                  <div
                    className="service-card-img"
                    style={{
                      backgroundImage: `url("${img}")`,
                    }}
                  />
                </div>
                <div style={{ padding: "24px 24px 32px" }}>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "17px",
                    fontWeight: 400,
                    color: "#1A1814",
                    marginBottom: "6px",
                    letterSpacing: "-0.01em",
                  }}>
                    {name}
                  </p>
                  <p style={{
                    fontSize: "10px",
                    color: "#A08060",
                    letterSpacing: "0.12em",
                    marginBottom: "12px",
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontWeight: 500,
                  }}>
                    {price}
                  </p>
                  <p style={{
                    fontSize: "13px",
                    color: "#8A7F78",
                    lineHeight: 1.75,
                    fontFamily: "'Jost', system-ui, sans-serif",
                  }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAND — minimal, numbers + labels
          ══════════════════════════════════════════════════════════ */}
      <section className="section-pad-sm" style={{ background: "#1A1814" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }} className="grid-stats">
          {[
            { num: "4,200+", label: "Satisfied Clients" },
            { num: "12+",    label: "Years of Mastery" },
            { num: "★ 5.0", label: "Google Rating" },
          ].map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
            >
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(36px, 4.5vw, 60px)",
                fontWeight: 300,
                color: "#F5F4F0",
                marginBottom: "12px",
                letterSpacing: "-0.01em",
              }}>
                {num}
              </p>
              <div style={{ width: "24px", height: "1px", background: "#A08060", margin: "0 auto 12px" }} />
              <p style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#8A7F78",
                fontFamily: "'Jost', system-ui, sans-serif",
              }}>
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS — minimal, editorial
          ══════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "#E5E2DB" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "72px",
            paddingBottom: "28px",
            borderBottom: "1px solid rgba(26,24,20,0.07)",
          }}>
            <div>
              <p className="label" style={{ marginBottom: "14px" }}>Client Voices</p>
              <motion.h2
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 3vw, 46px)",
                  fontWeight: 300,
                  color: "#1A1814",
                  letterSpacing: "-0.01em",
                }}
              >
                What They Say
              </motion.h2>
            </div>
          </div>

          {/* 3 testimonials */}
          <div className="grid-3">
            {[
              { quote: "I've been to salons across Paris and New York. Hair Classic is simply the finest experience I've had.", name: "Amelia W.", service: "Balayage & Precision Cut" },
              { quote: "My hair has never felt this healthy. The AI consultation understood exactly what I wanted before I even arrived.", name: "Priya K.", service: "Keratin + AI Consult" },
              { quote: "The Gold membership pays for itself in six visits. Priority booking and the warm welcome make every visit feel special.", name: "Charlotte M.", service: "Gold Member · Blowout" },
            ].map(({ quote, name, service }, i) => (
              <motion.div
                key={name}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.14}
                style={{
                  background: "#ECEAE4",
                  padding: "48px 40px",
                  borderTop: "2px solid rgba(160,128,96,0.25)",
                }}
              >
                {/* Gold opening quote mark */}
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "48px",
                  color: "#A08060",
                  opacity: 0.35,
                  lineHeight: 1,
                  marginBottom: "16px",
                }}>
                  "
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "16px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#1A1814",
                  lineHeight: 1.8,
                  marginBottom: "36px",
                }}>
                  {quote}
                </p>
                <div style={{ width: "24px", height: "1px", background: "#A08060", marginBottom: "20px" }} />
                <p style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#1A1814",
                  letterSpacing: "0.10em",
                  marginBottom: "5px",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  textTransform: "uppercase",
                }}>
                  {name}
                </p>
                <p style={{
                  fontSize: "10px",
                  color: "#A08060",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "'Jost', system-ui, sans-serif",
                }}>
                  {service}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ — image left / accordion right
          ══════════════════════════════════════════════════════════ */}
      <section className="grid-split">
        {/* Left — image */}
        <div style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1519699564370-04a4813a2b9a?w=900&auto=format&fit=crop&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }} />

        {/* Right — FAQ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="faq-pad"
          style={{
            background: "#ECEAE4",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.p variants={fadeUp} custom={0} className="label" style={{ marginBottom: "20px" }}>
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px, 2.5vw, 44px)",
            fontWeight: 300,
            color: "#1A1814",
            marginBottom: "56px",
            letterSpacing: "-0.01em",
          }}>
            Any questions?
          </motion.h2>
          <div>
            {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA — centered, editorial, dark
          ══════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{
        textAlign: "center",
        background: "#1A1814",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(160,128,96,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}
        >
          <motion.p variants={fadeUp} custom={0} style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            color: "#A08060",
            marginBottom: "28px",
            fontFamily: "'Jost', system-ui, sans-serif",
          }}>
            Your Next Chapter
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px, 5.5vw, 76px)",
            fontWeight: 300,
            color: "#F5F4F0",
            lineHeight: 1.08,
            marginBottom: "56px",
            letterSpacing: "-0.02em",
          }}>
            Begins here.
          </motion.h2>
          <motion.div variants={fadeUp} custom={2}>
            <Link href="/booking" className="btn-aura-inv"
              style={{ padding: "18px 44px", fontSize: "10px", letterSpacing: "0.30em" }}
            >
              BOOK YOUR APPOINTMENT
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
