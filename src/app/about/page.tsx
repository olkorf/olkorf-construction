import type { Metadata } from "next";
import { SectionContainer } from "@/components/section-container";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <SectionContainer>
      <h1 className="page-title">About</h1>
    </SectionContainer>
  );
}
