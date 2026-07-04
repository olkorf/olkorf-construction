import type { Metadata } from "next";
import { SectionContainer } from "@/components/section-container";

export const metadata: Metadata = {
  title: "Gallery"
};

export default function GalleryPage() {
  return (
    <SectionContainer>
      <h1 className="page-title">Gallery</h1>
    </SectionContainer>
  );
}
