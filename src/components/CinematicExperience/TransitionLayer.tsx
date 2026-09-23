import React from 'react';
import { WORLDS_ORDER } from '../../data/worlds';
import type { TransitionDirection } from '../../hooks/useCinematicWorldController';

type TransitionLayerProps = {
  currentWorld: number;
  previousWorld: number | null;
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
  reducedMotion: boolean;
};

export const TransitionLayer: React.FC<TransitionLayerProps> = ({
  currentWorld,
  previousWorld,
  isTransitioning,
  transitionDirection,
  reducedMotion,
}) => {
  if (reducedMotion) return null;

  let transitionType = '';
  if (isTransitioning && previousWorld !== null) {
    const fromId = WORLDS_ORDER[previousWorld]?.id;
    const toId = WORLDS_ORDER[currentWorld]?.id;
    transitionType = `${fromId}-to-${toId}`;
  }

  return (
    <div
      className={`cinematic-layer cinematic-layer--transition ${
        isTransitioning ? 'is-active' : ''
      } ${transitionDirection === 'next' ? 'dir-next' : 'dir-prev'} transition--${transitionType}`}
      aria-hidden="true"
    >
      {/* 1. Volumetric Mist & Darkness (Nivora -> Vayren) */}
      <div className="trans-overlay trans-overlay--mist-darkness" />

      {/* 2. Warm Golden Light Sweep (Vayren -> Aurvia) */}
      <div className="trans-overlay trans-overlay--golden-light" />

      {/* 3. Cosmic Graphic Bloom (Aurvia -> Astera) */}
      <div className="trans-overlay trans-overlay--cosmic-bloom" />

      {/* 4. Creative Manifest Prism (Astera -> Manifera) */}
      <div className="trans-overlay trans-overlay--manifest-prism" />

      {/* Global Cinematic Dust & Vignette */}
      <div className="trans-overlay trans-overlay--atmosphere" />
    </div>
  );
};
