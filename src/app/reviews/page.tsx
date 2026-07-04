import type { Metadata } from "next";
import { SectionContainer } from "@/components/section-container";

export const metadata: Metadata = {
  title: "Reviews"
};

export default function ReviewsPage() {
  return (
    <SectionContainer>
      <h1 className="page-title">Reviews</h1>
    </SectionContainer>
  );
}
