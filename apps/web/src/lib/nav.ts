export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Artists', href: '/artists' },
  { label: 'Releases', href: '/releases' },
  { label: 'Services', href: '/services' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const secondaryNav: NavLink[] = [
  { label: 'Press', href: '/press' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export const initiativesNav: NavLink[] = [
  { label: 'Energize Kids', href: '/energize-kids' },
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
