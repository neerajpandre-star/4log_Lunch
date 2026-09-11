import type { Section } from '../data/sections';

type TimelineNavProps = {
  sections: Section[];
  currentIndex: number;
  onSelectSection: (index: number) => void;
};

const TimelineNav = ({ sections, currentIndex, onSelectSection }: TimelineNavProps) => (
  <>
    <div className="timeline-line" />
    <nav className="timeline-nav" aria-label="Section timeline">
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          className={`timeline-item ${index === currentIndex ? 'active' : ''}`}
          onClick={() => onSelectSection(index)}
        >
          <div className="timeline-dot" />
          <span className="timeline-label">{section.label}</span>
        </button>
      ))}
    </nav>
  </>
);

export default TimelineNav;
