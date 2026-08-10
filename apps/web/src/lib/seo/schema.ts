import {
  SITE_DESCRIPTION,
  SITE_GENRES,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteImageUrl,
  absoluteUrl,
  getOrganizationSameAs,
  getSiteUrl,
  type BreadcrumbItem,
} from './site';

export type JsonLd = Record<string, unknown>;

const ORG_ID = () => `${getSiteUrl()}/#organization`;
const WEBSITE_ID = () => `${getSiteUrl()}/#website`;
const LOGO_ID = () => `${getSiteUrl()}/#logo`;

export function organizationId(): string {
  return ORG_ID();
}

export function buildOrganizationSchema(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORG_ID(),
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: [SITE_TAGLINE, 'Energize'],
    url: getSiteUrl(),
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID(),
      url: absoluteImageUrl('/brand/logo.webp'),
      contentUrl: absoluteImageUrl('/brand/logo.webp'),
      caption: SITE_NAME,
    },
    image: absoluteImageUrl('/brand/logo.webp'),
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    foundingLocation: {
      '@type': 'Place',
      name: 'Lagos, Nigeria',
    },
    areaServed: 'Worldwide',
    knowsAbout: [...SITE_GENRES, 'Record label', 'Artist development', 'Live events'],
    sameAs: getOrganizationSameAs(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: absoluteUrl('/contact'),
        availableLanguage: ['English'],
      },
    ],
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID(),
    url: getSiteUrl(),
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID() },
  };
}

export function buildSiteGraph(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationSchema(), buildWebSiteSchema()],
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLd | null {
  if (items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqPageSchema(
  faqs: Array<{ q: string; a: string }>,
  pageUrl: string,
): JsonLd | null {
  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: pageUrl,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function crumbs(...parts: BreadcrumbItem[]): BreadcrumbItem[] {
  return [{ name: 'Home', path: '/' }, ...parts];
}
