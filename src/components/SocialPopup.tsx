import { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

type SocialPopupProps = {
  isVisible: boolean;
  onJoinCircle?: () => void;
};

const socialChannels = [
  {
    name: 'Instagram',
    handle: '@4log.india',
    href: 'https://www.instagram.com/4log.india',
    Icon: FaInstagram,
    color: '#E1306C',
  },
  {
    name: 'YouTube',
    handle: '@4LOG.Studios',
    href: 'https://www.youtube.com/@4LOG.Studios',
    Icon: FaYoutube,
    color: '#FF0000',
  },
  {
    name: 'Facebook',
    handle: '4LOG Official',
    href: 'https://www.facebook.com/4log',
    Icon: FaFacebookF,
    color: '#1877F2',
  },
  {
    name: 'LinkedIn',
    handle: '4LOG India',
    href: 'https://www.linkedin.com/company/4log-india/about/',
    Icon: FaLinkedinIn,
    color: '#0A66C2',
  },
];

export default function SocialPopup({ isVisible, onJoinCircle }: SocialPopupProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Slight delay so the user experiences the section first, then the popup smoothly glides in
      const timer = setTimeout(() => {
        setHasEntered(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setHasEntered(false);
      setIsDismissed(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  if (isDismissed) {
    return (
      <button
        type="button"
        className="social-popup-reopen"
        onClick={() => setIsDismissed(false)}
        aria-label="Open 4LOG social channels"
      >
        <span className="social-popup-reopen__dot" />
        <span className="social-popup-reopen__text">CONNECT WITH 4LOG</span>
        <span className="social-popup-reopen__arrow">↗</span>
      </button>
    );
  }

  return (
    <div
      className={`social-popup ${hasEntered ? 'is-visible' : ''}`}
      role="dialog"
      aria-label="4LOG Social Media"
    >
      {/* Glow highlight */}
      <div className="social-popup__glow" aria-hidden="true" />

      {/* Header bar */}
      <div className="social-popup__header">
        <div className="social-popup__tag">
          <span className="social-popup__tag-bullet" />
          <span className="social-popup__tag-text">4LOG / COMMUNITY</span>
        </div>
        <button
          type="button"
          className="social-popup__close"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss popup"
        >
          ✕
        </button>
      </div>

      {/* Title & Tagline */}
      <div className="social-popup__content">
        <h3 className="social-popup__title">FROM TALK TO TAKEOVER</h3>
        <p className="social-popup__subtitle">
          Join the movement. Follow 4LOG across all platforms.
        </p>
      </div>

      {/* Social Links Row */}
      <div className="social-popup__channels" aria-label="Social media channels">
        {socialChannels.map(({ name, href, Icon, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-popup__channel-btn"
            aria-label={`Follow 4LOG on ${name}`}
            style={{ '--channel-color': color } as React.CSSProperties}
          >
            <Icon className="social-popup__icon" aria-hidden="true" />
            <span className="social-popup__channel-name">{name}</span>
          </a>
        ))}
      </div>

      {/* Bottom CTA */}
      {onJoinCircle && (
        <div className="social-popup__footer">
          <button
            type="button"
            className="social-popup__cta"
            onClick={onJoinCircle}
            aria-label="Join The Circle"
          >
            JOIN THE CIRCLE <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
