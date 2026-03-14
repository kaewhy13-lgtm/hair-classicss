"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Animation variants ──────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.4, 0, 0.1, 1], delay: i * 0.12 }
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
    <div style={{ borderBottom: "1px solid rgba(26,24,20,0.10)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 0",
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
        }}>
          {q}
        </span>
        <span style={{
          fontSize: "20px",
          color: "#8A7F78",
          flexShrink: 0,
          lineHeight: 1,
          fontWeight: 300,
        }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: "14px",
            color: "#4A4440",
            lineHeight: 1.8,
            paddingBottom: "22px",
            maxWidth: "520px",
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

      {/* ════════════════════════════════════════════════════════
          HERO — full viewport, image fills background
          ════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "80px",
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800&auto=format&fit=crop&q=85")`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
        }} />
        {/* Very subtle dark veil */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.38) 100%)" }} />

        {/* Centered hero text */}
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.70)",
              marginBottom: "20px",
            }}
          >
            Est. London · 2018
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(52px, 7vw, 88px)",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              marginBottom: "40px",
            }}
          >
            Hair Classic:<br />
            <em style={{ fontStyle: "italic" }}>Quiet Elegance</em>
          </motion.h1>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <Link href="/booking" className="btn-aura btn-aura-inv">
              RESERVE YOUR CHAIR
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MARQUEE
          ════════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid rgba(26,24,20,0.08)",
        borderBottom: "1px solid rgba(26,24,20,0.08)",
        padding: "16px 0",
        overflow: "hidden",
        background: "#ECEAE4",
      }}>
        <div className="marquee-track" style={{ display: "flex", gap: "40px", whiteSpace: "nowrap" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#8A7F78",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SPLIT 1 — "The Art of Precision" — text left / image right
          ════════════════════════════════════════════════════════ */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "90vh",
      }}>
        {/* Left — text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px 80px",
            background: "#ECEAE4",
          }}
        >
          <motion.p variants={fadeUp} custom={0} className="label" style={{ marginBottom: "28px" }}>
            The Art of Detail
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 3.5vw, 52px)",
            fontWeight: 300,
            color: "#1A1814",
            lineHeight: 1.15,
            marginBottom: "28px",
          }}>
            Craftsmanship<br />Without Compromise
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} style={{
            fontSize: "14px",
            color: "#4A4440",
            lineHeight: 1.85,
            maxWidth: "380px",
            marginBottom: "40px",
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
          minHeight: "600px",
        }} />
      </section>

      {/* ════════════════════════════════════════════════════════
          SPLIT 2 — "Purity of Material" — image left / text right
          ════════════════════════════════════════════════════════ */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "90vh",
      }}>
        {/* Left — image */}
        <div style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "600px",
        }} />

        {/* Right — text on slightly darker bg */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px 80px",
            background: "#E5E2DB",
          }}
        >
          <motion.p variants={fadeUp} custom={0} className="label" style={{ marginBottom: "28px" }}>
            The Essence
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 3.5vw, 52px)",
            fontWeight: 300,
            color: "#1A1814",
            lineHeight: 1.15,
            marginBottom: "28px",
          }}>
            Purity of<br />Method
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} style={{
            fontSize: "14px",
            color: "#4A4440",
            lineHeight: 1.85,
            maxWidth: "380px",
            marginBottom: "40px",
          }}>
            We work exclusively with professional-grade products chosen for performance and hair health. Every formula in your Hair Passport is curated specifically for you.
          </motion.p>
          <motion.div variants={fadeUp} custom={3}>
            <Link href="/consultation" className="btn-aura">
              OUR APPROACH
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES — header + row of services
          ════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 40px", background: "#ECEAE4" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* Section header with VIEW ALL on the right — exactly like Aura "New Arrivals" */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            borderBottom: "1px solid rgba(26,24,20,0.08)",
            paddingBottom: "24px",
          }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={0}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(32px, 3vw, 44px)",
                fontWeight: 300,
                color: "#1A1814",
              }}
            >
              Our Services
            </motion.h2>
            <Link href="/booking" className="link-underline">
              BOOK NOW
            </Link>
          </div>

          {/* 4-col service list — minimal, editorial */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}>
            {[
              { name: "Balayage & Colour", price: "From £280", desc: "Hand-painted luminosity tailored to your tone and lifestyle.", img: "https://images.unsplash.com/photo-1527799820374-87891c6b5b37?w=500&auto=format&fit=crop&q=80" },
              { name: "Precision Cut",     price: "From £95",  desc: "Architectural cuts sculpted to your face shape and bone structure.", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80" },
              { name: "Keratin Treatment", price: "From £240", desc: "Professional smoothing that lasts four months. Frizz, redefined.", img: "https://images.unsplash.com/photo-1519699564370-04a4813a2b9a?w=500&auto=format&fit=crop&q=80" },
              { name: "Bridal Styling",    price: "From £160", desc: "Your most important day, elevated by our finest artists.", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80" },
            ].map(({ name, price, desc, img }, i) => (
              <motion.div
                key={name}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                style={{
                  borderLeft: i === 0 ? "1px solid rgba(26,24,20,0.08)" : "none",
                  borderRight: "1px solid rgba(26,24,20,0.08)",
                  padding: "0",
                  cursor: "pointer",
                }}
              >
                {/* Image */}
                <div style={{
                  height: "320px",
                  backgroundImage: `url("${img}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.7s ease",
                  overflow: "hidden",
                }} />
                <div style={{ padding: "24px 24px 32px" }}>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "17px",
                    fontWeight: 400,
                    color: "#1A1814",
                    marginBottom: "6px",
                  }}>
                    {name}
                  </p>
                  <p style={{
                    fontSize: "11px",
                    color: "#A08060",
                    letterSpacing: "0.1em",
                    marginBottom: "10px",
                    fontFamily: "'Jost', system-ui, sans-serif",
                  }}>
                    {price}
                  </p>
                  <p style={{
                    fontSize: "12px",
                    color: "#8A7F78",
                    lineHeight: 1.7,
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

      {/* ════════════════════════════════════════════════════════
          STATS BAND — minimal, numbers + labels
          ════════════════════════════════════════════════════════ */}
      <section style={{
        background: "#1A1814",
        padding: "80px 40px",
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px",
          textAlign: "center",
        }}>
          {[
            { num: "4,200+", label: "Satisfied Clients" },
            { num: "12+",    label: "Years of Mastery" },
            { num: "★ 5.0", label: "Google Rating" },
          ].map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
            >
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 300,
                color: "#F5F4F0",
                marginBottom: "8px",
              }}>
                {num}
              </p>
              <p style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.22em",
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

      {/* ════════════════════════════════════════════════════════
          TESTIMONIALS — minimal, editorial
          ════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 40px", background: "#E5E2DB" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            borderBottom: "1px solid rgba(26,24,20,0.08)",
            paddingBottom: "24px",
          }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(32px, 3vw, 44px)",
                fontWeight: 300,
                color: "#1A1814",
              }}
            >
              Client Voices
            </motion.h2>
          </div>

          {/* 3 testimonials */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            {[
              { quote: "I've been to salons across Paris and New York. Hair Classic is simply the finest experience I've had.", name: "Amelia W.", service: "Balayage & Precision Cut" },
              { quote: "My hair has never felt this healthy. The AI consultation understood exactly what I wanted before I even arrived.", name: "Priya K.", service: "Keratin + AI Consult" },
              { quote: "The Gold membership pays for itself in six visits. Priority booking and the warm welcome make every visit feel special.", name: "Charlotte M.", service: "Gold Member · Blowout" },
            ].map(({ quote, name, service }, i) => (
              <motion.div
                key={name}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
                style={{
                  background: "#ECEAE4",
                  padding: "48px 40px",
                  borderTop: "2px solid rgba(26,24,20,0.10)",
                }}
              >
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "16px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#1A1814",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                }}>
                  &ldquo;{quote}&rdquo;
                </p>
                <p style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#1A1814",
                  letterSpacing: "0.08em",
                  marginBottom: "4px",
                  fontFamily: "'Jost', system-ui, sans-serif",
                }}>
                  {name}
                </p>
                <p style={{
                  fontSize: "10px",
                  color: "#8A7F78",
                  letterSpacing: "0.14em",
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

      {/* ════════════════════════════════════════════════════════
          FAQ — image left / accordion right (Aura split style)
          ════════════════════════════════════════════════════════ */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "80vh",
      }}>
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
          style={{
            background: "#ECEAE4",
            padding: "100px 80px",
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
            fontSize: "clamp(28px, 2.5vw, 40px)",
            fontWeight: 300,
            color: "#1A1814",
            marginBottom: "48px",
          }}>
            Have any questions?
          </motion.h2>
          <div>
            {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA — centered, editorial
          ════════════════════════════════════════════════════════ */}
      <section style={{
        padding: "160px 40px",
        textAlign: "center",
        background: "#1A1814",
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <motion.p variants={fadeUp} custom={0} style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#A08060",
            marginBottom: "24px",
            fontFamily: "'Jost', system-ui, sans-serif",
          }}>
            Your Next Chapter
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px, 5vw, 68px)",
            fontWeight: 300,
            color: "#F5F4F0",
            lineHeight: 1.1,
            marginBottom: "48px",
          }}>
            Begins here.
          </motion.h2>
          <motion.div variants={fadeUp} custom={2}>
            <Link href="/booking" className="btn-aura btn-aura-inv">
              BOOK YOUR APPOINTMENT
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
