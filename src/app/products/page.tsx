import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products | OLKORF Construction",
};

const categories = [
  {
    title: "Replacement Windows",
    text: "Energy-efficient windows for comfort, durability, and a clean exterior finish.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Entry Doors",
    text: "Exterior doors that improve curb appeal, security, insulation, and everyday use.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Patio Doors",
    text: "Sliding and hinged patio doors with smooth operation and proper weather sealing.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
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

const brands = ["Andersen", "Pella", "Marvin", "ProVia", "Therma-Tru", "Alliance"];

export default function ProductsPage() {
  return (
    <main className="products-page">
      <style>{`
        .products-page {
          background: #fff;
          color: #1d1d1f;
        }

        .products-hero {
          max-width: 1240px;
          margin: 0 auto;
          padding: 110px 32px 120px;
          display: grid;
          grid-template-columns: 0.9fr 1fr;
          gap: 90px;
          align-items: center;
        }

        .products-eyebrow {
          color: #8b613b;
          font-size: 14px;
          font-weight: 650;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        .products-hero h1 {
          font-size: clamp(56px, 7vw, 104px);
          line-height: .96;
          font-weight: 680;
          letter-spacing: -0.04em;
          margin-bottom: 30px;
        }

        .products-hero p {
          max-width: 600px;
          color: #62676d;
          font-size: 20px;
          line-height: 1.55;
          margin-bottom: 38px;
        }

        .products-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .products-hero-image {
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid #e2ddd6;
          box-shadow: 0 28px 70px rgb(31 35 40 / 9%);
          aspect-ratio: 1.02;
          background: #f5f5f7;
        }

        .products-hero-image img,
        .products-card-image img,
        .products-cta-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .products-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px 120px;
        }

        .products-section-header {
          max-width: 760px;
          margin: 0 auto 60px;
          text-align: center;
        }

        .products-section-header h2,
        .products-details h2,
        .products-final h2 {
          font-size: clamp(38px, 5vw, 72px);
          line-height: 1.04;
          font-weight: 660;
          letter-spacing: -0.03em;
          margin-top: 12px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 36px;
        }

        .products-card {
          border: 1px solid #e2ddd6;
          border-radius: 30px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 22px 56px rgb(31 35 40 / 7%);
        }

        .products-card-image {
          aspect-ratio: 1.25;
          overflow: hidden;
          border-bottom: 1px solid #e2ddd6;
          background: #f5f5f7;
        }

        .products-card-body {
          padding: 28px;
        }

        .products-card h3 {
          font-size: 30px;
          line-height: 1.12;
          font-weight: 620;
          margin-bottom: 10px;
        }

        .products-card p {
          color: #62676d;
          font-size: 16px;
          line-height: 1.55;
        }

        .products-card a {
          display: inline-flex;
          margin-top: 22px;
          color: #8b613b;
          font-size: 15px;
          font-weight: 650;
        }

        .products-details {
          max-width: 1180px;
          margin: 0 auto 120px;
          padding: 70px 32px;
          border-top: 1px solid #e2ddd6;
          border-bottom: 1px solid #e2ddd6;
          display: grid;
          grid-template-columns: .85fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .products-details-text {
          color: #62676d;
          font-size: 17px;
          line-height: 1.65;
          margin-top: 22px;
          max-width: 520px;
        }

        .products-options {
          display: grid;
        }

        .products-option {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid #e2ddd6;
          color: #1d1d1f;
          font-size: 16px;
        }

        .products-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid #a9784b;
          color: #a9784b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex: 0 0 auto;
        }

        .products-brand-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
        }

        .products-brand {
          min-height: 104px;
          border: 1px solid #e2ddd6;
          border-radius: 14px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
        }

        .products-brand span {
          color: #1d1d1f;
          font-size: 22px;
          font-weight: 650;
          letter-spacing: -0.02em;
        }

        .products-final {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px 140px;
        }

        .products-final-inner {
          background: #0f2238;
          color: #fff;
          border-radius: 32px;
          padding: 48px;
          display: grid;
          grid-template-columns: .9fr 1fr;
          gap: 56px;
          align-items: center;
          overflow: hidden;
        }

        .products-cta-image {
          border-radius: 22px;
          overflow: hidden;
          aspect-ratio: 1.55;
          background: #1a2b3d;
        }

        .products-final h2 {
          color: #fff;
          margin-bottom: 20px;
        }

        .products-final p {
          color: rgba(255,255,255,.78);
          font-size: 17px;
          line-height: 1.6;
          margin-bottom: 30px;
          max-width: 560px;
        }

        .products-gold-button {
          display: inline-flex;
          min-height: 52px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #d7a86e;
          color: #1d1d1f;
          padding: 0 28px;
          font-weight: 650;
        }

        @media (max-width: 1080px) {
          .products-hero,
          .products-details,
          .products-final-inner {
            grid-template-columns: 1fr;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .products-brand-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 760px) {
          .products-hero,
          .products-section,
          .products-details,
          .products-final {
            padding-left: 20px;
            padding-right: 20px;
          }

          .products-hero {
            padding-top: 72px;
            padding-bottom: 90px;
          }

          .products-hero h1 {
            font-size: clamp(46px, 13vw, 72px);
          }

          .products-hero-image {
            border-radius: 24px;
          }

          .products-brand-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .products-final-inner {
            padding: 28px;
            border-radius: 24px;
          }
        }
      `}</style>

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
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85"
            alt="American home exterior with windows and front door"
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
            <div className="products-brand" key={brand}>
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-final">
        <div className="products-final-inner">
          <div className="products-cta-image">
            <img
              src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85"
              alt="American home with windows and exterior doors"
            />
          </div>

          <div>
            <h2>Not sure which product is right for your home?</h2>

            <p>
              Send us photos of your current windows or doors, and we’ll help you
              understand the best options before you buy.
            </p>

            <Link className="products-gold-button" href="/estimate">
              Start Estimate →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}