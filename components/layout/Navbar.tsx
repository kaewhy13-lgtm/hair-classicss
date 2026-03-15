"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/booking",      label: "Book" },
  { href: "/stylists",     label: "Stylists" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user,     setUser]     = useState<unknown>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {/* ── Main bar ── */}
      <header
        className="nav-header-pad"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          backgroundColor: "rgba(236,234,228,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(26,24,20,0.08)",
          fontFamily: "'Jost', system-ui, sans-serif",
        }}
      >
        {/* LEFT — MENU button (always visible, toggles side panel) */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px", flex: 1 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#1A1814",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "4px",
            }}
          >
            {/* Hamburger icon on mobile, text on desktop */}
            <span className="nav-desktop" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              MENU
            </span>
            <span className="nav-mobile-only" style={{ flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", width: "22px", height: "1.5px", background: "#1A1814" }} />
              <span style={{ display: "block", width: "16px", height: "1.5px", background: "#1A1814" }} />
              <span style={{ display: "block", width: "22px", height: "1.5px", background: "#1A1814" }} />
            </span>
          </button>

          {/* Desktop nav links — hidden on mobile */}
          <nav className="nav-desktop" style={{ gap: "28px" }}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4A4440",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1A1814")}
              onMouseLeave={e => (e.currentTarget.style.color = "#4A4440")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER — Wordmark */}
        <Link href="/" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "18px",
          fontWeight: 400,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#1A1814",
          textDecoration: "none",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}>
          Hair Classic
        </Link>

        {/* RIGHT — Sign In / Book (desktop only shows BOOK) */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1, justifyContent: "flex-end" }}>
          {user ? (
            <Link href="/dashboard" style={{
              fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#4A4440", textDecoration: "none",
            }}>
              ACCOUNT
            </Link>
          ) : (
            <>
              {/* Sign In — hidden on small mobile to save space */}
              <Link href="/login" className="nav-desktop" style={{
                fontSize: "10px", fontWeight: 400, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#4A4440", textDecoration: "none",
              }}>
                SIGN IN
              </Link>
              <Link href="/booking" style={{
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#1A1814", textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid rgba(26,24,20,0.25)",
                transition: "all 0.3s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#1A1814";
                (e.currentTarget as HTMLElement).style.color = "#ECEAE4";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#1A1814";
              }}
              >
                BOOK
              </Link>
            </>
          )}
        </div>
      </header>

      {/* ── Slide-over menu (works on all screen sizes) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(26,24,20,0.3)", backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.4, 0, 0.1, 1] }}
              style={{
                position: "fixed", top: 0, left: 0, bottom: 0,
                width: "min(360px, 85vw)", zIndex: 300,
                background: "#ECEAE4",
                padding: "64px 40px",
                display: "flex", flexDirection: "column", gap: "0",
                overflowY: "auto",
              }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute", top: "24px", right: "24px",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "10px", letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "#8A7F78",
                  fontFamily: "'Jost', system-ui, sans-serif",
                }}
              >
                CLOSE
              </button>

              <div style={{ marginBottom: "48px" }}>
                <p style={{
                  fontSize: "10px", letterSpacing: "0.28em",
                  textTransform: "uppercase", color: "#8A7F78",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  marginBottom: "28px",
                }}>
                  Navigation
                </p>
                {navLinks.map(({ href, label }, i) => (
                  <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                    display: "block",
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "clamp(18px, 5vw, 24px)",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#1A1814",
                    textDecoration: "none",
                    paddingBottom: "16px",
                    marginBottom: i < navLinks.length - 1 ? "0" : "0",
                    borderBottom: "1px solid rgba(26,24,20,0.08)",
                    paddingTop: "16px",
                    transition: "color 0.3s",
                  }}>
                    {label}
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: "auto", paddingBottom: "24px" }}>
                {user ? (
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="link-underline">
                    MY ACCOUNT
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="link-underline">
                    SIGN IN
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div style={{ height: "64px" }} />
    </>
  );
}
