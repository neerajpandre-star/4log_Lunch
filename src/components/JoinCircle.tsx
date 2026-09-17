import { useState, type ChangeEvent, type FormEvent } from 'react';

export const CIRCLE_CONTENT = {
  kicker: '4LOG / THE CIRCLE',
  heading: 'JOIN THE CIRCLE',
  subheading: "For those who don't wait for permission.",
  placeholder: 'ENTER YOUR EMAIL',
  buttonText: 'JOIN',
  loadingText: 'JOINING...',
  supportingText: 'No noise. Just the people who get it.',
  privacyText: 'By joining, you agree to receive occasional updates from 4LOG.',
  successHeading: "YOU'RE IN.",
  successSubheading: "We'll see you on the other side.",
  duplicateHeading: 'ALREADY IN.',
  duplicateSubheading: "You're already part of the circle.",
  invalidEmailError: 'Please enter a valid email.',
  emptyEmailError: 'Please enter your email.',
  genericError: 'Something went wrong. Please try again.',
  resetButtonText: 'Submit another email',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

interface JoinCircleProps {
  id?: string;
  className?: string;
  onSuccess?: (email: string) => void;
}

export default function JoinCircle({ id = 'join-circle', className = '', onSuccess }: JoinCircleProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

    // 3. Environment variable check
    const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT;
    if (!endpoint || !endpoint.trim()) {
      console.error(
        '[4LOG JoinCircle] Missing environment variable VITE_GOOGLE_SHEETS_ENDPOINT. Please configure your Google Apps Script Web App URL in your environment file (.env) or deployment host.'
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

      // Submit with application/json; fallback to text/plain if CORS preflight is rejected by Apps Script
      try {
        response = await fetch(endpoint.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        });
      } catch {
        response = await fetch(endpoint.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: payload,
        });
      }

      const data = await response.json().catch(() => null);

      if (data && data.success) {
        setStatus('success');
        setEmail('');
        onSuccess?.(normalizedEmail);
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
    } catch (networkError) {
      console.error('[4LOG JoinCircle] Submission failed:', networkError);
      setErrorMessage(CIRCLE_CONTENT.genericError);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setErrorMessage('');
  };

  const isCompleted = status === 'success' || status === 'duplicate';

  return (
    <section
      id={id}
      className={`join-circle ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="join-circle__ambient-glow" aria-hidden="true" />
      <div className="join-circle__line join-circle__line--top" aria-hidden="true" />

      <div className="join-circle__container">
        {isCompleted ? (
          <div
            className={`join-circle__result ${status === 'success' ? 'join-circle__result--success' : 'join-circle__result--duplicate'}`}
            role="status"
            aria-live="polite"
          >
            <p className="join-circle__kicker">{CIRCLE_CONTENT.kicker}</p>
            <h2 className="join-circle__heading">
              {status === 'success' ? CIRCLE_CONTENT.successHeading : CIRCLE_CONTENT.duplicateHeading}
            </h2>
            <p className="join-circle__subheading">
              {status === 'success' ? CIRCLE_CONTENT.successSubheading : CIRCLE_CONTENT.duplicateSubheading}
            </p>
            <button
              type="button"
              className="join-circle__reset-btn"
              onClick={handleReset}
            >
              {CIRCLE_CONTENT.resetButtonText} <span aria-hidden="true">↺</span>
            </button>
          </div>
        ) : (
          <>
            <div className="join-circle__header">
              <p className="join-circle__kicker">{CIRCLE_CONTENT.kicker}</p>
              <h2 id={`${id}-heading`} className="join-circle__heading">
                {CIRCLE_CONTENT.heading}
              </h2>
              <p className="join-circle__subheading">
                {CIRCLE_CONTENT.subheading}
              </p>
            </div>

            <form className="join-circle__form" onSubmit={handleSubmit} noValidate>
              <div className="join-circle__input-wrap">
                <label htmlFor={`${id}-email`} className="join-circle__sr-only">
                  Email address
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={CIRCLE_CONTENT.placeholder}
                  value={email}
                  onChange={handleInputChange}
                  disabled={status === 'loading'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? `${id}-error` : undefined}
                  className="join-circle__input"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                  className="join-circle__button"
                >
                  <span>{status === 'loading' ? CIRCLE_CONTENT.loadingText : CIRCLE_CONTENT.buttonText}</span>
                  {status !== 'loading' && <span className="join-circle__button-arrow" aria-hidden="true">↗</span>}
                </button>
              </div>

              {status === 'error' && errorMessage && (
                <div
                  id={`${id}-error`}
                  className="join-circle__error"
                  role="alert"
                  aria-live="polite"
                >
                  <span className="join-circle__error-icon" aria-hidden="true">!</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="join-circle__supporting">{CIRCLE_CONTENT.supportingText}</p>
              <p className="join-circle__privacy">{CIRCLE_CONTENT.privacyText}</p>
            </form>
          </>
        )}
      </div>

      <div className="join-circle__line join-circle__line--bottom" aria-hidden="true" />
    </section>
  );
}
