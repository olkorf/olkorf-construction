import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

const services = [
  {
    title: "Window Installation",
    href: "/services/window-installation",
    image: "/service-renders/window-installation.png",
    description:
      "Whether you're replacing one window or upgrading your entire home, we provide professional window installation with attention to detail and long-term performance.",
    features: [
      "Insert replacement windows",
      "Full-frame window replacement",
      "Energy-efficient upgrades",
      "Interior and exterior finishing"
    ]
  },
  {
    title: "Entry Door Installation",
    href: "/services/entry-door-installation",
    image: "/service-renders/entry-door-installation.png",
    description: "Upgrade curb appeal, security, and energy efficiency with a professionally installed entry door.",
    features: ["Front entry doors", "Doors with sidelights", "Custom sizing", "Professional finishing"]
  },
  {
    title: "Patio Door Installation",
    href: "/services/patio-door-installation",
    image: "/service-renders/patio-door-installation.png",
    description:
      "From sliding patio doors to large glass openings, we help create smooth indoor-outdoor living spaces.",
    features: [
      "Sliding patio doors",
      "French patio doors",
      "Replacement and new openings",
      "Weatherproof installation"
    ]
  },
  {
    title: "Storm Door Installation",
    href: "/services/storm-door-installation",
    image: "/service-renders/storm-door-installation.png",
    description: "Protect your entry door while improving ventilation and everyday convenience.",
    features: ["Full-view storm doors", "Ventilating storm doors", "Replacement installation", "Proper fit and adjustment"]
  },
  {
    title: "Aluminum Wrapping & Exterior Trim",
    href: "/services/aluminum-wrapping",
    image: "/service-renders/aluminum-wrapping.png",
    description: "Clean exterior finishing that protects exposed wood and reduces future maintenance.",
    features: ["Custom aluminum wrapping", "Window trim", "Door trim", "Maintenance-free finish"]
  }
];

const installationMethods = [
  {
    title: "Insert Installation",
    description:
      "An insert installation replaces the window while keeping the existing frame in place. This option is often faster and more cost-effective when the surrounding frame is still in good condition.",
    benefits: ["Lower cost", "Faster installation", "Minimal interior disruption"]
  },
  {
    title: "Full-Frame Installation",
    description:
      "A full-frame installation removes the entire existing window or door system down to the rough opening. This allows us to inspect hidden damage and install a completely new unit.",
    benefits: ["Complete replacement", "Opportunity to address rot or damage", "Maximum long-term performance"]
  }
];

const reasons = [
  "Licensed Wisconsin Contractor",
  "Fully Insured",
  "Professional Installation",
  "Serving Madison & Southern Wisconsin"
];

export const metadata: Metadata = {
  title: "Window & Door Installation Services | OLKORF Construction",
  description:
    "Professional window installation, door replacement, patio doors, storm doors, aluminum wrapping, and exterior trim services in Madison and Southern Wisconsin."
};

export default function ServicesPage() {
  return (
    <section aria-labelledby="services-heading" className="services-page">
      <div className="services-page__inner">
        <div className="services-page__header">
          <p className="home-section__eyebrow">Our Services</p>
          <h1 id="services-heading">Professional Window &amp; Door Installation in Madison, WI</h1>
          <p>
            We help homeowners upgrade their homes with quality products, professional installation, and clear
            communication from start to finish.
          </p>
        </div>

        <div className="services-grid" aria-label="OLKORF Construction services">
          {services.map((service) => (
            <article className="services-card" key={service.title}>
              <div className="services-card__thumbnail" aria-hidden="true">
                <Image alt="" height={240} sizes="112px" src={service.image} width={240} />
              </div>
              <div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
              <Link href={service.href}>Learn More →</Link>
            </article>
          ))}
        </div>

        <section aria-labelledby="installation-methods-heading" className="services-section">
          <div className="services-section__heading">
            <h2 id="installation-methods-heading">Two Installation Options</h2>
          </div>
          <div className="installation-grid">
            {installationMethods.map((method) => (
              <article className="installation-card" key={method.title}>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <ul>
                  {method.benefits.map((benefit) => (
                    <li key={benefit}>✓ {benefit}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="why-choose-services-heading" className="services-section">
          <div className="services-section__heading">
            <h2 id="why-choose-services-heading">Why Homeowners Choose OLKORF Construction</h2>
          </div>
          <div className="services-reasons-grid">
            {reasons.map((reason) => (
              <article className="services-reason-card" key={reason}>
                <p>{reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="services-area-heading" className="services-area-section">
          <h2 id="services-area-heading">Serving Madison and Surrounding Communities</h2>
          <p>
            We proudly serve homeowners throughout Madison, Sun Prairie, Middleton, Verona, Waunakee, Fitchburg,
            DeForest, Cottage Grove, Stoughton, Janesville, Baraboo, Portage, and nearby communities.
          </p>
          <p>
            For projects outside our standard service area, feel free to contact us. We regularly travel for larger
            projects.
          </p>
        </section>

        <section aria-labelledby="services-final-cta-heading" className="services-final-cta">
          <h2 id="services-final-cta-heading">Ready to Start Your Project?</h2>
          <p>Whether you&apos;re replacing a single window or planning a full exterior upgrade, we&apos;re here to help.</p>
          <Link className="cta-button" href="/estimate">
            Request a Free Estimate →
          </Link>
        </section>
      </div>
    </section>
  );
}
