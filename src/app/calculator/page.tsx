import type { Metadata } from "next";
import { SectionContainer } from "@/components/section-container";

export const metadata: Metadata = {
  title: "Calculator"
};

export default function CalculatorPage() {
  return (
    <SectionContainer>
      <h1 className="page-title">Calculator</h1>
    </SectionContainer>
  );
}
