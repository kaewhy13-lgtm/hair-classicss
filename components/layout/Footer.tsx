"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer style={{
      backgroundColor: "#E5E2DB",
      borderTop: "1px solid rgba(26,24,20,0.08)",
      fontFamily: "'Jost', system-ui, sans-serif",
    }}>
      {/* Main footer grid */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "80px 40px 60px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "48px",
        alignItems: "start",
      }}>

        {/* Brand */}
        <div>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "28px",
            fontWeight: 300,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#1A1814",
            marginBottom: "20px",
          }}>
            Hair Classic
          </p>
          <p style={{
            fontSize: "13px",
            color: "#8A7F78",
            lineHeight: 1.7,
            maxWidth: "260px",
          }}>
            London&apos;s most refined salon experience — precision, artistry, and care. Est. 2018.
          </p>
        </div>

        {/* Services links */}
        <div>
          <p style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#8A7F78",
            marginBottom: "24px",
          }}>
            Salon
          </p>
          {["Book an Appointment", "Our Stylists", "Services", "Membership", "AI Consultation"].map(link => (
            <Link key={link} href="/" style={{
              display: "block",
              fontSize: "13px",
              color: "#4A4440",
              textDecoration: "none",
              marginBottom: "12px",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#A08060")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4A4440")}
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Support links */}
        <div>
          <p style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#8A7F78",
            marginBottom: "24px",
          }}>
            Assistance
          </p>
          {["Contact Us", "FAQs", "Hair Passport", "Gift Cards", "Cancellation Policy"].map(link => (
            <Link key={link} href="/" style={{
              display: "block",
              fontSize: "13px",
              color: "#4A4440",
              textDecoration: "none",
              marginBottom: "12px",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#A08060")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4A4440")}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px 40px",
        borderTop: "1px solid rgba(26,24,20,0.08)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
      }}>

        <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#8A7F78", textTransform: "uppercase" }}>
          © 2026 Hair Classic. All Rights Reserved.
        </p>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Instagram", "Privacy Policy", "Terms of Service"].map(item => (
            <Link key={item} href="/" style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8A7F78",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#1A1814")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8A7F78")}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
