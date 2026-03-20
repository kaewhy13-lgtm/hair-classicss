
import Link from 'next/link';

export default function BookingStepOne() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      
{/*  Header / Top Navigation Shell  */}

<main className="pt-32 pb-48 px-6 max-w-5xl mx-auto min-h-screen flex flex-col items-center">
{/*  Header Content  */}
<header className="text-center mb-16 max-w-2xl">
<h1 className="font-headline text-5xl md:text-6xl font-light tracking-tight mb-6">Reserve Your Appointment</h1>
<p className="font-label text-on-surface-variant tracking-wide leading-relaxed">Experience bespoke hair artistry tailored to your individual style.</p>
</header>
{/*  Step Indicator  */}
<div className="w-full max-w-3xl mb-24 flex items-center justify-between">
<div className="flex flex-col items-center gap-3">
<div className="w-3 h-3 bg-primary"></div>
<span className="font-label text-[10px] uppercase tracking-[0.2em] font-medium">STYLIST</span>
</div>
<div className="step-line"></div>
<div className="flex flex-col items-center gap-3 opacity-30">
<div className="w-3 h-3 border border-primary"></div>
<span className="font-label text-[10px] uppercase tracking-[0.2em]">SERVICE</span>
</div>
<div className="step-line"></div>
<div className="flex flex-col items-center gap-3 opacity-30">
<div className="w-3 h-3 border border-primary"></div>
<span className="font-label text-[10px] uppercase tracking-[0.2em]">DATE &amp; TIME</span>
</div>
<div className="step-line"></div>
<div className="flex flex-col items-center gap-3 opacity-30">
<div className="w-3 h-3 border border-primary"></div>
<span className="font-label text-[10px] uppercase tracking-[0.2em]">PAYMENT</span>
</div>
</div>
{/*  Main Content Card  */}
<section className="w-full bg-[#f6f3ed] border border-outline-variant p-12 md:p-16 mb-12">
<h2 className="font-headline text-3xl font-light mb-12">Choose Your Stylist</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
{/*  Stylist 1: Isabella  */}
<div className="group relative cursor-pointer border border-outline-variant p-8 bg-surface-container-lowest transition-all hover:border-secondary">
{/*  Selection Indicator (Gold corner checkmark placeholder)  */}
<div className="absolute top-0 right-0 p-4 opacity-0 group-[.selected]:opacity-100">
<span className="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<div className="flex flex-col items-start gap-6">
<div className="w-16 h-16 bg-primary text-on-primary flex items-center justify-center text-2xl font-headline font-light">I</div>
<div>
<h3 className="font-headline text-xl mb-1">Isabella Romano</h3>
<p className="font-label text-[11px] uppercase tracking-[0.15em] text-secondary mb-4">Senior Colourist</p>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">Expert in balayage and corrective color with over 12 years of experience in Milan and Paris.</p>
<div className="flex flex-wrap gap-2">
<span className="font-label text-[9px] uppercase tracking-widest border border-outline-variant/30 px-3 py-1">BALAYAGE</span>
<span className="font-label text-[9px] uppercase tracking-widest border border-outline-variant/30 px-3 py-1">COLOUR GLOSS</span>
</div>
</div>
</div>
</div>
{/*  Stylist 2: Marcus  */}
<div className="group relative cursor-pointer border border-primary p-8 bg-surface-container-lowest ring-1 ring-primary">
{/*  Active State Mockup  */}
<div className="absolute top-0 right-0 p-4">
<span className="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<div className="flex flex-col items-start gap-6">
<div className="w-16 h-16 bg-primary text-on-primary flex items-center justify-center text-2xl font-headline font-light">M</div>
<div>
<h3 className="font-headline text-xl mb-1">Marcus Chen</h3>
<p className="font-label text-[11px] uppercase tracking-[0.15em] text-secondary mb-4">Precision Cut Specialist</p>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">Renowned for architectural cuts and modern textures. Master of the minimalist aesthetic.</p>
<div className="flex flex-wrap gap-2">
<span className="font-label text-[9px] uppercase tracking-widest border border-outline-variant/30 px-3 py-1">SCULPTING</span>
<span className="font-label text-[9px] uppercase tracking-widest border border-outline-variant/30 px-3 py-1">TEXTURIZING</span>
</div>
</div>
</div>
</div>
</div>
</section>
</main>
{/*  Bottom Action Bar  */}

{/*  Global Footer  */}
<div className="w-full py-24 px-8 bg-[#fbf9f3] mt-auto">
<div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto gap-8">
<div className="text-lg font-light tracking-widest text-black font-headline">Hair Classic</div>
<div className="flex gap-8">
<a className="font-label text-[10px] uppercase tracking-[0.2em] text-[#8A7F78] hover:text-[#75593c] transition-colors" href="/">Privacy Policy</a>
<a className="font-label text-[10px] uppercase tracking-[0.2em] text-[#8A7F78] hover:text-[#75593c] transition-colors" href="/">Terms of Service</a>
<a className="font-label text-[10px] uppercase tracking-[0.2em] text-[#8A7F78] hover:text-[#75593c] transition-colors" href="/">Accessibility</a>
</div>
<div className="font-label text-[10px] uppercase tracking-[0.2em] text-[#75593c]">© 2024 Hair Classic. All Rights Reserved.</div>
</div>
</div>

    </div>
  );
}
