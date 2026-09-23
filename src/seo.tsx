import { useEffect } from 'react';

export type SeoPage = {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  siteName?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const setMetaTag = (selector: string, attributes: Record<string, string>, content?: string) => {
  const existing = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (existing) {
    if (content !== undefined) {
      existing.setAttribute('content', content);
    }
    Object.entries(attributes).forEach(([key, value]) => existing.setAttribute(key, value));
    return existing;
  }

  const tag = document.createElement('meta');
  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
  if (content !== undefined) {
    tag.setAttribute('content', content);
  }
  document.head.appendChild(tag);
  return tag;
};

const setCanonical = (url: string) => {
  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

const setJsonLd = (data: Record<string, unknown> | Array<Record<string, unknown>>) => {
  const scriptId = '4log-json-ld';
  const existing = document.head.querySelector(`script[data-seo-id="${scriptId}"]`) as HTMLScriptElement | null;
  const payload = Array.isArray(data) ? data : [data];

  const script = existing ?? document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-seo-id', scriptId);
  script.textContent = JSON.stringify(payload);
  if (!existing) {
    document.head.appendChild(script);
  }
};

export function Seo({ page }: { page: SeoPage }) {
  useEffect(() => {
    document.title = page.title;

    setMetaTag('meta[name="description"]', { name: 'description' }, page.description);
    setMetaTag('meta[name="robots"]', { name: 'robots' }, 'index,follow');
    setMetaTag('meta[property="og:title"]', { property: 'og:title' }, page.ogTitle ?? page.title);
    setMetaTag('meta[property="og:description"]', { property: 'og:description' }, page.ogDescription ?? page.description);
    setMetaTag('meta[property="og:url"]', { property: 'og:url' }, page.canonical);
    setMetaTag('meta[property="og:type"]', { property: 'og:type' }, page.ogType ?? 'website');
    setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name' }, page.siteName ?? '4LOG');
    setMetaTag('meta[property="og:image"]', { property: 'og:image' }, page.ogImage ?? 'https://4log.in/og-4log.svg');

    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, page.ogTitle ?? page.title);
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }, page.ogDescription ?? page.description);
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' }, page.ogImage ?? 'https://4log.in/og-4log.svg');

    setCanonical(page.canonical);

    if (page.structuredData) {
      setJsonLd(page.structuredData);
    }
  }, [page]);

  return null;
}
