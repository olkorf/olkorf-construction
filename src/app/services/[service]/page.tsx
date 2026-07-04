import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServicePage, servicePages } from "@/lib/service-pages";

const processSteps = [
  {
    title: "Consultation",
    description: "We listen to what you want to improve and review the project details."
  },
  {
    title: "Product Selection",
    description: "We help you compare practical options for appearance, performance, and budget."
  },
  {
    title: "Professional Installation",
    description: "We prepare the opening, install carefully, and keep the work area clean."
  }
];

const trustItems = ["Licensed Wisconsin Contractor", "Fully Insured", "Clear Communication", "Attention to Detail"];

const serviceProductImages: Record<string, string> = {
  "aluminum-wrapping": "/service-renders/aluminum-wrapping.png",
  "entry-door-installation": "/service-renders/entry-door-installation.png",
  "patio-door-installation": "/service-renders/patio-door-installation.png",
  "storm-door-installation": "/service-renders/storm-door-installation.png",
  "window-installation": "/service-renders/window-installation.png"
};

type ServiceDetailPageProps = {
  params: Promise<{
    service: string;
  }>;
};

export function generateStaticParams() {
  return servicePages.map((servicePage) => ({
    service: servicePage.slug
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { service } = await params;
  const servicePage = getServicePage(service);

  if (!servicePage) {
    return {
      title: "Service"
    };
  }

  return servicePage.metadata;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { service } = await params;
  const servicePage = getServicePage(service);

  if (!servicePage) {
    notFound();
  }

  return (
    <section aria-labelledby="service-detail-heading" className="service-detail-page">
      <div className="service-detail-page__inner">
        <div className="service-detail-hero">
          <div className="service-detail-hero__content">
            <p className="home-section__eyebrow">OLKORF Construction</p>
            <h1 id="service-detail-heading">{servicePage.name}</h1>
            <div>
              {servicePage.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link className="cta-button" href="/estimate">
              Get Free Estimate
            </Link>
          </div>
          <ServiceProductRender name={servicePage.name} slug={servicePage.slug} />
        </div>

        <section aria-labelledby="service-help-heading" className="service-detail-section">
          <div className="service-detail-section__heading">
            <h2 id="service-help-heading">What We Help With</h2>
          </div>
          <div className="service-detail-card-grid">
            {servicePage.helpCards.map((card) => (
              <article className="service-detail-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="service-process-heading" className="service-detail-section">
          <div className="service-detail-section__heading">
            <h2 id="service-process-heading">A Professional Installation Process</h2>
            <p>{servicePage.approachIntro}</p>
          </div>
          <div className="service-process-grid">
            {processSteps.map((step, index) => (
              <article className="service-process-card" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="service-faq-heading" className="service-detail-section">
          <div className="service-detail-section__heading">
            <h2 id="service-faq-heading">Common Questions</h2>
          </div>
          <div className="service-faq-grid">
            {servicePage.faqs.map((faq) => (
              <article className="service-faq-card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="service-trust-heading" className="service-detail-section">
          <div className="service-detail-section__heading">
            <h2 id="service-trust-heading">Why Homeowners Choose OLKORF</h2>
          </div>
          <div className="service-trust-grid">
            {trustItems.map((item) => (
              <article className="service-trust-card" key={item}>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="service-detail-cta-heading" className="service-detail-cta">
          <h2 id="service-detail-cta-heading">Ready to Get Started?</h2>
          <p>Tell us about your project and we&apos;ll be happy to discuss your options.</p>
          <Link className="cta-button" href="/estimate">
            Request a Free Estimate →
          </Link>
        </section>
      </div>
    </section>
  );
}

function ServiceProductRender({ name, slug }: { name: string; slug: string }) {
  const image = serviceProductImages[slug];

  return (
    <div className={`service-product-render service-product-render--${slug}`} aria-label={`${name} product render`} role="img">
      <Image alt="" height={1040} priority sizes="(max-width: 1080px) 100vw, 520px" src={image} width={1040} />
    </div>
  );
}
