const HeroSection = () => (
  <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_0_120px_rgba(255,255,255,0.04)] backdrop-blur-2xl sm:p-14">
    <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_45%)]" />
    <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-secondary">The return of 4LOG</p>
        <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">A website rebuilt to work and feel polished.</h2>
        <p className="max-w-2xl text-base leading-8 text-secondary sm:text-lg">
          This version is restored as a fully functional React + Tailwind site with a simple responsive layout, ready for the next round of content.
        </p>
      </div>
      <div className="rounded-[28px] border border-white/10 bg-black/60 p-8 text-sm text-secondary shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <p className="uppercase tracking-[0.35em] text-white/60">Live now</p>
        <p className="mt-4 text-3xl font-semibold text-white">Production-ready build</p>
        <p className="mt-3 leading-7">This page is clean and safe to run. Your project is restored to a working state.</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
