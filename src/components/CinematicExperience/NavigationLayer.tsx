import React from 'react';
import { WORLDS_ORDER } from '../../data/worlds';

type NavigationLayerProps = {
  currentWorld: number;
  inputLocked: boolean;
  onNext: () => void;
  onPrev: () => void;
};

export const NavigationLayer: React.FC<NavigationLayerProps> = ({
  currentWorld,
  inputLocked,
  onNext,
  onPrev,
}) => {
  const activeWorld = WORLDS_ORDER[currentWorld];
  const canGoPrev = currentWorld > 0;
  const canGoNext = currentWorld < WORLDS_ORDER.length - 1;

  return (
    <div className="cinematic-layer cinematic-layer--navigation">
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite">
        Current World {activeWorld.num}: {activeWorld.name} — {activeWorld.meaning}
      </div>

      {/* Discrete Architectural World Steppers */}
      <div className="cinematic-nav-controls" aria-label="World Navigation">
        {canGoPrev && (
          <button
            type="button"
            className="cinematic-nav-step cinematic-nav-step--prev"
            onClick={onPrev}
            aria-label={`Previous World: ${WORLDS_ORDER[currentWorld - 1]?.name}`}
          >
            <span className="cinematic-nav-step-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="cinematic-nav-step-num">
              {WORLDS_ORDER[currentWorld - 1]?.num} — {WORLDS_ORDER[currentWorld - 1]?.name}
            </span>
          </button>
        )}

        {canGoNext && (
          <button
            type="button"
            className="cinematic-nav-step cinematic-nav-step--next"
            onClick={onNext}
            aria-label={`Next World: ${WORLDS_ORDER[currentWorld + 1]?.name}`}
          >
            <span className="cinematic-nav-step-num">
              {WORLDS_ORDER[currentWorld + 1]?.num} — {WORLDS_ORDER[currentWorld + 1]?.name}
            </span>
            <span className="cinematic-nav-step-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Accessible direct collection link hotspot */}
      <a
        href={`/collections/${activeWorld.slug}`}
        className="cinematic-direct-hotspot"
        aria-label={`Enter ${activeWorld.name} World`}
        tabIndex={-1}
      />
    </div>
  );
};
