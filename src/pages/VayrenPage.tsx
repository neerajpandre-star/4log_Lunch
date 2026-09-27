import { useState, type FormEvent } from 'react';
import { Seo } from '../seo';

type VayrenPageProps = {
  onToggleMenu?: () => void;
  onBackToWorld?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
};

export default function VayrenPage({ onToggleMenu, onBackToWorld, soundEnabled = true, onToggleSound }: VayrenPageProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onBackToWorld) {
      onBackToWorld();
    } else {
      window.history.pushState({ world: 'vayren' }, '', '/?world=vayren');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const vayrenSeo = {
    title: 'VAYREN — The Rebellion | 4LOG Luxury Streetwear',
    description: 'VAYREN: Vairagya + Rebellion. Detachment from expectations. The freedom to stop living for other people’s approval. Heavyweight luxury streetwear engineered for quiet rebellion.',
    canonical: 'https://4log.in/collections/vayren',
    ogTitle: 'VAYREN — The Rebellion | 4LOG',
    ogDescription: 'VAYREN: Vairagya + Rebellion. Detach from the noise. Disobey the default script.',
    ogImage: 'https://4log.in/vayren/hero.jpg',
  };

  return (
    <>
      <Seo page={vayrenSeo} />

      {/* FULL WEB SCREEN EDGE-TO-EDGE CONTAINER */}
      <div className="w-full min-h-screen bg-[#050505] text-[#dcdcdc] font-['Inter',sans-serif] selection:bg-[#e60019] selection:text-white overflow-x-hidden flex flex-col">

        {/* ============================================================
            CINEMATIC TOP NAVIGATION & WORLD BACK BUTTON
            ============================================================ */}
        <header className="fixed top-0 left-0 right-0 w-full z-[100] px-4 sm:px-8 lg:px-12 py-4 sm:py-6 flex items-center justify-between pointer-events-none transition-all duration-300">
          
          {/* ← BACK TO VAYREN (ARROW ONLY) */}
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleBack}
              className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/15 bg-[#0a0a0a]/75 hover:bg-[#141414] hover:border-[#e60019]/80 text-[#dcdcdc] hover:text-[#e60019] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
              aria-label="Back to Vayren section on 4LOG"
              title="Back to Vayren"
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
              href="/?world=vayren"
              onClick={handleBack}
              className="opacity-75 hover:opacity-100 transition-opacity flex items-center"
              aria-label="4LOG Home"
            >
              <img src="/4log-logo.png" alt="4LOG" className="h-[20px] sm:h-[24px] w-auto object-contain" />
            </a>
          </div>

        </header>

        {/* ============================================================
            01 — HERO (Full-Screen Cinematic Hero)
            ============================================================ */}
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-12 lg:p-16">
          {/* BACKGROUND IMAGE - FULL SCREEN */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/vayren/hero.jpg"
              alt="Solitary figure walking through brutalist landscape"
              className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-110 saturate-[0.85]"
              loading="eager"
            />
            {/* Blends hero smoothly into #040404 without hard cuts */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-[#040404]/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 bg-gradient-to-t from-[#040404] via-[#040404]/90 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
          </div>

          <div className="relative z-10" />

          {/* CENTER HEADLINE */}
          <div className="relative z-10 flex flex-col items-center mt-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#e60019] font-bold mb-3 drop-shadow-[0_2px_12px_rgba(230,0,25,0.4)]">
              WORLD 02 // REBELLION ARCHIVE
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-['Syncopate'] font-bold tracking-[0.28em] sm:tracking-[0.38em] uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] ml-[0.28em] sm:ml-[0.38em] whitespace-nowrap inline-block">
              V A Y R E N
            </h1>
            <p className="mt-3 sm:mt-5 text-[11px] sm:text-xs md:text-sm font-['Syncopate'] font-bold tracking-[0.35em] text-white/90 uppercase">
              THE REBELLION
            </p>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-['Inter'] font-light tracking-[0.25em] text-white/70 max-w-xl leading-relaxed px-4">
              &ldquo;They told you who to become.
              <br />
              You chose otherwise.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#e60019]/90 uppercase">
              <span>DETACH.</span>
              <span className="text-white/30">•</span>
              <span>DISOBEY.</span>
              <span className="text-white/30">•</span>
              <span>BECOME.</span>
            </div>
          </div>

          {/* BOTTOM SCROLL INDICATOR */}
          <a
            href="#meaning"
            className="relative z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors mb-2 sm:mb-6 cursor-pointer group"
            aria-label="Scroll to enter"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase group-hover:text-white transition-colors">
              SCROLL TO ENTER
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
          className="w-full bg-[#040404] px-4 sm:px-6 md:px-[6vw] lg:px-[8vw] py-14 sm:py-16 md:py-[72px] lg:py-[88px] min-h-[500px] flex items-center justify-center overflow-hidden border-t border-white/5"
        >
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="w-full flex justify-start md:justify-end items-center">
              <div className="w-full max-w-[460px] flex flex-col justify-center">

                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-2 h-2 bg-[#e60019]" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-white/60">
                    THE MEANING
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white leading-tight mb-3">
                  V A Y R E N
                </h2>

                <div className="text-[12px] sm:text-[14px] font-serif italic text-[#e60019] tracking-[0.1em] opacity-90 mb-6">
                  Vairagya + Rebellion
                </div>

                <blockquote className="mb-6 border-l border-[#e60019]/60 pl-4 sm:pl-6">
                  <p className="text-[15px] sm:text-[17px] md:text-[20px] font-light leading-[1.6] text-white tracking-wide font-['Outfit']">
                    &ldquo;The freedom to stop living for other people&apos;s approval.&rdquo;
                  </p>
                </blockquote>

                <div className="text-[11px] sm:text-[12px] lg:text-[13px] leading-[1.8] tracking-[0.02em] text-white/60 font-['Inter'] space-y-3">
                  <p>
                    VAYREN is born at the exact collision point between ancient Vairagya—the art of radical detachment—and silent defiance.
                  </p>
                  <p>
                    It is the conscious decision to sever yourself from society&apos;s expectation matrix, borrowed benchmarks, and performative validation. You do not argue with their script. You simply step outside of it.
                  </p>
                  <p className="text-white/80 font-medium">
                    When you detach from their applause, you conquer their control.
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[3/4] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                <img
                  src="/vayren/meaning.jpg"
                  alt="Masked solitary figure in brutalist environment"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
                  FIG. 02-B // REBEL SILHOUETTE
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            03 — THE REBELLION (Concrete Imposed Words vs Defiance)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-16 bg-[#030303] overflow-hidden border-t border-white/5">
          {/* BACKGROUND CONCRETE WALL IMAGE */}
          <div className="absolute inset-0 z-0">
            <img
              src="/vayren/rebellion.jpg"
              alt="Concrete wall covered with stenciled words"
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]" />
            <div className="absolute inset-0 bg-[#030303]/60 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center text-center">
            
            <div className="flex items-center gap-2 mb-8">
              <span className="w-8 h-[1px] bg-[#e60019]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#e60019]">
                03 // THE VOICES OF SOCIETY
              </span>
              <span className="w-8 h-[1px] bg-[#e60019]" />
            </div>

            {/* STENCILED PRESSURE WORDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 w-full max-w-[960px] mb-14 sm:mb-20">
              {[
                'GET A REAL JOB',
                'BE NORMAL',
                'PLAY SAFE',
                'FIT IN',
                'DON’T BE DIFFERENT',
                'WHAT WILL PEOPLE SAY?',
              ].map((word) => (
                <div
                  key={word}
                  className="p-4 sm:p-6 bg-black/60 border border-white/10 flex items-center justify-center text-center backdrop-blur-sm group hover:border-[#e60019]/50 transition-colors"
                >
                  <span className="font-['Syncopate'] text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-white/40 group-hover:text-white/80 transition-colors uppercase">
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {/* TRANSITION STATEMENT */}
            <div className="w-full max-w-[900px] border-t border-[#e60019]/40 pt-10 sm:pt-14">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-['Syncopate'] font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase text-white leading-tight">
                I DON&apos;T OWE THEM
                <br />
                <span className="text-[#e60019]">AN EXPLANATION.</span>
              </h2>
              <p className="mt-6 text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] text-white/60 uppercase">
                Quiet rebellion against the path chosen for you.
              </p>
            </div>

          </div>
        </section>


        {/* ============================================================
            04 — DESIGN PHILOSOPHY (Split Layout)
            ============================================================ */}
        <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-[6vw] lg:px-[8vw] bg-[#050505] border-t border-white/5">
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* LEFT TEXT */}
            <div className="w-full flex justify-start md:justify-end items-center">
              <div className="w-full max-w-[480px] flex flex-col justify-center">
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#e60019] uppercase mb-4">
                  04 // ARCHITECTURAL INTENT
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6 leading-tight">
                  THE DESIGN
                  <br />
                  PHILOSOPHY
                </h2>

                <blockquote className="border-l-2 border-[#e60019] pl-4 sm:pl-6 mb-6">
                  <p className="text-base sm:text-xl lg:text-2xl font-['Outfit'] font-light text-white leading-relaxed">
                    &ldquo;Built for those who don&apos;t dress to be understood.&rdquo;
                  </p>
                </blockquote>

                <div className="space-y-4 text-xs sm:text-sm font-['Inter'] text-white/65 leading-relaxed font-light mb-8">
                  <p>
                    Every cut is an act of defiance. We rejected modern fast-fashion silhouettes in favor of brutalist proportions—heavy drop-shoulder structures, dropped armholes, and dense textured cotton that falls like armor.
                  </p>
                  <p>
                    Distressed typographic stamps and subtle industrial seams communicate allegiance without shouting.
                  </p>
                </div>

                {/* TECHNICAL ATTRIBUTES */}
                <div className="grid grid-cols-2 gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#e60019]" />
                    <span>HEAVY COTTON</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#e60019]" />
                    <span>OVERSIZED FIT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#e60019]" />
                    <span>DISTRESSED TYPE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#e60019]" />
                    <span>RAW STITCHING</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT MACRO IMAGE */}
            <div className="w-full flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-[420px] aspect-square overflow-hidden bg-[#090909] border border-white/10 shadow-2xl">
                <img
                  src="/vayren/fabric.jpg"
                  alt="VAYREN macro fabric and woven label"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                  loading="lazy"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 border border-white/15 text-[9px] font-mono tracking-[0.25em] text-white/80 uppercase">
                  SPEC // 420 GSM COMBED WEAVE
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            05 — PRODUCT DETAIL GRID (CAD Sketch + Macros + Specs)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030303]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">

            {/* COL 1: TECHNICAL CAD SKETCH */}
            <div className="md:col-span-12 lg:col-span-5 bg-[#060606] border border-white/10 p-5 sm:p-7 rounded-none flex items-center justify-center relative shadow-inner overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px]">
                <img
                  src="/vayren/technical-sketch.jpg"
                  alt="VAYREN technical sketch with measurements and annotations"
                  className="w-full h-full max-h-[560px] object-contain object-center filter contrast-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* COL 2: CENTER MACROS */}
            <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6">
              {/* Top: Fabric Close */}
              <div className="w-full aspect-square bg-[#060606] border border-white/10 overflow-hidden relative shadow-md">
                <img
                  src="/vayren/fabric.jpg"
                  alt="VAYREN raw edge stitch detail"
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 text-[9px] font-mono tracking-[0.2em] text-white/60 bg-black/80 px-2 py-1">
                  MACRO: RAW SEAM
                </div>
              </div>
              {/* Bottom: Signature Insignia Patch */}
              <div className="w-full aspect-square bg-[#060606] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-full h-full border border-white/15 p-4 flex flex-col justify-center items-center bg-[#090909]">
                  <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#e60019]">
                    V A Y R E N
                  </div>
                  <div className="text-3xl font-['Syncopate'] font-bold text-white mt-2">
                    V // 02
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.2em] text-white/40 mt-2 uppercase">
                    REBELLION SPEC
                  </div>
                </div>
              </div>
            </div>

            {/* COL 3: 3 TECHNICAL ANNOTATION BLOCKS */}
            <div className="md:col-span-6 lg:col-span-4 bg-[#060606] border border-white/10 p-6 sm:p-8 rounded-none flex flex-col justify-between items-center text-center shadow-inner">

              {/* 1: HEAVYWEIGHT COTTON */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#e60019] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  HEAVYWEIGHT COTTON
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  420 GSM custom loopback knit. Dense, structured drape.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-white/10 my-1" />

              {/* 2: OVERSIZED CUT */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#e60019] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 8l8-4 8 4-8 4-8-4z" />
                    <path d="M4 14l8 4 8-4" />
                    <path d="M4 18l8 4 8-4" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  OVERSIZED CUT
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Architectural drop shoulders with relaxed sleeves.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-white/10 my-1" />

              {/* 3: RAW EDGE DETAIL */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-none bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#e60019] mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  SIGNATURE VAYREN MARK
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Unfinished hem detailing with reinforced bar-tacks.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ============================================================
            06 — THE COLLECTION (Garments Hanging on Industrial Rack)
            ============================================================ */}
        <section id="collection" className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040404]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE: GARMENTS ON INDUSTRIAL RAIL */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] overflow-hidden border border-white/10 bg-black shadow-2xl">
                <img
                  src="/vayren/collection.jpg"
                  alt="VAYREN garments hanging in dark industrial showroom"
                  className="w-full h-full object-cover object-center filter contrast-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#e60019] uppercase mb-3">
                06 // LIMITED ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white mb-6">
                THE COLLECTION
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed mb-8 max-w-xl">
                &ldquo;For those who stopped asking for permission.&rdquo;
              </p>

              <button
                type="button"
                onClick={() => alert('VAYREN Drop 01 Catalog: Initial release strictly limited to 100 numbered pieces.')}
                className="w-fit px-8 py-4 border border-[#e60019] hover:border-white text-white font-mono text-xs sm:text-sm uppercase tracking-[0.25em] transition-all hover:bg-[#e60019] cursor-pointer mb-10"
              >
                EXPLORE VAYREN →
              </button>

              <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
                <span>HEAVY TEES</span>
                <span>•</span>
                <span>OVERSIZED HOODIES</span>
                <span>•</span>
                <span>CARGO ARMOR</span>
                <span>•</span>
                <span>REBELLION DROPS</span>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            07 — MORE THAN CLOTHES (Rooftop Figure Facing Storm)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#030303]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[16/9] sm:aspect-[4/3] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/vayren/rooftop.jpg"
                  alt="Solitary figure standing on abandoned brutalist rooftop overlooking storm"
                  className="w-full h-full object-cover object-center filter contrast-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#e60019] uppercase mb-3">
                07 // MANIFESTO
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] uppercase text-white mb-6">
                MORE THAN CLOTHES
              </h2>

              <div className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed space-y-4 max-w-xl">
                <p>
                  &ldquo;You don&apos;t have to explain why you chose another path.&rdquo;
                </p>
                <p>
                  VAYREN exists for the ones who walked away from the predetermined career track, the expected opinions, and the comfort of the crowd.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xl sm:text-2xl lg:text-3xl font-['Syncopate'] font-bold text-white tracking-[0.18em] uppercase">
                  DETACH FROM <span className="text-[#e60019]">THE NOISE.</span>
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            08 — OUR PROMISE (Minimal 4-Column Grid)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-[#040404] flex flex-col items-center text-center overflow-hidden">
          <div className="relative z-10 w-full max-w-[1400px] mx-auto">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#e60019] uppercase mb-3 block">
              08 // PRINCIPLES
            </span>
            <h2 className="text-xs sm:text-sm lg:text-base font-mono tracking-[0.35em] uppercase text-white/80 mb-10 sm:mb-14 text-center">
              OUR PROMISE
            </h2>

            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {[
                {
                  num: '01',
                  title: 'DETACH',
                  desc: 'Sever from public expectations and external validation.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="9" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                  ),
                },
                {
                  num: '02',
                  title: 'QUESTION',
                  desc: 'Interrogate the default scripts written by the crowd.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <polygon points="12 2 2 22 22 22" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  ),
                },
                {
                  num: '03',
                  title: 'REBEL',
                  desc: 'Build your reality in silence without asking permission.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                },
                {
                  num: '04',
                  title: 'BECOME',
                  desc: 'Step into the uncompromised architecture of your true self.',
                  glyph: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="3" y="3" width="18" height="18" />
                      <rect x="8" y="8" width="8" height="8" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="w-full bg-[#070707] border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-[#e60019]/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-none bg-white/[0.02] border border-white/15 flex items-center justify-center text-white/90 group-hover:text-[#e60019] mb-4 shadow-sm transition-colors">
                    {item.glyph}
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#e60019] mb-1">
                    {item.num}
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-[0.25em] font-bold text-white uppercase block mb-2">
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
            09 — IDENTITY STATEMENT (Typography Dominates Screen)
            ============================================================ */}
        <section className="relative w-full py-24 sm:py-36 lg:py-48 px-6 sm:px-12 bg-[#020202] border-t border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="max-w-[1200px] mx-auto flex flex-col items-center">
            
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#e60019] mb-8">
              09 // ABSOLUTE STATEMENT
            </span>

            <div className="font-['Syncopate'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white leading-[1.08] select-none">
              <div>I DON&apos;T</div>
              <div className="text-white/80">NEED</div>
              <div className="text-white/60">YOUR</div>
              <div className="text-[#e60019]">APPROVAL.</div>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-col items-center">
              <div className="w-16 h-[2px] bg-[#e60019] mb-6" />
              <div className="text-2xl sm:text-4xl font-['Syncopate'] font-light tracking-[0.4em] text-white uppercase ml-[0.4em]">
                V A Y R E N
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            10 — JOIN THE CIRCLE (Dark Product Packaging Box)
            ============================================================ */}
        <section className="relative w-full border-t border-white/5 bg-[#040404] flex flex-col">
          {/* PACKAGING IMAGE BANNER */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src="/vayren/box.jpg"
              alt="VAYREN matte black luxury packaging box"
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
                  V A Y R E N
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#e60019] uppercase mt-1">
                  VAIRAGYA ARCHIVE
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
                  &ldquo;For those who move differently.&rdquo; Direct transmission for upcoming numbered drops.
                </p>
              </div>

              {/* EMAIL FORM */}
              <div className="w-full md:w-auto flex-1 max-w-md">
                {isSubscribed ? (
                  <div className="p-4 border border-[#e60019]/60 text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white bg-[#e60019]/10">
                    TRANSMISSION RECORDED. WELCOME TO VAYREN.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex border border-white/20 bg-black/60 focus-within:border-[#e60019] transition-colors">
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
                      className="px-6 bg-[#e60019] hover:bg-[#c40015] text-white transition-colors cursor-pointer text-xs font-mono tracking-[0.2em] uppercase font-bold"
                      aria-label="Submit email"
                    >
                      ENTER VAYREN →
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
                Autonomous luxury streetwear built for those who refuse to fit into existing frameworks.
              </p>
            </div>

            {/* NAV LINKS */}
            <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#e60019] text-[10px] mb-1 font-bold">NAVIGATION</span>
              <a href="#collection" className="hover:text-white transition-colors">SHOP</a>
              <a href="/about" className="hover:text-white transition-colors">ABOUT</a>
              <a href="mailto:contact@4log.in" className="hover:text-white transition-colors">CONTACT</a>
            </div>

            {/* NEXT WORLDS */}
            <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs tracking-[0.25em] uppercase">
              <span className="text-[#e60019] text-[10px] mb-1 font-bold">NEXT WORLD:</span>
              <div className="flex flex-col gap-2.5 text-white/60">
                <a href="/collections/nivora" className="hover:text-white hover:translate-x-1 transition-all">
                  → NIVORA <span className="text-white/30 text-[10px]">(NIHIL + AURA)</span>
                </a>
                <a href="/collections/aurvia" className="hover:text-white hover:translate-x-1 transition-all">
                  → AURVIA <span className="text-white/30 text-[10px]">(AURUM + VIA)</span>
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
