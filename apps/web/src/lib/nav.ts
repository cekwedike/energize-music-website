export interface NavLink {
  label: string;
  href: string;
}

// Used by the footer's "Explore" column. Order doesn't need to match the header.
export const primaryNav: NavLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Artists', href: '/artists' },
  { label: 'Releases', href: '/releases' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const secondaryNav: NavLink[] = [
  { label: 'Energize Kids', href: '/energize-kids' },
  { label: 'NEXT', href: '/next' },
  { label: 'Energize Fest', href: '/energize-fest' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export interface InitiativeItem extends NavLink {
  blurb: string;
  image: string;
}

export const initiativesNav: InitiativeItem[] = [
  {
    label: 'Energize Kids',
    href: '/energize-kids',
    blurb:
      'Clean entertainment for kids: music, movement, learning, and joy. Explore activities and events at energize-kids.com.',
    image: '/initiatives/energize-kids.webp',
  },
  {
    label: 'NEXT',
    href: '/next',
    blurb:
      'Pan-African Afrogospel talent competition. Submit, get voted in, and launch on the ENERGIZE Afrogospel Album.',
    image: '/initiatives/next.jpg',
  },
  {
    label: 'Energize Fest',
    href: '/energize-fest',
    blurb:
      'An annual live showcase bringing the full Energize Music roster together on one stage. Afro-gospel and soul-fusion, built for the community.',
    image: '/initiatives/energize-fest.webp',
  },
];

export type HeaderNavEntry =
  | ({ type: 'link' } & NavLink)
  | { type: 'dropdown'; label: string; items: InitiativeItem[] };

// Drives SiteHeader specifically. Order and Home visibility are handled there.
export const headerNav: HeaderNavEntry[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'link', label: 'About Us', href: '/about' },
  { type: 'link', label: 'Artists', href: '/artists' },
  { type: 'link', label: 'Blogs', href: '/blogs' },
  { type: 'dropdown', label: 'Initiatives', items: initiativesNav },
  { type: 'link', label: 'Careers', href: '/careers' },
  { type: 'link', label: 'Contact', href: '/contact' },
];

export interface SocialLink {
  label: string;
  href: string;
}

// Placeholder handles. Wire to siteSettings.socials once Sanity content is seeded.
export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/energizemusic' },
  { label: 'YouTube', href: 'https://youtube.com/@energizemusic' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E' },
  { label: 'TikTok', href: 'https://tiktok.com/@energizemusic' },
];
