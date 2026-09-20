import type { Metadata } from "next";
import Link from "next/link";
import { SectionContainer } from "@/components/section-container";

export const metadata: Metadata = {
  title: "Reviews"
};

export default function ReviewsPage() {
  return (
    <SectionContainer className="empty-page">
      <p className="home-section__eyebrow">Your Experience Matters</p>
      <h1 className="page-title">Reviews</h1>
      <div className="empty-page__card"><h2>A new company. A commitment to your home.</h2><p>Customer reviews will appear here as our company grows. If you have worked with us, we would love to hear about your experience.</p><Link className="cta-button" href="/contact">Get in Touch →</Link></div>
    </SectionContainer>
  );
}
