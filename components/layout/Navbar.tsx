"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Stylists", href: "/stylists" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/client/booking" }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || isOpen ? "bg-white/90 backdrop-blur-xl border-b border-black/5" : "bg-transparent"}`}>
        <div className="flex justify-between items-center px-6 md:px-12 py-5 w-full max-w-screen-2xl mx-auto">
          <Link href="/" className="font-headline text-3xl font-light tracking-tighter text-obsidian relative z-[60]" onClick={() => setIsOpen(false)}>
            HC
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.name} className="font-label uppercase text-[0.75rem] tracking-[0.15rem] text-obsidian/70 hover:text-obsidian transition-colors duration-400" href={link.href}>
                {link.name}
              </Link>
            ))}
            <Link href="/client/booking" className="font-label uppercase text-[0.7rem] tracking-[0.2rem] border-[0.5px] border-obsidian px-8 py-2.5 hover:bg-obsidian hover:text-white transition-all duration-500">
              BOOK
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-[60] p-2 -mr-2 text-obsidian"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] bg-ivory flex flex-col justify-center px-8"
          >
            <div className="flex flex-col space-y-10 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-headline text-5xl font-light text-obsidian"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
