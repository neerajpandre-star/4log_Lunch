import { useState, type FormEvent } from 'react';
import { Seo } from '../seo';

type AsteraPageProps = {
  onToggleMenu?: () => void;
  onBackToWorld?: () => void;
};

export default function AsteraPage({ onToggleMenu, onBackToWorld }: AsteraPageProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onBackToWorld) {
      onBackToWorld();
    } else {
      window.history.pushState({ world: 'astera' }, '', '/?world=astera');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const asteraSeo = {
    title: 'ASTERA — The Era Is Yours | 4LOG Luxury Streetwear',
    description: 'ASTERA: Astra + Era. The era is yours. You are not waiting for your era to arrive; you create it. Futuristic luxury streetwear engineered with electric silver and celestial architecture.',
    canonical: 'https://4log.in/collections/astera',
    ogTitle: 'ASTERA — The Era Is Yours | 4LOG',
    ogDescription: 'ASTERA: Astra + Era. Designed for the protagonist.',
    ogImage: 'https://4log.in/astera/hero.jpg',
  };

  return (
    <>
      <Seo page={asteraSeo} />

      {/* FULL WEB SCREEN EDGE-TO-EDGE CONTAINER */}
      <div className="w-full min-h-screen bg-[#040406] text-[#e0e4ec] font-['Inter',sans-serif] selection:bg-[#c0d4f8] selection:text-black overflow-x-hidden flex flex-col">

        {/* ============================================================
            CINEMATIC TOP NAVIGATION & WORLD BACK BUTTON
            ============================================================ */}
        <header className="fixed top-0 left-0 right-0 w-full z-[100] px-4 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center justify-between pointer-events-none transition-all duration-300">
          
          {/* ← BACK TO ASTERA (ARROW ONLY) */}
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleBack}
              className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/20 bg-[#060810]/75 hover:bg-[#0c1220] hover:border-[#a0e9ff]/80 text-white/90 hover:text-[#a0e9ff] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(160,233,255,0.2)] cursor-pointer"
              aria-label="Back to Astera section on 4LOG"
              title="Back to Astera"
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
              href="/?world=astera"
              onClick={handleBack}
              className="opacity-75 hover:opacity-100 transition-opacity flex items-center"
              aria-label="4LOG Home"
            >
              <img src="/4log-logo.png" alt="4LOG" className="h-[20px] sm:h-[24px] w-auto object-contain" />
            </a>
          </div>

        </header>

        {/* ============================================================
            01 — HERO (Epic Cinematic Celestial Landscape)
            ============================================================ */}
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-12 lg:p-16">
          {/* BACKGROUND IMAGE - FULL SCREEN */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/astera/hero.jpg"
              alt="Solitary protagonist standing inside massive futuristic celestial landscape with cosmic planet and stars"
              className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-110"
              loading="eager"
            />
            {/* Seamless gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 bg-gradient-to-t from-[#040406] via-[#040406]/85 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(4,4,6,0.75)_100%)] pointer-events-none" />
          </div>

          <div className="relative z-10" />

          {/* CENTER HEADLINE */}
          <div className="relative z-10 flex flex-col items-center mt-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#a0c0f0] font-bold mb-3 drop-shadow-[0_2px_12px_rgba(160,192,240,0.3)]">
              04 // ASTRA + ERA
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-['Syncopate'] font-bold tracking-[0.28em] sm:tracking-[0.38em] uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] ml-[0.28em] sm:ml-[0.38em] whitespace-nowrap inline-block">
              A S T E R A
            </h1>
            <p className="mt-3 sm:mt-5 text-[11px] sm:text-xs md:text-sm font-['Syncopate'] font-bold tracking-[0.35em] text-[#d8e4f8] uppercase">
              THE ERA IS YOURS.
            </p>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-['Inter'] font-light tracking-[0.2em] text-white/80 max-w-xl leading-relaxed px-4">
              &ldquo;Every generation gets a moment.
              <br />
              <span className="text-white font-normal">Build yours.</span>&rdquo;
            </p>
            <div className="mt-5 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#a0c0f0]">
              SAME PEOPLE. DIFFERENT UNIVERSE.
            </div>
          </div>

          {/* CTA SCROLL INDICATOR */}
          <a
            href="#meaning"
            className="relative z-10 flex flex-col items-center gap-2 text-[#a0c0f0]/70 hover:text-white transition-colors mb-2 sm:mb-6 cursor-pointer group"
            aria-label="Enter your era"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase group-hover:text-white transition-colors">
              ENTER YOUR ERA ↓
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </section>


        {/* ============================================================
            02 — THE MEANING (Two-Column Editorial Section)
            ============================================================ */}
        <section
          id="meaning"
          className="w-full bg-[#040406] px-4 sm:px-6 md:px-[6vw] lg:px-[8vw] py-14 sm:py-16 md:py-[72px] lg:py-[88px] min-h-[500px] flex items-center justify-center overflow-hidden border-t border-white/5"
        >
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="w-full flex justify-start md:justify-end items-center">
              <div className="w-full max-w-[460px] flex flex-col justify-center">

                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-2 h-2 bg-[#a0c0f0]" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#a0c0f0]">
                    THE MEANING
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white leading-tight mb-3">
                  A S T E R A
                </h2>

                <div className="text-[12px] sm:text-[14px] font-serif italic text-[#a0c0f0] tracking-[0.1em] opacity-90 mb-6">
                  Astra + Era
                </div>

                <blockquote className="mb-6 border-l border-[#a0c0f0]/60 pl-4 sm:pl-6">
                  <p className="text-[15px] sm:text-[17px] md:text-[20px] font-light leading-[1.6] text-white tracking-wide font-['Outfit']">
                    &ldquo;Your era isn&apos;t something you wait for.
                    <br />
                    <span className="text-[#d8e4f8] font-normal">Your era is something you create.</span>&rdquo;
                  </p>
                </blockquote>

                <div className="text-[11px] sm:text-[12px] lg:text-[13px] leading-[1.8] tracking-[0.02em] text-white/60 font-['Inter'] space-y-3">
                  <p>
                    <span className="text-[#a0c0f0]">Astra</span> (the celestial expanse, the stars, the infinite unknown) combined with <span className="text-[#a0c0f0]">Era</span> (a sovereign epoch defined by visionary individuals).
                  </p>
                  <p>
                    ASTERA rejects passive spectatorship. You are neither a passenger in another person&apos;s timeline nor an echo of past culture. You are the architect of the incoming paradigm.
                  </p>
                  <p className="text-white/80 font-medium">
                    Celestial aesthetics engineered with sharp brutalist streetwear discipline.
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[3/4] overflow-hidden bg-[#07080c] border border-[#a0c0f0]/25 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                <img
                  src="/astera/meaning.jpg"
                  alt="Protagonist in celestial landscape with monolith and planetary light"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.25em] text-[#a0c0f0] uppercase">
                  FIG. 04-A // CELESTIAL PROTAGONIST
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            03 — YOUR ERA (Editorial Timeline Break & Orbital Lines)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-16 bg-[#030305] overflow-hidden border-t border-white/5">
          {/* ORBITAL LINES SVG OVERLAY */}
          <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
            <svg width="900" height="900" viewBox="0 0 900 900" fill="none" stroke="currentColor" className="text-[#a0c0f0]">
              <circle cx="450" cy="450" r="180" strokeWidth="0.75" strokeDasharray="4 6" />
              <circle cx="450" cy="450" r="320" strokeWidth="1" />
              <ellipse cx="450" cy="450" rx="420" ry="160" strokeWidth="0.75" transform="rotate(-25 450 450)" />
              <line x1="0" y1="450" x2="900" y2="450" strokeWidth="0.5" strokeDasharray="3 9" />
            </svg>
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col items-center">
            
            <div className="flex items-center gap-3 mb-12 sm:mb-16">
              <span className="w-8 h-[1px] bg-[#a0c0f0]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#a0c0f0]">
                03 // CHRONOLOGY DISRUPTION
              </span>
              <span className="w-8 h-[1px] bg-[#a0c0f0]" />
            </div>

            {/* TIMELINE SEQUENCE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[960px] mb-12">
              <div className="p-6 bg-[#06070a] border border-white/10 flex flex-col items-center text-center">
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-2">01 // REAR</span>
                <span className="font-['Syncopate'] text-sm tracking-[0.2em] text-white/40 uppercase line-through">
                  YESTERDAY
                </span>
                <p className="mt-3 text-[11px] text-white/30 font-light font-['Inter']">The era of borrowed opinions.</p>
              </div>

              <div className="p-6 bg-[#06070a] border border-white/10 flex flex-col items-center text-center">
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-2">02 // NOISE</span>
                <span className="font-['Syncopate'] text-sm tracking-[0.2em] text-white/50 uppercase line-through">
                  TODAY
                </span>
                <p className="mt-3 text-[11px] text-white/30 font-light font-['Inter']">The era of endless consensus.</p>
              </div>

              <div className="p-6 bg-[#06070a] border border-white/10 flex flex-col items-center text-center">
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-2">03 // PROMISE</span>
                <span className="font-['Syncopate'] text-sm tracking-[0.2em] text-white/50 uppercase line-through">
                  TOMORROW
                </span>
                <p className="mt-3 text-[11px] text-white/30 font-light font-['Inter']">Waiting for permission to begin.</p>
              </div>
            </div>

            {/* TIMELINE BREAK STATEMENT */}
            <div className="w-full max-w-[1000px] border-t border-[#a0c0f0]/40 pt-12 sm:pt-16 flex flex-col items-center text-center">
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#a0c0f0] mb-4">
                BREAK THE CONTINUUM:
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-['Syncopate'] font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase text-white leading-tight">
                YOUR <span className="text-[#a0c0f0] drop-shadow-[0_0_30px_rgba(160,192,240,0.5)]">ERA.</span>
              </h2>
              <p className="mt-6 text-xs sm:text-sm font-mono tracking-[0.3em] text-white/70 uppercase">
                &ldquo;Create what doesn&apos;t exist yet.&rdquo;
              </p>
            </div>

          </div>
        </section>


        {/* ============================================================
            04 — THE DESIGN PHILOSOPHY (Split Layout)
            ============================================================ */}
        <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-[6vw] lg:px-[8vw] bg-[#040406] border-t border-white/5">
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* LEFT TEXT */}
            <div className="w-full flex justify-start md:justify-end items-center">
              <div className="w-full max-w-[480px] flex flex-col justify-center">
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#a0c0f0] uppercase mb-4">
                  04 // ARCHITECTURAL INTENT
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6 leading-tight">
                  THE DESIGN
                  <br />
                  PHILOSOPHY
                </h2>

                <blockquote className="border-l-2 border-[#a0c0f0] pl-4 sm:pl-6 mb-6">
                  <p className="text-base sm:text-xl lg:text-2xl font-['Outfit'] font-light text-white leading-relaxed">
                    &ldquo;Designed for the protagonist.&rdquo;
                  </p>
                </blockquote>

                <div className="space-y-4 text-xs sm:text-sm font-['Inter'] text-white/65 leading-relaxed font-light mb-8">
                  <p>
                    ASTERA pieces are crafted as modern armor for those who live on the frontier of culture. We pair 460 GSM dense cotton with electric silver metallics, chrome silkscreen coordinates, and dropped structural lines.
                  </p>
                  <p>
                    Every detail points toward forward motion, spatial balance, and the courage to claim your era.
                  </p>
                </div>

                {/* ATTRIBUTES */}
                <div className="grid grid-cols-2 gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#a0c0f0]" />
                    <span>460 GSM COTTON</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#a0c0f0]" />
                    <span>CHROME GRAPHICS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#a0c0f0]" />
                    <span>ORBITAL TAILORING</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#a0c0f0]" />
                    <span>CELESTIAL EMBLEM</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT MACRO FABRIC */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[420px] aspect-square overflow-hidden bg-[#07080c] border border-[#a0c0f0]/30 shadow-2xl">
                <img
                  src="/astera/fabric.jpg"
                  alt="ASTERA fabric macro with electric silver starburst motif and label"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                  loading="lazy"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 border border-[#a0c0f0]/40 text-[9px] font-mono tracking-[0.25em] text-[#d8e4f8] uppercase">
                  SPEC // ELECTRIC CHROME EMBROIDERY
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            05 — PRODUCT DETAIL GRID (Technical Diagram & Macros)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030305]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">

            {/* COL 1: TECHNICAL FLAT SKETCH */}
            <div className="md:col-span-12 lg:col-span-5 bg-[#06070a] border border-white/10 p-5 sm:p-7 rounded-none flex items-center justify-center relative shadow-inner overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px]">
                <img
                  src="/astera/technical-sketch.jpg"
                  alt="ASTERA technical garment blueprint with electric silver dimensions and callouts"
                  className="w-full h-full max-h-[560px] object-contain object-center filter contrast-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* COL 2: CENTER MACROS */}
            <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6">
              {/* Fabric close */}
              <div className="w-full aspect-square bg-[#06070a] border border-white/10 overflow-hidden relative shadow-md">
                <img
                  src="/astera/fabric.jpg"
                  alt="ASTERA electric silver starburst embroidery close-up"
                  className="w-full h-full object-cover filter contrast-115"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 text-[9px] font-mono tracking-[0.2em] text-[#a0c0f0] bg-black/80 px-2 py-1">
                  MACRO: CHROME EMBLEM
                </div>
              </div>
              {/* Emblem Patch */}
              <div className="w-full aspect-square bg-[#06070a] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-full h-full border border-[#a0c0f0]/30 p-4 flex flex-col justify-center items-center bg-[#07090e]">
                  <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#a0c0f0]">
                    A S T E R A
                  </div>
                  <div className="text-3xl font-['Syncopate'] font-bold text-white mt-2">
                    AS // 04
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.2em] text-[#a0c0f0]/70 mt-2 uppercase">
                    PROTAGONIST SPEC
                  </div>
                </div>
              </div>
            </div>

            {/* COL 3: 3 TECHNICAL BLOCKS */}
            <div className="md:col-span-6 lg:col-span-4 bg-[#06070a] border border-white/10 p-6 sm:p-8 rounded-none flex flex-col justify-between items-center text-center shadow-inner">

              {/* 1: 460 GSM DENSE COTTON */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#a0c0f0]/10 border border-[#a0c0f0]/30 flex items-center justify-center text-[#d8e4f8] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  460 GSM DENSE COTTON
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Engineered heavyweight drape with structured silhouette resilience.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-[#a0c0f0]/20 my-1" />

              {/* 2: ELECTRIC CHROME PRINT */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#a0c0f0]/10 border border-[#a0c0f0]/30 flex items-center justify-center text-[#d8e4f8] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  ELECTRIC CHROME PRINT
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Screen-printed liquid silver pigment that reflects cosmic ambient light.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-[#a0c0f0]/20 my-1" />

              {/* 3: PROTAGONIST SILHOUETTE */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#a0c0f0]/10 border border-[#a0c0f0]/30 flex items-center justify-center text-[#d8e4f8] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  PROTAGONIST SILHOUETTE
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Broadened shoulder frame and calibrated proportions for self-command.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ============================================================
            06 — THE COLLECTION (Garments in Futuristic Architecture)
            ============================================================ */}
        <section id="collection" className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040406]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE: GARMENTS ON ARCHITECTURAL RAIL */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden border border-[#a0c0f0]/30 bg-black shadow-2xl">
                <img
                  src="/astera/collection.jpg"
                  alt="ASTERA collection garments displayed in futuristic architectural setting"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#a0c0f0] uppercase mb-3">
                06 // PROTAGONIST ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white mb-6">
                THE COLLECTION
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed mb-8 max-w-xl">
                &ldquo;Pieces for the ones building what comes next.&rdquo;
              </p>

              <button
                type="button"
                onClick={() => alert('ASTERA Protocol 04: Allocation open for upcoming celestial capsule.')}
                className="w-fit px-8 py-4 border border-[#a0c0f0] hover:border-white text-white font-mono text-xs sm:text-sm uppercase tracking-[0.25em] transition-all hover:bg-[#a0c0f0] hover:text-black cursor-pointer mb-10"
              >
                EXPLORE ASTERA →
              </button>

              <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#a0c0f0]/60 uppercase">
                <span>ORBITAL TEES</span>
                <span>•</span>
                <span>CHROME HOODIES</span>
                <span>•</span>
                <span>STRUCTURAL JACKETS</span>
                <span>•</span>
                <span>LIMITED RUNS</span>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            07 — THE PROTAGONIST (Figure Overlooking Futuristic Skyline)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030305]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden border border-[#a0c0f0]/30 shadow-2xl">
                <img
                  src="/astera/protagonist.jpg"
                  alt="Protagonist standing in dark cosmic vista facing celestial planet and starlight beam"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#a0c0f0] uppercase mb-3">
                07 // COMMAND
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6">
                THIS IS YOUR ERA.
              </h2>

              <div className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed space-y-4 max-w-xl">
                <p>
                  &ldquo;Stop waiting for the world to make room for you.&rdquo;
                </p>
                <p>
                  The universe does not grant permission to leaders. They simply materialize and command their coordinates.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xl sm:text-2xl lg:text-3xl font-['Syncopate'] font-bold text-[#a0c0f0] tracking-[0.18em] uppercase">
                  LEAD WITHOUT PERMISSION.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            08 — OUR PROMISE (Four Minimal Principles)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040406] flex flex-col items-center text-center overflow-hidden">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#a0c0f0] uppercase mb-3 block">
              08 // PILLARS OF ASCENT
            </span>
            <h2 className="text-xs sm:text-sm lg:text-base font-mono tracking-[0.35em] uppercase text-white/80 mb-10 sm:mb-14 text-center">
              OUR PROMISE
            </h2>

            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {[
                {
                  num: '01',
                  title: 'CREATE',
                  desc: 'Build what does not exist yet. Fabricate original reality.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <polygon points="12 2 19 21 12 17 5 21 12 2" />
                    </svg>
                  ),
                },
                {
                  num: '02',
                  title: 'LEAD',
                  desc: 'Operate as the protagonist. Others will calibrate to your vision.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="12 6 12 12 16 14" />
                    </svg>
                  ),
                },
                {
                  num: '03',
                  title: 'EVOLVE',
                  desc: 'Constant adaptation. Never solidify into dogma or nostalgia.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                  ),
                },
                {
                  num: '04',
                  title: 'DEFINE',
                  desc: 'Shape the aesthetic horizon of your entire generation.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="w-full bg-[#06070a] border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-[#a0c0f0]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-none bg-[#a0c0f0]/10 border border-[#a0c0f0]/30 flex items-center justify-center text-[#d8e4f8] mb-4 shadow-sm transition-colors group-hover:scale-105">
                    {item.glyph}
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#a0c0f0] mb-1">
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
            09 — IDENTITY STATEMENT (Animated Words / Dominant Typography)
            ============================================================ */}
        <section className="relative w-full py-24 sm:py-36 lg:py-48 px-6 sm:px-12 bg-[#020204] border-t border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* CELESTIAL AMBIENT GLOW */}
          <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#a0c0f0]/15 via-[#c0d4f8]/10 to-transparent blur-[130px] pointer-events-none" />

          <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center">
            
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#a0c0f0] mb-8">
              09 // THE PROTAGONIST CREED
            </span>

            <div className="font-['Syncopate'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white leading-[1.08] select-none">
              <div>THIS</div>
              <div className="text-white/80">IS</div>
              <div className="text-white/60">YOUR</div>
              <div className="text-[#a0c0f0] drop-shadow-[0_0_40px_rgba(160,192,240,0.4)]">ERA.</div>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-col items-center">
              <div className="w-16 h-[2px] bg-[#a0c0f0] mb-6" />
              <div className="text-2xl sm:text-4xl font-['Syncopate'] font-light tracking-[0.4em] text-white uppercase ml-[0.4em]">
                A S T E R A
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            10 — JOIN THE CIRCLE (Futuristic Packaging)
            ============================================================ */}
        <section className="relative w-full border-t border-white/5 bg-[#040406] flex flex-col">
          {/* PACKAGING IMAGE BANNER */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src="/astera/box.jpg"
              alt="ASTERA futuristic matte black and electric silver packaging garment box"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-[#040406]/70" />

            {/* FLOATING TEXT */}
            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 max-w-[1500px] mx-auto w-full flex justify-between items-start">
              <div className="text-left font-['Syncopate'] text-sm sm:text-lg lg:text-2xl font-bold tracking-[0.25em] uppercase text-white leading-relaxed">
                JOIN
                <br />
                THE CIRCLE
              </div>

              <div className="text-right">
                <div className="font-['Syncopate'] text-xs sm:text-base lg:text-lg font-bold tracking-[0.3em] uppercase text-white whitespace-nowrap inline-block">
                  A S T E R A
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#a0c0f0] uppercase mt-1">
                  CELESTIAL ARCHIVE
                </div>
              </div>
            </div>
          </div>

          {/* EMAIL SUBSCRIBE ROW */}
          <div className="w-full bg-[#020204] border-t border-white/5 py-12 sm:py-16 px-5 sm:px-10 lg:px-16">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-lg text-center md:text-left">
                <h3 className="text-sm sm:text-base lg:text-lg font-['Syncopate'] font-bold tracking-[0.25em] uppercase text-white mb-2">
                  JOIN THE CIRCLE
                </h3>
                <p className="text-xs sm:text-sm font-['Outfit'] font-light text-white/60 leading-relaxed">
                  &ldquo;Build something worth remembering.&rdquo; Private transmission for upcoming celestial drops.
                </p>
              </div>

              {/* EMAIL FORM */}
              <div className="w-full md:w-auto flex-1 max-w-md">
                {isSubscribed ? (
                  <div className="p-4 border border-[#a0c0f0] text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#d8e4f8] bg-[#a0c0f0]/10">
                    TRANSMISSION RECORDED. WELCOME TO ASTERA.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex border border-white/20 bg-black/60 focus-within:border-[#a0c0f0] transition-colors">
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
                      className="px-6 bg-[#a0c0f0] hover:bg-[#c0d4f8] text-black transition-colors cursor-pointer text-xs font-mono tracking-[0.2em] uppercase font-bold"
                      aria-label="Submit email"
                    >
                      ENTER ASTERA →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================
            11 — MINIMAL FOOTER
            ============================================================ */}
        <footer className="w-full bg-[#020204] border-t border-white/5 py-16 sm:py-20 px-6 sm:px-12 lg:px-16 text-white/70">
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
                Experimental celestial streetwear built for protagonists defining their own era.
              </p>
            </div>

            {/* NAV LINKS */}
            <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#a0c0f0] text-[10px] mb-1 font-bold">NAVIGATION</span>
              <a href="#collection" className="hover:text-white transition-colors">SHOP</a>
              <a href="/about" className="hover:text-white transition-colors">ABOUT</a>
              <a href="mailto:contact@4log.in" className="hover:text-white transition-colors">CONTACT</a>
            </div>

            {/* NEXT WORLDS */}
            <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#a0c0f0] text-[10px] mb-1 font-bold">NEXT WORLD:</span>
              <div className="flex flex-col gap-2.5 text-white/60">
                <a href="/collections/nivora" className="hover:text-white hover:translate-x-1 transition-all">
                  → NIVORA <span className="text-white/30 text-[10px]">(NIHIL + AURA)</span>
                </a>
                <a href="/collections/vayren" className="hover:text-white hover:translate-x-1 transition-all">
                  → VAYREN <span className="text-white/30 text-[10px]">(VAIRAGYA + REBELLION)</span>
                </a>
                <a href="/collections/aurvia" className="hover:text-white hover:translate-x-1 transition-all">
                  → AURVIA <span className="text-white/30 text-[10px]">(AURUM + VIA)</span>
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
