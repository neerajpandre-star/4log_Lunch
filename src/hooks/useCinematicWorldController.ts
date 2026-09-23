import { useCallback, useEffect, useRef, useState } from 'react';
import { CINEMATIC_TIMINGS } from '../config/cinematicTimings';

export type TransitionDirection = 'next' | 'prev';

export type UseCinematicWorldControllerOptions = {
  initialWorld?: number;
  totalWorlds?: number;
  enabled?: boolean;
  reducedMotion?: boolean;
  onWorldChange?: (worldIndex: number, direction: TransitionDirection) => void;
};

export function useCinematicWorldController({
  initialWorld = 0,
  totalWorlds = 5,
  enabled = true,
  reducedMotion = false,
  onWorldChange,
}: UseCinematicWorldControllerOptions = {}) {
  const [currentWorld, setCurrentWorld] = useState<number>(initialWorld);
  const [previousWorld, setPreviousWorld] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [inputLocked, setInputLocked] = useState<boolean>(false);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>('next');
  const [isLivingHold, setIsLivingHold] = useState<boolean>(true);

  const currentWorldRef = useRef(currentWorld);
  currentWorldRef.current = currentWorld;

  const isTransitioningRef = useRef(isTransitioning);
  isTransitioningRef.current = isTransitioning;

  const inputLockedRef = useRef(inputLocked);
  inputLockedRef.current = inputLocked;

  const wheelAccumulatorRef = useRef(0);
  const lastTransitionTimeRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const transitionDuration = reducedMotion ? 200 : CINEMATIC_TIMINGS.TRANSITION_DURATION;
  const holdDuration = reducedMotion ? 100 : CINEMATIC_TIMINGS.WORLD_HOLD_DURATION;
  const cooldownDuration = reducedMotion ? 50 : CINEMATIC_TIMINGS.INPUT_COOLDOWN;

  const goToWorld = useCallback(
    (targetIndex: number, forcedDirection?: TransitionDirection) => {
      if (!enabled) return;
      if (inputLockedRef.current) return;
      if (targetIndex < 0 || targetIndex >= totalWorlds) return;
      if (targetIndex === currentWorldRef.current) return;

      const direction: TransitionDirection =
        forcedDirection || (targetIndex > currentWorldRef.current ? 'next' : 'prev');

      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);

      lastTransitionTimeRef.current = performance.now();
      setInputLocked(true);
      setIsTransitioning(true);
      setIsLivingHold(false);
      setTransitionDirection(direction);
      setPreviousWorld(currentWorldRef.current);
      setCurrentWorld(targetIndex);

      onWorldChange?.(targetIndex, direction);

      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setIsLivingHold(true);
      }, transitionDuration);

      const totalLockTime = transitionDuration + holdDuration + cooldownDuration;
      cooldownTimeoutRef.current = setTimeout(() => {
        setInputLocked(false);
        wheelAccumulatorRef.current = 0;
      }, totalLockTime);
    },
    [enabled, totalWorlds, transitionDuration, holdDuration, cooldownDuration, onWorldChange]
  );

  const goToNextWorld = useCallback(() => {
    if (currentWorldRef.current < totalWorlds - 1) {
      goToWorld(currentWorldRef.current + 1, 'next');
    }
  }, [goToWorld, totalWorlds]);

  const goToPrevWorld = useCallback(() => {
    if (currentWorldRef.current > 0) {
      goToWorld(currentWorldRef.current - 1, 'prev');
    }
  }, [goToWorld]);

  // WHEEL SCROLL LISTENER
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleWheel = (e: WheelEvent) => {
      // NEVER block or intercept events inside collection menu, modals, or scrollable pages
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.collection-panel, .collection-backdrop, .brand-page, .character-quiz, .circle-overlay, .modal')) {
        return;
      }

      e.preventDefault();

      if (inputLockedRef.current) {
        return;
      }

      wheelAccumulatorRef.current += e.deltaY;

      if (wheelAccumulatorRef.current >= CINEMATIC_TIMINGS.WHEEL_THRESHOLD) {
        wheelAccumulatorRef.current = 0;
        goToNextWorld();
      } else if (wheelAccumulatorRef.current <= -CINEMATIC_TIMINGS.WHEEL_THRESHOLD) {
        wheelAccumulatorRef.current = 0;
        goToPrevWorld();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [enabled, goToNextWorld, goToPrevWorld]);

  // TOUCH SWIPE LISTENER
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.collection-panel, .collection-backdrop, .brand-page, .character-quiz, .circle-overlay, .modal')) {
        return;
      }
      if (enabled) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.collection-panel, .collection-backdrop, .brand-page, .character-quiz, .circle-overlay, .modal')) {
        return;
      }

      if (inputLockedRef.current || e.changedTouches.length === 0) return;

      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) >= CINEMATIC_TIMINGS.SWIPE_THRESHOLD) {
        if (deltaY > 0) {
          goToNextWorld();
        } else {
          goToPrevWorld();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, goToNextWorld, goToPrevWorld]);

  // KEYBOARD
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        goToNextWorld();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goToPrevWorld();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, goToNextWorld, goToPrevWorld]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
    };
  }, []);

  return {
    currentWorld,
    previousWorld,
    isTransitioning,
    inputLocked,
    transitionDirection,
    isLivingHold,
    goToNextWorld,
    goToPrevWorld,
    goToWorld,
  };
}
