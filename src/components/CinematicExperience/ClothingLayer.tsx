import React from 'react';
import { WORLDS_ORDER } from '../../data/worlds';

type ClothingLayerProps = {
  currentWorld: number;
  isLivingHold: boolean;
};

export const ClothingLayer: React.FC<ClothingLayerProps> = ({ currentWorld, isLivingHold }) => {
  const activeWorld = WORLDS_ORDER[currentWorld];

  return (
    <div className="cinematic-layer cinematic-layer--clothing" aria-hidden="true">
      <div
        className={`clothing-spotlight clothing-spotlight--${activeWorld.id} ${
          isLivingHold ? 'is-breathing' : ''
        }`}
      />
      <div className="clothing-vignette" />
    </div>
  );
};
