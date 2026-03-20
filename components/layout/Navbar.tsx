"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/booking",   label: "Book" },
  { href: "/stylists",  label: "Stylists" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser]         = useState<unknown>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect if we're on the home page (transparent hero nav)
  const isHome = pathname === "/";

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Scroll-aware background
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Nav is transparent on home hero, solid+blurred after scroll or on other pages
  const navBg = isHome && !scrolled
    ? "rgba(26,24,20,0.0)"
    : "rgba(236,234,228,0.94)";
  const navBorder = isHome && !scrolled
    ? "1px solid rgba(255,255,255,0.0)"
    : "1px solid rgba(26,24,20,0.07)";
  const textColor = isHome && !scrolled ? "rgba(255,255,255,0.88)" : "#1A1814";
  const textColorMuted = isHome && !scrolled ? "rgba(255,255,255,0.58)" : "#4A4440";

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
          height: "68px",
          backgroundColor: navBg,
          backdropFilter: scrolled || !isHome ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || !isHome ? "blur(20px)" : "none",
          borderBottom: navBorder,
          fontFamily: "'Jost', system-ui, sans-serif",
          transition: "background-color 0.5s ease, border-color 0.5s ease",
        }}
      >
        {/* LEFT — MENU + desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px", flex: 1 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: textColor,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "4px",
              transition: "color 0.4s ease",
            }}
          >
            {/* Text on desktop */}
            <span className="nav-desktop" style={{ fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase" }}>
              MENU
            </span>
            {/* Hamburger on mobile */}
            <span className="nav-mobile-only" style={{ flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", width: "22px", height: "1px", background: textColor, transition: "background 0.4s" }} />
              <span style={{ display: "block", width: "15px", height: "1px", background: textColor, transition: "background 0.4s" }} />
              <span style={{ display: "block", width: "22px", height: "1px", background: textColor, transition: "background 0.4s" }} />
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="nav-desktop" style={{ gap: "28px" }}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: textColorMuted,
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = textColor)}
              onMouseLeave={e => (e.currentTarget.style.color = textColorMuted)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER — Wordmark */}
        <Link href="/" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "17px",
          fontWeight: 400,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: textColor,
          textDecoration: "none",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          transition: "color 0.4s ease",
        }}>
          Hair Classic
        </Link>

        {/* RIGHT — Sign In / Account / Book */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1, justifyContent: "flex-end" }}>
          {user ? (
            <Link href="/dashboard" style={{
              fontSize: "10px", fontWeight: 500, letterSpacing: "0.20em",
              textTransform: "uppercase", color: textColorMuted, textDecoration: "none",
              transition: "color 0.3s",
            }}>
              ACCOUNT
            </Link>
          ) : (
            <>
              <Link href="/login" className="nav-desktop" style={{
                fontSize: "10px", fontWeight: 400, letterSpacing: "0.20em",
                textTransform: "uppercase", color: textColorMuted, textDecoration: "none",
                transition: "color 0.3s",
              }}>
                SIGN IN
              </Link>
              <Link href="/booking" style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: isHome && !scrolled ? "rgba(255,255,255,0.90)" : "#1A1814",
                textDecoration: "none",
                padding: "9px 20px",
                border: isHome && !scrolled ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(26,24,20,0.22)",
                background: isHome && !scrolled ? "rgba(255,255,255,0.08)" : "transparent",
                backdropFilter: isHome && !scrolled ? "blur(12px)" : "none",
                transition: "all 0.4s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#1A1814";
                (e.currentTarget as HTMLElement).style.color = "#ECEAE4";
                (e.currentTarget as HTMLElement).style.borderColor = "#1A1814";
              }}
              onMouseLeave={e => {
                if (isHome && !scrolled) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.90)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                } else {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#1A1814";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,24,20,0.22)";
                }
              }}
              >
                BOOK
              </Link>
            </>
          )}
        </div>
      </header>

      {/* ── Slide-over menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(26,24,20,0.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.45, ease: [0.4, 0, 0.1, 1] }}
              style={{
                position: "fixed", top: 0, left: 0, bottom: 0,
                width: "min(380px, 88vw)", zIndex: 300,
                background: "#ECEAE4",
                padding: "72px 48px",
                display: "flex", flexDirection: "column", gap: "0",
                overflowY: "auto",
              }}
            >
              {/* HC monogram at top */}
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "22px",
                fontWeight: 300,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "#1A1814",
                marginBottom: "52px",
              }}>
                HC
              </p>

              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute", top: "28px", right: "28px",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "10px", letterSpacing: "0.26em",
                  textTransform: "uppercase", color: "#8A7F78",
                  fontFamily: "'Jost', system-ui, sans-serif",
                }}
              >
                CLOSE
              </button>

              <div style={{ marginBottom: "52px" }}>
                <p style={{
                  fontSize: "10px", letterSpacing: "0.30em",
                  textTransform: "uppercase", color: "#A08060",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  marginBottom: "32px",
                }}>
                  Navigation
                </p>
                {[
                  { href: "/", label: "Home" },
                  { href: "/booking", label: "Book" },
                  { href: "/stylists", label: "Stylists" },
                  { href: "/client/hair-passport", label: "Hair Passport" },
                ].map(({ href, label }, i) => (
                  <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                    display: "block",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(20px, 5vw, 28px)",
                    fontWeight: 300,
                    letterSpacing: "-0.01em",
                    color: "#1A1814",
                    textDecoration: "none",
                    paddingBottom: "18px",
                    marginBottom: "0",
                    borderBottom: "1px solid rgba(26,24,20,0.07)",
                    paddingTop: i === 0 ? "0" : "18px",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#A08060")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#1A1814")}
                  >
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

      {/* Spacer — only on non-home pages since home has hero that fills viewport */}
      {!isHome && <div style={{ height: "68px" }} />}
    </>
  );
}
