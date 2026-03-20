
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl transition-all duration-400">
<div className="flex justify-between items-center px-8 py-6 w-full max-w-screen-2xl mx-auto">
<a className="font-headline text-3xl font-light tracking-tighter text-stone-900" href="/">HC</a>
<div className="hidden md:flex items-center space-x-12">
<a className="font-label uppercase text-[0.75rem] tracking-[0.15rem] text-stone-900 font-medium hover:text-accent-gold transition-colors duration-400" href="/">Services</a>
<a className="font-label uppercase text-[0.75rem] tracking-[0.15rem] text-stone-400 font-normal hover:text-accent-gold transition-colors duration-400" href="/">Stylists</a>
<a className="font-label uppercase text-[0.75rem] tracking-[0.15rem] text-stone-400 font-normal hover:text-accent-gold transition-colors duration-400" href="/">Hair Passport</a>
<a className="font-label uppercase text-[0.75rem] tracking-[0.15rem] text-stone-400 font-normal hover:text-accent-gold transition-colors duration-400" href="/">About</a>
</div>
<button className="font-label uppercase text-[0.75rem] tracking-[0.2rem] border-[0.5px] border-stone-900 px-8 py-2 hover:bg-stone-900 hover:text-white transition-all duration-400">
                BOOK
            </button>
</div>
</nav>
  );
}
