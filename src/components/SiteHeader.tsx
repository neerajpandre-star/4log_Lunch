const SiteHeader = () => (
  <header className="site-header mx-auto flex max-w-[1200px] items-center justify-between px-6 py-8 sm:px-10">
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-secondary">4LOG</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">Create with cinematic momentum.</h1>
    </div>
    <nav className="hidden gap-8 text-sm uppercase tracking-[0.28em] text-secondary md:flex">
      <a href="#story" className="transition hover:text-white">Story</a>
      <a href="#features" className="transition hover:text-white">Features</a>
      <a href="#join" className="transition hover:text-white">Join</a>
    </nav>
  </header>
);

export default SiteHeader;
