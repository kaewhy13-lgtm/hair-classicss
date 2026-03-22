"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("hair_classic_cookie_consent");
    if (!hasConsented) {
      // Delay slightly for effect
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hair_classic_cookie_consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 px-2 sm:px-5 z-50 text-sm"
        >
          <div className="mx-auto max-w-7xl relative mx-auto rounded-xl bg-surface-light border border-gold-light/20 p-4 shadow-2xl backdrop-blur-md overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-light via-gold to-gold-light opacity-50"></div>
             
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-on-surface/80">
                  <p>
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept", you consent to our use of cookies as described in our <a href="/privacy" className="underline text-gold hover:text-gold-light transition-colors">Privacy Policy</a>.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="p-2 text-on-surface/60 hover:text-on-surface transition-colors"
                    aria-label="Dismiss cookie notice"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleAccept}
                    className="bg-primary text-on-primary px-6 py-2.5 rounded-none font-medium text-sm tracking-wide shadow-md hover:bg-on-surface transition-colors uppercase"
                  >
                    Accept All
                  </button>
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
