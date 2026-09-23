import React, { useEffect, useRef } from 'react';
import { useCinematicWorldController } from '../../hooks/useCinematicWorldController';
import { BackgroundLayer } from './BackgroundLayer';
import { ClothingLayer } from './ClothingLayer';
import { TypographyLayer } from './TypographyLayer';
import { TransitionLayer } from './TransitionLayer';
import { NavigationLayer } from './NavigationLayer';
import { ProgressIndicator } from './ProgressIndicator';

type CinematicExperienceProps = {
  initialWorld?: number;
  soundEnabled?: boolean;
  reducedMotion?: boolean;
  onWorldChange?: (worldIndex: number) => void;
};

export const CinematicExperience: React.FC<CinematicExperienceProps> = ({
  initialWorld = 0,
  reducedMotion = false,
  onWorldChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    currentWorld,
    previousWorld,
    isTransitioning,
    inputLocked,
    transitionDirection,
    isLivingHold,
    goToNextWorld,
    goToPrevWorld,
    goToWorld,
  } = useCinematicWorldController({
    initialWorld,
    totalWorlds: 5,
    enabled: true,
    reducedMotion,
    onWorldChange: (index) => onWorldChange?.(index),
  });

  // Sync when initialWorld changes from outside
  useEffect(() => {
    if (initialWorld !== currentWorld) {
      goToWorld(initialWorld);
    }
  }, [initialWorld, goToWorld]);

  // Desktop Mouse Parallax (subtle 5px–14px GPU translation)
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mx', currentX.toFixed(4));
        containerRef.current.style.setProperty('--my', currentY.toFixed(4));
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`cinematic-experience ${isLivingHold ? 'is-living-hold' : ''} ${
        isTransitioning ? 'is-transitioning' : ''
      }`}
      data-world-active={currentWorld}
      tabIndex={0}
      role="region"
      aria-label="4LOG Cinematic World Experience"
    >
      {/* 1. Full-screen CGI Visuals & Atmospheric Environments */}
      <BackgroundLayer
        currentWorld={currentWorld}
        previousWorld={previousWorld}
        isTransitioning={isTransitioning}
        isLivingHold={isLivingHold}
        transitionDirection={transitionDirection}
        reducedMotion={reducedMotion}
      />

      {/* 2. Hero Garment & Clothing Atmospheric Emphasis */}
      <ClothingLayer
        currentWorld={currentWorld}
        isLivingHold={isLivingHold}
      />

      {/* 3. High-Fashion Editorial Typography Layer */}
      <TypographyLayer
        currentWorld={currentWorld}
        previousWorld={previousWorld}
        isTransitioning={isTransitioning}
        transitionDirection={transitionDirection}
        reducedMotion={reducedMotion}
      />

      {/* 4. Environmental Cinematic Transition Effects */}
      <TransitionLayer
        currentWorld={currentWorld}
        previousWorld={previousWorld}
        isTransitioning={isTransitioning}
        transitionDirection={transitionDirection}
        reducedMotion={reducedMotion}
      />

      {/* 5. Navigation Steppers & Hotspots */}
      <NavigationLayer
        currentWorld={currentWorld}
        inputLocked={inputLocked}
        onNext={goToNextWorld}
        onPrev={goToPrevWorld}
      />

      {/* 6. Minimal Architectural Progress Indicator */}
      <ProgressIndicator
        currentWorld={currentWorld}
        inputLocked={inputLocked}
        onSelectWorld={(idx) => goToWorld(idx)}
      />
    </div>
  );
};

export default CinematicExperience;
