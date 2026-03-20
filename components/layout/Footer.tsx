"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer style={{
      backgroundColor: "#1A1814",
      fontFamily: "'Jost', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Gold top accent line */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #A08060 30%, #A08060 70%, transparent)" }} />

      {/* Subtle radial glow */}
      <div style={{
        position: "absolute",
        top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "400px",
        background: "radial-gradient(ellipse at top, rgba(160,128,96,0.06) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Main footer grid */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "88px 48px 64px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "64px",
        alignItems: "start",
        position: "relative",
      }}>

        {/* Brand */}
        <div>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "32px",
            fontWeight: 300,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F5F4F0",
            marginBottom: "24px",
          }}>
            HC
          </p>
          <p style={{
            fontSize: "13px",
            color: "#8A7F78",
            lineHeight: 1.85,
            maxWidth: "260px",
            marginBottom: "36px",
          }}>
            London's most refined salon experience — precision, artistry, and care. Est. 2018.
          </p>
          {/* Social */}
          <Link href="/" style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#A08060",
            textDecoration: "none",
            borderBottom: "1px solid rgba(160,128,96,0.30)",
            paddingBottom: "2px",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#A08060")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(160,128,96,0.30)")}
          >
            INSTAGRAM
          </Link>
        </div>

        {/* Salon links */}
        <div>
          <p style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#A08060",
            marginBottom: "28px",
          }}>
            Salon
          </p>
          {[
            { label: "Book an Appointment", href: "/booking" },
            { label: "Our Stylists", href: "/stylists" },
            { label: "Services", href: "/booking" },
            { label: "AI Consultation", href: "/booking" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={{
              display: "block",
              fontSize: "13px",
              color: "#8A7F78",
              textDecoration: "none",
              marginBottom: "14px",
              transition: "color 0.3s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#F5F4F0")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8A7F78")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Members */}
        <div>
          <p style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#A08060",
            marginBottom: "28px",
          }}>
            Members
          </p>
          {[
            { label: "Hair Passport", href: "/client/hair-passport" },
            { label: "Membership", href: "/" },
            { label: "Gift Cards", href: "/" },
            { label: "My Account", href: "/client/dashboard" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={{
              display: "block",
              fontSize: "13px",
              color: "#8A7F78",
              textDecoration: "none",
              marginBottom: "14px",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#F5F4F0")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8A7F78")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#A08060",
            marginBottom: "28px",
          }}>
            Visit
          </p>
          <p style={{ fontSize: "13px", color: "#8A7F78", lineHeight: 1.9, marginBottom: "20px" }}>
            14 Clifford Street<br />
            Mayfair<br />
            London W1S 4JU
          </p>
          <p style={{ fontSize: "13px", color: "#8A7F78", lineHeight: 1.9 }}>
            Monday–Saturday<br />
            9:00 AM – 6:00 PM
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "24px 48px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
      }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.16em", color: "rgba(138,127,120,0.6)", textTransform: "uppercase" }}>
          © 2026 Hair Classic. All Rights Reserved.
        </p>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Privacy Policy", "Terms of Service", "Cancellation Policy"].map(item => (
            <Link key={item} href="/" style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(138,127,120,0.6)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#8A7F78")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(138,127,120,0.6)")}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; padding: 60px 24px 48px !important; }
          .footer-bottom { padding: 20px 24px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
