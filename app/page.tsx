
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/*  HERO SECTION  */}
<section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
<div className="absolute inset-0 z-0">
<img className="w-full h-full object-cover grayscale-[20%] brightness-50" data-alt="Moody atmospheric luxury salon interior with woman styling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu5GQRwWkbOKZ_SYWKlvuXTpOwuN8l-As8T3zN2d1RH3tHiGcBmf_cja43tLu7BaVanuMz5xAPvs1wLLe8Aqpd3khrE_U5U5haHhMbc7hp-HLChx3dLDVY9818boXfFhGJAuAd-7lS3poEQxGa8JK5ZhDjUEf_s2qSJYUSQHPXkR0XXaBM8neAiqwe2fCBa862jfPCWB1oJK3TAvts---aRkK_irRleGqIJEstIfCTHNrsI-BKx2UH3nuDsFZpmaVN7k-uC_zeoHQ"/>
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
</div>
<div className="relative z-10 text-center px-6">
<span className="block font-label uppercase text-[0.7rem] tracking-[0.4rem] text-accent-gold mb-6">EST. LONDON · 2018</span>
<h1 className="font-headline text-6xl md:text-8xl font-light text-white tracking-tighter leading-tight mb-12">
                Hair Classic:<br/>
<span className="italic font-light opacity-90">Quiet Elegance</span>
</h1>
<a className="inline-block glass-cta text-white font-label uppercase text-[0.75rem] tracking-[0.25rem] px-10 py-5 hover:bg-white hover:text-stone-900 transition-all duration-700" href="/">
                RESERVE YOUR CHAIR
            </a>
</div>
<div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
<span className="material-symbols-outlined text-white/50 font-extralight">keyboard_double_arrow_down</span>
</div>
</section>
{/*  MARQUEE BAND  */}
<div className="w-full bg-surface-container-low py-4 overflow-hidden border-y-[0.5px] border-accent-gold/20">
<div className="marquee-container">
<div className="marquee-content animate-scroll flex gap-12 items-center">
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BESPOKE COLOUR</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">PRECISION CUTS</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">KERATIN TREATMENTS</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BALAYAGE</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BRIDAL STYLING</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">AI CONSULTATION</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">HAIR PASSPORTS</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">LONDON</span>
</div>
{/*  Duplicate for infinite effect  */}
<div aria-hidden="true" className="marquee-content animate-scroll flex gap-12 items-center">
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BESPOKE COLOUR</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">PRECISION CUTS</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">KERATIN TREATMENTS</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BALAYAGE</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">BRIDAL STYLING</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">AI CONSULTATION</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">HAIR PASSPORTS</span>
<span className="w-1 h-1 rounded-full bg-accent-gold/30"></span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.25rem] text-accent-gold whitespace-nowrap">LONDON</span>
</div>
</div>
</div>
{/*  SPLIT SECTION  */}
<section className="grid grid-cols-1 md:grid-cols-2 min-h-[819px]">
<div className="bg-surface-container-low flex items-center justify-center p-12 md:p-24 lg:p-32">
<div className="max-w-md">
<span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-8">The Art of Detail</span>
<h2 className="font-headline text-5xl font-light text-stone-900 leading-tight mb-8">Craftsmanship Without Compromise</h2>
<p className="text-on-surface-variant font-body text-lg leading-relaxed mb-10">
                    We believe hair is the ultimate canvas. At Hair Classic, we merge architectural precision with organic fluidity to create styles that aren't just seen—they are experienced.
                </p>
<a className="group inline-flex items-center font-label uppercase text-[0.75rem] tracking-[0.2rem] text-stone-900" href="/">
                    DISCOVER OUR STYLISTS
                    <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-400">→</span>
</a>
</div>
</div>
<div className="relative min-h-[500px] md:min-h-full">
<img className="absolute inset-0 w-full h-h-full object-cover" data-alt="Editorial close up of textured hair styling in progress" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmrPgy9EtnQJhuZH_IbEravgLdmoc5fI-Ue9gLh1zSCRzTzsrzfLg__1Ij-4GF7RvVFHHP_ssEaaSU31RX91Oy7CupfzfXUhQhIt0c2sObQKLX3cg3KDHpv_HZY3RN0evXuPX-RpXP3KNOsVnohs7Kr0Wan0OfoeioJYG7R8ijoFVBzcZmXTQWbQrhRcBa_-YuBmypCANEEi21cG1iuNI5XAGKzT_M2j2pNNaC4dbOoPh_sy6df_OmeWT9EXjQDIYM-P3KLMWe-Bw"/>
</div>
</section>
{/*  SERVICES GRID  */}
<section className="py-32 px-8 max-w-screen-2xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
<div>
<span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-4">Curated Offerings</span>
<h2 className="font-headline text-6xl font-light text-stone-900">Our Services</h2>
</div>
<a className="font-label uppercase text-[0.75rem] tracking-[0.25rem] border-b border-accent-gold pb-2 hover:text-accent-gold transition-colors" href="/">BOOK NOW →</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-[0.5px] border-accent-gold/20">
{/*  Card 1  */}
<div className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500">
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Beautiful balayage blonde hair highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnC7LKZCOlD8y8Gw2x19heHDy5VOPh0DCDiNH14xmOOUiy-muPt9334JiuPNUiYtEjDZkIk9ukIAzarDiKt7gsn0dKKpMq0oPf6pijYhAELBJVwxZIG65mpjkN4uaxlf8ZvdcUyAtC0LCt9XcsCKRhQq03N1BjgCYEl-Nw8YQEyX24uzDFBD342SSEIgU0OMwljjvgmLJU6Dx7qEYwkVjEhkyofEq6bbv4ttqMg6BY1g9ssre9rCzCyBcv2_H6voPx51ZyqFGz6v0"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Balayage &amp; Colour</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £280</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Hand-painted transitions that mimic natural sunlight and depth.</p>
</div>
{/*  Card 2  */}
<div className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500">
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Sleek precision hair cut bob style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJzd-62u0Px4OTiYP-yxU_XlMcGISKtzXU-2csxmS9X3Z2tP4_6sqS7TetWoL3nvy-ZAM_yGMFpigi9-rBnu5d6JucGntDzeHA4AvOpkrmCVxjSVw_kZP6GOAVBhvH7Wjn4r2YhYF9t6Fv9TW1-2VMw9QDa-7n_VHvAbXYM4erqT0aT_Oaxn8i1ZBW2J2u_io6Ahk2CpjhiDS8mm85mGcbJPtjS3ljV6HIRVR7q6gekFvQiFPJpTmMZaeGbCkCOo86wmxxtncoXYc"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Precision Cut</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £95</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Architectural sculpting tailored to your unique facial geometry.</p>
</div>
{/*  Card 3  */}
<div className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500">
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Healthy smooth hair after keratin treatment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLnmiN_p-w5F0gEs05v3QIQ9fxQ8DlqTUl0uIklmbXPaNG3SilixAaOduLSot5vCRWmsijWuaBRCcLmVY-S7SZJCscB-0i8hZx5TfKutNb1rRRpJirgakwwdIv8xCfGEr5l4lzObuXq1r6TF0Lq1A975xZVErQvGizPG_ontNCCtgpFwJYWQrQZ6outLTg9Tum3SabbdKxvahsSPq93cuf7M061fLVQeQKf56rnnvZ2XO-BK33tWHMH0Y89h4YuFSfpiBvTOkd6uY"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Keratin Treatment</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £240</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Long-lasting silkiness and reconstruction for effortless radiance.</p>
</div>
{/*  Card 4  */}
<div className="border-[0.5px] border-accent-gold/20 p-8 group hover:bg-surface-container-low transition-colors duration-500">
<div className="mb-8 overflow-hidden">
<img className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Elegant bridal hair styling with accessories" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLsUzWztvnMuH1vkHReMBvmAFSK5jDLkZCO89qLePuzF6kup-eLeCQgtVWM0WGn8TqbUNQ2lTUAXXfkD1kOru2OrtVkieaCLVkNDEGvSFIfYrot4U0e3BUuAiz82ZVAbkk9taJmAglJQQ5wb2q0kFwJ5nPQrJ_ag6mclErwaIscVilmou_tOPpZq_eCXxVUZIcO0WEqJDUo7gdM0qCb4T3ghCekHF60A0H_HdYFC4HWvKOv15xFTUX0W1iaID3VZzBnZ_52NQcloQ"/>
</div>
<h3 className="font-headline text-2xl font-light mb-2">Bridal Styling</h3>
<span className="font-label text-accent-gold block mb-6 tracking-widest text-sm">FROM £160</span>
<p className="text-on-surface-variant text-sm leading-relaxed font-light">Bespoke bridal artistry for your most significant moments.</p>
</div>
</div>
</section>
{/*  DARK STATS BAND  */}
<section className="bg-stone-950 py-24 border-y-[0.5px] border-accent-gold/10">
<div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
<div className="flex flex-col items-center">
<span className="font-headline text-5xl md:text-6xl text-white font-light mb-4">4,200+</span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.3rem] text-accent-gold">Satisfied Clients</span>
</div>
<div className="flex flex-col items-center">
<span className="font-headline text-5xl md:text-6xl text-white font-light mb-4">12+</span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.3rem] text-accent-gold">Years of Mastery</span>
</div>
<div className="flex flex-col items-center">
<span className="font-headline text-5xl md:text-6xl text-white font-light mb-4">★ 5.0</span>
<span className="font-label uppercase text-[0.65rem] tracking-[0.3rem] text-accent-gold">Google Rating</span>
</div>
</div>
</section>
{/*  TESTIMONIALS  */}
<section className="py-32 px-8 bg-surface-container">
<div className="max-w-screen-2xl mx-auto">
<div className="text-center mb-24">
<span className="font-label uppercase text-[0.7rem] tracking-[0.3rem] text-accent-gold block mb-4">The Experience</span>
<h2 className="font-headline text-5xl font-light text-stone-900">Salon Diaries</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-16">
{/*  Testimonial 1  */}
<div className="flex flex-col items-center text-center">
<p className="font-headline italic text-2xl text-stone-800 leading-relaxed mb-8">
                        "The atmosphere is a sanctuary. My stylist understood exactly what I needed without me saying a word. Truly bespoke."
                    </p>
<div className="mt-auto">
<span className="block font-label uppercase text-[0.75rem] tracking-[0.1rem] text-stone-900 font-bold mb-1">Eleanor Vance</span>
<span className="block font-label text-[0.65rem] tracking-[0.1rem] text-stone-500 uppercase">Balayage Client</span>
</div>
</div>
{/*  Testimonial 2  */}
<div className="flex flex-col items-center text-center">
<p className="font-headline italic text-2xl text-stone-800 leading-relaxed mb-8">
                        "Finally found a place that treats hair cutting like fine sculpture. The precision is unmatched in all of London."
                    </p>
<div className="mt-auto">
<span className="block font-label uppercase text-[0.75rem] tracking-[0.1rem] text-stone-900 font-bold mb-1">Julian Thorne</span>
<span className="block font-label text-[0.65rem] tracking-[0.1rem] text-stone-500 uppercase">Precision Cut Client</span>
</div>
</div>
{/*  Testimonial 3  */}
<div className="flex flex-col items-center text-center">
<p className="font-headline italic text-2xl text-stone-800 leading-relaxed mb-8">
                        "The hair passport system is brilliant. Wherever I am in the world, they know exactly what my formula is. Luxury at its best."
                    </p>
<div className="mt-auto">
<span className="block font-label uppercase text-[0.75rem] tracking-[0.1rem] text-stone-900 font-bold mb-1">Sienna Blake</span>
<span className="block font-label text-[0.65rem] tracking-[0.1rem] text-stone-500 uppercase">Member Since 2019</span>
</div>
</div>
</div>
</div>
</section>
{/*  FOOTER  */}
    </div>
  );
}
