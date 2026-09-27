import { useState, type FormEvent } from 'react';
import { Seo } from '../seo';

type AurviaPageProps = {
  onToggleMenu?: () => void;
  onBackToWorld?: () => void;
};

export default function AurviaPage({ onToggleMenu, onBackToWorld }: AurviaPageProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onBackToWorld) {
      onBackToWorld();
    } else {
      window.history.pushState({ world: 'aurvia' }, '', '/?world=aurvia');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const aurviaSeo = {
    title: 'AURVIA — The Golden Path | 4LOG Luxury Streetwear',
    description: 'AURVIA: Aurum + Via. The golden path you choose yourself. Quiet luxury, ambition, and self-direction. Premium structured streetwear engineered for elevation.',
    canonical: 'https://4log.in/collections/aurvia',
    ogTitle: 'AURVIA — The Golden Path | 4LOG',
    ogDescription: 'AURVIA: Aurum + Via. A higher path. A brighter you. Choose your own era.',
    ogImage: 'https://4log.in/aurvia/hero.jpg',
  };

  return (
    <>
      <Seo page={aurviaSeo} />

      {/* FULL WEB SCREEN EDGE-TO-EDGE CONTAINER */}
      <div className="w-full min-h-screen bg-[#050505] text-[#e2ded5] font-['Inter',sans-serif] selection:bg-[#c5a059] selection:text-black overflow-x-hidden flex flex-col">

        {/* ============================================================
            CINEMATIC TOP NAVIGATION & WORLD BACK BUTTON
            ============================================================ */}
        <header className="fixed top-0 left-0 right-0 w-full z-[100] px-4 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center justify-between pointer-events-none transition-all duration-300">
          
          {/* ← BACK TO AURVIA (ARROW ONLY) */}
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleBack}
              className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#d4af37]/35 bg-[#0a0805]/75 hover:bg-[#141008] hover:border-[#d4af37] text-[#d4af37] hover:text-[#f3e5ab] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.2)] cursor-pointer"
              aria-label="Back to Aurvia section on 4LOG"
              title="Back to Aurvia"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-0.5">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* RIGHT: MENU & 4LOG LOGO */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            {onToggleMenu && (
              <button
                type="button"
                onClick={onToggleMenu}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full border border-white/15 hover:border-white/40 text-white transition-all cursor-pointer"
                aria-label="Toggle collections menu"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 flex flex-col justify-center items-start gap-[3.5px] sm:gap-[4px]">
                  <span className="w-4 sm:w-5 h-[1.5px] bg-white block" />
                  <span className="w-3 sm:w-3.5 h-[1.5px] bg-white block" />
                  <span className="w-4 sm:w-5 h-[1.5px] bg-white block" />
                </div>
              </button>
            )}
            <a
              href="/?world=aurvia"
              onClick={handleBack}
              className="opacity-75 hover:opacity-100 transition-opacity flex items-center"
              aria-label="4LOG Home"
            >
              <img src="/4log-logo.png" alt="4LOG" className="h-[20px] sm:h-[24px] w-auto object-contain" />
            </a>
          </div>

        </header>

        {/* ============================================================
            01 — HERO (Monumental Mountain Environment & Golden Portal)
            ============================================================ */}
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-12 lg:p-16">
          {/* BACKGROUND IMAGE - FULL SCREEN */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/aurvia/hero.jpg"
              alt="Solitary figure walking toward glowing golden portal between monumental stone monoliths"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-105"
              loading="eager"
            />
            {/* Smooth gradient blends */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,5,0.75)_100%)] pointer-events-none" />
          </div>

          <div className="relative z-10" />

          {/* CENTER HEADLINE */}
          <div className="relative z-10 flex flex-col items-center mt-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#c5a059] font-bold mb-3 drop-shadow-[0_2px_12px_rgba(197,160,89,0.3)]">
              03 // AURUM + VIA
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-['Syncopate'] font-bold tracking-[0.28em] sm:tracking-[0.38em] uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] ml-[0.28em] sm:ml-[0.38em] whitespace-nowrap inline-block">
              A U R V I A
            </h1>
            <p className="mt-3 sm:mt-5 text-[11px] sm:text-xs md:text-sm font-['Syncopate'] font-bold tracking-[0.35em] text-[#d4af37] uppercase">
              THE CHOICE
            </p>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-['Inter'] font-light tracking-[0.2em] text-white/80 max-w-xl leading-relaxed px-4">
              &ldquo;There is no one right path.
              <br />
              Everyone will show you the road they think you should take.
              <br />
              <span className="text-white font-normal">Choose yours.</span>&rdquo;
            </p>
            <div className="mt-5 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#c5a059]">
              A HIGHER PATH. A BRIGHTER YOU.
            </div>
          </div>

          {/* SCROLL INDICATOR */}
          <a
            href="#meaning"
            className="relative z-10 flex flex-col items-center gap-2 text-[#c5a059]/70 hover:text-[#d4af37] transition-colors mb-2 sm:mb-6 cursor-pointer group"
            aria-label="Scroll to enter"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase group-hover:text-[#d4af37] transition-colors">
              SCROLL TO ENTER
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </section>


        {/* ============================================================
            02 — THE MEANING (Editorial Two-Column Section)
            ============================================================ */}
        <section
          id="meaning"
          className="w-full bg-[#050505] px-4 sm:px-6 md:px-[6vw] lg:px-[8vw] py-14 sm:py-16 md:py-[72px] lg:py-[88px] min-h-[500px] flex items-center justify-center overflow-hidden border-t border-white/5"
        >
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="w-full flex justify-start md:justify-end items-center">
              <div className="w-full max-w-[460px] flex flex-col justify-center">

                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-2 h-2 bg-[#c5a059]" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a059]">
                    THE MEANING
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white leading-tight mb-3">
                  A U R V I A
                </h2>

                <div className="text-[12px] sm:text-[14px] font-serif italic text-[#c5a059] tracking-[0.1em] opacity-90 mb-6">
                  Aurum + Via
                </div>

                <blockquote className="mb-6 border-l border-[#c5a059]/60 pl-4 sm:pl-6">
                  <p className="text-[15px] sm:text-[17px] md:text-[20px] font-light leading-[1.6] text-white tracking-wide font-['Outfit']">
                    &ldquo;The golden path you choose yourself.&rdquo;
                  </p>
                </blockquote>

                <div className="text-[11px] sm:text-[12px] lg:text-[13px] leading-[1.8] tracking-[0.02em] text-white/60 font-['Inter'] space-y-3">
                  <p>
                    From the Latin <span className="text-[#c5a059]">Aurum</span> (gold, luminescence, ultimate value) and <span className="text-[#c5a059]">Via</span> (the way, the journey, the sovereign road).
                  </p>
                  <p>
                    AURVIA is built for those who understand that self-direction is the ultimate luxury. You do not wait for permission to ascend. You carve the route through raw stone and illuminate your own horizon.
                  </p>
                  <p className="text-white/80 font-medium">
                    Quiet ambition. Elevated consciousness. Sovereign elevation.
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[3/4] overflow-hidden bg-[#0a0a0a] border border-[#c5a059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                <img
                  src="/aurvia/meaning.jpg"
                  alt="Cinematic figure facing glowing sunset horizon in dark mountains"
                  className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.25em] text-[#c5a059] uppercase">
                  FIG. 03-A // SOVEREIGN HORIZON
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            03 — THE CHOICE (Conflict Between Society & Individuality)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-16 bg-[#040404] overflow-hidden border-t border-white/5">
          <div className="max-w-[1280px] mx-auto flex flex-col items-center">

            <div className="flex items-center gap-3 mb-12 sm:mb-16">
              <span className="w-8 h-[1px] bg-[#c5a059]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#c5a059]">
                03 // THE DICHOTOMY OF CHOICE
              </span>
              <span className="w-8 h-[1px] bg-[#c5a059]" />
            </div>

            {/* TWO SIDES CONNECTED BY GOLDEN BEAM */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative">
              
              {/* LEFT: THE WORLD */}
              <div className="p-8 sm:p-10 bg-[#070707] border border-white/10 flex flex-col items-start relative">
                <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40 mb-6">
                  THE WORLD:
                </span>
                <div className="space-y-4 font-['Syncopate'] text-xs sm:text-sm tracking-[0.2em] text-white/40 uppercase">
                  <div className="line-through decoration-white/20">GET A STABLE JOB</div>
                  <div className="line-through decoration-white/20">PLAY IT SMALL</div>
                  <div className="line-through decoration-white/20">BE REALISTIC</div>
                  <div className="line-through decoration-white/20">DON&apos;T TAKE RISKS</div>
                  <div className="line-through decoration-white/20">WHAT WILL PEOPLE SAY?</div>
                </div>
                <div className="mt-8 text-[11px] font-['Inter'] text-white/30 font-light">
                  The script written by the cautious majority.
                </div>
              </div>

              {/* RIGHT: YOU */}
              <div className="p-8 sm:p-10 bg-[#090806] border border-[#c5a059]/40 flex flex-col items-start relative shadow-[0_0_40px_rgba(197,160,89,0.08)]">
                <div className="flex items-center justify-between w-full mb-6">
                  <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#c5a059] font-bold">
                    YOU:
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                </div>
                
                <h3 className="font-['Syncopate'] text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.2em] text-white uppercase leading-tight">
                  YOUR PATH
                  <br />
                  <span className="text-[#d4af37]">STARTS HERE.</span>
                </h3>
                
                <p className="mt-6 text-xs sm:text-sm font-['Outfit'] font-light text-white/70 leading-relaxed">
                  Stepping away from the default timeline. Elevating every standard you hold for yourself.
                </p>

                <div className="mt-8 text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059]">
                  SOVEREIGN ASCENT →
                </div>
              </div>

              {/* CONNECTING GOLDEN LINE IN CENTER */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r from-white/20 via-[#d4af37] to-[#d4af37]" />
            </div>

          </div>
        </section>


        {/* ============================================================
            04 — THE DESIGN PHILOSOPHY (Split Layout)
            ============================================================ */}
        <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-[6vw] lg:px-[8vw] bg-[#050505] border-t border-white/5">
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* LEFT TEXT */}
            <div className="w-full flex justify-start md:justify-end items-center">
              <div className="w-full max-w-[480px] flex flex-col justify-center">
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c5a059] uppercase mb-4">
                  04 // ATELIER CRAFTSMANSHIP
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6 leading-tight">
                  THE DESIGN
                  <br />
                  PHILOSOPHY
                </h2>

                <blockquote className="border-l-2 border-[#c5a059] pl-4 sm:pl-6 mb-6">
                  <p className="text-base sm:text-xl lg:text-2xl font-['Outfit'] font-light text-white leading-relaxed">
                    &ldquo;AURVIA translates ambition into something tangible.&rdquo;
                  </p>
                </blockquote>

                <div className="space-y-4 text-xs sm:text-sm font-['Inter'] text-white/65 leading-relaxed font-light mb-8">
                  <p>
                    Quiet luxury meets uncompromising architectural tailoring. We fuse ultra-heavy long-staple combed cotton with subtle metallic antique gold embroideries, engineered shoulder cuts, and minimal brass accents.
                  </p>
                  <p>
                    Every garment is constructed to feel grounded, substantial, and effortlessly majestic.
                  </p>
                </div>

                {/* ATTRIBUTES */}
                <div className="grid grid-cols-2 gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                    <span>PREMIUM COTTON</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                    <span>STRUCTURED FIT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                    <span>GOLD EMBROIDERY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a059]" />
                    <span>LUXURY LABEL</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT MACRO FABRIC */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[420px] aspect-square overflow-hidden bg-[#090806] border border-[#c5a059]/30 shadow-2xl">
                <img
                  src="/aurvia/fabric.jpg"
                  alt="AURVIA fabric macro with metallic gold embroidery and label"
                  className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                  loading="lazy"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 border border-[#c5a059]/40 text-[9px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">
                  SPEC // METALLIC GOLD THREAD
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            05 — PRODUCT DETAIL GRID (CAD Flat + Macros + Specs)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030303]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">

            {/* COL 1: TECHNICAL FLAT SKETCH */}
            <div className="md:col-span-12 lg:col-span-5 bg-[#060606] border border-white/10 p-5 sm:p-7 rounded-none flex items-center justify-center relative shadow-inner overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px]">
                <img
                  src="/aurvia/technical-sketch.jpg"
                  alt="AURVIA structured tee technical blueprint with gold dimension annotations"
                  className="w-full h-full max-h-[560px] object-contain object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* COL 2: CENTER MACROS */}
            <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6">
              {/* Fabric close */}
              <div className="w-full aspect-square bg-[#060606] border border-white/10 overflow-hidden relative shadow-md">
                <img
                  src="/aurvia/fabric.jpg"
                  alt="AURVIA gold starburst macro"
                  className="w-full h-full object-cover filter contrast-110"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 text-[9px] font-mono tracking-[0.2em] text-[#c5a059] bg-black/80 px-2 py-1">
                  MACRO: EMBROIDERY
                </div>
              </div>
              {/* Emblem Patch */}
              <div className="w-full aspect-square bg-[#060606] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-full h-full border border-[#c5a059]/30 p-4 flex flex-col justify-center items-center bg-[#090806]">
                  <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#c5a059]">
                    A U R V I A
                  </div>
                  <div className="text-3xl font-['Syncopate'] font-bold text-white mt-2">
                    AV // 03
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.2em] text-[#c5a059]/70 mt-2 uppercase">
                    GOLDEN ARCHIVE
                  </div>
                </div>
              </div>
            </div>

            {/* COL 3: 3 TECHNICAL BLOCKS */}
            <div className="md:col-span-6 lg:col-span-4 bg-[#060606] border border-white/10 p-6 sm:p-8 rounded-none flex flex-col justify-between items-center text-center shadow-inner">

              {/* 1: 450 GSM COTTON */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#d4af37] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  450 GSM EGYPTIAN COTTON
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Heavy luxury handfeel with silken drape and long-lasting structure.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-[#c5a059]/20 my-1" />

              {/* 2: METALLIC EMBROIDERY */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#d4af37] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  METALLIC GOLD MARK
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  High-density bullion gold embroidery that resists tarnish.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-[#c5a059]/20 my-1" />

              {/* 3: STRUCTURED SILHOUETTE */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#d4af37] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  STRUCTURED SILHOUETTE
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Tailored drop-shoulder cut engineered to maintain form across movement.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ============================================================
            06 — THE COLLECTION (Monumental Showroom)
            ============================================================ */}
        <section id="collection" className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040404]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE: GARMENTS ON BRASS RAIL */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden border border-[#c5a059]/30 bg-black shadow-2xl">
                <img
                  src="/aurvia/collection.jpg"
                  alt="AURVIA garments in monumental stone showroom facing sunset"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c5a059] uppercase mb-3">
                06 // SOVEREIGN ATELIER
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white mb-6">
                THE COLLECTION
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed mb-8 max-w-xl">
                &ldquo;A collection for those who choose their own direction.&rdquo;
              </p>

              <button
                type="button"
                onClick={() => alert('AURVIA Chapter 03: Exclusive release with individually numbered certificates of authenticity.')}
                className="w-fit px-8 py-4 border border-[#c5a059] hover:border-white text-white font-mono text-xs sm:text-sm uppercase tracking-[0.25em] transition-all hover:bg-[#c5a059] hover:text-black cursor-pointer mb-10"
              >
                EXPLORE AURVIA →
              </button>

              <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#c5a059]/60 uppercase">
                <span>STRUCTURED TEES</span>
                <span>•</span>
                <span>GOLD-TRIM HOODIES</span>
                <span>•</span>
                <span>TAILORED COATS</span>
                <span>•</span>
                <span>LIMITED RUNS</span>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            07 — THE GOLDEN PATH (Wide Cinematic Landscape)
            ============================================================ */}
        <section className="relative w-full py-24 sm:py-32 lg:py-44 px-6 sm:px-12 bg-[#020202] border-t border-white/5 overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/aurvia/golden-path.jpg"
              alt="Glowing golden road traveling through mountains toward distant city"
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-[#020202]" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#c5a059] mb-6">
              07 // THE GOLDEN PATH
            </span>

            <h2 className="font-['Syncopate'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.18em] uppercase text-white leading-tight">
              YOUR PATH.
              <br />
              <span className="text-[#d4af37]">YOUR CHOICE.</span>
              <br />
              YOUR ERA.
            </h2>

            <p className="mt-8 text-xs sm:text-sm font-mono tracking-[0.3em] text-white/70 uppercase max-w-lg">
              The road is not found. It is forged.
            </p>
          </div>
        </section>


        {/* ============================================================
            08 — MORE THAN CLOTHES (Lifestyle Image & Elevation)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030303]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden border border-[#c5a059]/30 shadow-2xl">
                <img
                  src="/aurvia/lifestyle.jpg"
                  alt="Figure sitting above vast landscape looking at golden portal"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c5a059] uppercase mb-3">
                08 // ELEVATION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6">
                MORE THAN CLOTHES
              </h2>

              <div className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed space-y-4 max-w-xl">
                <p>
                  &ldquo;AURVIA isn&apos;t about following the path.
                  <br />
                  <span className="text-white font-normal">It&apos;s about choosing one.</span>&rdquo;
                </p>
                <p>
                  Clothing that serves as a physical declaration of sovereign will. When you elevate your standards, your reality shifts to meet you.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xl sm:text-2xl lg:text-3xl font-['Syncopate'] font-bold text-[#d4af37] tracking-[0.18em] uppercase">
                  IT&apos;S TIME TO CHOOSE.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            09 — OUR PROMISE (Four Minimal Principles)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040404] flex flex-col items-center text-center overflow-hidden">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c5a059] uppercase mb-3 block">
              09 // PILLARS OF SOVEREIGNTY
            </span>
            <h2 className="text-xs sm:text-sm lg:text-base font-mono tracking-[0.35em] uppercase text-white/80 mb-10 sm:mb-14 text-center">
              OUR PROMISE
            </h2>

            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {[
                {
                  num: '01',
                  title: 'CHOOSE YOUR PATH',
                  desc: 'Reject the default trajectory. Author your own sovereign course.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2" />
                    </svg>
                  ),
                },
                {
                  num: '02',
                  title: 'MOVE FORWARD',
                  desc: 'Unshakable momentum. Progress without waiting for consensus.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  ),
                },
                {
                  num: '03',
                  title: 'CREATE YOUR ERA',
                  desc: 'Become the undisputed protagonist of your personal timeline.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  ),
                },
                {
                  num: '04',
                  title: 'NEVER SETTLE',
                  desc: 'Relentless elevation in craft, posture, and presence.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="w-full bg-[#070707] border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-[#c5a059]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-none bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#d4af37] mb-4 shadow-sm transition-colors group-hover:scale-105">
                    {item.glyph}
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] mb-1">
                    {item.num}
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-[0.2em] font-bold text-white uppercase block mb-2">
                    {item.title}
                  </span>
                  <p className="text-[11px] font-['Inter'] text-white/50 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ============================================================
            10 — IDENTITY (Golden Portal Glow & Massive Typography)
            ============================================================ */}
        <section className="relative w-full py-24 sm:py-36 lg:py-48 px-6 sm:px-12 bg-[#020202] border-t border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* SUBTLE GOLDEN PORTAL GLOW IN BACKGROUND */}
          <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#c5a059]/20 via-[#d4af37]/15 to-transparent blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center">
            
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#c5a059] mb-8">
              10 // THE SOVEREIGN CREED
            </span>

            <div className="font-['Syncopate'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white leading-[1.08] select-none">
              <div>CHOOSE</div>
              <div className="text-white/80">YOUR</div>
              <div className="text-white/60">OWN</div>
              <div className="text-[#d4af37] drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]">PATH.</div>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-col items-center">
              <div className="w-16 h-[2px] bg-[#c5a059] mb-6" />
              <div className="text-2xl sm:text-4xl font-['Syncopate'] font-light tracking-[0.4em] text-white uppercase ml-[0.4em]">
                A U R V I A
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            11 — JOIN THE CIRCLE (Black & Gold Luxury Packaging)
            ============================================================ */}
        <section className="relative w-full border-t border-white/5 bg-[#040404] flex flex-col">
          {/* PACKAGING IMAGE BANNER */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src="/aurvia/box.jpg"
              alt="AURVIA luxury matte black and gold packaging garment box"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-transparent to-[#040404]/70" />

            {/* FLOATING TEXT */}
            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 max-w-[1500px] mx-auto w-full flex justify-between items-start">
              <div className="text-left font-['Syncopate'] text-sm sm:text-lg lg:text-2xl font-bold tracking-[0.25em] uppercase text-white leading-relaxed">
                JOIN
                <br />
                THE CIRCLE
              </div>

              <div className="text-right">
                <div className="font-['Syncopate'] text-xs sm:text-base lg:text-lg font-bold tracking-[0.3em] uppercase text-white whitespace-nowrap inline-block">
                  A U R V I A
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase mt-1">
                  GOLDEN PATH DIVISION
                </div>
              </div>
            </div>
          </div>

          {/* EMAIL SUBSCRIBE ROW */}
          <div className="w-full bg-[#020202] border-t border-white/5 py-12 sm:py-16 px-5 sm:px-10 lg:px-16">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-lg text-center md:text-left">
                <h3 className="text-sm sm:text-base lg:text-lg font-['Syncopate'] font-bold tracking-[0.25em] uppercase text-white mb-2">
                  JOIN THE CIRCLE
                </h3>
                <p className="text-xs sm:text-sm font-['Outfit'] font-light text-white/60 leading-relaxed">
                  &ldquo;You don&apos;t need everyone to understand where you&apos;re going.&rdquo; Private allocation alerts for upcoming drops.
                </p>
              </div>

              {/* EMAIL FORM */}
              <div className="w-full md:w-auto flex-1 max-w-md">
                {isSubscribed ? (
                  <div className="p-4 border border-[#c5a059] text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#d4af37] bg-[#c5a059]/10">
                    SOVEREIGN INITIATION RECORDED. WELCOME TO AURVIA.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex border border-white/20 bg-black/60 focus-within:border-[#c5a059] transition-colors">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-5 py-4 bg-transparent text-white text-xs sm:text-sm font-['Inter'] placeholder-white/30 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-6 bg-[#c5a059] hover:bg-[#d4af37] text-black transition-colors cursor-pointer text-xs font-mono tracking-[0.2em] uppercase font-bold"
                      aria-label="Submit email"
                    >
                      ENTER AURVIA →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================
            12 — FOOTER (Minimal Black & Gold Editorial Footer)
            ============================================================ */}
        <footer className="w-full bg-[#020202] border-t border-white/5 py-16 sm:py-20 px-6 sm:px-12 lg:px-16 text-white/70">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-white/5">
            
            {/* BRAND */}
            <div className="md:col-span-5 flex flex-col justify-start">
              <a href="/" className="inline-block mb-4">
                <img src="/4log-logo.png" alt="4LOG" className="h-[28px] w-auto object-contain" />
              </a>
              <p className="font-['Syncopate'] text-xs font-bold tracking-[0.25em] text-white uppercase mb-2">
                DO IT ANYWAY.
              </p>
              <p className="text-xs font-['Inter'] text-white/40 max-w-sm font-light leading-relaxed">
                Sovereign luxury streetwear. High ambition, quiet confidence, and uncompromised craftsmanship.
              </p>
            </div>

            {/* NAV LINKS */}
            <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#c5a059] text-[10px] mb-1 font-bold">NAVIGATION</span>
              <a href="#collection" className="hover:text-white transition-colors">SHOP</a>
              <a href="/about" className="hover:text-white transition-colors">ABOUT</a>
              <a href="mailto:contact@4log.in" className="hover:text-white transition-colors">CONTACT</a>
            </div>

            {/* NEXT WORLDS */}
            <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#c5a059] text-[10px] mb-1 font-bold">NEXT WORLD:</span>
              <div className="flex flex-col gap-2.5 text-white/60">
                <a href="/collections/nivora" className="hover:text-white hover:translate-x-1 transition-all">
                  → NIVORA <span className="text-white/30 text-[10px]">(NIHIL + AURA)</span>
                </a>
                <a href="/collections/vayren" className="hover:text-white hover:translate-x-1 transition-all">
                  → VAYREN <span className="text-white/30 text-[10px]">(VAIRAGYA + REBELLION)</span>
                </a>
                <a href="/collections/astera" className="hover:text-white hover:translate-x-1 transition-all">
                  → ASTERA <span className="text-white/30 text-[10px]">(ASTRA + ERA)</span>
                </a>
                <a href="/collections/manifera" className="hover:text-white hover:translate-x-1 transition-all">
                  → MANIFERA <span className="text-white/30 text-[10px]">(MANIFEST + ERA)</span>
                </a>
              </div>
            </div>

          </div>

          <div className="max-w-[1400px] mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-[0.2em] text-white/30 gap-4">
            <div>&copy; {new Date().getFullYear()} 4LOG. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <a href="/about" className="hover:text-white transition-colors">TERMS</a>
              <a href="/about" className="hover:text-white transition-colors">PRIVACY</a>
              <a href="/" className="hover:text-white transition-colors">BACK TO TOP ↑</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
