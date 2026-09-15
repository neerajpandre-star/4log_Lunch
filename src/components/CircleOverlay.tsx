import { FormEvent, useEffect, useRef, useState } from 'react';

type CircleOverlayProps = {
  onClose: () => void;
};

const CircleOverlay = ({ onClose }: CircleOverlayProps) => {
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

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
        <p className="circle-overlay__copy">Enter your email to receive the first signal when the Circle of <span className="circle-overlay__manifesto">MISFITS</span> opens.</p>

        {submitted ? (
          <div className="circle-overlay__success" role="status">
            Signal received. You’re in the Circle.
          </div>
        ) : (
          <form className="circle-overlay__form" onSubmit={handleSubmit}>
            <label htmlFor="circle-email">Your email</label>
            <div className="circle-overlay__input-row">
              <input ref={inputRef} id="circle-email" type="email" name="email" autoComplete="email" placeholder="you@future.com" required />
              <button type="submit">Request entry <span aria-hidden="true">↗</span></button>
            </div>
          </form>
        )}
      </div>

      <p className="circle-overlay__footer">NO NOISE. NO EXPECTATIONS. JUST WHAT’S NEXT.</p>
    </section>
  );
};

export default CircleOverlay;
