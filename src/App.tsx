import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import TimelineNav from './components/TimelineNav';
import ScrollIndicator from './components/ScrollIndicator';
import Section from './components/Section';
import CircleOverlay from './components/CircleOverlay';
import CharacterQuiz from './components/CharacterQuiz';
import { sections } from './data/sections';
import { Seo } from './seo';
import './index.css';

const homePageSeo = {
  title: '4LOG — Do It Anyway | From Talk to Takeover',
  description: '4LOG is an Indian streetwear clothing brand built around individuality, confidence and ignoring “log kya kahenge”. Explore official 4LOG T-shirts and collections.',
  canonical: 'https://4log.in/',
  ogTitle: '4LOG — Do It Anyway | From Talk to Takeover',
  ogDescription: '4LOG is an Indian streetwear clothing brand built around individuality, confidence and ignoring “log kya kahenge”. Explore official 4LOG T-shirts and collections.',
  ogImage: 'https://4log.in/og-4log.svg',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'Brand',
      name: '4LOG',
      description: 'A streetwear clothing brand focused on individuality and self-expression.',
      url: 'https://4log.in/',
      logo: 'https://4log.in/4log-white.png',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '4LOG',
      alternateName: '4LOG Clothing',
      url: 'https://4log.in/',
      description: '4LOG is an Indian streetwear clothing brand built around individuality, confidence and self-expression.',
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
      description: 'A streetwear clothing brand focused on individuality and self-expression.',
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
  if (pathname.startsWith('/collections')) return pathname;
  return '/';
}

function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(0);
  const sectionRefs = useMemo(() => sections.map(() => createRef<HTMLDivElement>()), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [circleOpen, setCircleOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        const index = Math.round(container.scrollTop / container.clientHeight);
        if (index >= 0 && index < sections.length && index !== currentIndexRef.current) {
          currentIndexRef.current = index;
          setCurrentIndex(index);
        }
        frameId = 0;
      });
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(query.matches);

    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Seo page={homePageSeo} />
      <div className="app bg-void text-primary">
        <Header sectionName={sections[currentIndex]?.sectionName} soundEnabled={soundEnabled} onToggleSound={() => setSoundEnabled((prev) => !prev)} />
        <TimelineNav sections={sections} currentIndex={currentIndex} onSelectSection={scrollToSection} />
        <ScrollIndicator hidden={currentIndex > 0} />

        <div ref={containerRef} className="scroll-container">
          {sections.map((section, index) => (
            <div key={section.id} ref={sectionRefs[index]}>
              <Section
                section={section}
                index={index}
                isActive={index === currentIndex}
                soundEnabled={soundEnabled}
                reducedMotion={reducedMotion}
                onJoinCircle={() => setCircleOpen(true)}
                onFindCharacter={() => setQuizOpen(true)}
                onNextSection={() => scrollToSection(index + 1)}
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

        <footer className="site-footer">
          <div className="site-footer__brand">
            <a href="/" aria-label="4LOG home">4LOG</a>
          </div>
          <div className="site-footer__meta">Streetwear Clothing Brand</div>
          <div className="site-footer__meta">India</div>
          <div className="site-footer__links">
            <a href="/about">About 4LOG</a>
            <a href="/collections/t-shirts">4LOG T-shirts</a>
          </div>
        </footer>
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Seo page={aboutPageSeo} />
      <div className="page-shell page-shell--about">
        <Header sectionName="About 4LOG" soundEnabled={false} onToggleSound={() => undefined} />
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
            That is why 4LOG streetwear focuses on attitude, energy, and self-expression rather than trends for trends&apos; sake.
          </p>
          <div className="brand-page__grid">
            <div>
              <h2>The clothing philosophy</h2>
              <p>
                4LOG clothing is meant for people who are building their own path. We design apparel that feels strong, wearable, and confident — pieces that help you move through the day with clarity and intent.
              </p>
            </div>
            <div>
              <h2>Streetwear identity</h2>
              <p>
                4LOG streetwear is rooted in Indian culture, modern attitude, and a refusal to be dictated by outside noise. The brand blends comfort, edge, and everyday wearability into statement pieces.
              </p>
            </div>
          </div>
          <p>
            The brand is more than a label. It is an expression of self-trust. The 4LOG clothing brand turns “log kya kahenge” into a challenge instead of a barrier — a reminder to stay rooted in your own standards.
          </p>
          <p>
            4LOG is for people who want to wear their confidence the way they live it.
            From T-shirts to statement streetwear staples, every piece is made to reflect a mindset: keep moving, keep building, and keep being yourself.
          </p>
          <div className="brand-page__cta-row">
            <a href="/" className="brand-page__link">Visit the official 4LOG homepage</a>
            <a href="/collections/t-shirts" className="brand-page__link">Explore 4LOG T-shirts</a>
          </div>
        </main>
      </div>
    </>
  );
}

function CollectionPage() {
  return (
    <>
      <Seo
        page={{
          title: '4LOG T-Shirts | Official 4LOG Streetwear',
          description: 'Explore official 4LOG T-shirts built for everyday confidence, attitude and self-expression. Discover the 4LOG streetwear collection.',
          canonical: 'https://4log.in/collections/t-shirts',
          ogTitle: '4LOG T-Shirts | Official 4LOG Streetwear',
          ogDescription: 'Explore official 4LOG T-shirts built for everyday confidence, attitude and self-expression. Discover the 4LOG streetwear collection.',
          ogImage: 'https://4log.in/og-4log.svg',
        }}
      />
      <div className="page-shell page-shell--collection">
        <Header sectionName="4LOG T-Shirts" soundEnabled={false} onToggleSound={() => undefined} />
        <main className="brand-page brand-page--collection" aria-label="4LOG T-shirts collection">
          <div className="brand-page__eyebrow">4LOG Collection</div>
          <h1>4LOG T-Shirts</h1>
          <p>
            4LOG T-shirts are built for people who want streetwear with attitude. Each drop is designed to feel sharp, expressive, and easy to wear while carrying a strong identity.
          </p>
          <p>
            From everyday staples to statement pieces, 4LOG clothing brings together comfort, confidence, and the unmistakable energy of Indian streetwear.
          </p>
          <div className="brand-page__cta-row">
            <a href="/" className="brand-page__link">Official 4LOG home</a>
            <a href="/about" className="brand-page__link">About 4LOG</a>
          </div>
        </main>
      </div>
    </>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const handlePathChange = () => setCurrentPath(getCurrentPath());
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

  if (currentPath === '/about') return <AboutPage />;
  if (currentPath.startsWith('/collections')) return <CollectionPage />;
  return <HomePage />;
}

export default App;
