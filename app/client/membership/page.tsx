"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.1, 1], delay: i * 0.12 }
  }),
};

const tiers = [
  {
    id: "gold",
    name: "Classic",
    monthly: 79,
    annual: 749,
    perks: [
      "Priority booking window",
      "10% off all services",
      "Complimentary drink on visit",
      "Digital Hair Passport",
    ],
  },
  {
    id: "platinum",
    name: "Signature",
    monthly: 149,
    annual: 1399,
    popular: true,
    perks: [
      "Everything in Classic",
      "15% off all services",
      "Champagne on every visit",
      "Access to senior stylists",
      "Free AI consultation monthly",
    ],
  },
  {
    id: "diamond",
    name: "Aura",
    monthly: 299,
    annual: 2799,
    perks: [
      "Everything in Signature",
      "Dedicated personal stylist",
      "20% off all services",
      "Private styling suite",
      "Cab booking concierge",
    ],
  },
];

export default function MembershipPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ECEAE4",
      paddingTop: "140px",
      paddingBottom: "100px",
      paddingLeft: "24px",
      paddingRight: "24px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <motion.p variants={fadeUp} custom={0} style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#8A7F78",
            marginBottom: "16px",
          }}>
            Membership
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "48px",
            fontWeight: 300,
            color: "#1A1814",
            marginBottom: "24px",
          }}>
            Elevate Your Experience
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "14px",
            color: "#4A4440",
            maxWidth: "500px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}>
            Join our exclusive membership and unlock priority access, bespoke perks, and unparalleled care at every visit.
          </motion.p>

          {/* Billing toggle */}
          <motion.div variants={fadeUp} custom={3} style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px",
            backgroundColor: "#F5F4F0",
            border: "1px solid rgba(26,24,20,0.08)",
          }}>
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: "10px 24px",
                  backgroundColor: billing === b ? "#1A1814" : "transparent",
                  color: billing === b ? "#F5F4F0" : "#8A7F78",
                  border: "none",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {b}
                {b === "annual" && (
                  <span style={{
                    fontSize: "9px",
                    backgroundColor: billing === b ? "rgba(245,244,240,0.15)" : "rgba(26,24,20,0.06)",
                    color: billing === b ? "#F5F4F0" : "#4A4440",
                    padding: "2px 6px",
                  }}>
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Tiers Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {tiers.map((tier, idx) => (
            <motion.div key={tier.id} variants={fadeUp} custom={idx + 2} style={{ position: "relative" }}>
              {tier.popular && (
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  left: "0",
                  right: "0",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 10,
                }}>
                  <span style={{
                    backgroundColor: "#1A1814",
                    color: "#F5F4F0",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "6px 16px",
                  }}>
                    Most Popular
                  </span>
                </div>
              )}
              
              <div style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: tier.popular ? "#E5E2DB" : "#F5F4F0",
                border: "1px solid rgba(26,24,20,0.12)",
                padding: "48px 32px 32px",
                transition: "transform 0.4s",
              }}>
                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "24px",
                    fontWeight: 300,
                    color: "#1A1814",
                    marginBottom: "16px",
                  }}>
                    {tier.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "42px",
                      fontWeight: 300,
                      color: "#1A1814",
                    }}>
                      £{billing === "monthly" ? tier.monthly : Math.round(tier.annual / 12)}
                    </span>
                    <span style={{
                      fontFamily: "'Jost', system-ui, sans-serif",
                      fontSize: "12px",
                      color: "#8A7F78",
                    }}>
                      /month
                    </span>
                  </div>
                  {billing === "annual" && (
                    <p style={{
                      fontFamily: "'Jost', system-ui, sans-serif",
                      fontSize: "11px",
                      color: "#8A7F78",
                      marginTop: "4px",
                    }}>
                      £{tier.annual} billed annually
                    </p>
                  )}
                </div>

                <div style={{ height: "1px", backgroundColor: "rgba(26,24,20,0.08)", marginBottom: "32px" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {tier.perks.map((perk) => (
                    <li key={perk} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontFamily: "'Jost', system-ui, sans-serif",
                      fontSize: "13px",
                      color: "#4A4440",
                      lineHeight: 1.5,
                    }}>
                      <Check style={{ width: "16px", height: "16px", color: "#A08060", flexShrink: 0, marginTop: "2px" }} />
                      {perk}
                    </li>
                  ))}
                </ul>

                <button style={{
                  width: "100%",
                  marginTop: "40px",
                  padding: "16px",
                  backgroundColor: tier.popular ? "#1A1814" : "transparent",
                  color: tier.popular ? "#F5F4F0" : "#1A1814",
                  border: tier.popular ? "none" : "1px solid rgba(26,24,20,0.2)",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background 0.3s, color 0.3s",
                }}>
                  SELECT {tier.name}
                  <ArrowRight style={{ width: "14px", height: "14px" }} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p style={{
          textAlign: "center",
          marginTop: "60px",
          fontFamily: "'Jost', system-ui, sans-serif",
          fontSize: "11px",
          color: "#8A7F78",
          letterSpacing: "0.05em",
        }}>
          Cancel anytime · No contracts · VAT included · Secure via DodoPay
        </p>

      </div>
    </div>
  );
}
