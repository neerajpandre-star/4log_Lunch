import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import TimelineNav from './components/TimelineNav';
import ScrollIndicator from './components/ScrollIndicator';
import Section from './components/Section';
import CircleOverlay from './components/CircleOverlay';
import CharacterQuiz from './components/CharacterQuiz';
import { sections } from './data/sections';
import './index.css';

function App() {
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
    </div>
  );
}

export default App;
