import type { Metadata } from "next";
import { ProjectCalculator } from "@/components/project-calculator";
import styles from "./calculator.module.css";

export const metadata: Metadata = {
  title: "Window & Door Cost Calculator — Madison, WI",
  description: "Explore installed window and door replacement cost ranges for Madison and surrounding Wisconsin communities. Plan your budget and request a free on-site estimate."
};

export default function CalculatorPage() {
  return (
    <section className={styles.page}><div className={styles.container}>
      <header className={styles.header}><p className={styles.eyebrow}>MADISON &amp; SURROUNDING COMMUNITIES</p><h1>A clearer budget.<br/>A better place to start.</h1><p>Window &amp; door cost calculator</p><p className={styles.intro}>Explore your project’s approximate cost in a few simple steps.<br/>No email required. Just a useful place to begin.</p></header>
      <ProjectCalculator/>
      <p className={styles.disclaimer}><strong>A starting point, not a final quote.</strong> For general information and budgeting purposes only. Your final price will be provided after on-site measurements and a review of the complete scope of work, product selections and installation conditions. Actual costs may fall outside these ranges.</p>
      <section className={styles.guide}><div><p className={styles.eyebrow}>PLAN WITH CONFIDENCE</p><h2>What goes into your estimate?</h2><p>Material, size, glass, hardware and the condition of the existing opening all affect your project. These planning allowances include products and standard installation for same-size replacements in Madison and nearby communities.</p></div><div className={styles.faq}>
      <details><summary>Can you replace a door with existing sidelights?</summary><p>Yes. Choose one or two sidelights to estimate a replacement assembly within the existing opening. The calculator does not assume an enlargement. Opening changes or structural repairs require an individual assessment.</p></details>
      <details><summary>What if I need different windows and doors?</summary><p>Use “Add another item” to combine styles, materials and quantities. Bay or bow windows and custom work require assessment and are excluded from any priced subtotal.</p></details>
      <details><summary>How are these ranges determined?</summary><p>These are planning allowances informed by published product and installation guides, not a verified Madison market average or a binding offer. No discounts or rebates are assumed. References: <a href="https://www.pella.com/ideas/windows/replacement-window-cost/">Pella window cost guide</a> and <a href="https://www.homedepot.com/services/c/cost-install-doors/893e44520">Home Depot installation guide</a>. Your selections and on-site scope determine the final price.</p></details>
      </div></section>
    </div></section>
  );
}
