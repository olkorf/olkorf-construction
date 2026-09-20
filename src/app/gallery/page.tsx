import type { Metadata } from "next";
import Link from "next/link";
import { WorkGallery } from "@/components/work-gallery";
import styles from "./gallery.module.css";

export const metadata: Metadata = {
  title: "Window & Door Installation Gallery",
  description: "Explore OLKORF Construction project photos: entry doors, sidelights, patio doors, replacement windows and installation details."
};

export default function GalleryPage() {
  return (
    <section className={styles.page}>
      <header className={styles.header}><p className={styles.eyebrow}>THE DETAILS MAKE THE DIFFERENCE</p><h1>Our work. <span>Your inspiration.</span></h1><p>Explore our window and door projects, from distinctive entrances to the installation details behind them.</p></header>
      <WorkGallery/>
      <aside className={styles.cta}><div><h2>Have a project in mind?</h2><p>Let’s find the right windows and doors for your home.</p></div><Link className="cta-button" href="/estimate">Get Free Estimate →</Link></aside>
    </section>
  );
}
