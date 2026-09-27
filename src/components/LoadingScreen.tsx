import { type SyntheticEvent, useEffect, useRef, useState } from 'react';

type LoadingScreenProps = {
  onComplete?: () => void;
  onUserInteract?: () => void;
  isAudioPlaying?: boolean;
};

const LoadingScreen = ({ onComplete, onUserInteract, isAudioPlaying = false }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
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

  const handleUserAction = () => {
    onUserInteract?.();
    if (isReadyToEnter || progress >= 80) {
      handleFinish();
    }
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
    // If audio is already playing unmuted, proceed seamlessly
    if (isAudioPlaying) {
      setTimeout(handleFinish, 300);
    } else {
      // If browser blocked unmuted audio, give user a 1-tap enter trigger
      setIsReadyToEnter(true);
      // Fallback timer so it never permanently halts
      setTimeout(handleFinish, 3500);
    }
  };

  // If audio starts playing while we are waiting, automatically proceed
  useEffect(() => {
    if (isAudioPlaying && progress >= 95 && !isExiting) {
      handleFinish();
    }
  }, [isAudioPlaying, progress, isExiting]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safety fallback: ensure screen never hangs indefinitely
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 7000);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Loading video autoplay failed:', err);
        handleFinish();
      });
    }

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [activeVideoSrc]);

  if (isRemoved) return null;

  return (
    <div
      onClick={handleUserAction}
      onPointerDown={handleUserAction}
      className={`fixed inset-0 z-[9999] bg-black text-white transition-all duration-700 ease-out select-none cursor-pointer ${
        isExiting ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading 4LOG"
    >
      {/* Background Video: Original Section 1 Video Animation */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-1.5 sm:p-0 pointer-events-none">
        <video
          ref={videoRef}
          key={activeVideoSrc}
          src={activeVideoSrc}
          className="w-full h-full object-contain md:object-cover brightness-[1.08] contrast-[1.05] pointer-events-none"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={() => {
            console.warn('Loading video error');
            handleFinish();
          }}
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* Progress & Enter Section */}
      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          top-[74%]
          md:top-[74%]
          z-20
          flex
          flex-col
          items-center
          gap-3
          pointer-events-auto
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

        {/* Enter prompt: appears when loading finishes if browser requires gesture, or tap indicator */}
        {isReadyToEnter ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleUserAction();
            }}
            className="
              mt-2
              px-6
              py-2.5
              rounded-full
              border
              border-white/50
              bg-white/10
              hover:bg-white/20
              backdrop-blur-md
              text-white
              text-[11px]
              sm:text-xs
              font-mono
              tracking-[0.25em]
              uppercase
              flex
              items-center
              gap-2.5
              transition-all
              scale-100
              hover:scale-105
              cursor-pointer
              shadow-lg
              shadow-white/10
              animate-pulse
            "
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
            <span>ENTER • SOUND ON</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </button>
        ) : (
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase pt-0.5">
            {isAudioPlaying ? 'SOUND ON' : 'TAP ANYWHERE FOR SOUND'}
          </span>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
