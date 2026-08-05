export interface NavLink {
  label: string;
  href: string;
}

// Used by the footer's "Explore" column — order doesn't need to match the header.
export const primaryNav: NavLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Artists', href: '/artists' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const secondaryNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export interface InitiativeItem extends NavLink {
  /** Draft copy — not sourced/researched, placeholder for editorial review. */
  blurb: string;
  image: string;
}

// Draft copy, pending editorial review — see initiativesNav below.
export const initiativesNav: InitiativeItem[] = [
  {
    label: 'Energize Kids',
    href: '/energize-kids',
    blurb:
      'A youth music program introducing the next generation to gospel and soul through mentorship, workshops, and performance opportunities. Built to spot and grow young talent early, close to home.',
    image: 'https://picsum.photos/seed/energize-kids/640/480',
  },
  {
    label: 'NEXT',
    href: '/next',
    blurb:
      'Our development pipeline for emerging artists, pairing them with producers, writers, and industry mentors. NEXT is where raw talent gets the tools and time to become a signed act.',
    image: 'https://picsum.photos/seed/energize-next/640/480',
  },
  {
    label: 'Energize Fest',
    href: '/energize-fest',
    blurb:
      'An annual live showcase bringing the full Energize Music roster together on one stage. A celebration of Afro-gospel and soul-fusion, built for the community that supports it.',
    image: 'https://picsum.photos/seed/energize-fest/640/480',
  },
];

export type HeaderNavEntry =
  | ({ type: 'link' } & NavLink)
  | { type: 'dropdown'; label: string; items: InitiativeItem[] };

// Drives SiteHeader specifically — order and Home visibility are handled there.
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

// Placeholder handles — wire to siteSettings.socials once Sanity content is seeded.
export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/energizemusic' },
  { label: 'YouTube', href: 'https://youtube.com/@energizemusic' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E' },
  { label: 'TikTok', href: 'https://tiktok.com/@energizemusic' },
];
