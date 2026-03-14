"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Award, ArrowRight, Instagram, MapPin } from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────
const stylists = [
  {
    id: "isabelle-m",
    name: "Isabelle Marchand",
    role: "Creative Director",
    experience: 14,
    specializations: ["Balayage", "Creative Colour", "Bridal"],
    bio: "Trained at Toni & Guy London and l'École de Coiffure Paris. Isabelle's hand-painted colour work has been featured in Vogue UK and Harper's Bazaar. Her philosophy: hair should move like fabric — effortless and exquisite.",
    rating: 5.0,
    reviews: 312,
    accent: "#1A1814",
    awards: ["UK Colourist of the Year 2023"],
  },
  {
    id: "james-t",
    name: "James Thurston",
    role: "Senior Stylist",
    experience: 9,
    specializations: ["Precision Cuts", "Scalp Treatments", "Men's Grooming"],
    bio: "James approaches every cut as an architectural exercise — structure, balance, and silhouette above all. His precision cuts are so clean they last twice as long. Clients return for him as much as for the result.",
    rating: 4.9,
    reviews: 198,
    accent: "#4A4440",
    awards: ["L'Oréal Colour Trophy — Finalist"],
  },
  {
    id: "anika-s",
    name: "Anika Sharma",
    role: "Colour Specialist",
    experience: 7,
    specializations: ["Highlights", "Keratin", "Olaplex Treatments"],
    bio: "Anika's colour work is deeply rooted in hair science — she never applies a formula without fully understanding the hair's history. Her Olaplex treatments have reversed damage clients thought was permanent.",
    rating: 4.9,
    reviews: 156,
    accent: "#8A7F78",
    awards: ["Schwarzkopf Licensed Champion"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.1, 1], delay: i * 0.12 }
  }),
};

export default function StylistsPage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ECEAE4",
      paddingTop: "140px",
      paddingBottom: "100px",
      paddingLeft: "24px",
      paddingRight: "24px",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: "80px" }}
        >
          <motion.div variants={fadeUp} custom={0} style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            marginBottom: "20px" 
          }}>
            <div style={{ width: "24px", height: "1px", backgroundColor: "rgba(26,24,20,0.3)" }} />
            <span style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#8A7F78",
            }}>
              Our Artists
            </span>
          </motion.div>

          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "24px"
          }}>
            <motion.h1 variants={fadeUp} custom={1} style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "64px",
              fontWeight: 300,
              color: "#1A1814",
              lineHeight: 1.1,
              maxWidth: "600px",
            }}>
              Meet the<br />
              <em style={{ color: "#8A7F78", fontStyle: "italic" }}>stylists.</em>
            </motion.h1>
            
            <motion.div variants={fadeUp} custom={2} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              paddingBottom: "12px",
            }}>
              <MapPin style={{ width: "16px", height: "16px", color: "rgba(26,24,20,0.4)" }} />
              <span style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "#4A4440",
                textTransform: "uppercase"
              }}>
                London · Mayfair
              </span>
            </motion.div>
          </div>

          <motion.p variants={fadeUp} custom={3} style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "15px",
            color: "#4A4440",
            maxWidth: "600px",
            lineHeight: 1.7,
          }}>
            Our stylists are not just technicians — they are artists, scientists, and confidants. Each brings a unique perspective shaped by years of prestigious international training.
          </motion.p>
        </motion.div>

        {/* ── Stylists Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "24px",
            marginBottom: "100px",
          }}
        >
          {stylists.map((stylist, idx) => (
            <motion.div key={stylist.id} variants={fadeUp} custom={idx + 4} style={{
              backgroundColor: "#F5F4F0",
              border: "1px solid rgba(26,24,20,0.12)",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Header Info */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "32px" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#E5E2DB",
                  border: "1px solid rgba(26,24,20,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "24px",
                  color: "#1A1814",
                  flexShrink: 0,
                }}>
                  {stylist.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "24px",
                    fontWeight: 300,
                    color: "#1A1814",
                    marginBottom: "4px",
                  }}>
                    {stylist.name}
                  </h3>
                  <p style={{
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#A08060",
                    marginBottom: "8px",
                  }}>
                    {stylist.role}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Star style={{ width: "12px", height: "12px", color: "#A08060", fill: "#A08060" }} />
                    <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "12px", color: "#4A4440" }}>
                      {stylist.rating}
                    </span>
                    <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "11px", color: "#8A7F78" }}>
                      ({stylist.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "13px",
                color: "#4A4440",
                lineHeight: 1.7,
                marginBottom: "24px",
                flex: 1,
              }}>
                {stylist.bio}
              </p>

              {/* Specializations Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                {stylist.specializations.map((s) => (
                  <span key={s} style={{
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.05em",
                    padding: "6px 12px",
                    backgroundColor: "#ECEAE4",
                    border: "1px solid rgba(26,24,20,0.08)",
                    color: "#4A4440",
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Stats / Award Line */}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "24px", 
                padding: "20px 0", 
                borderTop: "1px solid rgba(26,24,20,0.08)",
                borderBottom: "1px solid rgba(26,24,20,0.08)",
                marginBottom: "32px",
              }}>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", color: "#1A1814", lineHeight: 1 }}>
                    {stylist.experience}+
                  </p>
                  <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7F78", marginTop: "4px" }}>
                    Years
                  </p>
                </div>
                <div style={{ width: "1px", height: "32px", backgroundColor: "rgba(26,24,20,0.08)" }} />
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Award style={{ width: "16px", height: "16px", color: "rgba(26,24,20,0.3)" }} />
                  <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "12px", color: "#4A4440", maxWidth: "160px", lineHeight: 1.4 }}>
                    {stylist.awards[0]}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "12px" }}>
                <Link href="/booking" style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "16px",
                  backgroundColor: "#1A1814",
                  color: "#F5F4F0",
                  textDecoration: "none",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  transition: "background 0.3s",
                }}>
                  Book {stylist.name.split(" ")[0]}
                  <ArrowRight style={{ width: "14px", height: "14px" }} />
                </Link>
                <button style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(26,24,20,0.2)",
                  color: "#1A1814",
                  cursor: "pointer",
                }}>
                  <Instagram style={{ width: "18px", height: "18px" }} />
                </button>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* ── Awards Banner ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{
            backgroundColor: "#E5E2DB",
            border: "1px solid rgba(26,24,20,0.12)",
            padding: "60px 48px",
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
          }}>
            <div>
              <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A7F78", marginBottom: "16px" }}>
                Recognition
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", fontWeight: 300, color: "#1A1814" }}>
                Award-winning art,<br />every year since 2018.
              </h2>
            </div>
            
            <Link href="/booking" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 32px",
              backgroundColor: "transparent",
              border: "1px solid #1A1814",
              color: "#1A1814",
              textDecoration: "none",
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}>
              Reserve Your Chair
              <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
