/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services & prices' },
  { href: '#trial', label: 'Bridal trial' },
  { href: '#wedding-day', label: 'Wedding day' },
  { href: '#studio', label: 'The studio' },
  { href: '#good-to-know', label: 'Good to know' },
  { href: '#visit', label: 'Visit', header: false },
];
