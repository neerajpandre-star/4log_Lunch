import { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { sections, type Section as SectionType } from '../data/sections';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/4log.india', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@4LOG.Studios', Icon: FaYoutube },
  { label: 'X', href: 'https://x.com/4log', Icon: FaXTwitter },
  { label: 'Facebook', href: 'https://www.facebook.com/4log', Icon: FaFacebookF },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/4log-india/about/', Icon: FaLinkedinIn },
];

type SectionProps = {
  section: SectionType;
  index: number;
  isActive: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  onJoinCircle: () => void;
  onFindCharacter: () => void;
  onNextSection: () => void;
};

const Section = ({ section, index, isActive, soundEnabled, reducedMotion, onJoinCircle, onFindCharacter, onNextSection }: SectionProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [showEndCta, setShowEndCta] = useState(false);

  useEffect(() => {
    if (section.imageSrc) {
      if (isActive) {
        const timer = setTimeout(() => setShowEndCta(true), 1500);
        return () => clearTimeout(timer);
      } else {
        setShowEndCta(false);
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (isActive && !reducedMotion) {
      setShowEndCta(false);
      video.muted = !soundEnabled;
      video.volume = soundEnabled ? 1 : 0;
      void video.play().catch(() => { });
    } else {
      video.muted = true;
      video.volume = 0;
      video.pause();
      setShowEndCta(false);
      if (!reducedMotion) video.currentTime = 0;
    }
  }, [isActive, soundEnabled, reducedMotion, section.imageSrc]);

  const isFinalSection = index === sections.length - 1;
  const isFirstSection = index === 0;
  const isCircleSection = index === 1;
  const isFifthSection = index === 4;

  const ctaEyebrow = isFirstSection
    ? 'Your invitation awaits'
    : isCircleSection
      ? 'Who are you, really?'
      : isFifthSection
        ? 'Next Chapter'
        : isFinalSection
          ? '4LOG — Join Us'
          : `Episode ${String(index + 1).padStart(2, '0')} complete`;

  const ctaLabel = isFirstSection
    ? 'Join the 4LOG Circle'
    : isCircleSection
      ? 'Find your character'
      : isFifthSection
        ? 'FROM TALK → TO TAKEOVER'
        : isFinalSection
          ? 'JOIN THE COMMUNITY →'
          : 'Follow on Instagram';

  return (
    <section className={`section ${isActive ? 'in-view' : ''} ${isFinalSection ? 'section--final' : ''}`} id={`section-${index}`} data-section={section.id}>
      {section.imageSrc ? (
        <picture className="section-video" style={{ display: 'block', width: '100%', height: '100%' }}>
          {section.mobileImageSrc && (
            <source media="(max-width: 768px)" srcSet={section.mobileImageSrc} />
          )}
          <img
            src={section.imageSrc}
            alt={section.title}
            style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
          />
        </picture>
      ) : (
        <video
          ref={videoRef}
          data-section-index={index}
          className="section-video"
          autoPlay={!reducedMotion && isActive}
          muted={!soundEnabled || !isActive}
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          onEnded={() => setShowEndCta(true)}
        >
          {section.mobileVideoSrc && (
            <source media="(max-width: 768px)" src={section.mobileVideoSrc} type="video/mp4" />
          )}
          <source src={section.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {!section.imageSrc && (
        <div className={`video-status ${videoReady ? 'is-ready' : ''} ${videoFailed ? 'has-failed' : ''}`} aria-live="polite">
          {videoFailed ? 'Episode unavailable' : reducedMotion ? 'Motion paused' : 'Loading episode'}
        </div>
      )}

      <div className="section-vignette-top" />
      <div className="section-gradient" />
      <div className="section-content">
        <div className="section-inner">
          <div className="section-info">
            <div className="section-index">{String(index + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}</div>
            <h2 className="section-title">{section.title}</h2>
            <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section.subtitle }}></p>
            {isFirstSection && (
              <button
                className="launch-cta__link"
                style={{ marginTop: '24px' }}
                onClick={onNextSection}
              >
                ENTER THE STORY <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
          <div className="section-meta">
            <div className="section-meta-label">Mood</div>
            <div className="section-meta-value">{section.mood}</div>
          </div>
        </div>
      </div>
      {showEndCta && isActive && (
        <div className={`launch-cta ${isFirstSection ? 'launch-cta--circle' : isCircleSection ? 'launch-cta--character' : isFifthSection ? 'launch-cta--circle' : isFinalSection ? 'launch-cta--social' : 'launch-cta--follow'}`}>
          {!isFinalSection && (
            <span className="launch-cta__eyebrow">
              {ctaEyebrow}
            </span>
          )}
          {isFinalSection ? (
            <>
              <a className="launch-cta__link" href="#" aria-label="Join the community" style={{ marginRight: '16px' }}>
                {ctaLabel}
              </a>
              <div className="launch-social-links" aria-label="Follow 4LOG on social media">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Follow 4LOG on ${label}`}>
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </>
          ) : isFirstSection ? (
            <button className="launch-cta__link" type="button" onClick={onJoinCircle}>
              {ctaLabel} <span aria-hidden="true">↗</span>
            </button>
          ) : isCircleSection ? (
            <button className="launch-cta__link" type="button" onClick={onFindCharacter}>
              {ctaLabel} <span aria-hidden="true">↗</span>
            </button>
          ) : isFifthSection ? (
            <button className="launch-cta__link" type="button" onClick={onNextSection}>
              {ctaLabel}
            </button>
          ) : (
            <a className="launch-cta__link" href="https://www.instagram.com/4log/" target="_blank" rel="noreferrer" aria-label={`${ctaLabel} on Instagram`}>
              {ctaLabel} <span aria-hidden="true">↗</span>
            </a>
          )}
          {!isFinalSection && <span className="launch-cta__hint">Scroll to continue</span>}
        </div>
      )}
    </section>
  );
};

export default Section;
