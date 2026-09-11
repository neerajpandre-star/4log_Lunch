type ScrollIndicatorProps = {
  hidden: boolean;
};

const ScrollIndicator = ({ hidden }: ScrollIndicatorProps) => (
  <div className={`scroll-indicator ${hidden ? 'hidden' : ''}`} aria-hidden={hidden}>
    <span className="scroll-indicator-text">Scroll</span>
    <div className="scroll-indicator-line" />
  </div>
);

export default ScrollIndicator;
