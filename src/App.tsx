import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import TimelineNav from './components/TimelineNav';
import ScrollIndicator from './components/ScrollIndicator';
import Section from './components/Section';
import CircleOverlay from './components/CircleOverlay';
import CharacterQuiz from './components/CharacterQuiz';
import CollectionMenu from './components/CollectionMenu';
import LoadingScreen from './components/LoadingScreen';
import NivoraPage from './pages/NivoraPage';
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
};

function HomePage({
  isMenuOpen,
  onToggleMenu,
  isLoaded,
  soundEnabled,
  onToggleSound,
  onEnableSound,
}: HomePageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(0);
  const sectionRefs = useMemo(() => sections.map(() => createRef<HTMLDivElement>()), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [circleOpen, setCircleOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [, setIntroVideoEnded] = useState(false);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
      setCurrentIndex(index);
      currentIndexRef.current = index;
    }
  };

  const handleEnterJourney = (targetSection = 1) => {
    setIntroCompleted(true);
    onEnableSound?.();
    scrollToSection(targetSection);
  };

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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundEnabled) {
      audio.volume = 0.75;
      void audio.play().catch((err) => {
        console.warn('Audio play prevented:', err);
      });
    } else {
      audio.pause();
    }
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleEnableSound = () => {
    setSoundEnabled(true);
  };

  const handleSelectCollection = (href: string) => {
    setIsMenuOpen(false);
    window.history.pushState({}, '', href);
    setCurrentPath(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(getCurrentPath());
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
        <NivoraPage onToggleMenu={() => setIsMenuOpen((prev) => !prev)} />
      )}
      {currentPath.startsWith('/collections') && currentPath !== '/collections/nivora' && (
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
        />
      )}

      {/* Global soundtrack: Final audio */}
      <audio
        ref={audioRef}
        src="/videos/Final audio.m4a"
        loop
        preload="auto"
      >
        <source src="/videos/Final audio.m4a" type="audio/mp4" />
        <source src="/videos/final-audio.m4a" type="audio/mp4" />
      </audio>
    </>
  );
}

export default App;
