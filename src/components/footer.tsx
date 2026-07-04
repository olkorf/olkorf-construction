import Link from "next/link";
import { Camera, MessageCircle, Music2 } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" }
];

const socialLinks = [
  { href: "https://www.facebook.com/", icon: MessageCircle, label: "Facebook" },
  { href: "https://www.instagram.com/", icon: Camera, label: "Instagram" },
  { href: "https://www.tiktok.com/", icon: Music2, label: "TikTok" }
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__column footer__brand-column">
          <Link className="footer__brand" href="/">
            OLKORF Construction
          </Link>
          <a href="https://www.olkorfconstruction.com">www.olkorfconstruction.com</a>
          <a href="mailto:info@olkorfconstruction.com">info@olkorfconstruction.com</a>
          <a href="tel:6084089259">608-408-9259</a>
        </div>

        <nav aria-label="Quick links" className="footer__column footer__nav">
          <h2>Quick links</h2>
          {quickLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer__column footer__social">
          <h2>Social links</h2>
          <div className="footer__social-links">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank">
                <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 OLKORF Construction. All rights reserved.</p>
      </div>
    </footer>
  );
}
