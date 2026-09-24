export type NavItem = { href: string; label: string };

/** Primary navigation. Add future sections (Talks, Notes, CV…) here. */
export const mainNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

/** Footer links, grouped. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Profile",
    items: [
      { href: "/about", label: "About Sandip" },
      { href: "/experience", label: "Experience" },
      { href: "/skills", label: "Skills" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Work",
    items: [
      { href: "/projects", label: "All projects" },
      { href: "/projects/tufan-ride", label: "Tufan Ride" },
      { href: "/projects/t-meet", label: "T-Meet" },
      { href: "/projects/a1-it-innovation", label: "A1 IT Innovation" },
    ],
  },
  {
    title: "Writing",
    items: [
      { href: "/blog", label: "Technical blog" },
      { href: "/research", label: "Research" },
      { href: "/feed.xml", label: "RSS feed" },
    ],
  },
];
