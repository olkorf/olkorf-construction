import type { Metadata } from "next";
import Link from "next/link";
import "./products.css";

export const metadata: Metadata = {
  title: "Windows & Doors",
};

const categories = [
  {
    title: "Replacement Windows",
    text: "Energy-efficient windows for comfort, durability, and a clean exterior finish.",
    image:
      "/images/products/windows-v3.webp",
  },
  {
    title: "Entry Doors",
    text: "Exterior doors that improve curb appeal, security, insulation, and everyday use.",
    image:
      "/images/products/entry-v3.webp",
  },
  {
    title: "Patio Doors",
    text: "Sliding and hinged patio doors with smooth operation and proper weather sealing.",
    image:
      "/images/products/patio-v3.webp",
  },
];

const options = [
  "Vinyl, fiberglass, wood, and composite materials",
  "Energy-efficient Low-E glass packages",
  "Interior and exterior color options",
  "Decorative grilles and glass styles",
  "Standard and custom sizes",
  "Brickmould, exterior trim, and aluminum wrapping",
];

const brands = [
  { name: "Andersen", logo: "andersen.svg", url: "https://www.andersenwindows.com" },
  { name: "Pella", logo: "pella.svg", url: "https://www.pella.com" },
  { name: "Marvin", logo: "marvin.png", url: "https://www.marvin.com" },
  { name: "ProVia", logo: "provia.svg", url: "https://www.provia.com" },
  { name: "Therma-Tru", logo: "therma-tru.png", url: "https://www.thermatru.com" },
  { name: "Alliance", logo: "alliance.png", url: "https://www.alliancewindows.com" },
];

export default function ProductsPage() {
  return (
    <main className="products-page">
<section className="products-hero">
        <div>
          <p className="products-eyebrow">Products</p>

          <h1>Windows and doors selected for Wisconsin homes.</h1>

          <p>
            We help homeowners choose quality products based on style, budget,
            energy efficiency, and proper installation requirements.
          </p>

          <div className="products-actions">
            <Link className="cta-button" href="/estimate">
              Get Free Estimate →
            </Link>

            <Link className="cta-button cta-button--secondary" href="/gallery">
              View Gallery
            </Link>
          </div>
        </div>

        <div className="products-hero-image">
          <img
            src="/images/products/hero-v3.webp"
            alt="Wisconsin-style Craftsman home with taupe siding, stone porch columns, and a navy entry door"
          />
        </div>
      </section>

      <section className="products-section">
        <div className="products-section-header">
          <p className="products-eyebrow">Product Categories</p>
          <h2>Windows and doors we install</h2>
        </div>

        <div className="products-grid">
          {categories.map((item) => (
            <article className="products-card" key={item.title}>
              <div className="products-card-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="products-card-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>

                <Link href="/services">Learn more →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="products-details">
        <div>
          <p className="products-eyebrow">Details Matter</p>
          <h2>The right product depends on the opening.</h2>

          <p className="products-details-text">
            Before installation, we look at frame depth, opening size, glass type,
            exterior trim, interior casing, hardware, insulation, flashing, and
            water protection.
          </p>
        </div>

        <div className="products-options">
          {options.map((option) => (
            <div className="products-option" key={option}>
              <span className="products-check">✓</span>
              {option}
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="products-section-header">
          <p className="products-eyebrow">Manufacturers</p>
          <h2>We work with trusted American brands</h2>
        </div>

        <div className="products-brand-grid">
          {brands.map((brand) => (
            <a className="products-brand" key={brand.name} href={brand.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${brand.name} website (opens in a new tab)`}>
              <img src={`/images/brands/${brand.logo}`} alt={brand.name} width={180} height={64} loading="lazy" />
              <span>Visit website <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="products-final">
        <div className="products-final-inner">
          <div className="products-cta-image">
            <img
              src="/images/products/detail-v3.webp"
              alt="White-trimmed double-hung windows overlooking autumn maple trees"
            />
          </div>

          <div>
            <h2>Not sure which product is right for your home?</h2>

            <p>
              Send us photos of your current windows or doors, and we’ll help you
              understand the best options before you buy.
            </p>

            <Link className="products-estimate-button" href="/estimate">
              Start Estimate →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
