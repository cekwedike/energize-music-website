export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Artists', href: '/artists' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const secondaryNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
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
