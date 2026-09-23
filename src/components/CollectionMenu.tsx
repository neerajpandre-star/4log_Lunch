import { useEffect } from 'react';
import { collections } from '../data/collections';

type CollectionMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCollection: (href: string) => void;
};

const CollectionMenu = ({ isOpen, onClose, onSelectCollection }: CollectionMenuProps) => {
  // Close menu on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const scrollContainer = document.querySelector('.scroll-container') as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      if (scrollContainer) {
        scrollContainer.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        if (scrollContainer) {
          scrollContainer.style.overflow = '';
        }
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Dark translucent overlay with subtle blur */}
      <div
        className={`collection-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-out Panel */}
      <aside
        className={`collection-panel ${isOpen ? 'is-open' : ''}`}
        aria-label="Collection menu"
        aria-hidden={!isOpen}
      >
        <div className="collection-panel__inner flex flex-col p-4 md:p-8 pt-16 md:pt-20 pb-24">
          <h2 className="collection-panel__heading text-[14px] md:text-[18px] font-semibold uppercase text-white/70 mb-4 md:mb-6">THE WORLDS</h2>

          <div className="flex flex-col gap-4" aria-label="All Collections">
            {collections.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                className="group collection-card relative overflow-hidden rounded-lg w-full h-[100px] md:h-32"
                style={{ '--card-index': index } as React.CSSProperties}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCollection(item.href);
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="collection-card__image absolute inset-0 w-full h-full object-cover brightness-[1.12] contrast-[1.08] saturate-[1.12] group-hover:brightness-[1.2] group-hover:contrast-[1.12] group-hover:saturate-[1.2] transition-all duration-300"
                  loading="eager"
                />
                <div className="collection-card__gradient" />
                <div className="collection-card__content relative h-full flex items-center justify-end px-6 z-10 gap-3">
                  <span className="collection-card__title">{item.name}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="collection-card__chevron"
                    aria-hidden="true"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default CollectionMenu;
