import { useState, type FormEvent } from 'react';
import { Seo } from '../seo';

type ManiferaPageProps = {
  onToggleMenu?: () => void;
  onBackToWorld?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
};

export default function ManiferaPage({ onToggleMenu, onBackToWorld, soundEnabled = true, onToggleSound }: ManiferaPageProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onBackToWorld) {
      onBackToWorld();
    } else {
      window.history.pushState({ world: 'manifera' }, '', '/?world=manifera');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const maniferaSeo = {
    title: 'MANIFERA — Make It Visible | 4LOG Luxury Streetwear',
    description: 'MANIFERA: Manifest + Era. Turn what you believe into something visible. The intersection of luxury fashion, art installation, and sovereign creation.',
    canonical: 'https://4log.in/collections/manifera',
    ogTitle: 'MANIFERA — Make It Visible | 4LOG',
    ogDescription: 'MANIFERA: Manifest + Era. Clothing becomes a canvas.',
    ogImage: 'https://4log.in/manifera/hero.jpg',
  };

  return (
    <>
      <Seo page={maniferaSeo} />

      {/* FULL WEB SCREEN EDGE-TO-EDGE CONTAINER */}
      <div className="w-full min-h-screen bg-[#050505] text-[#e8e6e1] font-['Inter',sans-serif] selection:bg-[#c93b2b] selection:text-white overflow-x-hidden flex flex-col">

        {/* ============================================================
            CINEMATIC TOP NAVIGATION & WORLD BACK BUTTON
            ============================================================ */}
        <header className="fixed top-0 left-0 right-0 w-full z-[100] px-4 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center justify-between pointer-events-none transition-all duration-300">
          
          {/* ← BACK TO MANIFERA (ARROW ONLY) */}
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleBack}
              className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/20 bg-[#050505]/80 hover:bg-[#141414] hover:border-[#c93b2b]/80 text-[#e8e6e1] hover:text-[#c93b2b] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(201,59,43,0.22)] cursor-pointer"
              aria-label="Back to Manifera section on 4LOG"
              title="Back to Manifera"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-0.5">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* RIGHT: SOUND, MENU & 4LOG LOGO */}
          <div className="flex items-center gap-2.5 sm:gap-4 pointer-events-auto">
            {onToggleSound && (
              <button
                type="button"
                onClick={onToggleSound}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full border border-white/15 hover:border-white/40 text-white transition-all cursor-pointer"
                aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
                title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  {soundEnabled ? (
                    <>
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </>
                  ) : (
                    <>
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </>
                  )}
                </svg>
              </button>
            )}
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
              href="/?world=manifera"
              onClick={handleBack}
              className="opacity-75 hover:opacity-100 transition-opacity flex items-center"
              aria-label="4LOG Home"
            >
              <img src="/4log-logo.png" alt="4LOG" className="h-[20px] sm:h-[24px] w-auto object-contain" />
            </a>
          </div>

        </header>

        {/* ============================================================
            01 — HERO (Experimental Art-Gallery Environment)
            ============================================================ */}
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-12 lg:p-16">
          {/* BACKGROUND IMAGE - FULL SCREEN */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/manifera/hero.jpg"
              alt="Visionary figure in gallery throne overlooking monumental manifested city with crowned lions and art banners"
              className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-110"
              loading="eager"
            />
            {/* Seamless gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,5,0.75)_100%)] pointer-events-none" />
          </div>

          <div className="relative z-10" />

          {/* CENTER HEADLINE */}
          <div className="relative z-10 flex flex-col items-center mt-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#c93b2b] font-bold mb-3 drop-shadow-[0_2px_12px_rgba(201,59,43,0.3)]">
              05 // MANIFEST + ERA
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-['Syncopate'] font-bold tracking-[0.28em] sm:tracking-[0.38em] uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] ml-[0.28em] sm:ml-[0.38em] whitespace-nowrap inline-block">
              M A N I F E R A
            </h1>
            <p className="mt-3 sm:mt-5 text-[11px] sm:text-xs md:text-sm font-['Syncopate'] font-bold tracking-[0.35em] text-[#d4af37] uppercase">
              MAKE IT VISIBLE.
            </p>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-['Inter'] font-light tracking-[0.2em] text-white/80 max-w-xl leading-relaxed px-4">
              &ldquo;Belief means nothing until you give it form.&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-white/60">
              <span>IDEAS</span>
              <span className="text-[#c93b2b]">•</span>
              <span>PEOPLE</span>
              <span className="text-[#c93b2b]">•</span>
              <span>ACTION</span>
              <span className="text-[#c93b2b]">•</span>
              <span>REALITY</span>
            </div>
          </div>

          {/* CTA SCROLL INDICATOR */}
          <a
            href="#meaning"
            className="relative z-10 flex flex-col items-center gap-2 text-[#c93b2b]/70 hover:text-white transition-colors mb-2 sm:mb-6 cursor-pointer group"
            aria-label="Enter the manifesto"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase group-hover:text-white transition-colors">
              ENTER THE MANIFESTO ↓
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </section>


        {/* ============================================================
            02 — THE MEANING (Artistic Portrait & Installation)
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
                  <div className="w-2 h-2 bg-[#c93b2b]" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#c93b2b]">
                    THE MEANING
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white leading-tight mb-3">
                  M A N I F E R A
                </h2>

                <div className="text-[12px] sm:text-[14px] font-serif italic text-[#c93b2b] tracking-[0.1em] opacity-90 mb-6">
                  Manifest + Era
                </div>

                <blockquote className="mb-6 border-l border-[#c93b2b]/60 pl-4 sm:pl-6">
                  <p className="text-[15px] sm:text-[17px] md:text-[20px] font-light leading-[1.6] text-white tracking-wide font-['Outfit']">
                    &ldquo;Your beliefs become real when you give them form.&rdquo;
                  </p>
                </blockquote>

                <div className="text-[11px] sm:text-[12px] lg:text-[13px] leading-[1.8] tracking-[0.02em] text-white/60 font-['Inter'] space-y-3">
                  <p>
                    <span className="text-[#c93b2b]">Manifest</span> (to render tangible, visible, undeniable) fused with <span className="text-[#c93b2b]">Era</span> (the epoch shaped by conscious creators).
                  </p>
                  <p>
                    MANIFERA is the most expressive frontier of 4LOG. It is built for the visionaries, the painters of new systems, and the relentless builders who turn internal conviction into external monuments.
                  </p>
                  <p className="text-white/80 font-medium">
                    Not a follower. A builder. My world, my rules.
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[3/4] overflow-hidden bg-[#0a0808] border border-[#c93b2b]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                <img
                  src="/manifera/meaning.jpg"
                  alt="Artistic sculpture and throne in monumental manifested gallery"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.25em] text-[#c93b2b] uppercase">
                  FIG. 05-A // THE CREATOR ATELIER
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            03 — THE MANIFESTO (Large Typography-Driven Section)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-16 bg-[#040404] overflow-hidden border-t border-white/5">
          <div className="max-w-[1280px] mx-auto flex flex-col items-center">

            <div className="flex items-center gap-3 mb-12 sm:mb-16">
              <span className="w-8 h-[1px] bg-[#c93b2b]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#c93b2b]">
                03 // THE MANIFESTO
              </span>
              <span className="w-8 h-[1px] bg-[#c93b2b]" />
            </div>

            {/* FOUR PILLARS OCCUPYING VISUAL SPACE */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-[1100px] mb-16">
              {[
                { word: 'THINK IT.', num: '01', note: 'Conception' },
                { word: 'BELIEVE IT.', num: '02', note: 'Conviction' },
                { word: 'BUILD IT.', num: '03', note: 'Execution' },
                { word: 'SHOW IT.', num: '04', note: 'Reality' },
              ].map((item) => (
                <div
                  key={item.word}
                  className="p-6 sm:p-8 bg-[#080808] border border-white/10 flex flex-col items-start justify-between min-h-[160px] sm:min-h-[190px] relative hover:border-[#c93b2b]/50 transition-colors group"
                >
                  <span className="font-mono text-[10px] text-[#c93b2b] tracking-[0.3em]">
                    {item.num} // {item.note}
                  </span>
                  <span className="font-['Syncopate'] text-base sm:text-lg md:text-xl font-bold tracking-[0.18em] text-white uppercase mt-4">
                    {item.word}
                  </span>
                  <div className="w-4 h-[1px] bg-white/20 group-hover:w-8 group-hover:bg-[#c93b2b] transition-all mt-4" />
                </div>
              ))}
            </div>

            {/* STATEMENT TRANSITION */}
            <div className="w-full max-w-[960px] border-t border-[#c93b2b]/40 pt-12 sm:pt-16 flex flex-col items-center text-center">
              <p className="font-['Syncopate'] text-xs sm:text-sm font-bold tracking-[0.3em] text-white/50 uppercase mb-4">
                DON&apos;T KEEP IT IN YOUR HEAD.
              </p>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-['Syncopate'] font-bold tracking-[0.18em] uppercase text-white leading-tight">
                MAKE IT <span className="text-[#c93b2b]">VISIBLE.</span>
              </h2>
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
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c93b2b] uppercase mb-4">
                  04 // ATELIER CANVAS
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6 leading-tight">
                  THE DESIGN
                  <br />
                  PHILOSOPHY
                </h2>

                <blockquote className="border-l-2 border-[#c93b2b] pl-4 sm:pl-6 mb-6">
                  <p className="text-base sm:text-xl lg:text-2xl font-['Outfit'] font-light text-white leading-relaxed">
                    &ldquo;Clothing becomes a canvas.&rdquo;
                  </p>
                </blockquote>

                <div className="space-y-4 text-xs sm:text-sm font-['Inter'] text-white/65 leading-relaxed font-light mb-8">
                  <p>
                    MANIFERA treats every garment as an uncompromised art installation. Heavy 480 GSM dense cotton canvas is engineered with hand-pulled ink prints, raw edge finishes, and experimental graphic placements.
                  </p>
                  <p>
                    We reject passive mass-manufacturing. Each piece carries an explicit statement, tactile texture, and gallery-level precision.
                  </p>
                </div>

                {/* ATTRIBUTES */}
                <div className="grid grid-cols-2 gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c93b2b]" />
                    <span>CANVAS COTTON</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c93b2b]" />
                    <span>HAND-PULLED INK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c93b2b]" />
                    <span>RAW ATELIER CUT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c93b2b]" />
                    <span>GALLERY LABEL</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT MACRO FABRIC */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[420px] aspect-square overflow-hidden bg-[#090808] border border-[#c93b2b]/30 shadow-2xl">
                <img
                  src="/manifera/fabric.jpg"
                  alt="MANIFERA textile macro with hand-drawn raw stitch details"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                  loading="lazy"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 border border-[#c93b2b]/40 text-[9px] font-mono tracking-[0.25em] text-[#e8e6e1] uppercase">
                  SPEC // 480 GSM CANVAS KNIT
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            05 — PRODUCT DETAIL GRID (CAD Blueprint + Macros + Specs)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030303]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">

            {/* COL 1: TECHNICAL FLAT SKETCH */}
            <div className="md:col-span-12 lg:col-span-5 bg-[#060606] border border-white/10 p-5 sm:p-7 rounded-none flex items-center justify-center relative shadow-inner overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px]">
                <img
                  src="/manifera/technical-sketch.jpg"
                  alt="MANIFERA technical blueprint with hand-drawn artistic annotations"
                  className="w-full h-full max-h-[560px] object-contain object-center filter contrast-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* COL 2: CENTER MACROS */}
            <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6">
              {/* Fabric close */}
              <div className="w-full aspect-square bg-[#060606] border border-white/10 overflow-hidden relative shadow-md">
                <img
                  src="/manifera/fabric.jpg"
                  alt="MANIFERA raw edge and stitch macro"
                  className="w-full h-full object-cover filter contrast-115"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 text-[9px] font-mono tracking-[0.2em] text-[#c93b2b] bg-black/80 px-2 py-1">
                  MACRO: CANVAS WEAVE
                </div>
              </div>
              {/* Emblem Patch */}
              <div className="w-full aspect-square bg-[#060606] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-full h-full border border-[#c93b2b]/30 p-4 flex flex-col justify-center items-center bg-[#090808]">
                  <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#c93b2b]">
                    M A N I F E R A
                  </div>
                  <div className="text-3xl font-['Syncopate'] font-bold text-white mt-2">
                    MF // 05
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.2em] text-[#c93b2b]/70 mt-2 uppercase">
                    CANVAS EDITION
                  </div>
                </div>
              </div>
            </div>

            {/* COL 3: 3 TECHNICAL BLOCKS */}
            <div className="md:col-span-6 lg:col-span-4 bg-[#060606] border border-white/10 p-6 sm:p-8 rounded-none flex flex-col justify-between items-center text-center shadow-inner">

              {/* 1: 480 GSM CANVAS COTTON */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#c93b2b]/10 border border-[#c93b2b]/30 flex items-center justify-center text-[#c93b2b] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  480 GSM CANVAS COTTON
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Heavy tactile weave engineered to function as wearable artwork.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-[#c93b2b]/20 my-1" />

              {/* 2: HAND-PULLED INK */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#c93b2b]/10 border border-[#c93b2b]/30 flex items-center justify-center text-[#c93b2b] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  HAND-PULLED INK
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Thick pigment application with subtle distress variations per unit.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-[#c93b2b]/20 my-1" />

              {/* 3: RAW ATELIER CUT */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-[#c93b2b]/10 border border-[#c93b2b]/30 flex items-center justify-center text-[#c93b2b] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  RAW ATELIER CUT
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Sculptural drop-shoulder silhouette with raw unhemmed cuffs.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ============================================================
            06 — THE COLLECTION (Contemporary Gallery Artwork Presentation)
            ============================================================ */}
        <section id="collection" className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040404]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE: GARMENTS AS GALLERY ARTWORK */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden border border-[#c93b2b]/30 bg-black shadow-2xl">
                <img
                  src="/manifera/collection.jpg"
                  alt="MANIFERA garments displayed like artwork in contemporary gallery installation"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c93b2b] uppercase mb-3">
                06 // GALLERY ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white mb-6">
                THE COLLECTION
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed mb-8 max-w-xl">
                &ldquo;Every piece carries an idea.&rdquo;
              </p>

              <button
                type="button"
                onClick={() => alert('MANIFERA Exhibition 05: Private gallery allocation strictly limited to 75 numbered pieces.')}
                className="w-fit px-8 py-4 border border-[#c93b2b] hover:border-white text-white font-mono text-xs sm:text-sm uppercase tracking-[0.25em] transition-all hover:bg-[#c93b2b] hover:text-white cursor-pointer mb-10"
              >
                EXPLORE MANIFERA →
              </button>

              <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#c93b2b]/70 uppercase">
                <span>CANVAS TEES</span>
                <span>•</span>
                <span>PAINTED HOODIES</span>
                <span>•</span>
                <span>SCULPTURAL COATS</span>
                <span>•</span>
                <span>NUMBERED DROPS</span>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            07 — THE ART OF BECOMING (Figure Inside Installation)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030303]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden border border-[#c93b2b]/30 shadow-2xl">
                <img
                  src="/manifera/lifestyle.jpg"
                  alt="Visionary figure standing inside monumental architectural art installation"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c93b2b] uppercase mb-3">
                07 // THE ART OF BECOMING
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6">
                MORE THAN CLOTHES
              </h2>

              <div className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed space-y-4 max-w-xl">
                <p>
                  &ldquo;What you wear can carry what you believe.&rdquo;
                </p>
                <p>
                  Do not leave your vision in the realm of thoughts. Manifest it physically. Let your presence become an uncompromised art installation.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xl sm:text-2xl lg:text-3xl font-['Syncopate'] font-bold text-[#c93b2b] tracking-[0.18em] uppercase">
                  MAKE YOUR IDEAS VISIBLE.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            08 — OUR PROMISE (Four Hand-Drawn Principles)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040404] flex flex-col items-center text-center overflow-hidden">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#c93b2b] uppercase mb-3 block">
              08 // MANIFESTO PRINCIPLES
            </span>
            <h2 className="text-xs sm:text-sm lg:text-base font-mono tracking-[0.35em] uppercase text-white/80 mb-10 sm:mb-14 text-center">
              OUR PROMISE
            </h2>

            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {[
                {
                  num: '01',
                  title: 'IMAGINE',
                  desc: 'Envision realities that have never existed on any map.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                  ),
                },
                {
                  num: '02',
                  title: 'CREATE',
                  desc: 'Shape raw materials with relentless discipline and intent.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <line x1="12" y1="12" x2="12" y2="22" />
                    </svg>
                  ),
                },
                {
                  num: '03',
                  title: 'EXPRESS',
                  desc: 'Refuse silence. Communicate with uncompromised courage.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  ),
                },
                {
                  num: '04',
                  title: 'MANIFEST',
                  desc: 'Bring what was internal into external, monumental reality.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="w-full bg-[#070707] border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-[#c93b2b]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-none bg-[#c93b2b]/10 border border-[#c93b2b]/30 flex items-center justify-center text-[#c93b2b] mb-4 shadow-sm transition-colors group-hover:scale-105">
                    {item.glyph}
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#c93b2b] mb-1">
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
            09 — IDENTITY STATEMENT (Massive Typography Overlapping Art)
            ============================================================ */}
        <section className="relative w-full py-24 sm:py-36 lg:py-48 px-6 sm:px-12 bg-[#020202] border-t border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* GALLERY COLLAGE BACKGROUND OVERLAY */}
          <div className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#c93b2b]/15 via-[#d4af37]/10 to-transparent blur-[130px] pointer-events-none" />

          <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center">
            
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#c93b2b] mb-8">
              09 // THE CREATOR DECREE
            </span>

            <div className="font-['Syncopate'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white leading-[1.08] select-none">
              <div>MAKE</div>
              <div className="text-white/80">IT</div>
              <div className="text-[#c93b2b] drop-shadow-[0_0_40px_rgba(201,59,43,0.4)]">VISIBLE.</div>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-col items-center">
              <div className="w-16 h-[2px] bg-[#c93b2b] mb-6" />
              <div className="text-2xl sm:text-4xl font-['Syncopate'] font-light tracking-[0.4em] text-white uppercase ml-[0.4em]">
                M A N I F E R A
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            10 — JOIN THE CIRCLE (Artistic Packaging & Manifesto Transmissions)
            ============================================================ */}
        <section className="relative w-full border-t border-white/5 bg-[#040404] flex flex-col">
          {/* PACKAGING IMAGE BANNER */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src="/manifera/box.jpg"
              alt="MANIFERA artistic matte black luxury packaging box with wax seal"
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
                  M A N I F E R A
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#c93b2b] uppercase mt-1">
                  ATELIER ARCHIVE
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
                  &ldquo;For those who refuse to leave their ideas invisible.&rdquo; Private gallery invitations for upcoming drops.
                </p>
              </div>

              {/* EMAIL FORM */}
              <div className="w-full md:w-auto flex-1 max-w-md">
                {isSubscribed ? (
                  <div className="p-4 border border-[#c93b2b] text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#e8e6e1] bg-[#c93b2b]/10">
                    TRANSMISSION RECORDED. WELCOME TO MANIFERA.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex border border-white/20 bg-black/60 focus-within:border-[#c93b2b] transition-colors">
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
                      className="px-6 bg-[#c93b2b] hover:bg-[#b03022] text-white transition-colors cursor-pointer text-xs font-mono tracking-[0.2em] uppercase font-bold"
                      aria-label="Submit email"
                    >
                      ENTER MANIFERA →
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
                Experimental wearable art installation. Turning visionary conviction into sovereign physical reality.
              </p>
            </div>

            {/* NAV LINKS */}
            <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#c93b2b] text-[10px] mb-1 font-bold">NAVIGATION</span>
              <a href="#collection" className="hover:text-white transition-colors">SHOP</a>
              <a href="/about" className="hover:text-white transition-colors">ABOUT</a>
              <a href="mailto:contact@4log.in" className="hover:text-white transition-colors">CONTACT</a>
            </div>

            {/* NEXT WORLDS */}
            <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#c93b2b] text-[10px] mb-1 font-bold">NEXT WORLD:</span>
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
                <a href="/collections/astera" className="hover:text-white hover:translate-x-1 transition-all">
                  → ASTERA <span className="text-white/30 text-[10px]">(ASTRA + ERA)</span>
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
