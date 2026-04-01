import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-ivory text-obsidian border-t overflow-hidden border-obsidian/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-12 py-20 w-full max-w-screen-2xl mx-auto">
        {/*  Brand  */}
        <div>
          <a className="font-headline text-3xl tracking-tighter text-obsidian mb-6 block" href="/">HC</a>
          <p className="font-body text-sm text-obsidian/70 tracking-wide leading-relaxed max-w-xs">
            Bespoke hair artistry, Siliguri.<br/>
            A sanctuary for modern craft.
          </p>
        </div>
        
        {/*  Navigation  */}
        <div className="flex flex-col space-y-4">
          <span className="font-label uppercase text-[0.7rem] tracking-[0.2rem] text-accent-gold mb-4">Explore</span>
          <Link className="font-body text-sm text-obsidian/80 hover:text-obsidian transition-colors duration-300" href="/services">Services</Link>
          <Link className="font-body text-sm text-obsidian/80 hover:text-obsidian transition-colors duration-300" href="/stylists">Stylists</Link>
          <Link className="font-body text-sm text-obsidian/80 hover:text-obsidian transition-colors duration-300" href="/about">About</Link>
          <Link className="font-body text-sm text-obsidian/80 hover:text-obsidian transition-colors duration-300" href="/privacy">Privacy</Link>
        </div>
        
        {/*  Contact/Location  */}
        <div className="flex flex-col space-y-4">
          <span className="font-label uppercase text-[0.7rem] tracking-[0.2rem] text-accent-gold mb-4">Atelier</span>
          <p className="font-body text-sm text-obsidian/80 tracking-wide">
            Road Checkpost, Sarbapally<br/>
            Eastern Bypass, Siliguri, WB 734008
          </p>
          <p className="font-body text-sm text-obsidian/80 tracking-wide pt-4">
            T: 06295 493 606<br/>
            E: hello@hairclassic.co.in
          </p>
        </div>
      </div>
      
      <div className="px-6 md:px-12 py-10 border-t border-obsidian/10 max-w-screen-2xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-[0.75rem] text-obsidian/50 tracking-wide">
            © 2024 Hair Classic. Bespoke hair artistry, Siliguri.
          </p>
          <div className="flex space-x-8">
            <a className="text-obsidian/50 hover:text-obsidian transition-colors duration-300" href="https://www.instagram.com/hair_classics/" target="_blank" rel="noopener noreferrer">
              <span className="font-label uppercase text-[0.65rem] tracking-[0.1rem]">Instagram</span>
            </a>
            <a className="text-obsidian/50 hover:text-obsidian transition-colors duration-300" href="/">
              <span className="font-label uppercase text-[0.65rem] tracking-[0.1rem]">Vogue Connect</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
