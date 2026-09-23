import React from 'react';
import { WORLDS_ORDER } from '../../data/worlds';
import type { TransitionDirection } from '../../hooks/useCinematicWorldController';

type TypographyLayerProps = {
  currentWorld: number;
  previousWorld: number | null;
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
  reducedMotion: boolean;
};

export const TypographyLayer: React.FC<TypographyLayerProps> = ({
  currentWorld,
  previousWorld,
  isTransitioning,
  transitionDirection,
  reducedMotion,
}) => {
  return (
    <div className="cinematic-layer cinematic-layer--typography">
      {WORLDS_ORDER.map((world, idx) => {
        const isActive = idx === currentWorld;
        const isPrev = idx === previousWorld;

        // Render active world or previous world during transition exit
        if (!isActive && !(isTransitioning && isPrev)) {
          return null;
        }

        const worldClasses = [
          'world-hero-editorial',
          world.themeClass,
          isActive ? 'in-view active-world' : '',
          isPrev && isTransitioning ? 'exiting-world' : '',
          transitionDirection === 'next' ? 'dir-next' : 'dir-prev',
          reducedMotion ? 'reduced-motion' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={world.id}
            className={worldClasses}
            aria-label={`${world.name} Editorial Experience`}
          >
            {/* LEFT SIDE EDITORIAL TYPOGRAPHY */}
            <div className="world-editorial-left">
              <div className="world-num-row">
                <span className="world-num">{world.num}</span>
                <span className="world-num-rule" aria-hidden="true" />
              </div>

              <h1 className="world-headline">{world.name}</h1>

              <div className="world-subhead">
                {world.meaningParts ? (
                  world.meaningParts.map((part, i) => (
                    <span key={i} className={`world-subhead-part world-subhead-part--${i + 1}`}>
                      {part}{' '}
                    </span>
                  ))
                ) : (
                  world.meaning
                )}
              </div>

              <div className="world-description">
                <p className="world-desc-line world-desc-line--1">{world.descLine1}</p>
                <p className="world-desc-line world-desc-line--2">{world.descLine2}</p>
              </div>

              <a
                href={`/collections/${world.slug}`}
                className="world-enter-link"
                aria-label={`Enter ${world.name} World`}
              >
                <span className="world-enter-text">{world.actionText}</span>
                <span className="world-enter-arrow" aria-hidden="true">
                  <svg
                    width="24"
                    height="12"
                    viewBox="0 0 24 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="0" y1="6" x2="21" y2="6" className="world-enter-arrow-stem" />
                    <polyline points="15,1 21,6 15,11" className="world-enter-arrow-head" />
                  </svg>
                </span>
              </a>
            </div>

            {/* RIGHT SIDE EDITORIAL ATTRIBUTES */}
            <div className="world-editorial-right" aria-label={`${world.name} Attributes`}>
              <div className="world-tags-wrapper">
                {world.tags.map((tag, tIdx) => (
                  <span
                    key={tag}
                    className={`world-tag-item world-tag-item--${tIdx + 1}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="world-tag-accent-line"
                style={{ '--accent-color': world.accentColor } as React.CSSProperties}
                aria-hidden="true"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
