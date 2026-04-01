"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/lib/motion/variants';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-ivory pt-36 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeUpVariant} 
          className="text-center mb-24 flex flex-col items-center"
        >
          <span className="font-label tracking-[0.3em] text-[10px] uppercase text-accent-gold mb-6">Legal & Compliance</span>
          <h1 className="font-headline text-5xl md:text-6xl font-light text-obsidian leading-tight">Privacy Policy</h1>
          <p className="mt-6 font-body text-sm text-obsidian/50 tracking-wide uppercase">Effective: {new Date().toLocaleDateString()}</p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="space-y-16 font-body text-obsidian/80 leading-loose font-light text-base md:text-lg"
        >
          <section>
            <h2 className="text-3xl font-headline font-light text-obsidian mb-6">1. Information We Collect</h2>
            <p className="mb-6">
              At Hair Classic, we believe in providing a bespoke experience. To achieve this, we collect information you provide directly to us when you:
            </p>
            <ul className="pl-6 space-y-3 relative ml-4 font-body text-sm md:text-base border-l border-accent-gold/30">
              <li className="pl-4">Book an appointment or private consultation.</li>
              <li className="pl-4">Create or update your Hair Passport profile.</li>
              <li className="pl-4">Communicate with us via email, phone, or in person.</li>
              <li className="pl-4">Purchase curated products or memberships.</li>
            </ul>
            <p className="mt-6">
              This information typically includes your name, email address, phone number, payment details, and specific parameters regarding your hair history, health, and styling preferences.
            </p>
          </section>

          <div className="h-[0.5px] bg-obsidian/10 w-full" />
          
          <section>
            <h2 className="text-3xl font-headline font-light text-obsidian mb-6">2. Utilization</h2>
            <p className="mb-6">
              We exclusively utilize the data we collect to seamlessly deliver the calm, luxury experience you expect from our atelier:
            </p>
            <ul className="pl-6 space-y-3 relative ml-4 font-body text-sm md:text-base border-l border-accent-gold/30">
              <li className="pl-4">Processing bookings, payments, and VIP concierge requests.</li>
              <li className="pl-4">Personalizing technical formulations and stylistic approaches.</li>
              <li className="pl-4">Securing your reservations and communicating salon policies.</li>
            </ul>
          </section>

          <div className="h-[0.5px] bg-obsidian/10 w-full" />
          
          <section>
            <h2 className="text-3xl font-headline font-light text-obsidian mb-6">3. Security Architecture</h2>
            <p className="mb-6">
              Your privacy is our utmost priority. We definitively do not sell or rent your personal information. We explicitly share data solely with trusted digital infrastructure partners (such as payment gateways) to fundamentally operate our atelier safely. We deploy strict procedural safeguards to protect your personal identity.
            </p>
          </section>

          <div className="h-[0.5px] bg-obsidian/10 w-full" />
          
          <section>
            <h2 className="text-3xl font-headline font-light text-obsidian mb-8">Contact Us</h2>
            <div className="bg-sand/30 border border-obsidian/10 p-10 flex flex-col gap-4 text-sm">
              <p><strong className="font-headline font-light text-xl tracking-wide text-obsidian block mb-1">Direct Line</strong> hello@hairclassic.co.in</p>
              <p><strong className="font-headline font-light text-xl tracking-wide text-obsidian block mb-1">Headquarters</strong> Road Checkpost, Sarbapally, Siliguri</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
