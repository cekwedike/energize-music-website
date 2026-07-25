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
