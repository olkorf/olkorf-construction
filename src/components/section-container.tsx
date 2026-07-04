import type { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <section className={["section-container", className].filter(Boolean).join(" ")}>
      <div className="section-container__inner">{children}</div>
    </section>
  );
}
