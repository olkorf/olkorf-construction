import type { Metadata } from "next";
import { LocationsMap } from "@/components/locations-map";

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
        <div className="locations-visual-card" aria-label="Wisconsin service area centered around Madison">
          <LocationsMap />
        </div>

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

          <div aria-label="Areas we commonly serve" className="locations-pill-grid">
            {serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>

          <div className="locations-note">
            <h2>Don&apos;t see your city listed?</h2>
            <p>We regularly take on projects outside our standard service area. Contact us to discuss your project.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
