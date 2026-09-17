import { FormEvent, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { CIRCLE_CONTENT } from './JoinCircle';

type CircleOverlayProps = {
  onClose: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type SubmissionStatus = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

const CircleOverlay = ({ onClose }: CircleOverlayProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') return;

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Empty email validation
    if (!normalizedEmail) {
      setErrorMessage(CIRCLE_CONTENT.emptyEmailError);
      setStatus('error');
      return;
    }

    // 2. Format validation
    if (!EMAIL_REGEX.test(normalizedEmail) || normalizedEmail.length > 254) {
      setErrorMessage(CIRCLE_CONTENT.invalidEmailError);
      setStatus('error');
      return;
    }

    // 3. Endpoint check
    const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT;
    if (!endpoint || !endpoint.trim()) {
      console.error(
        '[4LOG CircleOverlay] Missing environment variable VITE_GOOGLE_SHEETS_ENDPOINT.'
      );
      setErrorMessage(CIRCLE_CONTENT.genericError);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = JSON.stringify({ email: normalizedEmail });
      let response: Response;

      try {
        response = await fetch(endpoint.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
        });
      } catch {
        response = await fetch(endpoint.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: payload,
        });
      }

      const data = await response.json().catch(() => null);

      if (data && data.success) {
        setStatus('success');
        setEmail('');
      } else if (data && data.duplicate) {
        setStatus('duplicate');
        setEmail('');
      } else if (data && data.message === 'Invalid email') {
        setErrorMessage(CIRCLE_CONTENT.invalidEmailError);
        setStatus('error');
      } else {
        setErrorMessage(data?.message || CIRCLE_CONTENT.genericError);
        setStatus('error');
      }
    } catch (err) {
      console.error('[4LOG CircleOverlay] Submission failed:', err);
      setErrorMessage(CIRCLE_CONTENT.genericError);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setErrorMessage('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const isCompleted = status === 'success' || status === 'duplicate';

  return (
    <section className="circle-overlay" role="dialog" aria-modal="true" aria-labelledby="circle-title">
      <div className="circle-overlay__line circle-overlay__line--one" />
      <div className="circle-overlay__line circle-overlay__line--two" />
      <div className="circle-overlay__line circle-overlay__line--three" />

      <button className="circle-overlay__close" type="button" onClick={onClose} aria-label="Close 4LOG Circle">
        Close <span aria-hidden="true">×</span>
      </button>

      <div className="circle-overlay__brand">4LOG / THE CIRCLE</div>
      <div className="circle-overlay__content">
        <p className="circle-overlay__kicker">Invitation only / 001</p>
        <h2 id="circle-title">Welcome to<br /><span>4LOG.</span></h2>
        <p className="circle-overlay__manifesto">Leave your expectations outside.</p>
        <p className="circle-overlay__copy">Enter your email to receive the first signal when the Circle opens.</p>

        {isCompleted ? (
          <div
            className={`circle-overlay__success ${status === 'duplicate' ? 'circle-overlay__duplicate' : ''}`}
            role="status"
            aria-live="polite"
          >
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>
              {status === 'success' ? CIRCLE_CONTENT.successHeading : CIRCLE_CONTENT.duplicateHeading}
            </p>
            <p style={{ margin: '6px 0 0', fontWeight: 400, fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              {status === 'success' ? CIRCLE_CONTENT.successSubheading : CIRCLE_CONTENT.duplicateSubheading}
            </p>
            <button
              type="button"
              onClick={handleReset}
              style={{
                marginTop: '12px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '6px 14px',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '999px',
              }}
            >
              {CIRCLE_CONTENT.resetButtonText} ↺
            </button>
          </div>
        ) : (
          <form className="circle-overlay__form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="circle-email">Your email</label>
            <div className="circle-overlay__input-row">
              <input
                ref={inputRef}
                id="circle-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={CIRCLE_CONTENT.placeholder}
                value={email}
                onChange={handleInputChange}
                disabled={status === 'loading'}
                required
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? CIRCLE_CONTENT.loadingText : 'Request entry'}{' '}
                {status !== 'loading' && <span aria-hidden="true">↗</span>}
              </button>
            </div>

            {status === 'error' && errorMessage && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 14px',
                  background: 'rgba(230, 0, 25, 0.12)',
                  borderLeft: '2px solid #e60019',
                  color: '#ff5263',
                  fontSize: '0.72rem',
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
                role="alert"
                aria-live="polite"
              >
                ! {errorMessage}
              </div>
            )}
          </form>
        )}
      </div>

      <p className="circle-overlay__footer">NO NOISE. NO EXPECTATIONS. JUST WHAT’S NEXT.</p>
    </section>
  );
};

export default CircleOverlay;
