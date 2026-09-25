export type WorldConfig = {
  id: string;
  num: string;
  name: string;
  meaning: string;
  meaningParts?: string[];
  descLine1: string;
  descLine2: string;
  actionText: string;
  tags: string[];
  accentColor: string;
  slug: string;
  themeClass: string;
  imageSrc: string;
  letters?: string[];
};

export const worldsData: Record<string, WorldConfig> = {
  nivora: {
    id: 'nivora',
    num: '01',
    name: 'NIVORA',
    meaning: 'NIHIL + AURA',
    descLine1: 'YOUR OWN AURA.',
    descLine2: 'NO APPROVAL NEEDED.',
    actionText: 'DISCOVER',
    tags: ['PURE', 'MINIMAL', 'CLEAN'],
    accentColor: '#e60019',
    slug: 'nivora',
    themeClass: 'world--nivora',
    imageSrc: '/collections/nivora.jpg',
  },
  vayren: {
    id: 'vayren',
    num: '02',
    name: 'VAYREN',
    meaning: 'VAIRAGYA + REBELLION',
    descLine1: 'DETACH. REBEL.',
    descLine2: 'BE YOURSELF.',
    actionText: 'DISCOVER',
    tags: ['DETACH', 'REJECT', 'RISE'],
    accentColor: '#e60019',
    slug: 'vayren',
    themeClass: 'world--vayren',
    imageSrc: '/collections/vayren.jpg',
  },
  aurvia: {
    id: 'aurvia',
    num: '03',
    name: 'AURVIA',
    meaning: 'AURUM + VIA',
    descLine1: 'YOUR PATH.',
    descLine2: 'YOUR GOLDEN RULES.',
    actionText: 'DISCOVER',
    tags: ['CHOOSE', 'YOUR PATH', 'AURVIA'],
    accentColor: '#d4af37',
    slug: 'aurvia',
    themeClass: 'world--aurvia',
    imageSrc: '/collections/aurvia.jpg',
  },
  astera: {
    id: 'astera',
    num: '04',
    name: 'ASTERA',
    meaning: 'ASTRA + ERA',
    descLine1: 'BE THE PROTAGONIST',
    descLine2: 'OF YOUR ERA.',
    actionText: 'DISCOVER',
    tags: ['YOUR', 'OWN', 'ERA'],
    accentColor: '#4deeea',
    slug: 'astera',
    themeClass: 'world--astera',
    imageSrc: '/collections/astera.jpg',
  },
  manifera: {
    id: 'manifera',
    num: '05',
    name: 'MANIFERA',
    meaning: 'MANIFEST + ERA',
    meaningParts: ['MANIFEST', '+', 'ERA'],
    letters: ['M', 'A', 'N', 'I', 'F', 'E', 'R', 'A'],
    descLine1: 'TURN YOUR BELIEFS',
    descLine2: 'INTO REALITY.',
    actionText: 'DISCOVER',
    tags: ['BELIEVE', 'CREATE', 'MANIFEST'],
    accentColor: '#e60019',
    slug: 'manifera',
    themeClass: 'world--manifera',
    imageSrc: '/collections/manifera.jpg',
  },
};

export const WORLDS_ORDER: WorldConfig[] = [
  worldsData.nivora,
  worldsData.vayren,
  worldsData.aurvia,
  worldsData.astera,
  worldsData.manifera,
];
