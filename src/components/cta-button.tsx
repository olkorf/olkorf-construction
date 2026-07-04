import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type CTAButtonProps = ComponentPropsWithoutRef<typeof Link>;

export function CTAButton({ children, ...props }: CTAButtonProps) {
  return (
    <Link className="cta-button" {...props}>
      {children}
    </Link>
  );
}
