export type CollectionItem = {
  id: string;
  name: string;
  href: string;
  image: string;
  description: string;
  tagline: string;
};

export const collections: CollectionItem[] = [
  {
    id: 'nivora',
    name: 'NIVORA',
    href: '/collections/nivora',
    image: '/collections/nivora.jpg',
    tagline: 'NIHIL + AURA',
    description: 'No need for outside approval; your own aura. Pure, minimal, clean.',
  },
  {
    id: 'vayren',
    name: 'VAYREN',
    href: '/collections/vayren',
    image: '/collections/vayren.jpg',
    tagline: 'VAIRAGYA + REBELLION',
    description: 'Detach from people’s opinions. Live on your own terms. Dark, oversized, rebellious.',
  },
  {
    id: 'aurvia',
    name: 'AURVIA',
    href: '/collections/aurvia',
    image: '/collections/aurvia.jpg',
    tagline: 'AURUM + VIA',
    description: 'The golden path you choose yourself. Premium, sophisticated.',
  },
  {
    id: 'astera',
    name: 'ASTERA',
    href: '/collections/astera',
    image: '/collections/astera.jpg',
    tagline: 'ASTRA + ERA',
    description: 'Become the protagonist of your own era. Graphic statement pieces.',
  },
  {
    id: 'manifera',
    name: 'MANIFERA',
    href: '/collections/manifera',
    image: '/collections/manifera.jpg',
    tagline: 'MANIFEST + ERA',
    description: 'Turn your beliefs into something visible. Experimental, artistic.',
  },
];
