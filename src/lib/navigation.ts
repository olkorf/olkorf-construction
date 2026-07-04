export type NavigationLink = {
  href: string;
  label: string;
};

export const navigationLinks: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/locations", label: "Locations" },
  { href: "/calculator", label: "Calculator" },
  { href: "/contact", label: "Contact" }
];
