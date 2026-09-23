import { useMemo } from 'react';
import App from './App';
import { Seo } from './seo';

const BASE_URL = 'https://4log.in';

export type RoutePage = {
  path: string;
  label: string;
  page: {
    title: string;
    description: string;
    canonical: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  };
  render: () => JSX.Element;
};

const brandSchema = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  name: '4LOG',
  description: '4LOG is a community built for people who choose action over opinions. Do it anyway. From talk to takeover.',
  url: 'https://4log.in/',
  logo: 'https://4log.in/4log-white.png',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '4LOG',
  url: 'https://4log.in/',
  description: '4LOG is a community built for people who choose action over opinions. Do it anyway. From talk to takeover.',
  publisher: {
    '@type': 'Organization',
    name: '4LOG',
    url: 'https://4log.in/',
    logo: 'https://4log.in/4log-white.png',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '4LOG',
  description: '4LOG is a community built for people who choose action over opinions. Do it anyway. From talk to takeover.',
  url: 'https://4log.in/',
  logo: 'https://4log.in/4log-white.png',
  sameAs: [
    'https://www.instagram.com/4log.india',
    'https://www.youtube.com/@4LOG.Studios',
    'https://x.com/4log',
    'https://www.facebook.com/4log',
    'https://www.linkedin.com/company/4log-india/about/',
  ],
};

const homeSeo = {
  title: '4LOG — Do It Anyway. From Talk to Takeover.',
  description: '4LOG is a community built for people who choose action over opinions. Do it anyway. From talk to takeover.',
  canonical: `${BASE_URL}/`,
  ogTitle: '4LOG — Do It Anyway. From Talk to Takeover.',
  ogDescription: '4LOG is a community built for people who choose action over opinions. Do it anyway. From talk to takeover.',
  ogImage: `${BASE_URL}/og-4log.svg`,
  structuredData: [brandSchema, websiteSchema, organizationSchema],
};

const aboutSeo = {
  title: 'About 4LOG — Do It Anyway',
  description: 'Learn what 4LOG stands for, why it was created, and how it champions individuality, courage, and self-expression for those who choose action over opinions.',
  canonical: `${BASE_URL}/about`,
  ogTitle: 'About 4LOG — Do It Anyway',
  ogDescription: 'Learn what 4LOG stands for, why it was created, and how it champions individuality, courage, and self-expression for those who choose action over opinions.',
  ogImage: `${BASE_URL}/og-4log.svg`,
};

export const routePages: RoutePage[] = [
  {
    path: '/',
    label: 'Home',
    page: homeSeo,
    render: () => <App />,
  },
  {
    path: '/about',
    label: 'About',
    page: aboutSeo,
    render: () => (
      <div className="page-shell page-shell--about">
        <Seo page={aboutSeo} />
        <section className="brand-page">
          <div className="brand-page__eyebrow">About 4LOG</div>
          <h1>What is 4LOG?</h1>
          <p>
            4LOG is built for people who do not live their life by other people’s expectations.
            It is rooted in individuality, confidence, and the belief that personal identity should not be filtered through fear.
          </p>
          <p>
            The brand’s foundation is simple: <strong>4LOG</strong> is not just clothing, it is a statement that you can move through the world on your own terms.
            The 4LOG clothing range is designed for people who want to stand out without needing permission.
          </p>
          <p>
            <strong>What does 4LOG mean?</strong> For us, it represents a way of living. It is a reminder to ignore the noise, stop waiting for approval, and keep building the life you want.
            The phrase “log kya kahenge” shaped the identity behind the brand: the idea that people often hold back because they fear judgment.
          </p>
          <p>
            <strong>Why was 4LOG created?</strong> Because confidence should not be borrowed. The goal was to build a 4LOG brand that feels honest, sharp, and true to the people who wear it.
            That is why 4LOG streetwear focuses on attitude, energy, and self-expression rather than trends for trends’ sake.
          </p>
          <div className="brand-page__grid">
            <div>
              <h2>The clothing philosophy</h2>
              <p>
                4LOG clothing is meant for people who are building their own path. We design apparel that feels strong, wearable, and confident — pieces that help you move through the day with clarity and intent.
              </p>
            </div>
            <div>
              <h2>Streetwear identity</h2>
              <p>
                4LOG streetwear is rooted in Indian culture, modern attitude, and a refusal to be dictated by outside noise. The brand blends comfort, edge, and everyday wearability into statement pieces.
              </p>
            </div>
          </div>
          <p>
            The brand is more than a label. It is an expression of self-trust. The 4LOG clothing brand turns “log kya kahenge” into a challenge instead of a barrier — a reminder to stay rooted in your own standards.
          </p>
          <p>
            4LOG is for people who want to wear their confidence the way they live it.
            From T-shirts to statement streetwear staples, every piece is made to reflect a mindset: keep moving, keep building, and keep being yourself.
          </p>
          <div className="brand-page__cta-row">
            <a href="/" className="brand-page__link">Visit the official 4LOG homepage</a>
            <a href="/collections/t-shirts" className="brand-page__link">Explore 4LOG T-shirts</a>
          </div>
        </section>
      </div>
    ),
  },
];

export const getRouteByPath = (path: string) => routePages.find((route) => route.path === path) ?? routePages[0];

export const useSeoForCurrentPath = (path: string) => {
  const route = useMemo(() => getRouteByPath(path), [path]);
  return route.page;
};
