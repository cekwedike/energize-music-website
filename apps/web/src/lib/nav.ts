export interface NavLink {
  label: string;
  href: string;
}

export const HQ_URL = 'https://energizehq.netlify.app';

// Public contact email. Empty until confirmed; the contact page falls back to the form.
export const CONTACT_EMAIL = '';

// Used by the footer's "Explore" column.
export const primaryNav: NavLink[] = [
  { label: 'Artists', href: '/artists' },
  { label: 'Releases', href: '/releases' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const hqLink: NavLink = { label: 'Energize HQ', href: HQ_URL };

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export interface InitiativeItem extends NavLink {
  blurb: string;
  image: string;
}

export const initiativesNav: InitiativeItem[] = [
  {
    label: 'NEXT',
    href: '/next',
    blurb:
      'Pan-African Afrogospel competition. Ten finalists earn a spot on the ENERGIZE Afrogospel Album and the launch stage.',
    image: '/initiatives/cards/next.webp',
  },
  {
    label: 'Energize Kids',
    href: '/energize-kids',
    blurb:
      'Clean kids entertainment with music, Play Zone challenges, and artist Xade. Register a child at energize-kids.com.',
    image: '/initiatives/cards/energize-kids.webp',
  },
  {
    label: 'Energize Fest',
    href: '/events/energize-fest',
    blurb:
      'Annual live showcase for the full Energize Music roster. Next date: 1 December 2026. Venue TBA.',
    image: '/initiatives/cards/energize-fest.webp',
  },
];

export type HeaderNavEntry =
  | ({ type: 'link' } & NavLink)
  | { type: 'dropdown'; label: string; items: InitiativeItem[] };

// Drives SiteHeader. Contact renders as the CTA button, Energize HQ as a small text link after it.
export const headerNav: HeaderNavEntry[] = [
  { type: 'link', label: 'Artists', href: '/artists' },
  { type: 'link', label: 'Releases', href: '/releases' },
  { type: 'dropdown', label: 'Initiatives', items: initiativesNav },
  { type: 'link', label: 'About', href: '/about' },
  { type: 'link', label: 'Contact', href: '/contact' },
];

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E?si=5FXGMXScQCmWhfsDNfj8kw',
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@Energize_HQ?sub_confirmation=1' },
  { label: 'Instagram', href: 'https://www.instagram.com/energize_music/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@energizecentral' },
];
