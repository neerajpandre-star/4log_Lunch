type HeaderProps = {
  sectionName?: string;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isMenuOpen?: boolean;
  onToggleMenu?: () => void;
};

export default function Header({
  isMenuOpen = false,
  onToggleMenu,
  soundEnabled = true,
  onToggleSound,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[64px] md:h-[76px] z-[1000] pointer-events-auto bg-transparent transition-colors select-none">
      <div className="w-full h-full max-w-[1600px] mx-auto px-4 sm:px-8 relative flex items-center justify-between">

        {/* LEFT: MENU BAR & 4LOG ORIGINAL LOGO */}
        <div className="flex items-center gap-3 sm:gap-5 z-20">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 cursor-pointer bg-transparent border-none p-0 hamburger-btn"
            aria-label="Toggle collections menu"
            aria-expanded={isMenuOpen}
            onClick={onToggleMenu}
            id="hamburgerBtn"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-start gap-[5px]">
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
              <span className="hamburger-line line-3" />
            </div>
          </button>

          <a
            href="/"
            className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
            aria-label="4LOG home"
          >
            <img
              src="/4log-logo.png"
              alt="4LOG"
              width="100"
              height="30"
              fetchPriority="high"
              decoding="async"
              className="h-[22px] sm:h-[26px] md:h-[30px] w-auto object-contain block"
            />
          </a>
        </div>

        {/* RIGHT: SOUND / ACTIONS */}
        <div className="flex items-center justify-end z-20">
          {onToggleSound ? (
            <button
              type="button"
              onClick={onToggleSound}
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
              aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
          ) : (
            <div className="w-10 h-10" aria-hidden="true" />
          )}
        </div>

      </div>
    </header>
  );
}
