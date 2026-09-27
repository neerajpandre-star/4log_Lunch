import { createRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import TimelineNav from './components/TimelineNav';
import ScrollIndicator from './components/ScrollIndicator';
import Section from './components/Section';
import CircleOverlay from './components/CircleOverlay';
import CharacterQuiz from './components/CharacterQuiz';
import CollectionMenu from './components/CollectionMenu';
import LoadingScreen from './components/LoadingScreen';
import NivoraPage from './pages/NivoraPage';
import VayrenPage from './pages/VayrenPage';
import AurviaPage from './pages/AurviaPage';
import AsteraPage from './pages/AsteraPage';
import ManiferaPage from './pages/ManiferaPage';
import { sections } from './data/sections';
import { collections } from './data/collections';
import { Seo } from './seo';
import './index.css';

const homePageSeo = {
  title: '4LOG. Do It Anyway. From Talk to Takeover.',
  description: '4LOG. Do It Anyway. From Talk to Takeover. Built for people who stop listening to the noise, take action, and create their own path.',
  canonical: 'https://4log.in/',
  ogTitle: '4LOG. Do It Anyway. From Talk to Takeover.',
  ogDescription: 'From Talk to Takeover. Do It Anyway.',
  ogImage: 'https://4log.in/og-4log.svg',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'Brand',
      name: '4LOG',
      description: '4LOG. Do It Anyway. From Talk to Takeover. Built for people who stop listening to the noise, take action, and create their own path.',
      url: 'https://4log.in/',
      logo: 'https://4log.in/4log-white.png',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '4LOG',
      alternateName: '4LOG Clothing',
      url: 'https://4log.in/',
      description: '4LOG. Do It Anyway. From Talk to Takeover. Built for people who stop listening to the noise, take action, and create their own path.',
      publisher: {
        '@type': 'Organization',
        name: '4LOG',
        url: 'https://4log.in/',
        logo: 'https://4log.in/4log-white.png',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '4LOG',
      description: '4LOG. Do It Anyway. From Talk to Takeover. Built for people who stop listening to the noise, take action, and create their own path.',
      url: 'https://4log.in/',
      logo: 'https://4log.in/4log-white.png',
      sameAs: [
        'https://www.instagram.com/4log.india',
        'https://www.youtube.com/@4LOG.Studios',
        'https://x.com/4log',
        'https://www.facebook.com/4log',
        'https://www.linkedin.com/company/4log-india/about/',
      ],
    },
  ],
};

const aboutPageSeo = {
  title: 'About 4LOG | Indian Streetwear Clothing Brand',
  description: 'Learn what 4LOG is, why it was created, and how the 4LOG clothing brand reflects individuality, confidence and self-expression through streetwear.',
  canonical: 'https://4log.in/about',
  ogTitle: 'About 4LOG | Indian Streetwear Clothing Brand',
  ogDescription: 'Learn what 4LOG is, why it was created, and how the 4LOG clothing brand reflects individuality, confidence and self-expression through streetwear.',
  ogImage: 'https://4log.in/og-4log.svg',
};

function getCurrentPath() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (pathname === '/about') return '/about';
  if (pathname === '/timeline') return '/timeline';
  if (pathname === '/nivora') return '/nivora';
  if (pathname.startsWith('/collections')) return pathname;
  return '/';
}

type NavProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
};

type HomePageProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  isLoaded: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onEnableSound?: () => void;
  targetWorld?: string | null;
  onTargetWorldHandled?: () => void;
};

const WORLD_SECTION_INDEX: Record<string, number> = {
  nivora: 1,
  vayren: 2,
  aurvia: 3,
  astera: 4,
  manifera: 5,
};

function HomePage({
  isMenuOpen,
  onToggleMenu,
  isLoaded,
  soundEnabled,
  onToggleSound,
  onEnableSound,
  targetWorld,
  onTargetWorldHandled,
}: HomePageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useMemo(() => sections.map(() => createRef<HTMLDivElement>()), []);

  // Determine if a specific world was requested
  const resolvedTargetIndex = useMemo(() => {
    if (targetWorld && WORLD_SECTION_INDEX[targetWorld.toLowerCase()] !== undefined) {
      return WORLD_SECTION_INDEX[targetWorld.toLowerCase()];
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const w = params.get('world');
      if (w && WORLD_SECTION_INDEX[w.toLowerCase()] !== undefined) {
        return WORLD_SECTION_INDEX[w.toLowerCase()];
      }
    }
    return 0;
  }, [targetWorld]);

  const currentIndexRef = useRef(resolvedTargetIndex);
  const [currentIndex, setCurrentIndex] = useState(resolvedTargetIndex);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [circleOpen, setCircleOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(resolvedTargetIndex > 0);
  const [, setIntroVideoEnded] = useState(false);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setCurrentIndex(index);
      currentIndexRef.current = index;
    }
  };

  const handleEnterJourney = (targetSection = 1) => {
    setIntroCompleted(true);
    onEnableSound?.();
    scrollToSection(targetSection);
  };

  // Immediate positioning before first paint to prevent flashing section 0 / intro video
  useLayoutEffect(() => {
    if (resolvedTargetIndex > 0 && containerRef.current) {
      setIntroCompleted(true);
      setCurrentIndex(resolvedTargetIndex);
      currentIndexRef.current = resolvedTargetIndex;
      const height = containerRef.current.clientHeight || window.innerHeight;
      containerRef.current.scrollTop = resolvedTargetIndex * height;
    }
  }, [resolvedTargetIndex]);

  // Smooth cinematic centering scroll on return
  useEffect(() => {
    if (resolvedTargetIndex > 0) {
      const timer = setTimeout(() => {
        const targetEl = sectionRefs[resolvedTargetIndex]?.current;
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        onTargetWorldHandled?.();
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [resolvedTargetIndex, sectionRefs, onTargetWorldHandled]);

  // Track active section on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        const height = container.clientHeight || window.innerHeight;
        const index = Math.round(container.scrollTop / height);
        if (index >= 0 && index < sections.length && index !== currentIndexRef.current) {
          currentIndexRef.current = index;
          setCurrentIndex(index);
          if (index > 0) {
            setIntroCompleted(true);
          }
        }
        frameId = 0;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(query.matches);

    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  return (
    <>
      <Seo page={homePageSeo} />
      <div className="app bg-void text-primary">
        <Header
          isMenuOpen={isMenuOpen}
          onToggleMenu={onToggleMenu}
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
        />

        <TimelineNav
          sections={sections}
          currentIndex={currentIndex}
          onSelectSection={(index) => {
            scrollToSection(index);
          }}
        />

        <ScrollIndicator
          hidden={currentIndex >= sections.length - 1}
          onClick={() => scrollToSection(currentIndex + 1)}
        />

        <div ref={containerRef} className="scroll-container">
          {sections.map((section, index) => (
            <div key={section.id} ref={sectionRefs[index]}>
              <Section
                section={section}
                index={index}
                isActive={isLoaded && index === currentIndex}
                soundEnabled={soundEnabled}
                reducedMotion={reducedMotion}
                onJoinCircle={() => setCircleOpen(true)}
                onFindCharacter={() => setQuizOpen(true)}
                onNextSection={() => {
                  if (index === 0) {
                    handleEnterJourney(1);
                  } else {
                    scrollToSection(index + 1);
                  }
                }}
                introCompleted={introCompleted}
                onVideoEnd={() => setIntroVideoEnded(true)}
                onIntroComplete={() => handleEnterJourney(1)}
              />
            </div>
          ))}
        </div>

        <div className="frame-corner frame-corner--tl" />
        <div className="frame-corner frame-corner--tr" />
        <div className="frame-corner frame-corner--bl" />
        <div className="frame-corner frame-corner--br" />
        {circleOpen && <CircleOverlay onClose={() => setCircleOpen(false)} />}
        {quizOpen && <CharacterQuiz onClose={() => setQuizOpen(false)} />}
      </div>
    </>
  );
}

function AboutPage({ isMenuOpen, onToggleMenu, soundEnabled, onToggleSound }: NavProps) {
  return (
    <>
      <Seo page={aboutPageSeo} />
      <div className="page-shell page-shell--about">
        <Header isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
        <main className="brand-page" aria-label="About 4LOG">
          <div className="brand-page__eyebrow">About 4LOG</div>
          <h1>What is 4LOG?</h1>
          <p>
            4LOG is built for people who do not live their life by other people&apos;s expectations.
            It is rooted in individuality, confidence, and the belief that personal identity should not be filtered through fear.
          </p>
          <p>
            The brand&apos;s foundation is simple: <strong>4LOG</strong> is not just clothing; it is a statement that you can move through the world on your own terms.
            The 4LOG clothing range is designed for people who want to stand out without needing permission.
          </p>
          <p>
            <strong>What does 4LOG mean?</strong> For us, it represents a way of living. It is a reminder to ignore the noise, stop waiting for approval, and keep building the life you want.
            The phrase “log kya kahenge” shaped the identity behind the brand: the idea that people often hold back because they fear judgment.
          </p>
          <p>
            <strong>Why was 4LOG created?</strong> Because confidence should not be borrowed. The goal was to build a 4LOG brand that feels honest, sharp, and true to the people who wear it.
            That is why 4LOG focuses on attitude, energy, and self-expression rather than trends for trends&apos; sake.
          </p>
          <div className="brand-page__grid">
            <div>
              <h2>The clothing philosophy</h2>
              <p>
                4LOG clothing is meant for people who are building their own path. We design apparel that feels strong, wearable, and confident — pieces that help you move through the day with clarity and intent.
              </p>
            </div>
            <div>
              <h2>4LOG identity</h2>
              <p>
                4LOG is rooted in Indian culture, modern attitude, and a refusal to be dictated by outside noise. The brand blends comfort, edge, and everyday wearability into statement pieces.
              </p>
            </div>
          </div>
          <p>
            The brand is more than a label. It is an expression of self-trust. The 4LOG clothing brand turns “log kya kahenge” into a challenge instead of a barrier — a reminder to stay rooted in your own standards.
          </p>
          <p>
            4LOG is for people who want to wear their confidence the way they live it.
            From T-shirts to statement staples, every piece is made to reflect a mindset: keep moving, keep building, and keep being yourself.
          </p>
          <div className="brand-page__cta-row">
            <a href="/" className="brand-page__link">Visit the official 4LOG homepage</a>
            <button type="button" className="brand-page__link" onClick={onToggleMenu} style={{ cursor: 'pointer' }}>
              Explore All Collections
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

type CollectionPageProps = NavProps & {
  path: string;
};

function CollectionPage({ path, isMenuOpen, onToggleMenu, soundEnabled, onToggleSound }: CollectionPageProps) {
  const collection = collections.find((c) => c.href === path) || collections[0];
  const collectionSeo = {
    title: `${collection.name} | 4LOG Collections`,
    description: `${collection.description} Explore the official ${collection.name} collection from 4LOG.`,
    canonical: `https://4log.in${collection.href}`,
    ogTitle: `${collection.name} | 4LOG Collections`,
    ogDescription: collection.description,
    ogImage: collection.image,
  };

  return (
    <>
      <Seo page={collectionSeo} />
      <div className="page-shell page-shell--collection">
        <Header isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
        <main className="brand-page brand-page--collection" aria-label={`${collection.name} collection`}>
          <div className="brand-page__eyebrow">4LOG // COLLECTION</div>
          <h1>{collection.name}</h1>
          <p style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 600, marginBottom: '20px' }}>
            {collection.tagline}
          </p>
          <div
            style={{
              width: '100%',
              height: 'clamp(260px, 45vw, 480px)',
              borderRadius: '20px',
              overflow: 'hidden',
              margin: '28px 0',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={collection.image}
              alt={collection.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '680px' }}>
            {collection.description}
          </p>
          <div className="brand-page__cta-row" style={{ marginTop: '36px' }}>
            <a href="/" className="brand-page__link">
              ← Official 4LOG Home
            </a>
            <button
              type="button"
              className="brand-page__link"
              onClick={onToggleMenu}
              style={{ cursor: 'pointer' }}
            >
              Browse All Collections →
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Audio defaults to UNMUTED (true) on every enter and every reload
  const [soundEnabled, setSoundEnabled] = useState(true);
  const userMutedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio playback with soundEnabled state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundEnabled) {
      audio.volume = 0.75;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Browser autoplay policy might block unmuted audio until user interaction
          console.log('Audio autoplay waiting for user interaction:', err);
        });
      }
    } else {
      audio.pause();
    }
  }, [soundEnabled]);

  // One-time interaction listener to immediately start music if browser blocked cold autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudioOnGesture = () => {
      // If user hasn't explicitly clicked mute, start playing
      if (!userMutedRef.current) {
        setSoundEnabled(true);
        if (audio.paused) {
          audio.volume = 0.75;
          void audio.play().then(() => {
            cleanup();
          }).catch(() => {});
        }
      }
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', startAudioOnGesture);
      window.removeEventListener('touchstart', startAudioOnGesture);
      window.removeEventListener('click', startAudioOnGesture);
      window.removeEventListener('keydown', startAudioOnGesture);
      window.removeEventListener('wheel', startAudioOnGesture);
      window.removeEventListener('scroll', startAudioOnGesture);
    };

    window.addEventListener('pointerdown', startAudioOnGesture, { passive: true });
    window.addEventListener('touchstart', startAudioOnGesture, { passive: true });
    window.addEventListener('click', startAudioOnGesture, { passive: true });
    window.addEventListener('keydown', startAudioOnGesture, { passive: true });
    window.addEventListener('wheel', startAudioOnGesture, { passive: true });
    window.addEventListener('scroll', startAudioOnGesture, { passive: true });

    return cleanup;
  }, []);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      userMutedRef.current = !next; // If toggled to muted, mark explicit mute
      return next;
    });
  };

  const handleEnableSound = () => {
    if (!userMutedRef.current) {
      setSoundEnabled(true);
    }
  };

  const handleSelectCollection = (href: string) => {
    setIsMenuOpen(false);
    window.history.pushState({}, '', href);
    setCurrentPath(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [targetWorld, setTargetWorld] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('world') || null;
  });

  const handleBackToWorld = (worldId: string) => {
    const normalized = worldId.toLowerCase();
    setTargetWorld(normalized);
    window.history.pushState({ world: normalized }, '', `/?world=${normalized}`);
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePathChange = () => {
      const newPath = getCurrentPath();
      const params = new URLSearchParams(window.location.search);
      const worldParam = params.get('world');
      if (worldParam) {
        setTargetWorld(worldParam.toLowerCase());
      } else if (newPath === '/' || newPath === '/timeline') {
        const prev = window.location.pathname;
        const match = prev.match(/\/(?:collections\/)?(nivora|vayren|aurvia|astera|manifera)/i);
        if (match && match[1]) {
          setTargetWorld(match[1].toLowerCase());
        }
      }
      setCurrentPath(newPath);
      setIsMenuOpen(false);
    };
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.startsWith('/')) {
        event.preventDefault();
        window.history.pushState({}, '', href);
        handlePathChange();
      }
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('popstate', handlePathChange);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <CollectionMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCollection={handleSelectCollection}
      />
      {currentPath === '/about' && (
        <AboutPage
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      {(currentPath === '/nivora' || currentPath === '/collections/nivora') && (
        <NivoraPage
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          onBackToWorld={() => handleBackToWorld('nivora')}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      {(currentPath === '/vayren' || currentPath === '/collections/vayren') && (
        <VayrenPage
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          onBackToWorld={() => handleBackToWorld('vayren')}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      {(currentPath === '/aurvia' || currentPath === '/collections/aurvia') && (
        <AurviaPage
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          onBackToWorld={() => handleBackToWorld('aurvia')}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      {(currentPath === '/astera' || currentPath === '/collections/astera') && (
        <AsteraPage
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          onBackToWorld={() => handleBackToWorld('astera')}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      {(currentPath === '/manifera' || currentPath === '/collections/manifera') && (
        <ManiferaPage
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          onBackToWorld={() => handleBackToWorld('manifera')}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      {currentPath.startsWith('/collections') && currentPath !== '/collections/nivora' && currentPath !== '/collections/vayren' && currentPath !== '/collections/aurvia' && currentPath !== '/collections/astera' && currentPath !== '/collections/manifera' && (
        <CollectionPage
          path={currentPath}
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}
      {(currentPath === '/' || currentPath === '/timeline') && (
        <HomePage
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          isLoaded={!isLoading}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onEnableSound={handleEnableSound}
          targetWorld={targetWorld}
          onTargetWorldHandled={() => setTargetWorld(null)}
        />
      )}

      {/* Global soundtrack: Final audio */}
      <audio
        ref={audioRef}
        src="/videos/Final audio.m4a"
        loop
        preload="auto"
        autoPlay
      >
        <source src="/videos/Final audio.m4a" type="audio/mp4" />
        <source src="/videos/final-audio.m4a" type="audio/mp4" />
      </audio>
    </>
  );
}

export default App;
