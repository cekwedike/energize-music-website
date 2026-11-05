export interface NavLink {
  label: string;
  href: string;
}

export const HQ_URL = 'https://energizehq.netlify.app';

// Public contact email. Empty until confirmed; the contact page falls back to the form.
export const CONTACT_EMAIL = '';

// Used by the footer's "Explore" column.
export const primaryNav: NavLink[] = [
  { label: 'Artistes', href: '/artists' },
  { label: 'Releases', href: '/releases' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
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

// Used by the home page cards. The footer lists these too, apart from Events.
export const initiativesNav: InitiativeItem[] = [
  {
    label: 'NEXT',
    href: '/next',
    blurb:
      'A pan-African Afro-gospel talent competition. Ten finalists earn a place on the ENERGIZE Afrogospel Album and the launch concert stage.',
    image: '/initiatives/cards/next.webp',
  },
  {
    label: 'Energize Kids',
    href: '/energize-kids',
    blurb:
      'Clean, faith-filled fun for children: songs, Play Zone challenges, and featured artiste Xade. Parents can register a child at energize-kids.com.',
    image: '/initiatives/cards/energize-kids.webp',
  },
  {
    label: 'Events',
    href: '/events',
    blurb:
      'Live shows and shared moments from Energize Music. See upcoming dates, venues, and ticket details.',
    image: '/initiatives/cards/energize-fest.webp',
  },
];

// Drives SiteHeader. Contact renders as the CTA button, Energize HQ as a small text link after it.
export const headerNav: NavLink[] = [
  { label: 'Artistes', href: '/artists' },
  { label: 'Releases', href: '/releases' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
