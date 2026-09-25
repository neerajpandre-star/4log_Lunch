import { type SyntheticEvent, useEffect, useRef, useState } from 'react';

type LoadingScreenProps = {
  onComplete?: () => void;
};

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Lock scroll during loading screen
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const scrollContainer = document.querySelector('.scroll-container') as HTMLElement | null;
    if (scrollContainer) {
      scrollContainer.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (scrollContainer) {
        scrollContainer.style.overflow = '';
      }
    };
  }, []);

  const handleFinish = () => {
    if (isExiting || isRemoved) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsRemoved(true);
      onComplete?.();
    }, 750);
  };

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

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

  // Section 1 animation video used exclusively for the loading screen
  const activeVideoSrc = isMobile ? '/videos/e-1.mp4' : '/videos/episode-01.mp4';

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && Number.isFinite(video.duration)) {
      const percentage = Math.min(
        100,
        Math.round((video.currentTime / video.duration) * 100)
      );
      setProgress(percentage);
    }
  };

  const handleEnded = () => {
    setProgress(100);
    setTimeout(handleFinish, 300);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Loading video autoplay failed:', err);
        handleFinish();
      });
    }
  }, [activeVideoSrc]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black text-white transition-all duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading 4LOG"
    >
      {/* Background Video: Original Section 1 Video Animation */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-1.5 sm:p-0">
        <video
          ref={videoRef}
          key={activeVideoSrc}
          src={activeVideoSrc}
          className="w-full h-full object-contain md:object-cover brightness-[1.08] contrast-[1.05]"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* Progress Section: Positioned below the video text/logo animation */}
      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          top-[75%]
          md:top-[74%]
          z-20
          flex
          flex-col
          items-center
          gap-3
        "
      >
        <div className="w-[70vw] md:w-[380px] h-[1.5px] bg-white/20 overflow-hidden">
          <div
            className="h-full bg-white transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            w-[70vw]
            md:w-[380px]
            text-[10px]
            md:text-xs
            font-mono
            tracking-[0.28em]
            text-white/80
          "
        >
          <span>EXPERIENCE 4LOG</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
