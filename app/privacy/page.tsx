import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-gold tracking-widest text-sm uppercase mb-3">Legal & Compliance</p>
        <h1 className="text-5xl md:text-6xl font-newsreader italic text-on-surface">Privacy Policy</h1>
        <p className="mt-4 text-on-surface/60">Effective Date: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="space-y-12 text-on-surface/80 leading-relaxed font-light text-lg">
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            At Hair Classic, we believe in providing a bespoke experience. To achieve this, we collect information you provide directly to us when you:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-gold relative ml-4">
            <li>Book an appointment or consultation.</li>
            <li>Create or update your Hair Passport profile.</li>
            <li>Communicate with us via email, phone, or in person.</li>
            <li>Purchase products or memberships.</li>
          </ul>
          <p className="mt-4">
            This information typically includes your name, email address, phone number, payment information, and specific details about your hair history, health, and styling preferences.
          </p>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect primarily to deliver the quiet luxury experience you expect from us:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-gold relative ml-4">
            <li>To process your bookings, payments, and concierge requests.</li>
            <li>To personalize your salon experience using your Hair Passport details.</li>
            <li>To send you important notices regarding your appointments and our policies.</li>
            <li>To improve our services, treatments, and local offerings in Siliguri.</li>
          </ul>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">3. Data Sharing and Security</h2>
          <p className="mb-4">
            Your privacy is our utmost priority. We do not sell or rent your personal information to third parties. We may share your data only with trusted service providers (such as payment processors and digital infrastructure partners) strictly to facilitate our operations.
          </p>
          <p>
            We deploy strict physical, electronic, and procedural safeguards to protect your personal and payment information from unauthorized access or alteration.
          </p>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">4. Digital Fingerprints (Cookies)</h2>
          <p className="mb-4">
            Our website utilizes cookies to ensure its smooth operation and to provide us with analytical insights on how users interact with our platform. You have the right to accept or decline cookies through your browser settings or our explicit cookie banner.
          </p>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">5. GDPR and Data Rights</h2>
          <p className="mb-4">
            Depending on your jurisdiction, you may hold the right to request access to the personal data we hold about you, request corrections, or request deletion of your information. To exercise these rights, please reach out to us directly.
          </p>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about how we handle your privacy, please feel free to reach out to our management.
          </p>
          <div className="bg-surface-light border border-on-surface/10 p-6 rounded-lg">
            <p><strong>Email:</strong> legal@hairclassic.in</p>
            <p><strong>Address:</strong> Hair Classic Salon, Salugara, Siliguri</p>
          </div>
        </section>
      </div>
    </div>
  );
}
