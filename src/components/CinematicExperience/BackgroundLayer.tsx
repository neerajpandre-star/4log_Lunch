import React from 'react';
import { WORLDS_ORDER } from '../../data/worlds';
import type { TransitionDirection } from '../../hooks/useCinematicWorldController';

type BackgroundLayerProps = {
  currentWorld: number;
  previousWorld: number | null;
  isTransitioning: boolean;
  isLivingHold: boolean;
  transitionDirection: TransitionDirection;
  reducedMotion: boolean;
};

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  currentWorld,
  previousWorld,
  isTransitioning,
  isLivingHold,
  transitionDirection,
  reducedMotion,
}) => {
  return (
    <div className="cinematic-layer cinematic-layer--background" aria-hidden="true">
      {WORLDS_ORDER.map((world, idx) => {
        const isActive = idx === currentWorld;
        const isPrev = idx === previousWorld;

        // Transition type identifier: e.g. "nivora-vayren", "vayren-aurvia", etc.
        let transitionName = '';
        if (isTransitioning && previousWorld !== null) {
          const fromSlug = WORLDS_ORDER[previousWorld]?.id;
          const toSlug = WORLDS_ORDER[currentWorld]?.id;
          transitionName = `trans-${fromSlug}-${toSlug}`;
        }

        const classList = [
          'world-bg-item',
          `world-bg-item--${world.id}`,
          isActive ? 'is-active' : '',
          isPrev ? 'is-previous' : '',
          isTransitioning ? 'is-transitioning' : '',
          isLivingHold && isActive ? 'is-living-hold' : '',
          transitionDirection === 'next' ? 'dir-next' : 'dir-prev',
          transitionName,
          reducedMotion ? 'reduced-motion' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={world.id} className={classList} data-world-index={idx}>
            <picture className="world-bg-picture">
              <img
                src={world.imageSrc}
                alt=""
                className="world-bg-image"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
            <div className={`world-ambient-fog world-ambient-fog--${world.id}`} />
            <div className={`world-ambient-glow world-ambient-glow--${world.id}`} />
          </div>
        );
      })}
    </div>
  );
};
