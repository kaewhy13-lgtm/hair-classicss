import { HeroImmersive } from "@/components/sections/hero-immersive";
import { BentoGrid } from "@/components/sections/bento-grid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <HeroImmersive />
      
      <div className="py-24 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-light text-4xl md:text-5xl text-obsidian tracking-tight leading-snug">
          "A sanctuary of quiet luxury, where every strand is treated with an architect’s precision and an artist’s touch."
        </h2>
        <span className="block mt-12 font-label uppercase text-xs tracking-[0.3em] text-accent-gold">
          The Hair Classic Promise
        </span>
      </div>

      <BentoGrid />
      
      {/* Footer pre-cap / CTA area */}
      <section className="bg-obsidian py-32 text-center text-ivory flex flex-col items-center">
        <span className="font-label uppercase text-[0.6rem] tracking-[0.4em] text-accent-gold mb-8">Begin Your Journey</span>
        <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight mb-12 max-w-2xl px-6 leading-tight">
          Reserve Your Chair.
        </h2>
        <a href="/client/booking" className="inline-flex items-center justify-center font-label uppercase text-xs tracking-[0.25em] text-obsidian bg-ivory hover:bg-accent-gold hover:text-white transition-all duration-500 px-12 py-5 rounded-full">
          Book Appointment
        </a>
      </section>
    </div>
  );
}
