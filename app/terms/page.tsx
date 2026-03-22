import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-gold tracking-widest text-sm uppercase mb-3">Legal & Compliance</p>
        <h1 className="text-5xl md:text-6xl font-newsreader italic text-on-surface">Terms of Service</h1>
        <p className="mt-4 text-on-surface/60">Effective Date: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="space-y-12 text-on-surface/80 leading-relaxed font-light text-lg">
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing Hair Classic's website, booking our salon services, or purchasing products, you agree to be bound by these Terms of Service. If you do not agree entirely, please refrain from using our platform.
          </p>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">2. Reservations and Cancellations</h2>
          <p className="mb-4">
            We value your time and the time of our bespoke artisans. When you book an appointment:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-gold relative ml-4">
            <li>A deposit may be required to secure your appointment.</li>
            <li>Cancellations must be made at least <strong>24 hours</strong> prior to your scheduled time.</li>
            <li>Failure to provide sufficient notice or "no-shows" will result in a forfeiture of the deposit and/or a cancellation fee.</li>
          </ul>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">3. Artisan Colour and Hair Extensions</h2>
          <p className="mb-4">
            Advanced chemical processing, bleaching, or extension installations inherently carry slight risks depending on your hair's history. By booking these services:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-gold relative ml-4">
            <li>You agree to provide complete and accurate information regarding past chemical treatments.</li>
            <li>Our stylists reserve the right to respectfully refuse or modify a service if it compromises the structural integrity of your hair.</li>
            <li>Consultations are mandatory before major transformative color works.</li>
          </ul>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            All text, graphics, user interfaces, photographs, trademarks, and artwork collectively found on the Hair Classic platform (the "Content") is owned or licensed by Hair Classic and is protected by copyright and intellectual property laws.
          </p>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">5. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Hair Classic, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service or any salon treatments, beyond the cost of the service provided.
          </p>
        </section>

        <div className="h-px bg-on-surface/10 w-full" />
        
        <section>
          <h2 className="text-3xl font-newsreader italic text-on-surface mb-4">Contact</h2>
          <p className="mb-4">
            If you need further clarification on our Terms of Service, please contact our administrative team:
          </p>
          <div className="bg-surface-light border border-on-surface/10 p-6 rounded-lg">
            <p><strong>Email:</strong> legal@hairclassic.in</p>
            <p><strong>Phone:</strong> +91 90000 00000</p>
          </div>
        </section>
      </div>
    </div>
  );
}
