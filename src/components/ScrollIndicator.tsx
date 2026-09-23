type ScrollIndicatorProps = {
  hidden: boolean;
  onClick?: () => void;
};

const ScrollIndicator = ({ hidden, onClick }: ScrollIndicatorProps) => (
  <button
    type="button"
    className={`scroll-indicator ${hidden ? 'hidden' : ''}`}
    aria-hidden={hidden}
    onClick={onClick}
    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
  >
    <span className="scroll-indicator-text">Scroll</span>
    <div className="scroll-indicator-line" />
  </button>
);

export default ScrollIndicator;
