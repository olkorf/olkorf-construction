import type { Metadata } from "next";
import { LocationsMap } from "@/components/service-area-map";
import Link from "next/link";
import "./locations.css";

const serviceAreas = [
  "Madison",
  "Sun Prairie",
  "Middleton",
  "Verona",
  "Waunakee",
  "Fitchburg",
  "DeForest",
  "Monona",
  "Cottage Grove",
  "Stoughton",
  "Janesville",
  "Portage",
  "Baraboo",
  "Watertown"
];

export const metadata: Metadata = {
  title: "Locations",
  description: "OLKORF Construction serves Madison and Southern Wisconsin within approximately 50 miles."
};

export default function LocationsPage() {
  return (
    <section aria-labelledby="locations-heading" className="home-section locations-page">
      <div className="home-section__inner locations-service-section">
        <div className="locations-service-content">
          <p className="home-section__eyebrow">Southern Wisconsin Service Area</p>
          <h1 id="locations-heading">Serving Madison &amp; Southern Wisconsin</h1>
          <p>
            We proudly help homeowners throughout Madison and surrounding communities with professional window and door
            installation.
          </p>
          <p>
            Our standard service area covers approximately 50 miles from Madison, but we regularly travel farther for
            larger projects. If your home is outside our normal service area, feel free to contact us and we&apos;ll be
            happy to discuss your project.
          </p>
          <Link className="locations-cta" href="/estimate">Get a free estimate <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="locations-visual-card" aria-label="Wisconsin service area centered around Madison">
          <div className="locations-map-heading"><span>Our service area</span><span>Madison, WI</span></div>
          <LocationsMap />
          <div className="locations-map-caption"><span className="locations-coverage-dot" /> Approximately 50 miles from Madison</div>
        </div>

        <div className="locations-communities">
          <div><p className="home-section__eyebrow">Close to home</p><h2>Local expertise. Neighboring communities.</h2></div>
          <div aria-label="Areas we commonly serve" className="locations-pill-grid">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
          <div className="locations-note">
            <h2>Don&apos;t see your city listed?</h2>
            <p>We regularly take on projects outside our standard service area. Contact us to discuss your project.</p>
            <Link href="/contact">Ask about your location <span aria-hidden="true">↗</span></Link>
          </div>
      </div>
    </section>
  );
}
