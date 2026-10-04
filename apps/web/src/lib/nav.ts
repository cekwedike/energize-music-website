export interface NavLink {
  label: string;
  href: string;
}

export const HQ_URL = 'https://energizehq.netlify.app';

// Public contact email. Empty until confirmed; the contact page falls back to the form.
export const CONTACT_EMAIL = '';

// Header and footer "Explore" column share this list.
export const primaryNav: NavLink[] = [
  { label: 'Artists', href: '/artists' },
  { label: 'Music', href: '/releases' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const hqLink: NavLink = { label: 'Energize HQ', href: HQ_URL };

// Footer "The House" column. These live on Energize HQ, not on this site.
export const houseNav: NavLink[] = [
  { label: 'Energize HQ', href: HQ_URL },
  { label: 'Energize Central', href: `${HQ_URL}/central` },
  { label: 'Energize Mind', href: `${HQ_URL}/mind` },
  { label: 'EnergizeFest', href: `${HQ_URL}/live/energizefest` },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
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
