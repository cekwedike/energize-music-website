export interface NavLink {
  label: string;
  href: string;
}

// Used by the footer's "Explore" column.
export const primaryNav: NavLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Artists', href: '/artists' },
  { label: 'Releases', href: '/releases' },
  { label: 'Events', href: '/events' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const secondaryNav: NavLink[] = [
  { label: 'Energize Kids', href: '/energize-kids' },
  { label: 'NEXT', href: '/next' },
  { label: 'Energize Fest', href: '/events/energize-fest' },
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
    href: '/events/energize-fest',
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
  { type: 'link', label: 'Releases', href: '/releases' },
  { type: 'dropdown', label: 'Initiatives', items: initiativesNav },
  { type: 'link', label: 'Events', href: '/events' },
  { type: 'link', label: 'Blogs', href: '/blogs' },
  { type: 'link', label: 'Careers', href: '/careers' },
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
