"use client";

import Link from "next/link";
import { useState } from "react";
import { navigationLinks } from "@/lib/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__brand" href="/">
          OLKORF Construction
        </Link>

        <button
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="header__menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav aria-label="Main navigation" className="header__nav">
          {navigationLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="header__cta" href="/estimate">
          Get Free Estimate →
        </Link>
      </div>

      <nav
        aria-label="Mobile navigation"
        className={isMenuOpen ? "header__mobile-nav header__mobile-nav--open" : "header__mobile-nav"}
        id="primary-navigation"
      >
        {navigationLinks.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link className="header__mobile-cta" href="/estimate" onClick={() => setIsMenuOpen(false)}>
          Get Free Estimate →
        </Link>
      </nav>
    </header>
  );
}
