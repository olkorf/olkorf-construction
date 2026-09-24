"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { confirmationState, confirmationContent } from "@/lib/estimate-confirmation";

export function EstimateConfirmation() {
 const [period, setPeriod] = useState(() => confirmationState());
 useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;
  const update = () => {
   setPeriod(confirmationState());
   timer = setTimeout(update, 60000 - (Date.now() % 60000));
  };
  const onVisibility = () => { if (!document.hidden) setPeriod(confirmationState()); };
  update();
  document.addEventListener("visibilitychange", onVisibility);
  return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", onVisibility); };
 }, []);
 return <ConfirmationCard period={period} />;
}

export function ConfirmationCard({ period }: { period: keyof typeof confirmationContent }) {
 const content = confirmationContent[period];
 const heading = useRef<HTMLHeadingElement>(null);
 useEffect(() => {
  heading.current?.focus({ preventScroll: true });
  heading.current?.closest("section")?.scrollIntoView({ block: "center", behavior: "instant" });
 }, []);
 return <section className="estimate-confirmation" aria-labelledby="confirmation-heading">
  <div className="estimate-confirmation__visual" aria-hidden="true">
   <Image src={content.image} alt="" fill unoptimized style={period === "weekend" ? { objectPosition: "50% 65%" } : undefined} />
  </div>
  <div className="estimate-confirmation__content">
   <p className="home-section__eyebrow">REQUEST RECEIVED</p>
   <div aria-live="polite" aria-atomic="true">
    <h2 id="confirmation-heading" ref={heading} tabIndex={-1}>Thank you.</h2>
    <>
     <p className="estimate-confirmation__lead">{content.lead.map((line, index) => <Fragment key={line}>{index > 0 && <>{period === "daytime" ? <br className="estimate-confirmation__break" /> : <br />} </>}{line}</Fragment>)}</p>
     <p className="estimate-confirmation__support">{content.support.map((line, index) => <Fragment key={line}>{index > 0 && <>{period === "daytime" ? <br className="estimate-confirmation__break" /> : <br />} </>}{line}</Fragment>)}</p>
     <p className="estimate-confirmation__signature">— Oleg, OLKORF Construction</p>
    </>
   </div>
   <Link className="cta-button" href="/">Back to Home →</Link>
  </div>
 </section>;
}
