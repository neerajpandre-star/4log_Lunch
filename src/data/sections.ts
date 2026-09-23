export type Section = {
  id: string;
  sectionName: string;
  title: string;
  subtitle: string;
  mood: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  imageSrc?: string;
  mobileImageSrc?: string;
  label: string;
};

export const sections: Section[] = [
  {
    id: 'intro',
    sectionName: 'ENTER THE JOURNEY / 01',
    title: '',
    subtitle: '',
    mood: '',
    videoSrc: '/start.mp4',
    label: 'ENTER THE JOURNEY',
  },
  {
    id: 'nivora',
    sectionName: 'NIVORA / 02',
    title: 'NIVORA',
    subtitle: `NIHIL + AURA.<br>No need for outside approval; your own aura.`,
    mood: 'Pure · Minimal · Clean',
    imageSrc: '/collections/nivora.jpg',
    mobileImageSrc: '/collections/nivora.jpg',
    label: 'NIVORA',
  },
  {
    id: 'vayren',
    sectionName: 'VAYREN / 03',
    title: 'VAYREN',
    subtitle: `VAIRAGYA + REBELLION.<br>Detach from their voices. Choose your own direction.`,
    mood: 'Dark · Oversized · Rebellious',
    imageSrc: '/collections/vayren.jpg',
    mobileImageSrc: '/collections/vayren.jpg',
    label: 'VAYREN',
  },
  {
    id: 'aurvia',
    sectionName: 'AURVIA / 04',
    title: 'AURVIA',
    subtitle: `AURUM + VIA.<br>The golden path you choose yourself.`,
    mood: 'Premium · Sophisticated',
    imageSrc: '/collections/aurvia.jpg',
    mobileImageSrc: '/collections/aurvia.jpg',
    label: 'AURVIA',
  },
  {
    id: 'astera',
    sectionName: 'ASTERA / 05',
    title: 'ASTERA',
    subtitle: `ASTRA + ERA.<br>You are the protagonist of your own era.`,
    mood: 'Graphic · Statement · Pieces',
    imageSrc: '/collections/astera.jpg',
    mobileImageSrc: '/collections/astera.jpg',
    label: 'ASTERA',
  },
  {
    id: 'manifera',
    sectionName: 'MANIFERA / 06',
    title: 'MANIFERA',
    subtitle: `MANIFEST + ERA.<br>Turn what you believe into something visible.`,
    mood: 'Experimental · Artistic',
    imageSrc: '/collections/manifera.jpg',
    mobileImageSrc: '/collections/manifera.jpg',
    label: 'MANIFERA',
  },
];
