import { useState, type FormEvent } from 'react';
import { Seo } from '../seo';

type NivoraPageProps = {
  onToggleMenu?: () => void;
};

export default function NivoraPage({ onToggleMenu: _onToggleMenu }: NivoraPageProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const nivoraSeo = {
    title: 'NIVORA — Clothing For Those Who Don’t Need Approval',
    description: 'NIVORA: Nihil + Aura. No need for outside approval. Your own aura. Minimalist obsidian luxury streetwear engineered for unyielding focus.',
    canonical: 'https://4log.in/collections/nivora',
    ogTitle: 'NIVORA — Clothing For Those Who Don’t Need Approval',
    ogDescription: 'NIVORA: Nihil + Aura. No need for outside approval. Your own aura.',
    ogImage: 'https://4log.in/nivora/hero.jpg',
  };

  return (
    <>
      <Seo page={nivoraSeo} />

      {/* FULL WEB SCREEN EDGE-TO-EDGE CONTAINER */}
      <div className="w-full min-h-screen bg-[#070707] text-[#e0e0e0] font-['Inter',sans-serif] selection:bg-white selection:text-black overflow-x-hidden flex flex-col">

        {/* ============================================================
            02 — HERO SECTION (Full-Width Edge-to-Edge)
            ============================================================ */}
        <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] lg:min-h-screen overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-12 lg:p-16">
          {/* BACKGROUND IMAGE - FULL SCREEN */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/nivora/hero.jpg"
              alt="Lone hooded figure in misty mountain landscape"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
              loading="eager"
            />
            {/* Blends hero smoothly into #050505 without hard cuts */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-80 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
          </div>

          <div className="relative z-10" />

          {/* CENTER HEADLINE */}
          <div className="relative z-10 flex flex-col items-center mt-auto mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-['Syncopate'] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] ml-[0.3em] sm:ml-[0.4em] whitespace-nowrap inline-block">
              N I V O R <span className="font-light">Λ</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-['Inter'] font-medium uppercase tracking-[0.3em] text-white/90 max-w-xl leading-relaxed px-4">
              CLOTHING FOR THOSE WHO
              <br />
              DON&apos;T NEED APPROVAL
            </p>
          </div>

          {/* BOTTOM CHEVRON */}
          <a
            href="#meaning"
            className="relative z-10 text-white/60 hover:text-white transition-colors mb-2 sm:mb-6 cursor-pointer animate-bounce"
            aria-label="Scroll down"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </section>


        {/* ============================================================
            03 — THE MEANING (Two-Column Editorial Section)
            ============================================================ */}
        <section
          id="meaning"
          className="w-full bg-[#050505] px-3 sm:px-6 md:px-[6vw] lg:px-[8vw] py-10 sm:py-12 md:py-[64px] lg:py-[72px] min-h-[480px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-10 items-center">

            {/* LEFT CONTENT — EQUIDISTANT FROM CENTER */}
            <div className="w-full flex justify-end items-center">
              <div className="w-full max-w-[420px] sm:max-w-[440px] md:max-w-[460px] flex flex-col justify-center">

                {/* THE MEANING */}
                <span
                  className="text-[10px] sm:text-[11px] md:text-[12px] font-mono tracking-[0.25em] uppercase text-white/70 block mt-3 sm:mt-5 md:mt-8"
                  style={{ marginTop: 'clamp(24px, 2.5vw, 32px)', marginBottom: 'clamp(28px, 3.5vw, 38px)' }}
                >
                  THE MEANING
                </span>

                {/* N I V O R Λ */}
                <h2
                  className="text-[18px] xs:text-[22px] sm:text-[28px] md:text-[38px] lg:text-[44px] font-light font-['Syncopate'] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-white leading-none block whitespace-nowrap inline-block"
                  style={{ marginBottom: 'clamp(22px, 3vw, 36px)' }}
                >
                  N I V O R <span className="font-light">Λ</span>
                </h2>

                {/* Nihil + Aura */}
                <div
                  className="text-[11px] sm:text-[13px] md:text-[14px] font-serif italic text-white/75 tracking-[0.08em] opacity-75 pl-8 sm:pl-14 md:pl-20"
                  style={{ marginLeft: 'clamp(36px, 6vw, 96px)', marginBottom: 'clamp(10px, 1.5vw, 18px)' }}
                >
                  Nihil + Aura
                </div>

                {/* QUOTE */}
                <blockquote
                  className="max-w-[360px]"
                  style={{ marginBottom: 'clamp(28px, 3.5vw, 48px)' }}
                >
                  <p className="text-[13px] sm:text-[15px] md:text-[18px] lg:text-[20px] font-light leading-[1.6] text-white tracking-wide font-['Outfit']">
                    &ldquo;No need for outside approval.
                    <span className="block pl-10 sm:pl-14 md:pl-20" style={{ paddingLeft: 'clamp(28px, 4.8vw, 76px)' }}>
                      Your own aura.&rdquo;
                    </span>
                  </p>
                </blockquote>

                {/* DESCRIPTION — TIGHT SPACING WITH BOTTOM MARGIN */}
                <div
                  className="max-w-[360px] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-[1.7] sm:leading-[1.8] tracking-[0.01em] text-[rgba(255,255,255,0.65)] font-['Inter'] mb-4 sm:mb-6 md:mb-8"
                  style={{ marginBottom: 'clamp(18px, 2.5vw, 36px)' }}
                >
                  <p style={{ marginBottom: 'clamp(4px, 0.8vw, 8px)' }}>
                    NIVORA is not just a brand.
                  </p>
                  <p style={{ marginBottom: 'clamp(4px, 0.8vw, 8px)' }}>
                    It&apos;s a mindset. A reminder that you don&apos;t need the world&apos;s validation to be real.
                  </p>
                  <p>
                    You already have your own aura.
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE — SEAMLESSLY BLENDED WITH BACKGROUND */}
            <div
              className="w-full flex justify-end items-center pr-6 sm:pr-10 md:pr-16 lg:pr-24"
              style={{ paddingRight: 'clamp(24px, 4.5vw, 84px)' }}
            >
              <div className="relative w-full max-w-[190px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[420px] aspect-[4/5] max-h-[250px] sm:max-h-[340px] md:max-h-[420px] lg:max-h-[470px] overflow-hidden bg-[#050505]">
                <img
                  src="/nivora/meaning.jpg"
                  alt="Hooded figure with ethereal glowing smoke halo aura"
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
                  loading="lazy"
                />
                {/* Edge blends to merge naturally into the #050505 section background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/60 pointer-events-none" />
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            04 — THE DESIGN PHILOSOPHY
            ============================================================ */}
        <section className="relative w-full overflow-hidden py-16 sm:py-20 md:py-[80px] lg:py-[96px] px-4 sm:px-6 md:px-[6vw] lg:px-[8vw] bg-[#050505]">
          {/* SECTION BACKGROUND — PANORAMIC COLLAR BANNER */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/nivora/philosophy-bg.png"
              alt="NIVORA Design Philosophy Background"
              className="w-full h-full object-cover object-right filter contrast-105 brightness-95"
            />
            {/* Top & Bottom seamless fades into adjacent sections */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-75" />
            {/* Left side text readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full md:w-3/5" />
          </div>

          <div className="relative z-10 w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center min-h-[320px] sm:min-h-[380px] md:min-h-[440px]">

            {/* LEFT TEXT — SHIFTED RIGHT */}
            <div className="w-full flex justify-start md:justify-end items-center">
              <div
                className="w-full max-w-[420px] sm:max-w-[440px] md:max-w-[460px] flex flex-col justify-center"
                style={{ transform: 'translateX(clamp(16px, 3.5vw, 60px))' }}
              >
                <span
                  className="block text-[10px] sm:text-xs font-mono tracking-[0.35em] text-white/50 uppercase"
                  style={{ marginBottom: 'clamp(14px, 1.75vw, 24px)' }}
                >
                  THE DESIGN PHILOSOPHY
                </span>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/90 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  <p>
                    Every piece is designed for the
                    <br />
                    ones who think different, move differently
                  </p>
                  <p>
                    and stay real. Clean silhouettes,
                    <br />
                    minimal details, bold statements.
                  </p>
                </div>

                <p
                  className="mt-8 sm:mt-10 md:mt-12 text-xs sm:text-sm font-mono tracking-[0.3em] text-white/90 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  style={{ marginTop: 'clamp(28px, 3.5vw, 48px)' }}
                >
                  No trends. Just timeless.
                </p>
              </div>
            </div>

            {/* RIGHT AREA — Transparent spacer showcasing the background collar and woven label */}
            <div className="w-full min-h-[160px] sm:min-h-[240px] md:min-h-[380px] flex items-center justify-center pointer-events-none" aria-hidden="true" />
          </div>
        </section>


        {/* ============================================================
            05 — PRODUCT SPECIFICATIONS & TECHNICAL SKETCH (3-Col Grid)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/10 bg-[#070707]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">

            {/* COL 1: T-SHIRT TECHNICAL SKETCH WITH HANDWRITTEN ANNOTATIONS */}
            <div className="md:col-span-12 lg:col-span-5 bg-[#050505] border border-white/10 p-4 sm:p-6 lg:p-7 rounded-sm flex items-center justify-center relative shadow-inner overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px]">
                <img
                  src="/nivora/technical-sketch.jpg"
                  alt="NIVORA T-shirt technical sketch with oversized fit, premium cotton, and minimal branding annotations"
                  className="w-full h-full max-h-[560px] object-contain object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* COL 2: CENTER MACRO TEXTURE & EMBLEM STACK */}
            <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6">
              {/* Top: Fabric Folds */}
              <div className="w-full aspect-square bg-[#050505] border border-white/10 rounded-sm overflow-hidden shadow-md">
                <img
                  src="/nivora/fabric.jpg"
                  alt="Dark luxury cotton texture"
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                  loading="lazy"
                />
              </div>
              {/* Bottom: Woven Patch Macro */}
              <div className="w-full aspect-square bg-[#050505] border border-white/10 rounded-sm overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-full h-full border border-white/15 p-4 flex flex-col justify-center items-center bg-[#0d0d0d]">
                  <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/70">
                    N I V O R <span className="font-light">Λ</span>
                  </div>
                  <div className="text-4xl font-['Syncopate'] font-bold text-white mt-3">
                    N
                  </div>
                </div>
              </div>
            </div>

            {/* COL 3: 3 FEATURE ICONS & TEXT BLOCKS — BEAUTIFULLY CENTERED IN CONTAINER */}
            <div className="md:col-span-6 lg:col-span-4 bg-[#050505] border border-white/10 p-6 sm:p-8 rounded-sm flex flex-col justify-between items-center text-center shadow-inner">

              {/* Feature 1: PREMIUM FABRIC */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/90 mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                    <line x1="16" y1="8" x2="2" y2="22" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  PREMIUM FABRIC
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Soft. Breathable.
                  <br />
                  Built to last.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-white/15 my-1" />

              {/* Feature 2: CLEAN DETAILS */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/90 mb-3.5 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 22 12 12 22 2 12" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  CLEAN DETAILS
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Subtle branding.
                  <br />
                  Maximum impact.
                </p>
              </div>

              <div className="h-[1px] w-24 sm:w-32 bg-white/15 my-1" />

              {/* Feature 3: BUILT FOR EVERYDAY */}
              <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-5 text-center">
                <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/90 mb-3.5 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-2.67 0-4.32-2.128-6.178-5.328C10.142 7.472 8.492 5.344 5.822 5.344c-5.096 0-5.096 8 0 8 2.67 0 4.32-2.128 6.178-5.328C13.858 11.216 15.508 13.344 18.178 13.344z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.28em] font-bold uppercase text-white">
                  BUILT FOR EVERYDAY
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-['Inter'] text-white/60 font-light leading-relaxed max-w-[240px]">
                  Comfort in every
                  <br />
                  moment.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ============================================================
            06 — THE COLLECTION (Rack of 3 black tees with sword print)
            ============================================================ */}
        <section id="collection" className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/10 bg-[#080808]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE: 3 TEES ON INDUSTRIAL RACK */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-black shadow-2xl">
                <img
                  src="/nivora/collection.jpg"
                  alt="Three black NIVORA t-shirts on industrial rack"
                  className="w-full h-full object-cover object-center filter contrast-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-['Syncopate'] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white mb-6">
                THE COLLECTION
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed mb-8 max-w-xl">
                From everyday essentials to statement pieces — each drop is a chapter in the same story: freedom, individuality and self.
              </p>

              {/* EXPLORE BUTTON */}
              <button
                type="button"
                onClick={() => alert('Opening NIVORA Drop 01 Catalog')}
                className="w-fit px-8 py-4 border border-white/40 hover:border-white text-white font-mono text-xs sm:text-sm uppercase tracking-[0.25em] transition-all hover:bg-white hover:text-black cursor-pointer mb-10"
              >
                EXPLORE COLLECTION →
              </button>

              {/* CATEGORIES / TAGS */}
              <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
                <span>T-SHIRTS</span>
                <span>•</span>
                <span>OVERSIZED</span>
                <span>•</span>
                <span>PRINTS</span>
                <span>•</span>
                <span>LIMITED DROPS</span>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            07 — MORE THAN CLOTHES (Model on rooftop overlooking city)
            ============================================================ */}
        <section className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/10 bg-[#070707]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT IMAGE: MODEL ON ROOFTOP */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center">
              <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/nivora/rooftop.jpg"
                  alt="Man wearing NIVORA graphic tee sitting on rooftop over city"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Syncopate'] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white mb-6">
                MORE THAN CLOTHES
              </h2>

              <div className="text-sm sm:text-base lg:text-lg font-['Outfit'] font-light text-white/70 leading-relaxed space-y-4 max-w-xl">
                <p>
                  NIVORA is for the dreamers, the overthinkers, the creators, the outsiders.
                </p>
                <p>
                  It&apos;s for you — who refuse to fit in.
                </p>
              </div>

              {/* HANDWRITTEN SCRIPT QUOTE */}
              <div className="mt-8 pt-6">
                <p className="text-lg sm:text-xl lg:text-2xl italic font-serif text-white/90 tracking-wide font-light">
                  Not just what you wear,
                  <br />
                  but who you become.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ============================================================
            08 — OUR PROMISE (4 Outline Icons with mountain silhouette)
            ============================================================ */}
        <section className="relative w-full py-20 sm:py-28 px-5 sm:px-10 lg:px-16 border-t border-white/10 bg-[#050505] flex flex-col items-center text-center overflow-hidden">
          {/* PANORAMIC MOUNTAIN SILHOUETTE BACKGROUND */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <img
              src="/nivora/hero.jpg"
              alt="Mountain silhouette"
              className="w-full h-full object-cover object-bottom filter grayscale contrast-150"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#050505]/80" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto">
            <h2 className="text-xs sm:text-sm lg:text-base font-mono tracking-[0.35em] pl-[0.35em] uppercase text-white/80 mb-10 sm:mb-14 text-center">
              OUR PROMISE
            </h2>

            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {/* 1. PREMIUM QUALITY */}
              <div className="w-full bg-[#070707]/80 border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-white/20 transition-colors">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center text-white/90 mb-4 sm:mb-5 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l4 6-10 12L2 9z" />
                    <path d="M11 3L8 9l4 12 4-12-3-6" />
                    <path d="M2 9h20" />
                  </svg>
                </div>
                <div className="h-10 sm:h-12 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] font-bold text-white uppercase block leading-tight">
                    PREMIUM
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] font-bold text-white/70 uppercase block leading-tight mt-1">
                    QUALITY
                  </span>
                </div>
              </div>

              {/* 2. FAST & SAFE DELIVERY */}
              <div className="bg-[#070707]/80 border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-white/20 transition-colors">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center text-white/90 mb-4 sm:mb-5 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="14" height="12" rx="1" />
                    <path d="M15 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="h-10 sm:h-12 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.16em] sm:tracking-[0.22em] font-bold text-white uppercase block leading-tight whitespace-nowrap">
                    FAST & SAFE
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] font-bold text-white/70 uppercase block leading-tight mt-1">
                    DELIVERY
                  </span>
                </div>
              </div>

              {/* 3. SECURE PAYMENTS */}
              <div className="bg-[#070707]/80 border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-white/20 transition-colors">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center text-white/90 mb-4 sm:mb-5 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div className="h-10 sm:h-12 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] font-bold text-white uppercase block leading-tight">
                    SECURE
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] font-bold text-white/70 uppercase block leading-tight mt-1">
                    PAYMENTS
                  </span>
                </div>
              </div>

              {/* 4. EASY RETURNS */}
              <div className="bg-[#070707]/80 border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner hover:border-white/20 transition-colors">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center text-white/90 mb-4 sm:mb-5 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 15.5-6.36L21 8" />
                    <polyline points="21 3 21 8 16 8" />
                    <path d="M21 12a9 9 0 0 1-15.5 6.36L3 16" />
                    <polyline points="3 21 3 16 8 16" />
                  </svg>
                </div>
                <div className="h-10 sm:h-12 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] font-bold text-white uppercase block leading-tight">
                    EASY
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] font-bold text-white/70 uppercase block leading-tight mt-1">
                    RETURNS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================
            09 — WEAR YOUR OWN AURA & JOIN THE MOVEMENT
            ============================================================ */}
        <section className="relative w-full border-t border-white/10 bg-[#070707] flex flex-col">

          {/* TOP HALF: Person with 'N' cap and text */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src="/nivora/box.jpg"
              alt="NIVORA apparel gift box and model in black cap"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60" />

            {/* FLOATING TEXT OVER TOP */}
            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 max-w-[1500px] mx-auto w-full flex justify-between items-start">
              <div className="text-left font-['Syncopate'] text-xs sm:text-lg lg:text-2xl font-bold tracking-[0.25em] uppercase text-white leading-relaxed">
                WEAR
                <br />
                YOUR OWN
                <br />
                AURA
              </div>

              <div className="text-right">
                <div className="font-['Syncopate'] text-xs sm:text-base lg:text-lg font-bold tracking-[0.3em] uppercase text-white whitespace-nowrap inline-block">
                  N I V O R <span className="font-light">Λ</span>
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mt-1">
                  CLOTHING BRAND
                </div>
                <div className="w-10 h-[1px] bg-white/40 ml-auto mt-3" />
              </div>
            </div>
          </div>

          {/* BOTTOM HALF: JOIN THE MOVEMENT EMAIL INPUT */}
          <div className="w-full bg-[#050505] border-t border-white/5 py-12 sm:py-16 px-5 sm:px-10 lg:px-16">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-lg text-center md:text-left">
                <h3 className="text-sm sm:text-base lg:text-lg font-['Syncopate'] font-bold tracking-[0.25em] uppercase text-white mb-2">
                  JOIN THE MOVEMENT
                </h3>
                <p className="text-xs sm:text-sm font-['Outfit'] font-light text-white/60 leading-relaxed">
                  Be the first to know about new drops, exclusive offers and the journey ahead.
                </p>
              </div>

              {/* EMAIL INPUT */}
              <div className="w-full md:w-auto flex-1 max-w-md">
                {isSubscribed ? (
                  <div className="p-4 border border-white/20 text-center font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white bg-white/5">
                    CONFIRMED. WELCOME TO NIVORA.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex border border-white/20 bg-black/60">
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
                      className="px-6 text-white hover:text-white/70 transition-colors cursor-pointer text-base"
                      aria-label="Submit"
                    >
                      →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </section>

      </div>
    </>
  );
}
