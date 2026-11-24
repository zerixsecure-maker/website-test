// Central place for company details. Edit here and the whole site updates.
export const company = {
  name: 'Zerix Securities',
  email: 'info@zerixsecurities.com',
  phone: '+91 932 11 11 544',
  phoneHref: '+919321111544',
  hq: 'Shri Vallabh, Shop 25, Borivali West, Mumbai, Maharashtra',
};

export const linkedin = {
  companyUrl: 'https://www.linkedin.com/company/zerix-securities',
  // LinkedIn post -> "..." menu -> "Embed this post" -> copy the src="..." URL from the iframe code
  // e.g. https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890
  embedUrl: '',
};

// Equirectangular map coordinates (lon, lat)
export const offices = [
  { name: 'Mumbai', tag: 'Headquarters', lon: 72.88, lat: 19.07, hq: true },
  { name: 'Kolkata', tag: 'Office', lon: 88.36, lat: 22.57 },
  { name: 'New York', tag: 'Presence', lon: -74.0, lat: 40.71 },
];

export const instagram = {
  // Paste the Instagram profile link here, e.g. 'https://www.instagram.com/yourhandle/'
  profileUrl: 'https://www.instagram.com/zerixsecurities/',
};

// Main navigation. An item with `children` becomes a dropdown (desktop) / grouped list (mobile).
export const navLinks: { label: string; href?: string; children?: { label: string; href: string }[] }[] = [
  { label: 'Company', children: [
    { label: 'Our approach', href: '/#approach' },
    { label: 'Sectors we serve', href: '/#sectors' },
    { label: 'Clients', href: '/#clients' },
    { label: 'Latest from Zerix', href: '/#linkedin' },
  ] },
  { label: 'Services', href: '/#services' },
  { label: 'Products', href: '/products/' },
  { label: 'Why Cyber', href: '/why-cyber/' },
];
