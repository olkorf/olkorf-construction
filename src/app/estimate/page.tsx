import type { Metadata } from "next";
import { EstimateForm } from "@/components/estimate-form";

const trustItems = [
  "Licensed Wisconsin Contractor",
  "Fully Insured",
  "Window & Door Specialists",
  "Serving Madison & Southern Wisconsin"
];

export const metadata: Metadata = {
  title: "Request a Free Estimate",
  description: "Request a free window or door estimate from OLKORF Construction."
};

export default function EstimatePage() {
  return (
    <section aria-labelledby="estimate-heading" className="estimate-page">
      <div className="estimate-page__inner">
        <div className="estimate-page__header">
          <p className="home-section__eyebrow">Free Estimate</p>
          <h1 id="estimate-heading">Request a Free Estimate</h1>
          <p>Tell us what you need, and we&apos;ll contact you to discuss your project.</p>
        </div>

        <div className="estimate-trust-row" aria-label="OLKORF Construction trust highlights">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="estimate-card">
          <EstimateForm />
        </div>
      </div>
    </section>
  );
}
