import Link from "next/link";

const trustItems = [
  {
    title: "Licensed Wisconsin contractor",
    text: "Licensed to perform window and door installation across Wisconsin."
  },
  {
    title: "Fully insured installation",
    text: "General liability and workers’ compensation coverage for your peace of mind."
  },
  {
    title: "Quality installation",
    text: "Clean work, careful details, and materials selected for Wisconsin homes."
  },
  {
    title: "Free estimates",
    text: "Clear project guidance before work begins, with no pressure."
  }
];

const products = [
  {
    title: "Windows",
    text: "Double hung, casement, sliding, picture, and bay window options for Wisconsin homes.",
    image: "/images/home/home-windows.webp",
    href: "/products"
  },
  {
    title: "Entry Doors",
    text: "Modern entry door options selected for clean design, everyday durability, and curb appeal.",
    image: "/images/home/home-entry-door.webp",
    href: "/products"
  },
  {
    title: "Patio Doors",
    text: "Sliding patio and glass door systems that make interior spaces brighter and easier to use.",
    image: "/images/home/home-patio-door.webp?v=2",
    href: "/products"
  }
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero home-hero--photo">
        <div className="home-hero__inner">
          <div className="home-hero__content">
            <p className="home-hero__badge">Licensed &amp; Fully Insured</p>
            <h1 className="home-hero__title">
              Better windows.
              <br />
              Better doors.
              <br />
              A home you love.
            </h1>
            <p className="home-hero__subtitle">
              Window and door sales, replacement, and installation in Madison and Southern Wisconsin.
              Thoughtful choices. Careful workmanship.
            </p>
            <div className="home-hero__actions">
              <Link className="cta-button" href="/estimate">
                Get Free Estimate →
              </Link>
              <Link className="cta-button cta-button--secondary" href="/products">
                Explore Products →
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section aria-label="Trust highlights" className="home-section home-section--trust">
        <div className="home-section__inner">
          <div className="trust-grid">
            {trustItems.map((item, index) => (
              <div className="trust-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{item.title}</p>
                  <small>{item.text}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="products-heading" className="home-section home-section--products">
        <div className="home-section__inner">
          <div className="home-section__heading">
            <p className="home-section__eyebrow">Product Supply &amp; Installation</p>
            <h2 id="products-heading">Windows &amp; Doors We Offer</h2>
            <p>High-quality products. Professional installation. Lasting results.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="home-product-card" key={product.title}>
                <div
                  aria-label={`${product.title} product example`}
                  className="home-product-card__image"
                  role="img"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="home-product-card__body">
                  <h3>{product.title}</h3>
                  <p>{product.text}</p>
                  <Link href={product.href}>Explore {product.title} →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="service-area-heading" className="home-section home-section--wisconsin">
        <div className="home-section__inner home-service-area">
          <div>
            <p className="home-section__eyebrow">Service Area</p>
            <h2 id="service-area-heading">Proudly Serving Madison and Southern Wisconsin</h2>
            <p>
              We provide professional window and door installation throughout Madison and surrounding communities within
              approximately 50 miles.
            </p>
          </div>
          <Link className="cta-button cta-button--secondary" href="/locations">
            View Service Area
          </Link>
        </div>
      </section>

      <section aria-labelledby="final-cta-heading" className="home-section home-section--final">
        <div className="home-final-cta">
          <h2 id="final-cta-heading">Ready to Upgrade Your Windows or Doors?</h2>
          <Link className="cta-button" href="/estimate">
            Get Free Estimate →
          </Link>
        </div>
      </section>
    </>
  );
}
