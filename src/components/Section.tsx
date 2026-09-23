import { useEffect, useRef, useState } from 'react';
import { sections, type Section as SectionType } from '../data/sections';
import { worldsData } from '../data/worlds';

const identityNames = ['NIVORA', 'VAYREN', 'AURVIA', 'ASTERA', 'MANIFERA'];


type SectionProps = {
  section: SectionType;
  index: number;
  isActive: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  onJoinCircle: () => void;
  onFindCharacter: () => void;
  onNextSection: () => void;
  introCompleted?: boolean;
  onVideoEnd?: (ended?: boolean) => void;
  onIntroComplete?: () => void;
};

const Section = ({
  section,
  index,
  isActive,
  soundEnabled,
  reducedMotion,
  onJoinCircle,
  onFindCharacter,
  onNextSection,
  introCompleted = false,
  onVideoEnd,
  onIntroComplete,
}: SectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [showEndCta, setShowEndCta] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [scrubMode, setScrubMode] = useState<'forward' | 'rewind' | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  const world = worldsData[section.id];

  useEffect(() => {
    if (!isActive || reducedMotion || typeof window === 'undefined') return;
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

      if (sectionRef.current) {
        sectionRef.current.style.setProperty('--mx', currentX.toFixed(4));
        sectionRef.current.style.setProperty('--my', currentY.toFixed(4));
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (sectionRef.current) {
        sectionRef.current.style.removeProperty('--mx');
        sectionRef.current.style.removeProperty('--my');
      }
    };
  }, [isActive, reducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleMediaChange);
    return () => mql.removeEventListener('change', handleMediaChange);
  }, []);

  const activeVideoSrc = isMobile && section.mobileVideoSrc ? section.mobileVideoSrc : section.videoSrc;
  const isFinalSection = index === sections.length - 1;
  const isFirstSection = index === 0;
  const isCircleSection = index === 1;
  const isFifthSection = index === 4;

  const directionRef = useRef<1 | -1>(1);
  const lastDirectionRef = useRef<1 | -1>(1);
  const currentSpeedRef = useRef(1.0);
  const targetSpeedRef = useRef(1.0);
  const isVideoCompleteRef = useRef(false);
  const hasTriggeredCompleteRef = useRef(false);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const isScrollControlled = useRef(false);
  const isActivelyScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    if (section.imageSrc) {
      if (isActive) {
        const timer = setTimeout(() => setShowEndCta(true), 600);
        return () => clearTimeout(timer);
      } else {
        setShowEndCta(false);
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (isFirstSection) {
      if (!isActive) {
        video.muted = true;
        video.pause();
        return;
      }
      video.muted = !soundEnabled;
      video.volume = soundEnabled ? 1 : 0;
      video.playbackRate = 1.0;
      void video.play().catch(() => {});
      return;
    }

    if (!isActive || reducedMotion) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
        completionTimeoutRef.current = null;
      }
      hasTriggeredCompleteRef.current = false;
      video.muted = true;
      video.volume = 0;
      video.pause();
      setShowEndCta(false);
      directionRef.current = 1;
      lastDirectionRef.current = 1;
      targetTimeRef.current = 0;
      if (!reducedMotion) video.currentTime = 0;
      return;
    }

    // Active video playback setup
    setShowEndCta(false);
    hasTriggeredCompleteRef.current = false;
    directionRef.current = 1;
    lastDirectionRef.current = 1;
    targetTimeRef.current = video.currentTime;
    lastFrameTimeRef.current = performance.now();

    video.muted = !soundEnabled;
    video.volume = soundEnabled ? 1 : 0;
    void video.play().catch(() => { });

    const handleComplete = (isDirectScroll = false) => {
      if (hasTriggeredCompleteRef.current) return;
      hasTriggeredCompleteRef.current = true;
      isVideoCompleteRef.current = true;
      setShowEndCta(true);
      if (isFirstSection) {
        onVideoEnd?.(true);
      }

      if (isDirectScroll) {
        // User scrubbed to the end to skip: immediately advance to next section
        onIntroComplete?.();
      } else {
        // Natural playback end: brief 350ms breather so final frame is perceived
        if (completionTimeoutRef.current) {
          clearTimeout(completionTimeoutRef.current);
        }
        completionTimeoutRef.current = setTimeout(() => {
          onIntroComplete?.();
        }, 350);
      }
    };

    const getScrollPos = () => {
      const container = document.querySelector('.scroll-container') as HTMLElement | null;
      if (container && container.scrollTop !== undefined && container.scrollTop > 0) {
        return container.scrollTop;
      }
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    lastScrollY.current = getScrollPos();

    const handleScroll = () => {
      const currentScrollY = getScrollPos();

      if (currentScrollY > lastScrollY.current) {
        directionRef.current = 1;
        isScrollControlled.current = true;
      } else if (currentScrollY < lastScrollY.current) {
        directionRef.current = -1;
        isScrollControlled.current = true;
      }

      lastScrollY.current = currentScrollY;
    };

    const handleWheel = (e: WheelEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      if (!duration || !Number.isFinite(duration) || duration <= 0) return;

      if (Math.abs(e.deltaY) < 1) return;

      const isScrollingForward = e.deltaY > 0;

      // If already completed and user continues scrolling forward, advance immediately!
      if (isFirstSection && hasTriggeredCompleteRef.current && isScrollingForward) {
        if (completionTimeoutRef.current) {
          clearTimeout(completionTimeoutRef.current);
          completionTimeoutRef.current = null;
        }
        onIntroComplete?.();
        return;
      }

      // Strictly lock section! Scrolling controls video playback, not premature section jumping.
      if (isFirstSection && !introCompleted) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }

      const newDirection: 1 | -1 = isScrollingForward ? 1 : -1;
      directionRef.current = newDirection;
      lastDirectionRef.current = newDirection;

      const absDelta = Math.abs(e.deltaY);

      if (newDirection === 1) {
        setScrubMode('forward');
        // Forward: dynamically advance currentTime proportional to scroll delta
        const forwardStep = Math.min(2.5, Math.max(0.06, absDelta * 0.009));
        video.currentTime = Math.min(duration, video.currentTime + forwardStep);

        // Boost playback rate during scroll for fluid feel
        const forwardSpeed = Math.min(4.5, Math.max(1.5, 1.0 + (absDelta / 35)));
        targetSpeedRef.current = forwardSpeed;
        currentSpeedRef.current = Math.min(4.5, Math.max(currentSpeedRef.current, forwardSpeed * 0.85));

        if (video.currentTime >= duration - 0.08) {
          video.currentTime = duration;
          handleComplete(true);
        }
      } else {
        setScrubMode('rewind');
        // Rewind: cancel completed state if user rewinds back
        if (hasTriggeredCompleteRef.current) {
          hasTriggeredCompleteRef.current = false;
          if (completionTimeoutRef.current) {
            clearTimeout(completionTimeoutRef.current);
            completionTimeoutRef.current = null;
          }
          isVideoCompleteRef.current = false;
          setShowEndCta(false);
          if (isFirstSection) {
            onVideoEnd?.(false);
          }
        }

        // Responsive rewind step
        const rewindStep = Math.min(2.5, Math.max(0.06, absDelta * 0.009));
        video.currentTime = Math.max(0, video.currentTime - rewindStep);

        const reverseSpeed = Math.min(6, Math.max(1.6, 1.0 + (absDelta / 25)));
        targetSpeedRef.current = reverseSpeed;
        currentSpeedRef.current = Math.min(6, Math.max(currentSpeedRef.current, reverseSpeed));
      }

      isActivelyScrollingRef.current = true;

      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }

      scrollStopTimerRef.current = setTimeout(() => {
        isActivelyScrollingRef.current = false;
        targetSpeedRef.current = 1.0;
        setScrubMode(null);
      }, 200);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      if (!duration || !Number.isFinite(duration) || duration <= 0) return;

      if (e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const diff = touchStartYRef.current - currentY; // diff > 0 is swipe up = forward
        touchStartYRef.current = currentY;

        if (Math.abs(diff) < 2) return;

        const isScrollingForward = diff > 0;

        if (isFirstSection && hasTriggeredCompleteRef.current && isScrollingForward) {
          if (completionTimeoutRef.current) {
            clearTimeout(completionTimeoutRef.current);
            completionTimeoutRef.current = null;
          }
          onIntroComplete?.();
          return;
        }

        if (isFirstSection && !introCompleted) {
          if (e.cancelable) {
            e.preventDefault();
          }
        }

        const newDirection: 1 | -1 = isScrollingForward ? 1 : -1;
        directionRef.current = newDirection;
        lastDirectionRef.current = newDirection;

        const absDiff = Math.abs(diff);

        if (newDirection === 1) {
          setScrubMode('forward');
          const forwardStep = Math.min(2.5, Math.max(0.06, absDiff * 0.025));
          video.currentTime = Math.min(duration, video.currentTime + forwardStep);

          const forwardSpeed = Math.min(4.5, Math.max(1.5, 1.0 + (absDiff / 12)));
          targetSpeedRef.current = forwardSpeed;
          currentSpeedRef.current = Math.min(4.5, Math.max(currentSpeedRef.current, forwardSpeed * 0.85));

          if (video.currentTime >= duration - 0.08) {
            video.currentTime = duration;
            handleComplete(true);
          }
        } else {
          setScrubMode('rewind');
          if (hasTriggeredCompleteRef.current) {
            hasTriggeredCompleteRef.current = false;
            if (completionTimeoutRef.current) {
              clearTimeout(completionTimeoutRef.current);
              completionTimeoutRef.current = null;
            }
            isVideoCompleteRef.current = false;
            setShowEndCta(false);
            if (isFirstSection) {
              onVideoEnd?.(false);
            }
          }

          const rewindStep = Math.min(2.5, Math.max(0.06, absDiff * 0.025));
          video.currentTime = Math.max(0, video.currentTime - rewindStep);

          const reverseSpeed = Math.min(6, Math.max(1.6, 1.0 + (absDiff / 8)));
          targetSpeedRef.current = reverseSpeed;
          currentSpeedRef.current = Math.min(6, Math.max(currentSpeedRef.current, reverseSpeed));
        }

        isActivelyScrollingRef.current = true;

        if (scrollStopTimerRef.current) {
          clearTimeout(scrollStopTimerRef.current);
        }

        scrollStopTimerRef.current = setTimeout(() => {
          isActivelyScrollingRef.current = false;
          targetSpeedRef.current = 1.0;
          setScrubMode(null);
        }, 200);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFirstSection || introCompleted || !isActive) return;
      const video = videoRef.current;
      if (!video) return;
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration) || duration <= 0) return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        setScrubMode('forward');
        video.currentTime = Math.min(duration, video.currentTime + 1.5);
        if (video.currentTime >= duration - 0.08) {
          video.currentTime = duration;
          handleComplete(true);
        }
        setTimeout(() => setScrubMode(null), 300);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        setScrubMode('rewind');
        if (hasTriggeredCompleteRef.current) {
          hasTriggeredCompleteRef.current = false;
          if (completionTimeoutRef.current) {
            clearTimeout(completionTimeoutRef.current);
            completionTimeoutRef.current = null;
          }
          isVideoCompleteRef.current = false;
          setShowEndCta(false);
          onVideoEnd?.(false);
        }
        video.currentTime = Math.max(0, video.currentTime - 1.5);
        setTimeout(() => setScrubMode(null), 300);
      }
    };

    const updatePlayback = (timestamp: number) => {
      if (!video) return;

      const lastTime = lastFrameTimeRef.current ?? timestamp;
      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastFrameTimeRef.current = timestamp;

      const duration = video.duration;
      const hasDuration = duration && Number.isFinite(duration) && duration > 0;

      if (!hasDuration) {
        rafIdRef.current = requestAnimationFrame(updatePlayback);
        return;
      }

      // Smoothly interpolate currentSpeed towards targetSpeed
      if (!isActivelyScrollingRef.current) {
        currentSpeedRef.current += (1.0 - currentSpeedRef.current) * 0.07;
        if (Math.abs(currentSpeedRef.current - 1.0) < 0.05) {
          currentSpeedRef.current = 1.0;
        }
      } else {
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.3;
      }

      if (directionRef.current === 1) {
        // FORWARD PLAYBACK
        if (video.currentTime >= duration - 0.05) {
          if (!video.paused) {
            video.pause();
          }
          video.currentTime = duration;
          handleComplete(isActivelyScrollingRef.current);
        } else {
          try {
            const desiredRate = Math.min(4.5, Math.max(0.5, currentSpeedRef.current));
            if (Math.abs(video.playbackRate - desiredRate) > 0.05) {
              video.playbackRate = desiredRate;
            }
          } catch {
            // ignore
          }

          if (video.paused) {
            video.muted = !soundEnabled;
            video.volume = soundEnabled ? 1 : 0;
            void video.play().catch(() => {});
          }
        }
      } else if (directionRef.current === -1) {
        // BACKWARD PLAYBACK
        if (hasTriggeredCompleteRef.current) {
          hasTriggeredCompleteRef.current = false;
          if (completionTimeoutRef.current) {
            clearTimeout(completionTimeoutRef.current);
            completionTimeoutRef.current = null;
          }
          isVideoCompleteRef.current = false;
          setShowEndCta(false);
          if (isFirstSection) {
            onVideoEnd?.(false);
          }
        }
        if (!video.paused) {
          video.pause();
        }

        if (video.currentTime <= 0.01) {
          video.currentTime = 0;
        } else {
          const step = dt * currentSpeedRef.current;
          video.currentTime = Math.max(0, video.currentTime - step);
        }
      }

      rafIdRef.current = requestAnimationFrame(updatePlayback);
    };

    rafIdRef.current = requestAnimationFrame(updatePlayback);

    const container = document.querySelector('.scroll-container');
    container?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
        completionTimeoutRef.current = null;
      }
      container?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, soundEnabled, reducedMotion, section.imageSrc, activeVideoSrc, isFirstSection, introCompleted, onVideoEnd, onIntroComplete, onNextSection]);

  const identityName = index > 0 && index <= 5 ? (section.title || identityNames[index - 1]) : section.title;
  const identitySlug = section.id === 'intro' ? '' : section.id;

  return (
    <section ref={sectionRef} className={`section ${isActive ? 'in-view' : ''} ${isFinalSection ? 'section--final' : ''}`} id={`section-${index}`} data-section={section.id}>
      {section.imageSrc ? (
        <div className="section-collection-stage">
          <picture className="section-collection-picture">
            {section.mobileImageSrc && (
              <source media="(max-width: 768px)" srcSet={section.mobileImageSrc} />
            )}
            <img
              src={section.imageSrc}
              alt={section.title}
              className="section-collection-banner"
            />
          </picture>
          {world ? (
            <div className={`world-hero-editorial ${world.themeClass}`} aria-label={`${world.name} Editorial Experience`}>
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
                  <p className="world-desc-line world-desc-line--1">
                    {world.descLine1}
                  </p>
                  <p className="world-desc-line world-desc-line--2">
                    {world.descLine2}
                  </p>
                </div>

                <a
                  href={`/collections/${world.slug}`}
                  className="world-enter-link"
                  aria-label={`Enter ${world.name} World`}
                >
                  <span className="world-enter-text">{world.actionText}</span>
                  <span className="world-enter-arrow" aria-hidden="true">
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="0" y1="6" x2="21" y2="6" className="world-enter-arrow-stem" />
                      <polyline points="15,1 21,6 15,11" className="world-enter-arrow-head" />
                    </svg>
                  </span>
                </a>
              </div>

              {/* RIGHT SIDE EDITORIAL ATTRIBUTES */}
              <div className="world-editorial-right" aria-label={`${world.name} Attributes`}>
                <div className="world-tags-wrapper">
                  {world.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`world-tag-item world-tag-item--${idx + 1}`}
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
          ) : (
            <a
              href={`/collections/${identitySlug}`}
              className="section-enter-world-hotspot"
              aria-label={`Enter World ${identityName}`}
              title={`Enter World ${identityName}`}
            />
          )}
        </div>
      ) : (
        <video
          key={activeVideoSrc}
          ref={videoRef}
          src={activeVideoSrc}
          data-section-index={index}
          className="section-video"
          autoPlay={!reducedMotion && isActive}
          muted={!soundEnabled || !isActive}
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => {
            setVideoFailed(true);
            if (isFirstSection) {
              isVideoCompleteRef.current = true;
              setShowEndCta(true);
              onVideoEnd?.(true);
              onIntroComplete?.();
            }
          }}
          onEnded={() => {
            if (isFirstSection) {
              if (hasTriggeredCompleteRef.current) return;
              hasTriggeredCompleteRef.current = true;
              isVideoCompleteRef.current = true;
              setShowEndCta(true);
              onVideoEnd?.(true);
              if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
              completionTimeoutRef.current = setTimeout(() => {
                onIntroComplete?.();
              }, 350);
            } else {
              setShowEndCta(true);
            }
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration && Number.isFinite(v.duration) && v.duration > 0) {
              setVideoProgress(Math.min(100, (v.currentTime / v.duration) * 100));
              if (isFirstSection && v.currentTime >= v.duration - 0.08) {
                if (!hasTriggeredCompleteRef.current) {
                  hasTriggeredCompleteRef.current = true;
                  isVideoCompleteRef.current = true;
                  setShowEndCta(true);
                  onVideoEnd?.(true);
                  if (isActivelyScrollingRef.current) {
                    onIntroComplete?.();
                  } else {
                    if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
                    completionTimeoutRef.current = setTimeout(() => {
                      onIntroComplete?.();
                    }, 350);
                  }
                }
              }
            }
          }}
        >
          {section.mobileVideoSrc && (
            <source media="(max-width: 768px)" src={section.mobileVideoSrc} type="video/mp4" />
          )}
          <source src={section.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {!isFirstSection && !section.imageSrc && !videoFailed && (
        <div className={`video-status ${videoReady ? 'is-ready' : ''} ${videoFailed ? 'has-failed' : ''}`} aria-live="polite">
          {reducedMotion ? 'Motion paused' : 'Loading episode'}
        </div>
      )}

      {!section.imageSrc && !isFirstSection && (
        <>
          <div className="section-vignette-top" />
          <div className="section-gradient" />
        </>
      )}

      {/* 01 — INTRO SECTION: ENTER THE JOURNEY CTA BUTTON */}
      {isFirstSection && (
        <div
          className={`intro-journey-popup ${isActive ? 'is-visible' : 'is-exiting'}`}
          aria-label="Enter The Journey"
        >
          <button
            type="button"
            className="intro-journey-btn"
            onClick={() => {
              onIntroComplete?.();
            }}
            aria-label="Enter The Journey"
          >
            <span className="intro-journey-btn__text">ENTER THE JOURNEY</span>
            <span className="intro-journey-btn__arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      )}

      {!isFirstSection && !section.imageSrc && identityName && (
        <>
          <div
            className={`identity-popup ${showEndCta && isActive ? 'is-visible' : 'is-exiting'}`}
            aria-label={identityName}
          >
            <div className="identity-popup__title">{identityName}</div>
            <a
              href={`/collections/${identitySlug}`}
              className="identity-popup__discover"
              aria-label={`Discover ${identityName}`}
            >
              DISCOVER
            </a>
          </div>

          {!isFinalSection && (
            <button
              type="button"
              className={`identity-scroll-indicator ${showEndCta && isActive ? 'is-visible' : 'is-exiting'}`}
              onClick={onNextSection}
              aria-label="Scroll for more"
            >
              <span className="identity-scroll-indicator__text">SCROLL FOR MORE</span>
              <span className="identity-scroll-indicator__chevron" aria-hidden="true">
                <svg width="18" height="22" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 7l6 6 6-6" />
                  <path d="M6 15l6 6 6-6" opacity="0.6" />
                </svg>
              </span>
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default Section;
