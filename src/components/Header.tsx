type HeaderProps = {
  sectionName: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
};

const Header = ({ sectionName, soundEnabled, onToggleSound }: HeaderProps) => (
  <header>
    <a href="#" className="logo-container" aria-label="4LOG home">
      <img className="logo-icon" src={logo} alt="4LOG" />
    </a>

    <div className="nav-status" id="navStatus">
      {sectionName}
    </div>

    <button
      type="button"
      className={`sound-toggle ${soundEnabled ? 'active' : ''}`}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? 'Sound on' : 'Sound off'}
      onClick={onToggleSound}
      id="soundToggle"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 9h4l5-5v16l-5-5H5z" />
        <path className="sound-off" d="M4.5 4.5l15 15" fill="none" />
      </svg>
    </button>
  </header>
);

export default Header;
import logo from '../../Logo.png';
