
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface-container text-stone-900 border-t-[0.5px] border-accent-gold/20">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-12 py-20 w-full max-w-screen-2xl mx-auto">
{/*  Brand  */}
<div>
<a className="font-headline text-3xl tracking-tighter text-stone-900 mb-6 block" href="/">HC</a>
<p className="font-body text-sm text-stone-600 tracking-wide leading-relaxed max-w-xs">
                    Bespoke hair artistry, London.<br/>
                    A sanctuary for modern craft.
                </p>
</div>
{/*  Navigation  */}
<div className="flex flex-col space-y-4">
<span className="font-label uppercase text-[0.7rem] tracking-[0.2rem] text-accent-gold mb-4">Explore</span>
<a className="font-body text-sm text-stone-600 hover:text-accent-gold transition-colors duration-300" href="/">Services</a>
<a className="font-body text-sm text-stone-600 hover:text-accent-gold transition-colors duration-300" href="/">Stylists</a>
<a className="font-body text-sm text-stone-600 hover:text-accent-gold transition-colors duration-300" href="/">Hair Passport</a>
<a className="font-body text-sm text-stone-600 hover:text-accent-gold transition-colors duration-300" href="/">About</a>
<a className="font-body text-sm text-stone-600 hover:text-accent-gold transition-colors duration-300" href="/">Privacy</a>
</div>
{/*  Contact/Location  */}
<div className="flex flex-col space-y-4">
<span className="font-label uppercase text-[0.7rem] tracking-[0.2rem] text-accent-gold mb-4">Atelier</span>
<p className="font-body text-sm text-stone-600 tracking-wide">
                    24 Savile Row<br/>
                    Mayfair, London W1S 3PR
                </p>
<p className="font-body text-sm text-stone-600 tracking-wide pt-4">
                    T: +44 20 7946 0123<br/>
                    E: hello@hairclassic.co.uk
                </p>
</div>
</div>
<div className="px-12 py-10 border-t-[0.5px] border-accent-gold/10">
<div className="flex flex-col md:flex-row justify-between items-center gap-6">
<p className="font-body text-[0.75rem] text-stone-500 tracking-wide">
                    © 2024 Hair Classic. Bespoke hair artistry, London.
                </p>
<div className="flex space-x-8">
<a className="text-stone-500 hover:text-accent-gold transition-colors duration-300" href="/"><span className="font-label uppercase text-[0.65rem] tracking-[0.1rem]">Instagram</span></a>
<a className="text-stone-500 hover:text-accent-gold transition-colors duration-300" href="/"><span className="font-label uppercase text-[0.65rem] tracking-[0.1rem]">Vogue Connect</span></a>
</div>
</div>
</div>
</footer>
  );
}
