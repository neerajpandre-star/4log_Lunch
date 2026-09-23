import React from 'react';
import { WORLDS_ORDER } from '../../data/worlds';

type ProgressIndicatorProps = {
  currentWorld: number;
  inputLocked: boolean;
  onSelectWorld: (index: number) => void;
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentWorld,
  inputLocked,
  onSelectWorld,
}) => {
  return (
    <nav className="cinematic-progress-indicator" aria-label="Cinematic Worlds Progress">
      <div className="cinematic-progress-track">
        {/* Active gliding indicator pip */}
        <div
          className="cinematic-progress-active-pill"
          style={
            {
              '--active-index': currentWorld,
              '--total-worlds': WORLDS_ORDER.length,
            } as React.CSSProperties
          }
          aria-hidden="true"
        />

        {WORLDS_ORDER.map((world, idx) => {
          const isActive = idx === currentWorld;

          return (
            <button
              key={world.id}
              type="button"
              className={`cinematic-progress-node ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectWorld(idx)}
              aria-label={`World ${world.num}: ${world.name}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="cinematic-progress-pip" aria-hidden="true" />
              <span className="cinematic-progress-num">{world.num}</span>
              <span className="cinematic-progress-name">{world.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
